const { Router } = require('express');
const {
  employeeController: { register },
} = require('../controllers');
const { getAllEmployees } = require('../controllers/employeeController');
const { adminAuthorizationMiddleware } = require('../middlewear');

const employeesRouter = Router();

employeesRouter.route('/').get(adminAuthorizationMiddleware, getAllEmployees);
employeesRouter.route('/register').post(register);

module.exports = employeesRouter;
