import jwt from "jsonwebtoken";

import config from "../config";
import User from "../model/user";
import { handleError } from "../helpers";

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

export const requireSignIn = async (req, res, next) => {
  try {
    const token =
      req.body.access_token ||
      req.headers["access_token"] ||
      req.query.access_token;
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

/**
 * Checks if the authenticated user has an admin account_type
 * (admin accounts has an account_type of 1)
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Function}
 */

export const requireAdmin = (req, res, next) => {
  try {
    const authenticatedUser = req.authUser;
    const { account_type } = authenticatedUser;
    // Check if user is admin
    if (account_type !== 1) {
      return res.status(403).json({
        error: "Unauthorized. Admin Resource"
      });
    }
    return next();
  } catch (error) {
    handleError(res, error);
  }
};
