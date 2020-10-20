/**
 * @constructor ErrorHandler
 * @description class extends the Error class. For response errors
 * @param statusCode - status code for the response error
 * @param message - response message
 */
class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (res, err) => {
  res.status(err.statusCode).send({
    status: 'error',
    message: err.message
  });
};

module.exports = {
  ErrorHandler,
  handleError
};
