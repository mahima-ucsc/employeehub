const BadRequestError = require('./badRequestError');
const NotFoundError = require('./NotFoundError');
const UnauthenticatedError = require('./UnauthenticatedError');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
};
