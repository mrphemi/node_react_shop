import express from "express";

import { customerRegister } from "../../../controllers/auth";
import { signupValidator } from "../../../validators";

const router = express.Router();

router.post("/", signupValidator, customerRegister);

export default router;
