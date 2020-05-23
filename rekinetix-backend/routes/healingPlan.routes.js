const router = require('express').Router();

const healingPlanController = require('../controllers/healingPlan/healingPlan.controller');

router.get('/', healingPlanController.findByPrimaryAssessment);

router.post('/', healingPlanController.create);

router.patch('/:id', healingPlanController.addProcedure);

router.delete('/procedure/:id', healingPlanController.deleteProcedure);

module.exports = router;
