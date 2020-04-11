import Product from "../model/product";
import { isValidMongoId, handleError } from "../helpers";

const getProductById = async (req, res, next, id) => {
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(id)) {
      res.status(422).json({
        error: "Invalid product id",
      });
    }
    const EXCLUDE_OPTIONS = "-__v -createdAt -updatedAt";
    const product = await Product.findById(id).select(EXCLUDE_OPTIONS);
    if (!product) {
      return res.status(404).json({
        error: "No matches for product",
      });
    }
    req.product = product;
    next();
  } catch (error) {
    handleError(res, error);
  }
};

export default getProductById;
