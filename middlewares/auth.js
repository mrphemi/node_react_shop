import jwt from "jsonwebtoken";
import config from "../config";
import User from "../model/user";

/**
 * Authenticate the user jwt.
 * Sets the authenticated user on request
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Function}
 */

// Check if user is authenticated
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.body.access_token || req.headers["access_token"] || req.query.access_token;
    const payload = jwt.verify(token, config.jwtSecret);
    const authUser = await User.findById(payload.id);

    req.authUser = authUser;
    return next();
  } catch (error) {
    res.status(401).json({
      error: "Unauthenticated. Please Login"
    });
  }
};

// Check is user account is an admin(admin accounts has an accountTYpe of 1)
export const requireAdmin = (req, res, next) => {
  try {
    const authenticatedUser = req.authUser;
    const { accountType } = authenticatedUser;
    // Check if user is admin(has accountType of 1)
    if (accountType !== 1) {
      return res.status(403).json({
        error: "Unauthorized. Admin Resource"
      });
    }
    return next();
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong"
    });
  }
};
