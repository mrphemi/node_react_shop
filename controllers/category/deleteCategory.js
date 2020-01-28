import Chalk from "chalk";

import Category from "../../model/category";
import { isValidMongoId } from "../../helpers";

/**
 * Handles Category deletion
 *
 * @param {Object} req
 * @param {Object} res
 */

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  // check if id is a valid mongo id
  if (!isValidMongoId(productId)) {
    console.log(Chalk.red("Invalid category id"));
  }

  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (category) {
      res.status(200).json({
        success: "Category deleted sucessfully"
      });
    } else {
      // Product not found
      res.status(404).json({
        error: "No matches for this category"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

export default deleteCategory;
