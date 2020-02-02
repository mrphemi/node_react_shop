import mongoose from "mongoose";

export const isValidMongoId = id => mongoose.Types.ObjectId.isValid(id);

export const handleError = (res, error) => {
  res.status(500).json({
    error: "Something went wrong",
    message: `${error.name}: ${error.message}`
  });
};
