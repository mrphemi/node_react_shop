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
  const { userName, email, password } = req.body;

  try {
    await RegisterSchema.validate({
      userName,
      email,
      password
    });

    return next();
  } catch (error) {
    return res.status(422).json({
      error: "Validation failed.",
      data: {
        errors: {
          [error.path]: error.message
        }
      }
    });
  }
};
