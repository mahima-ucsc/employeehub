const { Router } = require('express');
const { adminAuthorizationMiddleware } = require('../middlewear');
const {
  createNotice,
  getNotices,
  getNoticesById,
  deleteAllNotices,
  updateNoticesById,
  deleteNoticeById,
} = require('../controllers/noticeController');

const noticesRouter = Router();

noticesRouter
  .route('/')
  .post(adminAuthorizationMiddleware, createNotice)
  .get(getNotices)
  .delete(adminAuthorizationMiddleware, deleteAllNotices);

noticesRouter.route('/:noticeId').get(getNoticesById);

noticesRouter
  .route('/:noticeId')
  .patch(adminAuthorizationMiddleware, updateNoticesById);

noticesRouter
  .route('/:noticeId')
  .delete(adminAuthorizationMiddleware, deleteNoticeById);

module.exports = noticesRouter;
