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
import { isAuthenticated } from "../middlewares/auth";
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
// admin    True
router.post("/", isAuthenticated, uploadImage, productValidator, createProduct);

// @route   DELETE /products
// @desc    Deletes specified product
// @access  Private
// admin    True
router.delete("/:productId", deleteProduct);

// @route   PATCH /products
// @desc    Updates specified product
// @access  Private
// admin    True
router.patch("/:productId", updateProduct);

export default router;
