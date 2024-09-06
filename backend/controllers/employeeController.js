const { Employee } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { attachCookie } = require('../utils');
const { userRoles } = require('../constants');
const { NotFoundError } = require('../errors');
const { default: mongoose } = require('mongoose');

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
    id: emp._id,
  }));

  res.status(StatusCodes.OK).json(emps);
};

const getEmployee = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId))
    throw new NotFoundError('Invalid user id.');

  let result = await Employee.findOne({
    _id: req.params.userId,
  });

  let emp = {
    email: result.email,
    firstName: result.firstName,
    lastName: result.lastName,
    role: result.userRole,
    id: result._id,
  };
  res.status(StatusCodes.OK).json(emp);
};

const updateRole = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId))
    throw new NotFoundError('Invalid user id.');
  let user = await Employee.findOne({
    _id: req.params.userId,
  });

  if (!user) throw new NotFoundError('Invalid user id.');

  user.userRole = req.body.role;
  await user.save();
  res.status(StatusCodes.OK).send();
};

const updateByUserId = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId))
    throw new NotFoundError('Invalid user id.');
  let user = await Employee.findOne({
    _id: req.params.userId,
  });

  if (!user) throw new NotFoundError('Invalid user id.');

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const result = await user.save();
  res.status(StatusCodes.OK).json({
    email: result.email,
    firstName: result.firstName,
    lastName: result.lastName,
    role: result.userRole,
    id: result._id,
  });
};

const deleteEmployeeById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId))
    throw new NotFoundError('Invalid user id.');
  let user = await Employee.findOne({
    _id: req.params.userId,
  });

  if (!user) throw new NotFoundError('Invalid user id.');

  user.deleteOne();
  res.status(StatusCodes.OK).send();
};

module.exports = {
  register,
  getEmployee,
  getAllEmployees,
  updateRole,
  updateByUserId,
  deleteEmployeeById,
};
