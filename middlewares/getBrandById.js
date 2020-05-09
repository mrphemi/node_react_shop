import Brand from "../model/brand";
import { isValidMongoId, handleError } from "../helpers";

const getBrandById = async (req, res, next, id) => {
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(id)) {
      res.status(422).json({
        error: "Invalid brand id",
      });
    }
    const EXCLUDE_OPTIONS = "-__v -createdAt -updatedAt";
    const brand = await Brand.findById(id).select(EXCLUDE_OPTIONS);
    if (!brand) {
      return res.status(404).json({
        error: "No matches for brand",
      });
    }
    req.brand = brand;
    next();
  } catch (error) {
    handleError(res, error);
  }
};

export default getBrandById;
