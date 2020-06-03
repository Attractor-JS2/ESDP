const router = require('express').Router();

const healingPlanController = require('../controllers/healingPlan/healingPlan.controller');

router.get('/', healingPlanController.findByPrimaryAssessment);

router.get('/:id', healingPlanController.findById);

router.post('/', healingPlanController.create);

router.patch('/:id', healingPlanController.addProcedure);

router.patch('/procedure/:procedureId', healingPlanController.editProcedureStatus);

router.delete('/procedure/:id', healingPlanController.deleteProcedure);

module.exports = router;
