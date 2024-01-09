import express from "express";
import { signup, signin, signout, test } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', test);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

export default router;