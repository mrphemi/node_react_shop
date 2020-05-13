import express from "express";

import updateUserSchema from "../validators/updateUser";
import {
  requireSignIn,
  requireSameUser,
  requireAdminOrSameUser,
} from "../middlewares/auth";

import { updateUserInfo, deleteUser, getUser } from "../controllers/user";

const router = express.Router();

// @route   GET /users/{userId}
// @desc    Retrieve single user
// @access  Private
router.get("/:userId", requireSignIn, requireSameUser, getUser);

// @route   DELETE /users/{userId}
// @desc    Deletes specified user
// @access  Private
router.delete("/:userId", requireSignIn, requireAdminOrSameUser, deleteUser);

// @route   PUT /users/{userId}
// @desc    Updates specified user details
// @access  Private
router.put(
  "/:userId",
  requireSignIn,
  requireSameUser,
  updateUserSchema,
  updateUserInfo,
);

export default router;
