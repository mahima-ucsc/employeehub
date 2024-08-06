const { Employee } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { attachCookie } = require('../utils');

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const employee = await Employee.create({
    firstName,
    lastName,
    email,
    password,
  });

  const token = employee.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    firstNamename: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
  });
};

module.exports = {
  register,
};
