const jwt = require('jsonwebtoken');
const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const { Employee } = require('../models');
const { userRoles } = require('../constants');

const authenticationMidddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.employeeId };
    next();
  } catch (e) {
    console.log(e.message);
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

const adminAuthorizationMiddleware = async (req, res, next) => {
  const user = await Employee.findOne({ _id: req.user.userId });
  if (user?.userRole != userRoles.admin) {
    throw new UnauthorizedError('Not enough permissions');
  }
  next();
};

const adminOrSelfAuthorizationMiddleware = async (req, res, next) => {
  const user = await Employee.findOne({ _id: req.user.userId });
  if (
    user?.userRole != userRoles.admin &&
    req.user.userId !== req.params.userId
  ) {
    throw new UnauthorizedError('Not enough permissions');
  }
  next();
};

module.exports = {
  authenticationMidddleware,
  adminAuthorizationMiddleware,
  adminOrSelfAuthorizationMiddleware,
};
