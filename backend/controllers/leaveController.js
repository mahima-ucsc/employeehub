const { StatusCodes } = require('http-status-codes');
const { leaveStatus } = require('../constants');
const Leave = require('../models/Leave');
const { default: mongoose } = require('mongoose');

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
  if (!results || results.length === 0) {
    return res
      .stats(StatusCodes.NOT_FOUND)
      .json({ message: 'no leaves found.' });
  }
  let leaves = results.map((leave) => ({
    leaveId: leave._id,
    startDate: leave.startDate,
    endDate: leave.endDate,
    description: leave.description,
    status: leave.status,
    employee: leave.employee,
  }));

  res.status(StatusCodes.OK).json(leaves);
};

const updateLeaveDateById = async (req, res) => {
  if (
    !mongoose.Types.ObjectId.isValid(req.params.userId) &&
    !mongoose.Types.ObjectId.isValid(req.params.leaveId)
  )
    throw new NotFoundError('Invalid user id or leaveId.');
  let user = await Leave.findOne({
    _id: req.params.leaveId,
    employee: req.params.userId,
  });

  if (!user) throw new NotFoundError('Invalid user id or leaveId');

  user.startDate = req.body.startDate || user.startDate;
  user.endDate = req.body.endDate || user.endDate;

  await user.save();
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createLeave,
  getAllLeaves,
  updateLeaveDateById,
};
