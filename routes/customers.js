import express from "express";

const router = express.Router();

import { requireSignIn, requireAdmin } from "../middlewares/auth";

import { getAll, getCustomer } from "../controllers/customers";

// @route   GET /customers
// @desc    Retrieve all customers
// @access  Private
// @admin_resource   True
router.get("/", requireSignIn, requireAdmin, getAll);

// @route   GET /customers/{customerId}
// @desc    Retrieve single customer
// @access  Private
// @admin_resource   True
router.get("/:customerId", requireSignIn, requireAdmin, getCustomer);

export default router;
