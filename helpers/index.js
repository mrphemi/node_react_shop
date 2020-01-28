import mongoose from "mongoose";

export const isValidMongoId = id => mongoose.Types.ObjectId.isValid(id);
