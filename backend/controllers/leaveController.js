const { StatusCodes } = require('http-status-codes');
const { leaveStatus } = require('../constants');
const Leave = require('../models/Leave');
const { default: mongoose } = require('mongoose');
const { NotFoundError } = require('../errors');
const { Employee } = require('../models');

const createLeave = async (req, res) => {
  const { startDate, endDate, description } = req.body;

  await Leave.create({
    startDate: startDate,
    endDate: endDate,
    description: description,
    employee: req.params.userId,
    status: leaveStatus.pending,
  });

  res.status(StatusCodes.CREATED).json({
    userId: req.params.userId,
    startDate,
    endDate,
    description,
  });
};

const getAllLeaves = async (req, res) => {
  let results = await Leave.find();

  let leaves = await Promise.all(
    results.map(async (leave) => {
      let user = await Employee.findOne({ _id: leave.employee });
      return {
        leaveId: leave._id,
        startDate: leave.startDate,
        endDate: leave.endDate,
        description: leave.description,
        status: leave.status,
        employeeId: leave.employee,
        employeeName: `${user.firstName} ${user.lastName}`,
      };
    }),
  );

  res.status(StatusCodes.OK).json(leaves);
};

const getLeavesByEmployeeId = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId))
    throw new NotFoundError('Invalid user id.');

  let results = await Leave.find({
    employee: req.params.userId,
  });

  let leaves = await Promise.all(
    results.map(async (leave) => {
      let user = await Employee.findOne({ _id: leave.employee });
      return {
        leaveId: leave._id,
        startDate: leave.startDate,
        endDate: leave.endDate,
        description: leave.description,
        status: leave.status,
        employeeId: leave.employee,
        employeeName: `${user.firstName} ${user.lastName}`,
      };
    }),
  );
  res.status(StatusCodes.OK).json(leaves);
};

const getLeaveByEmployeeId = async (req, res) => {
  if (
    !mongoose.Types.ObjectId.isValid(req.params.userId) &&
    !mongoose.Types.ObjectId.isValid(req.params.leaveId)
  )
    throw new NotFoundError('Invalid user id or leaveId.');
  let leave = await Leave.findOne({
    _id: req.params.leaveId,
    employee: req.params.userId,
  });

  if (!leave) throw new NotFoundError('Leave not found for this user');

  res.status(StatusCodes.OK).json(leave);
};

const updateLeaveDateById = async (req, res) => {
  if (
    !mongoose.Types.ObjectId.isValid(req.params.userId) &&
    !mongoose.Types.ObjectId.isValid(req.params.leaveId)
  )
    throw new NotFoundError('Invalid user id or leaveId.');
  let leave = await Leave.findOne({
    _id: req.params.leaveId,
    employee: req.params.userId,
  });

  if (!leave) throw new NotFoundError('Leave not found for this user');

  leave.startDate = req.body.startDate || leave.startDate;
  leave.endDate = req.body.endDate || leave.endDate;
  leave.description = req.body.description || leave.description;

  await leave.save();
  res.status(StatusCodes.OK).send();
};

const updateLeaveStatusById = async (req, res) => {
  if (
    !mongoose.Types.ObjectId.isValid(req.params.userId) &&
    !mongoose.Types.ObjectId.isValid(req.params.leaveId)
  )
    throw new NotFoundError('Invalid user id or leaveId.');
  let leave = await Leave.findOne({
    _id: req.params.leaveId,
    employee: req.params.userId,
  });

  if (!leave) throw new NotFoundError('Leave not found for this user');

  leave.status = req.params.status;

  await leave.save();
  res.status(StatusCodes.OK).send();
};

const deleteLeaveById = async (req, res) => {
  if (
    !mongoose.Types.ObjectId.isValid(req.params.userId) &&
    !mongoose.Types.ObjectId.isValid(req.params.leaveId)
  )
    throw new NotFoundError('Invalid user id or leaveId.');
  let leave = await Leave.findByIdAndDelete({
    _id: req.params.leaveId,
    employee: req.params.userId,
  });

  if (!leave) throw new NotFoundError('Leave not found for this user.');

  res.status(StatusCodes.ACCEPTED).json({
    msg: 'leave deleted.',
  });
};

module.exports = {
  createLeave,
  getAllLeaves,
  updateLeaveDateById,
  getLeavesById: getLeavesByEmployeeId,
  updateLeaveStatusById,
  getLeaveByEmployeeId,
  deleteLeaveById,
};
