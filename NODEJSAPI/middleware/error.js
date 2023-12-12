// this is for the message code ex 404,201
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// handling middleware
export const errorMiddleware = (err, req, res, next) => {
  // if message is not given then
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;
  return res
    .status(err.statusCode)
    .json({ success: false, message: err.message });
};

export default ErrorHandler;
