import express from "express";
const router = express.Router();

import { createCategory, deleteCategory, getAll } from "../controllers/category";

import { isAuthenticated, isAdmin } from "../middlewares/auth";

import CategoryValidator from "../validators/category";

// @route   GET /category
// @desc    Retrieve all categories
// @access  Public
router.get("/", getAll);

// @route   POST /category
// @desc    Creates new category
// @access  Private
// admin_resource    True
router.post("/", isAuthenticated, isAdmin, CategoryValidator, createCategory);

// @route   DELETE /category
// @desc    Deletes specified category
// @access  Private
// admin_resource    True
router.delete("/:categoryId", isAuthenticated, isAdmin, deleteCategory);

// @route   PATCH /category
// @desc    Updates specified category
// @access  Private
// router.patch("/:categoryId", updateCategory);

export default router;
