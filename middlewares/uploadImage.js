import path from "path";
import Datauri from "datauri";
import cloudinary from "cloudinary";
import { handleError } from "../helpers";

// datauri instance
const dUri = new Datauri();

// cloudinary uploader
const uploader = cloudinary.v2.uploader;

/**
 * Converts incoming req file(image file) to dataUri and
 * uploads image to cloudinary
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Function}
 */

const uploadImage = (req, res, next) => {
  // check if file is part of request data
  if (req.file) {
    // convert file buffer to data uri
    const img = dUri.format(
      path.extname(req.file.originalname),
      req.file.buffer
    ).content;
    // upload image to cloudinary
    const public_id = `${Date.now()}_${req.file.fieldname}`;
    uploader
      .upload(img, {
        folder: `ecommerce/products/`,
        public_id
      })
      .then(result => {
        req.body.image = result.secure_url;
        req.body.image_id = result.public_id;
        return next();
      })
      .catch(err => {
        handleError(res, err);
      });
  } else {
    res.status(422).json({
      error: "No files selected"
    });
  }
};

export default uploadImage;
