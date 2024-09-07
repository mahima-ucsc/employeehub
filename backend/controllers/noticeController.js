const { StatusCodes } = require('http-status-codes');
const { Notice } = require('../models');

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

module.exports = {
  createNotice,
  getNotices,
};
