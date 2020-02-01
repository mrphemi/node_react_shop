import express from "express";
const router = express.Router();

import cloudinaryConfig from "../config/cloudinary";
import {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProductDetails
} from "../controllers/product";
import { requireSignIn, requireAdmin } from "../middlewares/auth";
import uploadImage from "../middlewares/uploadImage";
import { createProductValidator, updateProductValidator } from "../validators";

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
router.post(
  "/",
  requireSignIn,
  requireAdmin,
  uploadImage,
  createProductValidator,
  createProduct
);

// @route   DELETE /products
// @desc    Deletes specified product
// @access  Private
// @admin_resource    True
router.delete("/:productId", requireSignIn, requireAdmin, deleteProduct);

// @route   PATCH /products
// @desc    Updates specified product details
// @access  Private
// @admin_resource   True
router.put(
  "/:productId",
  requireSignIn,
  requireAdmin,
  updateProductValidator,
  updateProductDetails
);

export default router;
