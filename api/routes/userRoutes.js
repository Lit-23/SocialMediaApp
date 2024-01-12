import express from "express";
import { test, signup, signin, signout, update, addPost, getPostList } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', test);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/update/:id', update);
router.post('/add-post/:id', addPost);
router.post('/post-list', getPostList);

export default router;