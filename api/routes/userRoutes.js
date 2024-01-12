import express from "express";
import { test, signup, signin, signout, update, addPost, getPostList, getUserList } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', test);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/update/:id', update);
router.post('/add-post/:id', addPost);
router.get('/post-list', getPostList);
router.get('/user-list', getUserList);

export default router;