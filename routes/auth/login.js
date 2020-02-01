import express from "express";
import { login } from "../../controllers/auth";
import { loginValidator } from "../../validators";

const router = express.Router();

router.post("/", loginValidator, login);

export default router;
