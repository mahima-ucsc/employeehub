const { Router } = require('express');
const { createLeave,getAllLeaves } = require('../controllers/leaveController');
const {
  adminOrSelfAuthorizationMiddleware, adminAuthorizationMiddleware,
} = require('../middlewear/authMiddleware');

const leavesRouter = new Router();

leavesRouter
  .route('/:userId')
  .post(adminOrSelfAuthorizationMiddleware, createLeave);

leavesRouter
  .route('/')
  .get( adminAuthorizationMiddleware, getAllLeaves);


module.exports = leavesRouter;


