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

module.exports = {
  createNotice,
};
