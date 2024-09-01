const { Employee } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { attachCookie } = require('../utils');
const { userRoles } = require('../constants');

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const employee = await Employee.create({
    firstName,
    lastName,
    email,
    password,
    userRole: userRoles.employee,
  });

  const token = employee.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    role: employee.userRole,
  });
};

const getAllEmployees = async (req, res) => {
  let results = await Employee.find();
  let emps = results.map((emp) => ({
    email: emp.email,
    firstName: emp.firstName,
    lastName: emp.lastName,
    role: emp.userRole,
  }));

  res.status(StatusCodes.OK).json(emps);
};

const getEmployee = async (req, res) => {
  let result = await Employee.findOne({
    _id: req.params.userId,
  });

  let emp = {
    email: result.email,
    firstName: result.firstName,
    lastName: result.lastName,
    role: result.userRole,
  };
  res.status(StatusCodes.OK).json(emp);
};

module.exports = {
  register,
  getEmployee,
  getAllEmployees,
};
