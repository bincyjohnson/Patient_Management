var express = require('express');
var router = express.Router();

const { registerPatient } = require('./validate');
const { createUser, login, contacUs } = require('./controller');

router.post('/signup', registerPatient, createUser);
router.route('/login').post(login);
router.post('/contactus', contacUs);

module.exports = router;
