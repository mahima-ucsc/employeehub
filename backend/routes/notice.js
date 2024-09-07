const { Router } = require('express');
const { adminAuthorizationMiddleware } = require('../middlewear');
const { createNotice } = require('../controllers/noticeController');

const noticesRouter = Router();

noticesRouter.route('/').post(adminAuthorizationMiddleware, createNotice);

module.exports = noticesRouter;
