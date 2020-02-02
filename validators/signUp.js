import { RegisterSchema } from "../validation-schemas";

/**
 * Validates the registration request
 *
 * @param {Object} req
 *
 * @param {Object} res
 *
 * @param {Function} next
 *
 *
 * @return {Object}
 */
export default async (req, res, next) => {
  try {
    await RegisterSchema.validate(req.body, { strict: true });
    return next();
  } catch (error) {
    return res.status(422).json({
      error: error.message
    });
  }
};
