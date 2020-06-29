import { BrandSchema } from "../validation-schemas";
/**
 * Validates the create category request
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
  const { name } = req.body;
  try {
    await BrandSchema.validate(
      {
        name,
      },
      { strict: true },
    );
    return next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: error.message,
    });
  }
};
