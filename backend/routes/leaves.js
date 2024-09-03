const { Router } = require('express');
const {
  createLeave,
  getAllLeaves,
  getLeavesById,
  updateLeaveDateById,
  deleteLeaveById,
} = require('../controllers/leaveController');
const {
  adminOrSelfAuthorizationMiddleware,
  adminAuthorizationMiddleware,
} = require('../middlewear/authMiddleware');

const leavesRouter = new Router();

leavesRouter
  .route('/:userId')
  .post(adminOrSelfAuthorizationMiddleware, createLeave);

leavesRouter
  .route('/:userId')
  .get(adminOrSelfAuthorizationMiddleware, getLeavesById);

leavesRouter.route('/').get(adminAuthorizationMiddleware, getAllLeaves);

leavesRouter
  .route('/:userId/:leaveId')
  .patch(adminOrSelfAuthorizationMiddleware, updateLeaveDateById);

leavesRouter
  .route('/:userId/:leaveId')
  .delete(adminOrSelfAuthorizationMiddleware, deleteLeaveById);

module.exports = leavesRouter;
