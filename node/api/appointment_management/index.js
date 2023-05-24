var express = require('express');
var router = express.Router();

const {
  getAllHospital,
  getAllDepartment,
  getDoctor,
  getAvailTime,
  bookConsultation,
  getVaccine,
  bookVaccine,
  getAllConsultation,
  getAllVaccination,
  listAllVaccination,
  listAllConsultation,
  viewConsultation,
  viewVaccination,
} = require('./controller');

// get initial values
router.get('/hospitals', getAllHospital);
router.get('/department', getAllDepartment);
router.get('/vaccine', getVaccine);
router.post('/doctor', getDoctor);
router.post('/availtime', getAvailTime);

// booking
router.post('/register_consultation', bookConsultation);
router.post('/register_vaccine', bookVaccine);

// patient listing
router.get('/list_consultation', getAllConsultation);
router.get('/list_vaccination', getAllVaccination);

// admin listing
router.get('/list_all_consultation', listAllConsultation);
router.get('/list_all_vaccination', listAllVaccination);

// admin view
router.get('/view_consult/:id', viewConsultation);
router.get('/view_vaccine/:id', viewVaccination);

module.exports = router;
