import express from "express";

import updateUserSchema from "../validators/updateUser";
import { requireSignIn, requireAdmin } from "../middlewares/auth";

import { updateUserInfo, deleteUser, getAllUsers } from "../controllers/user";

const router = express.Router();

// @route   DELETE /users
// @desc    Retrieve all users
// @access  Private
router.get("/", requireSignIn, requireAdmin, getAllUsers);

// @route   DELETE /users
// @desc    deletes specified user
// @access  Private
router.delete("/:userId", requireSignIn, deleteUser);

// @route   PUT /users
// @desc    Updates specified user details
// @access  Private
router.put("/:userId", requireSignIn, updateUserSchema, updateUserInfo);

export default router;
