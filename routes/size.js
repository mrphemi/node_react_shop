import express from "express";

const router = express.Router();

import getSizeById from "../middlewares/getSizeById";
import { requireAdmin, requireSignIn } from "../middlewares/auth";
import { createAndUpdateSizeValidator } from "../validators";
import {
  getAll,
  getSize,
  createSize,
  deleteSize,
  updateSize,
} from "../controllers/sizes";

// @route   GET /sizes
// @desc    Retrieve all sizes
// @access  Public
router.get("/", getAll);

// @route   GET /sizes/{sizeId}
// @desc    Retrieve's single size
// @access  Public
router.get("/:sizeId", getSize);

// @route   POST /sizes
// @desc    Creates new size
// @access  Private
// @admin_resource    True
router.post(
  "/",
  requireSignIn,
  requireAdmin,
  createAndUpdateSizeValidator,
  createSize,
);

// @route   DELETE /brands/{productId}
// @desc    Deletes specified brand
// @access  Private
// @admin_resource    True
router.delete("/:sizeId", requireSignIn, requireAdmin, deleteSize);

// @route   PUT /brands/{productId}
// @desc    Updates specified brand details
// @access  Private
// @admin_resource   True
router.put(
  "/:sizeId",
  requireSignIn,
  requireAdmin,
  createAndUpdateSizeValidator,
  updateSize,
);

router.param("sizeId", getSizeById);

export default router;
