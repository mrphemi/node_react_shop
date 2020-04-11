import _ from "lodash";
import cloudinary from "cloudinary";
import Chalk from "chalk";

import { handleError } from "../../helpers";

// cloudinary uploader
const uploader = cloudinary.v2.uploader;

/**
 * Handles Product details update
 *
 * @param {Object} req
 * @param {Object} res
 */

const updateProduct = async (req, res) => {
  try {
    const product = req.product;

    // delete current product image from cloudinary
    // if user updates product image
    if (req.file) {
      // Grab current image id
      const { image_id } = product;
      // Delete current product image from cloudinary
      uploader.destroy(image_id, function (result) {
        console.log(Chalk.red("Product image deleted"));
      });
    }

    // update doc
    const updated = _.extend(product, req.body);
    // save updated doc
    const updatedProduct = await updated.save();
    res.status(201).json({
      success: "Product successfully updated",
    });
  } catch (error) {
    handleError(res, error);
  }
};

export default updateProduct;
