import express from "express";
const router = express.Router();

import { createCategory } from "../controllers/category";

import { isAuthenticated, isAdmin } from "../middlewares/auth";

import CategoryValidator from "../validators/category";

// @route   GET /category
// @desc    Retrieve all category
// @access  Private
// router.get("/", getAllcategories);

// @route   POST /category
// @desc    Creates new category
// @access  Private
// admin    True
router.post("/", isAuthenticated, isAdmin, CategoryValidator, createCategory);

// @route   DELETE /category
// @desc    Deletes specified category
// @access  Private
// router.delete("/:categoryId", deletecategory);

// @route   PATCH /category
// @desc    Updates specified category
// @access  Private
// router.patch("/:categoryId", updateCategory);

export default router;
