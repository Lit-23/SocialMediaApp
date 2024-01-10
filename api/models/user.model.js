import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    default: "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // additional user details
  coverPhoto:{
    type: String,
    default: "https://images.pexels.com/photos/696644/pexels-photo-696644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  bio:{
    type: String,
    required: false,
  },
  work:{
    type: String,
    required: false,
  },
  primarySchool:{
    type: String,
    required: false,
  },
  secondarySchool:{
    type: String,
    required: false,
  },
  thirtiarySchool:{
    type: String,
    required: false,
  },
  homeAddress:{
    type: String,
    required: false,
  },
  currentAddress:{
    type: String,
    required: false,
  },
  status:{
    type: String,
    required: false,
  },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;