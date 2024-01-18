import express from "express";
import { test, signup, signin, signout, updateUser, addPost, getPostList, getUserList, searchUserById, deletePost, updatePost, google } from "../controllers/userControllers.js";

const router = express.Router();

// user routes
router.get('/', test);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google)
router.get('/signout', signout);
router.post('/update/:id', updateUser);
router.get('/user-list', getUserList);
router.get('/search-user/:id', searchUserById);

// post routes
router.post('/add-post/:id', addPost);
router.get('/post-list', getPostList);
router.post('/update-post/:id', updatePost);
router.delete('/delete/:id', deletePost);

export default router;