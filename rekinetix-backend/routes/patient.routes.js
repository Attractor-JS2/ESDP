const router = require('express').Router();

const patientController = require('../controllers/patient/patient.controller');

router.post('/', patientController.create);

router.get('/', patientController.findAll);

module.exports = router;
