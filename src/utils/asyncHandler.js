/**
 * Wrap an async Express handler and forward thrown errors to `next`.
 *
 * @param {Function} handler - Express route handler.
 * @returns {Function}
 */
export function asyncHandler(handler) {
  return function wrappedHandler(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
