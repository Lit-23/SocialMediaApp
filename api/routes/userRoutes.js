import express from "express";
import { signup, test } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', test);
router.post('/signup', signup);

export default router;