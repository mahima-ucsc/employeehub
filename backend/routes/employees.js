const { Router } = require('express');
const {
  employeeController: { register },
} = require('../controllers');

const router = Router();

router.route('/register').post(register);

module.exports = router;
