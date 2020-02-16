import express from "express";

import updateUserSchema from "../validators/updateUser";
import {
  requireSignIn,
  requireAdmin,
  requireSameUser
} from "../middlewares/auth";

import {
  updateUserInfo,
  deleteUser,
  getAllUsers,
  getUser
} from "../controllers/user";

const router = express.Router();

// @route   GET /users
// @desc    Retrieve all users
// @access  Private
// @admin_resource   True
router.get("/", requireSignIn, requireAdmin, getAllUsers);

// @route   GET /users
// @desc    Retrieve single user
// @access  Private
router.get("/:userId", requireSignIn, requireSameUser, getUser);

// @route   DELETE /users
// @desc    Deletes specified user
// @access  Private
router.delete("/:userId", requireSignIn, requireSameUser, deleteUser);

// @route   PUT /users
// @desc    Updates specified user details
// @access  Private
router.put(
  "/:userId",
  requireSignIn,
  requireSameUser,
  updateUserSchema,
  updateUserInfo
);

export default router;
