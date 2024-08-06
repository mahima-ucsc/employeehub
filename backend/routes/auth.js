const { Router } = require('express');
const {
  authController: { login },
} = require('../controllers');

const authRouter = Router();

authRouter.route('/login').post(login);

module.exports = authRouter;
