import Category from "../../model/category";
import { handleError, isValidMongoId } from "../../helpers";

/**
 * Fetches single category from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(categoryId)) {
      res.status(422).json({
        error: "Invalid category id"
      });
    }

    const category = await Category.findById(categoryId).select("name");

    if (category) {
      res.status(200).json({
        success: "Category retrieved successfully",
        category
      });
    } else {
      res.status(404).json({
        error: "No matches for category"
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getCategory;
