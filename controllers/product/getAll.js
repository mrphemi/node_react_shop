import Product from "../../model/product";
import { handleError } from "../../helpers";
import { getOffsetAndLimit, paginatedResults } from "../../helpers/paginate";

/**
 * Fetches all products from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getAllProducts = async (req, res) => {
  const { page } = req.query;
  try {
    const docCount = await Product.estimatedDocumentCount();
    const { limit, offset } = getOffsetAndLimit(page);
    const products = await Product.find({})
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

export default getAllProducts;
