const { Router } = require('express');
const {
  employeeController: { register },
} = require('../controllers');

const employeesRouter = Router();

employeesRouter.route('/register').post(register);

module.exports = employeesRouter;
