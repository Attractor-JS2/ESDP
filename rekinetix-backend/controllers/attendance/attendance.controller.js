const Attendance = require('../../models/Attendance');
const { getAttendanceData } = require('./utilities');

const findByHealingPlan = async (req, res) => {
  const filter = { healingPlan: req.query.healingPlan };

  try {
    const attendancesDocs = await Attendance.find(filter)
      .populate({
        path: 'procedures.procedure',
        model: 'Procedure',
      })
      .sort({ attendanceDate: 'asc' });
    res.send(attendancesDocs);
  } catch (error) {
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  const { body, userId } = req;

  try {
    const attendanceData = getAttendanceData(body, userId);
    const attendanceDoc = await Attendance.create(attendanceData);
    res.status(201).send({ id: attendanceDoc.id });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const attendanceController = {
  findByHealingPlan,
  create,
};

module.exports = attendanceController;
