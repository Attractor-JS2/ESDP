const router = require('express').Router();

const primaryAssessmentController = require('../controllers/primaryAssessment/primaryAssessment.controller');

router.post('/', primaryAssessmentController.create);

router.get('/', primaryAssessmentController.findByPatient);

module.exports = router;
