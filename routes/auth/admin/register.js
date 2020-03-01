import express from "express";

import { adminRegister } from "../../../controllers/auth";
import { signupValidator } from "../../../validators";

const router = express.Router();

router.post("/", signupValidator, adminRegister);

export default router;
