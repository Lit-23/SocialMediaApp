import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user:{
    type: String,
    required: true,
  },
  userAvatar:{
    type: String,
    required: true,
  },
  postDescription:{
    type: String,
    required: true,
  },
  postThumbnail:{
    type: String,
    required: false,
  },
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;