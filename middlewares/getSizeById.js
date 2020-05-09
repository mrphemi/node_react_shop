import Size from "../model/size";
import { isValidMongoId, handleError } from "../helpers";

const getSizeById = async (req, res, next, id) => {
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(id)) {
      res.status(422).json({
        error: "Invalid size id",
      });
    }
    const EXCLUDE_OPTIONS = "-__v -createdAt -updatedAt";
    const size = await Size.findById(id).select(EXCLUDE_OPTIONS);
    if (!size) {
      return res.status(404).json({
        error: "No matches for size",
      });
    }
    req.size = size;
    next();
  } catch (error) {
    handleError(res, error);
  }
};

export default getSizeById;
