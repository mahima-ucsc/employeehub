const { StatusCodes } = require('http-status-codes');
const { leaveStatus } = require('../constants');
const Leave = require('../models/Leave');

const createLeave = async (req, res) => {
  const { startDate, endDate, description } = req.body;

  await Leave.create({
    startDate: startDate,
    endDate: endDate,
    description: description,
    employee: req.user.userId,
    status: leaveStatus.pending,
  });

  res.status(StatusCodes.CREATED).json({
    userId: req.user.userId,
    startDate,
    endDate,
    description,
  });
};

const getAllLeaves = async (req, res) => {
  let results = await Leave.find();
  if(!results || results.length === 0 ){
    return res
    .stats(StatusCodes.NOT_FOUND)
    .json({message : "no leaves found."})
  }
  let leaves = results.map((leave) => ({
    leaveId: leave._id,
    startDate: leave.startDate,
    endDate: leave.endDate,
    description:leave.description,
    status:leave.status,
    employee:leave.employee,
  }));

  res.status(StatusCodes.OK).json(leaves);
};

module.exports = {
  createLeave,
  getAllLeaves
};
