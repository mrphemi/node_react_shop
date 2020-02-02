import Product from "../../model/product";
import { handleError } from "../../helpers";

/**
 * Handles Product Creation
 *
 * @param {Object} req
 * @param {Object} res
 */

const CreateProduct = async (req, res) => {
  // Create new product
  const newProduct = new Product(req.body);
  try {
    // Save new product to db
    const product = await Product.create(newProduct);
    return res.status(201).json({
      success: "Product Created Sucessfully"
    });
  } catch (error) {
    handleError(res, error);
  }
};

export default CreateProduct;
