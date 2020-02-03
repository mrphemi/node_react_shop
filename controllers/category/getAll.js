import Category from "../../model/category";
import { handleError } from "../../helpers";

/**
 * Fetches all categories from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getAllProducts = async (req, res) => {
  try {
    const categories = await Category.find({}).select("name id");
    if (categories.length > 0) {
      res.status(200).json({
        success: "Categories retrieved",
        categories
      });
    } else {
      res.json({
        success: "No Category found",
        categories
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getAllProducts;
