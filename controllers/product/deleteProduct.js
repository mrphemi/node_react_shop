import cloudinary from "cloudinary";
import Chalk from "chalk";

import Product from "../../model/product";

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

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      //  Delete product image from cloudinary
      uploader.destroy(product.imageId, function(result) {
        console.log(Chalk.red("Image deleted"));
      });
      return res.status(200).json({
        success: "Product deleted sucessfully"
      });
    } else {
      // Product not found
      res.status(404).json({
        error: "No matches for product"
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

export default deleteProduct;
