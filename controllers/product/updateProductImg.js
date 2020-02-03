import _ from "lodash";
import cloudinary from "cloudinary";
import Chalk from "chalk";

import Product from "../../model/product";
import { handleError } from "../../helpers";

// cloudinary uploader
const uploader = cloudinary.v2.uploader;

/**
 * Handles Product image update
 *
 * @param {Object} req
 * @param {Object} res
 */

const uploadProductImg = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        error: "No matches for product"
      });
    }

    // Grab current image id
    const { image_id } = product;
    // Delete current product image from cloudinary
    uploader.destroy(image_id, function(result) {
      console.log(Chalk.red("Image deleted"));
    });

    // update doc
    const updated = _.extend(product, req.body);
    // save updated doc
    const updatedProduct = await updated.save();
    res.status(201).json({
      success: "Product image successfully updated",
      updatedProduct
    });
  } catch (error) {
    handleError(res, error);
  }
};

export default uploadProductImg;
