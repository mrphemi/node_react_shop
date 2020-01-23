import express from "express";
import { login } from "../../controllers/auth";
import loginValidator from "../../validators/login";

const router = express.Router();

router.post("/", loginValidator, login);

export default router;
