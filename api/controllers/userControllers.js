export const test = (req, res) => {
  res.json({
    message: 'API is working!'
  })
};

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import Post from '../models/post.model.js';
import errorHandler from '../utils/errorHandler.js';
import { MongoClient } from "mongodb";

// USER RELATED FUNCTIONALITIES

// signup new user functionality
export const signup = async (req, res, next) => {
  // request body
  const { profilePicture, firstName, lastName ,email, password } = req.body;

  // hashed the password before saving in the db for security
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ profilePicture, firstName, lastName, email, password: hashedPassword });

  // save the new User
  try {
    await newUser.save();
    res.status(200).json('successfully signed up!');
  } catch (error) {
    next(error)
  }
};

// signin functionality
export const signin = async (req, res, next) => {
  // req.body
  const { email, password } = req.body;

  try {
    // verify user
    const validUser = await User.findOne({ email });
    if(!validUser) return next(errorHandler(401, 'User not Found!'));

    // verify password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    // generate access token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    
    // sign in expiry date (1day)
    const expiryDate = new Date(Date.now() + 86400000); 

    // response
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
  } catch (error) {
    next(error)
  }   
};

// update user functionality
export const updateUser = async (req, res, next) => {  
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    };
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
          profilePicture: req.body.profilePicture,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          coverPhoto: req.body.coverPhoto,
          bio: req.body.bio,
          work: req.body.work,
          designation: req.body.designation,
          primarySchool: req.body.primarySchool,
          secondarySchool: req.body.secondarySchool,
          thirtiarySchool: req.body.thirtiarySchool,
          homeAddress: req.body.homeAddress,
          currentAddress: req.body.currentAddress,
          status: req.body.status,
        }
      },
      { new: true }     
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error)
  }
};

// get users collection functionality
export const getUserList = async (req, res, next) => {
  const mongoURI = process.env.MONGO;
  const client = new MongoClient(mongoURI);
  try {
    await client.connect();
    const database = client.db('user');
    const collection = database.collection('users');
    const data = await collection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// find user by id
export const searchUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// logout functionality
export const signout = async (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};



// POST RELATED FUNCTIONALITIES

// addPost functionality
export const addPost = async (req, res, next) => {
  // request body
  const { id, user, userAvatar, postDescription, postThumbnail } = req.body;

  // save the new PostpostDescription
  const newPost = new Post({ id, user, userAvatar, postDescription, postThumbnail });
  try {
    await newPost.save();
    res.status(200).json('successfully added new post!');
  } catch (error) {
    next(error)
  }
};

// get posts collection functionality
export const getPostList = async (req, res, next) => {
  const mongoURI = process.env.MONGO;
  const client = new MongoClient(mongoURI);
  try {
    await client.connect();
    const database = client.db('user');
    const collection = database.collection('posts');
    const data = await collection.find().toArray();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// update post functionality
export const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $set: {
          postDescription: req.body.postDescription,
          postThumbnail: req.body.postThumbnail,
        }
      },
      { new: true }
    );
    res.status(200).json(updatedPost._doc);
  } catch (error) {
    next(error);
  }
};

// delete post functionality
export const deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json('Post has been deleted!');
  } catch (error) {
    next(error);
  }
};