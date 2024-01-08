import express from "express";
import { signup, signin, test } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', test);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;