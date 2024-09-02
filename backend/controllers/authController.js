const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { Employee } = require('../models');
const { attachCookie } = require('../utils');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Email and/or password is missing.');
  }
  const employee = await Employee.findOne({ email }).select('+password');
  if (!employee) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await employee.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const token = employee.createJWT();
  attachCookie({ res, token });
  res.status(StatusCodes.OK).json({
    id: employee._id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    role: employee.userRole,
  });
};

module.exports = { login };
