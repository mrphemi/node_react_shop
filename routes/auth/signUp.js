import express from "express";

const router = express.Router();

import { signUp } from "../../controllers/auth";

router.post("/", signUp);

export default router;
