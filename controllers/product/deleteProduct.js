import cloudinary from "cloudinary";
import Chalk from "chalk";

import Product from "../../model/product";
import { handleError } from "../../helpers";

// cloudinary uploader
const uploader = cloudinary.v2.uploader;

/**
 * Handles Product deletion
 *
 * @param {Object} req
 * @param {Object} res
 */

const deleteProduct = async (req, res) => {
  try {
    const product = req.product;
    await Product.deleteOne({ _id: product._id });

    //  Delete product image from cloudinary
    uploader.destroy(product.image_id, function (result) {
      console.log(Chalk.red("Image deleted"));
    });

    return res.status(200).json({
      success: "Product deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

export default deleteProduct;
