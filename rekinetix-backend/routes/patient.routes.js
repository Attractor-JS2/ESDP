const router = require('express').Router();

const patientController = require('../controllers/patient/patient.controller');

router.post('/', patientController.create);

router.get('/', (req, res) => {
  if (req.query && !!req.query.active) {
    patientController.findByActiveHealingPlans(req, res);
  } else {
    patientController.findAll(req, res);
  }
});

module.exports = router;
