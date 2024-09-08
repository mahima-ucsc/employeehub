const { Router } = require('express');
const { adminAuthorizationMiddleware } = require('../middlewear');
const {
  createNotice,
  getNotices,
  getNoticesById,
  deleteAllNotices,
  updateNoticesById,
} = require('../controllers/noticeController');

const noticesRouter = Router();

noticesRouter
  .route('/')
  .post(adminAuthorizationMiddleware, createNotice)
  .get(getNotices)
  .delete(adminAuthorizationMiddleware, deleteAllNotices);

noticesRouter.route('/:noticeId').get(getNoticesById);

noticesRouter.route('/:noticeId').patch(updateNoticesById);

module.exports = noticesRouter;
