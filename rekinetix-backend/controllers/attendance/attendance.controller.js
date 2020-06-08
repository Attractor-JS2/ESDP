const moment = require('moment');

const Attendance = require('../../models/Attendance');
const Procedure = require('../../models/Procedure');

const {
  getAttendanceData,
  sortProcedureDynamicsByPresence,
  getProcedureFullData,
} = require('./attendance.utilities');

const findByHealingPlan = async (req, res) => {
  const filter = { healingPlan: req.query.healingPlan };

  try {
    const attendancesDocs = await Attendance.find(filter)
      .populate({
        path: 'procedureDynamics.procedure',
        model: 'Procedure',
      })
      .sort({ attendanceDate: 'asc' });
    res.send(attendancesDocs);
  } catch (error) {
    res.sendStatus(500);
  }
};

const findByHealingPlanLatestOne = async (req, res) => {
  const filter = { healingPlan: req.query.healingPlan };

  try {
    const [attendancesDoc] = await Attendance.find(filter)
      .sort({ attendanceDate: 'desc' })
      .populate({
        path: 'procedureDynamics.procedure',
        model: 'Procedure',
      })
      .limit(1);

    if (!attendancesDoc) {
      return res.sendStatus(404);
    }

    return res.send(attendancesDo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const create = async (req, res) => {
  const { body, userId } = req;
  const { procedureDynamics, healingPlan, attendanceDate } = body;

  try {
    const [latestAttendance] = await Attendance.find({
      healingPlan: healingPlan,
    })
      .sort({ attendanceDate: 'desc' })
      .select('attendanceDate')
      .limit(1);
    if (latestAttendance) {
      const isSameDate = moment(attendanceDate).isSame(
        latestAttendance.attendanceDate,
        'day',
      );
      if (isSameDate) {
        return res.sendStatus(400);
      }
    }
  } catch (error) {
    res.sendStatus(500);
  }

  try {
    const {
      dynamicsWithNewProcedures,
      dynamicsWithExistingProcedures,
    } = sortProcedureDynamicsByPresence(procedureDynamics);
    const newProcedures = dynamicsWithNewProcedures.map(({ procedure }) =>
      getProcedureFullData(procedure, healingPlan),
    );

    const newProceduresDocs = await Procedure.create(newProcedures);

    const procedureDynamicsWithIds = dynamicsWithNewProcedures.map(
      (curValue, index) => ({
        ...curValue,
        procedure: newProceduresDocs[index]._id,
      }),
    );
    const procedureDynamicsCorrected = [
      ...procedureDynamicsWithIds,
      ...dynamicsWithExistingProcedures,
    ];
    const attendanceData = getAttendanceData(
      body,
      procedureDynamicsCorrected,
      userId,
    );

    const attendanceDoc = await Attendance.create(attendanceData);
    return res.status(201).send({ id: attendanceDoc.id });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const attendanceController = {
  findByHealingPlan,
  findByHealingPlanLatestOne,
  create,
};

module.exports = attendanceController;
