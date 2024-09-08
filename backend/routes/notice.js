const { Router } = require('express');
const { adminAuthorizationMiddleware } = require('../middlewear');
const {
  createNotice,
  getNotices,
  getNoticesById,
} = require('../controllers/noticeController');

const noticesRouter = Router();

noticesRouter
  .route('/')
  .post(adminAuthorizationMiddleware, createNotice)
  .get(getNotices);

noticesRouter.route('/:noticeId').get(getNoticesById);

module.exports = noticesRouter;
``;
