const router = require('express').Router();

const healingPlanController = require('../controllers/healingPlan/healingPlan.controller');

router.get('/', healingPlanController.findOne);

router.post('/', healingPlanController.create);

router.patch('/procedure', healingPlanController.addProcedures);

router.delete('/procedure', healingPlanController.deleteProcedure);

module.exports = router;
