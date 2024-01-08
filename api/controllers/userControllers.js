export const test = (req, res) => {
  res.json({
    message: 'API is working!'
  })
};

import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

// signup new user
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