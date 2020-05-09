import _ from "lodash";

import Brand from "../../model/brand";
import { handleError } from "../../helpers";

/**
 * Gets all brands
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getAll = async (req, res) => {
  try {
    const brands = await Brand.find({}).select("name");
    if (brands.length > 0) {
      res.status(200).json({
        success: "Brands retrieved successfully",
        results: brands,
      });
    } else {
      res.json({
        success: "No Brand found",
        results: brands,
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Gets single brand
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getBrand = async (req, res) => {
  res.status(200).json({
    success: "Brand retrieved successfully",
    result: req.brand,
  });
};

/**
 * Handles brand Creation
 *
 * @param {Object} req
 * @param {Object} res
 */

export const createBrand = async (req, res) => {
  const { name } = req.body;
  const newBrand = new Brand({ name });
  try {
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(403).json({
        error: "Brand already exists",
      });
    } else {
      await Brand.create(newBrand);
      return res.status(201).json({
        success: "Brand Created Successfully",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles brand deletion
 *
 * @param {Object} req
 * @param {Object} res
 */

export const deleteBrand = async (req, res) => {
  try {
    const brand = req.brand;
    await Brand.deleteOne({ _id: brand._id });
    return res.status(200).json({
      success: "Brand deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles Brand details update
 *
 * @param {Object} req
 * @param {Object} res
 */

export const updateBrand = async (req, res) => {
  try {
    const brand = req.brand;
    // update doc
    const updated = _.extend(brand, req.body);
    // save updated doc
    await updated.save();
    res.status(201).json({
      success: "Brand successfully updated",
    });
  } catch (error) {
    handleError(res, error);
  }
};
