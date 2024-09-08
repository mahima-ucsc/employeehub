const { StatusCodes } = require('http-status-codes');
const { Notice } = require('../models');
const { default: mongoose } = require('mongoose');
const { NotFoundError } = require('../errors');

const createNotice = async (req, res) => {
  const { title, description } = req.body;

  const notice = await Notice.create({
    title,
    description,
  });

  res.status(StatusCodes.CREATED).json({
    title: notice.title,
    description: notice.description,
  });
};
const getNotices = async (req, res) => {
  let results = await Notice.find();
  let notices = results.map((notice) => ({
    title: notice.title,
    description: notice.description,
    id: notice._id,
  }));

  res.status(StatusCodes.OK).json(notices);
};

const getNoticesById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.noticeId))
    throw new NotFoundError('Invalid notice id.');

  let result = await Notice.findOne({
    _id: req.params.noticeId,
  });

  if (!result) throw new NotFoundError('Notice not found.');

  let notice = {
    title: result.title,
    description: result.description,
    id: result._id,
  };

  res.status(StatusCodes.OK).json(notice);
};

const deleteAllNotices = async (req, res) => {
  if ((await Notice.countDocuments()) === 0) {
    throw new NotFoundError('No notices found to delete.');
  }

  await Notice.deleteMany();

  res
    .status(StatusCodes.OK)
    .json({ message: 'All notices have been deleted.' });
};

const updateNoticesById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.noticeId))
    throw new NotFoundError('Invalid notice id.');
  let notice = await Notice.findOne({
    _id: req.params.noticeId,
  });

  if (!notice) throw new NotFoundError('Invalid user id.');

  notice.title = req.body.title || notice.title;
  notice.description = req.body.description || notice.description;

  const result = await notice.save();
  res.status(StatusCodes.OK).json({
    title: result.title,
    description: result.description,
    id: result._id,
  });
};

module.exports = {
  createNotice,
  getNotices,
  getNoticesById,
  deleteAllNotices,
  updateNoticesById,
};
