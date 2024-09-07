const { Router } = require('express');
const { adminAuthorizationMiddleware } = require('../middlewear');
const { createNotice, getNotices } = require('../controllers/noticeController');

const noticesRouter = Router();

noticesRouter
  .route('/')
  .post(adminAuthorizationMiddleware, createNotice)
  .get(getNotices);

module.exports = noticesRouter;
