var express = require('express');
var router = express.Router();

router.use('/auth', require('../api/auth'));
router.use('/appointment', require('../api/appointment_management'));
router.use('/certificate', require('../api/certificate_management'));
router.use('/contact', require('../api/contact_management'));

// router.use('/*', [require('../middleware/auth'), syllabusRoutes]);
module.exports = router;
