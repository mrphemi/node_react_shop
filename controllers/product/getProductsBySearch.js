import Product from "../../model/product";
import { paginatedResults, getOffsetAndLimit } from "../../helpers/paginate";
import { handleError } from "../../helpers";

/**
 * Fetches all products from db
 * based on search string
 *
 * @param {Object} req
 * @param {Object} res
 */

const getProductsBySearch = async (req, res) => {
  const { search, page } = req.query;

  try {
    const docCount = await Product.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    const { limit, offset } = getOffsetAndLimit(page);
    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    })
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

export default getProductsBySearch;
