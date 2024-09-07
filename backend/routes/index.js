const authRouter = require('./auth');
const employeesRouter = require('./employees');
const leavesRouter = require('./leaves');
const noticesRouter = require('./notice');

module.exports = {
  authRouter,
  employeesRouter,
  leavesRouter,
  noticesRouter,
};
