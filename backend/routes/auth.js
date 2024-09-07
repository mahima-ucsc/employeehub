const { Router } = require('express');
const {
  authController: { login },
} = require('../controllers');
const { logout } = require('../controllers/authController');

const authRouter = Router();

authRouter.route('/login').post(login);
authRouter.route('/logout').get(logout);

module.exports = authRouter;
