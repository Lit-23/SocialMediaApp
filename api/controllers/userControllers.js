export const test = (req, res) => {
  res.json({
    message: 'API is working!'
  })
};

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import errorHandler from '../utils/errorHandler.js';

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

// logout functionality
export const signout = async (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};