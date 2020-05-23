const router = require('express').Router();

const primaryAssessmentController = require('../controllers/primaryAssessment/primaryAssessment.controller');

router.post('/', primaryAssessmentController.create);

module.exports = router;
