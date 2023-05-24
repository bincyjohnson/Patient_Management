var express = require('express');
var router = express.Router();

const {
  issueConsultationCertificate,
  issueVaccinationCertificate,
} = require('./controller');

router.post('/issue_consultation', issueConsultationCertificate);
router.post('/issue_vaccination', issueVaccinationCertificate);

module.exports = router;
