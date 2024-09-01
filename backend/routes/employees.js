const { Router } = require('express');
const {
  employeeController: { register },
} = require('../controllers');
const {
  getAllEmployees,
  getEmployee,
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

module.exports = employeesRouter;
