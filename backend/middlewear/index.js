const {
  authenticationMidddleware,
  adminAuthorizationMiddleware,
} = require('./authMiddleware');
const errorHandlerMiddleware = require('./errorHandlerMiddlewear');
const routeNotFoundMiddlewear = require('./routeNotFoundMiddlewear');

module.exports = {
  errorHandlerMiddleware,
  routeNotFoundMiddlewear,
  authenticationMidddleware,
  adminAuthorizationMiddleware,
};
