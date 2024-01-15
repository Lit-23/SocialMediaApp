import express from "express";
import { test, signup, signin, signout, update, addPost, getPostList, getUserList, searchUserById, deletePost } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', test);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/update/:id', update);
router.post('/add-post/:id', addPost);
router.get('/post-list', getPostList);
router.get('/user-list', getUserList);
router.get('/search-user/:id', searchUserById);
router.delete('/delete/:id', deletePost);

export default router;