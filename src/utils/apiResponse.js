/**
 * Create a standard API response payload.
 *
 * @param {object} payload - Response configuration.
 * @param {boolean} [payload.success=true] - Whether the request succeeded.
 * @param {string} payload.message - Human-readable response message.
 * @param {*} [payload.data=null] - Optional response data.
 * @returns {{success: boolean, message: string, data: *}}
 */
export function apiResponse({ success = true, 
                              message, 
                              data = null }) {
  return {
    success,
    message,
    data,
  };
}
