import Category from "../../model/category";
import { isValidMongoId, handleError } from "../../helpers";

/**
 * Handles Category deletion
 *
 * @param {Object} req
 * @param {Object} res
 */

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  // check if id is a valid mongo id
  if (!isValidMongoId(categoryId)) {
    res.status(422).json({
      error: "Invalid category id"
    });
  }

  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (category) {
      res.status(200).json({
        success: "Category deleted successfully"
      });
    } else {
      // Product not found
      res.status(404).json({
        error: "No matches for this category"
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default deleteCategory;
