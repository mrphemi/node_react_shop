import express from "express";

const router = express.Router();

import getBrandById from "../middlewares/getBrandById";
import { requireAdmin, requireSignIn } from "../middlewares/auth";
import { createAndUpdateBrandValidator } from "../validators";
import {
  getAll,
  getBrand,
  createBrand,
  deleteBrand,
  updateBrand,
} from "../controllers/brands";

// @route   GET /brands
// @desc    Retrieve all brands
// @access  Public
router.get("/", getAll);

// @route   GET /brands/{brandId}
// @desc    Retrieve's single brand
// @access  Public
router.get("/:brandId", getBrand);

// @route   POST /brands
// @desc    Creates new brand
// @access  Private
// @admin_resource    True
router.post(
  "/",
  requireSignIn,
  requireAdmin,
  createAndUpdateBrandValidator,
  createBrand,
);

// @route   DELETE /brands/{productId}
// @desc    Deletes specified brand
// @access  Private
// @admin_resource    True
router.delete("/:brandId", requireSignIn, requireAdmin, deleteBrand);

// @route   PUT /brands/{productId}
// @desc    Updates specified brand details
// @access  Private
// @admin_resource   True
router.put(
  "/:brandId",
  requireSignIn,
  requireAdmin,
  createAndUpdateBrandValidator,
  updateBrand,
);

router.param("brandId", getBrandById);

export default router;
