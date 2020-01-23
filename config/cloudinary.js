import cloudinary from "cloudinary";
import config from "./index";

const cloudinaryConfig = (req, res, next) => {
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  });
  next();
};

export default cloudinaryConfig;
