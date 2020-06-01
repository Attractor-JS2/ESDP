const router = require('express').Router();

const attendanceController = require('../controllers/attendance/attendance.controller');

router.get('/', (req, res) => {
  const { query } = req;
  if (query.healingPlan && !query.latest) {
    attendanceController.findByHealingPlan(req, res);
  } else if (query.healingPlan && !!query.latest) {
    attendanceController.findByHealingPlanLatestOne(req, res);
  }
});

router.post('/', attendanceController.create);

module.exports = router;
