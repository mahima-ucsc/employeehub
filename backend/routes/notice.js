const { Router } = require('express');
const { adminAuthorizationMiddleware } = require('../middlewear');
const {
  createNotice,
  getNotices,
  getNoticesById,
  deleteAllNotices,
} = require('../controllers/noticeController');

const noticesRouter = Router();

noticesRouter
  .route('/')
  .post(adminAuthorizationMiddleware, createNotice)
  .get(getNotices)
  .delete(deleteAllNotices);

noticesRouter.route('/:noticeId').get(getNoticesById);

module.exports = noticesRouter;
