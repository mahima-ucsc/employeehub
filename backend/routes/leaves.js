const { Router } = require('express');
const { createLeave } = require('../controllers/leaveController');
const {
  adminOrSelfAuthorizationMiddleware,
} = require('../middlewear/authMiddleware');

const leavesRouter = new Router();

leavesRouter
  .route('/:userId')
  .post(adminOrSelfAuthorizationMiddleware, createLeave);

module.exports = leavesRouter;
