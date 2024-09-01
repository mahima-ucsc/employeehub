const { Router } = require('express');
const {
  employeeController: { register },
} = require('../controllers');
const {
  getAllEmployees,
  getEmployee,
  updateRole,
} = require('../controllers/employeeController');
const { adminAuthorizationMiddleware } = require('../middlewear');
const {
  adminOrSelfAuthorizationMiddleware,
} = require('../middlewear/authMiddleware');

const employeesRouter = Router();

employeesRouter.route('/').get(adminAuthorizationMiddleware, getAllEmployees);
employeesRouter.route('/register').post(register);
employeesRouter
  .route('/:userId')
  .get(adminOrSelfAuthorizationMiddleware, getEmployee);
employeesRouter
  .route('/:userId/role')
  .patch(adminAuthorizationMiddleware, updateRole);

module.exports = employeesRouter;
