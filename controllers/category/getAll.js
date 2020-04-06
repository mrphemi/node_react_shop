import Category from "../../model/category";
import { paginatedResults, getOffsetAndLimit } from "../../helpers/paginate";
import { handleError } from "../../helpers";

/**
 * Fetches all categories from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getAllCategories = async (req, res) => {
  const { page } = req.query;
  try {
    const docCount = await Category.estimatedDocumentCount();
    const { limit, offset } = getOffsetAndLimit(page);
    const categories = await Category.find({})
      .select("name id")
      .limit(limit)
      .skip(offset);
    const meta = paginatedResults(page, docCount, categories);
    if (categories.length > 0) {
      res.status(200).json({
        success: "Categories retrieved successfully",
        meta,
        results: categories
      });
    } else {
      res.json({
        success: "No Category found",
        results: categories
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getAllCategories;
