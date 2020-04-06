import Product from "../../model/product";
import { isValidMongoId, handleError } from "../../helpers";

/**
 * Fetches single product from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(productId)) {
      res.status(422).json({
        error: "Invalid product id"
      });
    }

    const product = await Product.findById(productId).select(
      "name category price image description quantity"
    );

    if (product) {
      res.status(200).json({
        success: "Product retrieved successfully",
        result: product
      });
    } else {
      res.status(404).json({
        error: "No matches for product"
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getProduct;
