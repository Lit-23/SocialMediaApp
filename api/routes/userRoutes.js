import express from "express";
import { signup, signin, signout, update, test } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', test);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/update/:id', update);

export default router;