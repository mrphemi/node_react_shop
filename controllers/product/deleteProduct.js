import cloudinary from "cloudinary";
import Chalk from "chalk";

import Product from "../../model/product";
import { isValidMongoId, handleError } from "../../helpers";

// cloudinary uploader
const uploader = cloudinary.v2.uploader;

/**
 * Handles Product Creation
 *
 * @param {Object} req
 * @param {Object} res
 */

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  // check if id is a valid mongo id
  if (!isValidMongoId(productId)) {
    console.log(Chalk.red("Invalid product id"));
  }

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      //  Delete product image from cloudinary
      uploader.destroy(product.image_id, function(result) {
        console.log(Chalk.red("Image deleted"));
      });
      return res.status(200).json({
        success: "Product deleted sucessfully"
      });
    } else {
      // Product not found
      res.status(404).json({
        error: "No matches for this product"
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default deleteProduct;
