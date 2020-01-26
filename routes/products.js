import express from "express";
const router = express.Router();

import cloudinaryConfig from "../config/cloudinary";
import {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
} from "../controllers/product";
import { isAuthenticated, isAdmin } from "../middlewares/auth";
import uploadImage from "../middlewares/uploadImage";
import productValidator from "../validators/product";

router.use("/", cloudinaryConfig);

// @route   GET /products
// @desc    Retrieve all products
// @access  Public
router.get("/", getAllProducts);

// @route   GET /products/{productId}
// @desc    Retrieve's single product
// @access  Public
router.get("/:productId", getProduct);

// @route   POST /products
// @desc    Creates new product
// @access  Private
// @admin_resource    True
router.post("/", isAuthenticated, isAdmin, uploadImage, productValidator, createProduct);

// @route   DELETE /products
// @desc    Deletes specified product
// @access  Private
// @admin_resource    True
router.delete("/:productId", isAuthenticated, isAdmin, deleteProduct);

// @route   PATCH /products
// @desc    Updates specified product
// @access  Private
// @admin_resource   True
router.patch("/:productId", updateProduct);

export default router;
