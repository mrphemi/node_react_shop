import { createProductSchema } from "../validation-schemas";
/**
 * Validates the create product request
 *
 * @param {Object} req
 *
 * @param {Object} res
 *
 * @param {Function} next
 *
 * @return {Object}
 */
export default async (req, res, next) => {
  try {
    await createProductSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: error.message,
    });
  }
};
