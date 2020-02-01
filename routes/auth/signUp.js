import express from "express";

import { signUp } from "../../controllers/auth";
import { signupValidator } from "../../validators";

const router = express.Router();

router.post("/", signupValidator, signUp);

export default router;
