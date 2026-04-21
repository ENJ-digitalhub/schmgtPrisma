import { apiResponse } from '../utils/apiResponse.js';



export function notFound(req, res, next) {
  res.status(404).json(
    apiResponse({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    })
  );
}
