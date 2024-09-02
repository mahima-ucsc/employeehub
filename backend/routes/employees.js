const { Router } = require('express');
const {
  employeeController: { register },
} = require('../controllers');
const {
  getAllEmployees,
  getEmployee,
  updateRole,
  updateByUserId,
} = require('../controllers/employeeController');
const { adminAuthorizationMiddleware } = require('../middlewear');
const {
  adminOrSelfAuthorizationMiddleware,
  authenticationMidddleware,
} = require('../middlewear/authMiddleware');

const employeesRouter = Router();

employeesRouter
  .route('/')
  .get(
    authenticationMidddleware,
    adminAuthorizationMiddleware,
    getAllEmployees,
  );

employeesRouter.route('/register').post(register);
employeesRouter
  .route('/:userId')
  .get(
    authenticationMidddleware,
    adminOrSelfAuthorizationMiddleware,
    getEmployee,
  );
employeesRouter
  .route('/:userId')
  .patch(
    authenticationMidddleware,
    adminOrSelfAuthorizationMiddleware,
    updateByUserId,
  );
employeesRouter
  .route('/:userId/role')
  .patch(authenticationMidddleware, adminAuthorizationMiddleware, updateRole);

module.exports = employeesRouter;
