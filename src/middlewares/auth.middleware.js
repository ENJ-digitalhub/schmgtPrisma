import { apiResponse } from '../utils/apiResponse.js';
import { verifyAccessToken } from '../lib/jwt.js';

/**
 * Extract an access token from cookies or the Authorization header.
 *
 * @param {import("express").Request} req - Express request object.
 * @returns {string | null}
 */
function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization;

  if (req.cookies?.accessToken) {
    return req.cookies.accessToken;
  }

  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return null;
}

/**
 * Verify the current request's access token and attach the decoded user to `req.user`.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next callback.
 * @returns {void}
 */
export function authMiddleware(req, res, next) {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json(
      apiResponse({
        success: false,
        message: 'Authentication required',
      })
    );
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    return res.status(401).json(
      apiResponse({
        success: false,
        message: 'Invalid or expired access token',
      })
    );
  }
}

/**
 * Build a role-based authorization middleware.
 *
 * @param {...string} roles - Roles allowed to access the route.
 * @returns {import("express").RequestHandler}
 */
export function permit(...roles) {
  return function authorize(req, res, next) {
    if (!req.user) {
      return res.status(401).json(
        apiResponse({
          success: false,
          message: 'Authentication required',
        })
      );
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json(
        apiResponse({
          success: false,
          message: 'You do not have permission to perform this action',
        })
      );
    }

    next();
  };
}
