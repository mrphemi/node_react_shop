import express from "express";
const router = express.Router();

import {
  createCategory,
  deleteCategory,
  updateCategory,
  getAll,
  getCategory
} from "../controllers/category";

import { requireSignIn, requireAdmin } from "../middlewares/auth";

import { createCategoryValidator } from "../validators";

// @route   GET /category
// @desc    Retrieve all categories
// @access  Public
router.get("/", getAll);

// @route   GET /category/{categoryId}
// @desc    Retrieve's single category
// @access  Public
router.get("/:categoryId", getCategory);

// @route   POST /category
// @desc    Creates new category
// @access  Private
// admin_resource    True
router.post(
  "/",
  requireSignIn,
  requireAdmin,
  createCategoryValidator,
  createCategory
);

// @route   DELETE /category/{categoryId}
// @desc    Deletes specified category
// @access  Private
// admin_resource    True
router.delete("/:categoryId", requireSignIn, requireAdmin, deleteCategory);

// @route   PUT /category/{categoryId}
// @desc    Updates specified category
// @access  Private
// admin_resource    True
router.put(
  "/:categoryId",
  requireSignIn,
  requireAdmin,
  createCategoryValidator,
  updateCategory
);

export default router;
