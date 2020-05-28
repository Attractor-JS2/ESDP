const router = require('express').Router();

const attendanceController = require('../controllers/attendance/attendance.controller');

router.get('/', attendanceController.findByHealingPlan);

// TODO: Add findLastOne

router.post('/', attendanceController.create);

module.exports = router;
