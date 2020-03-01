import express from "express";
import { customerLogin } from "../../../controllers/auth";
import { loginValidator } from "../../../validators";

const router = express.Router();

router.post("/", loginValidator, customerLogin);

export default router;
