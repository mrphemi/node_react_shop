import jwt from "jsonwebtoken";

import config from "../config";
import Customer from "../model/customer";
import Admin from "../model/admin";

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
    const { id, role } = jwt.verify(token, config.jwtSecret);

    let authUser;

    if (role === "Admin") {
      authUser = await Admin.findById(id);
    } else {
      authUser = await Customer.findById(id);
    }
    req.authUser = authUser;
    return next();
  } catch (error) {
    res.status(401).json({
      error: "Unauthenticated. Please Login",
    });
  }
};

/**
 * Checks if the authenticated user has an admin account_type
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
    const { role } = authenticatedUser;
    if (role !== "Admin") {
      return res.status(403).json({
        error: "Unauthorized. Admin Resource",
      });
    }
    return next();
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Checks if the authenticated user's id and
 * request param "userId" are equal
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Function}
 */

export const requireSameUser = (req, res, next) => {
  try {
    const authenticatedUser = req.authUser;
    const { id } = authenticatedUser;
    const { userId } = req.params;
    if (id !== userId) {
      return res.status(403).json({
        error: "Unauthorized. Access denied",
      });
    }
    return next();
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Checks if the authenticated user's id and
 * request param "userId" are equal or if user is admin
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Function}
 */
export const requireAdminOrSameUser = (req, res, next) => {
  try {
    const authenticatedUser = req.authUser;
    const { id, role } = authenticatedUser;
    const { userId } = req.params;

    if (id === userId || role === "Admin") {
      return next();
    } else {
      return res.status(403).json({
        error: "Unauthorized. Access denied",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};
