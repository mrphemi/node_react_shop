import express from "express";

import { signUp } from "../../controllers/auth";
import SignUpValidator from "../../validators/signUp";

const router = express.Router();

router.post("/", SignUpValidator, signUp);

export default router;
