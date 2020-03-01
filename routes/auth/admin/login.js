import express from "express";
import { adminLogin } from "../../../controllers/auth";
import { loginValidator } from "../../../validators";

const router = express.Router();

router.post("/", loginValidator, adminLogin);

export default router;
