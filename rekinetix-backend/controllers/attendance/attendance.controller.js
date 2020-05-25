const Attendance = require('../../models/Attendance');
const Procedure = require('../../models/Procedure');

const {
  getAttendanceData,
  sortProcedureDynamicsByPresence,
  getProcedureFullData,
} = require('./utilities');

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
  const { procedureDynamics, healingPlan } = body;

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
    res.status(201).send({ id: attendanceDoc.id });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const attendanceController = {
  findByHealingPlan,
  create,
};

module.exports = attendanceController;
