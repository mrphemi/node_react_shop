import Products from "../../model/product";
import { paginatedResults, getOffsetAndLimit } from "../../helpers/paginate";
import { handleError, isValidMongoId } from "../../helpers";

/**
 * Fetches products by category from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { page } = req.query;
  try {
    if (!isValidMongoId(categoryId)) {
      res.status(422).json({
        error: "Invalid category id",
      });
    }

    const docCount = await Products.countDocuments({ category: categoryId });
    const { limit, offset } = getOffsetAndLimit(page);
    const products = await Products.find({ category: categoryId })
      .select("name category price image")
      .limit(limit)
      .skip(offset);
    const meta = paginatedResults(page, docCount, products);
    if (products.length > 0) {
      res.status(200).json({
        success: "Products retrieved",
        meta,
        results: products,
      });
    } else {
      res.json({
        success: "No products found",
        results: products,
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getProductsByCategory;
