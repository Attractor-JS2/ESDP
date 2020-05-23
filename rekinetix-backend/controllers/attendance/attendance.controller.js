const router = require('express').Router();

const Attendance = require('../../models/Attendance');

const db = require('./db/db');

db.init();

const findByHealingPlan = async (req, res) => {
  const filter = { healingPlan: req.query.healingPlan };

  try {
    const attendancesDocs = await Attendance.find(filter).populate({
      path: 'procedures.procedure',
      model: 'Procedure',
    });
    res.send(attendancesDocs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  const attendanceData = req.body.attendanceData;
  const {
    attendanceDate,
    patientName,
    medicName,
    firstStage,
    secondStage,
    thirdStage,
    fourthStage,
    fifthStage,
    patientDynamic,
    beforeAttendance,
    afterAttendance,
  } = attendanceData;
  const attendanceDataWithoutNew = {
    attendanceDate: attendanceDate,
    patientName: patientName,
    medicName: medicName,
    firstStage: [
      ...firstStage.map((attendanceData) => ({
        ...attendanceData,
        procedureIsNew: false,
      })),
    ],
    secondStage: [
      ...secondStage.map((attendanceData) => ({
        ...attendanceData,
        procedureIsNew: false,
      })),
    ],
    thirdStage: [
      ...thirdStage.map((attendanceData) => ({
        ...attendanceData,
        procedureIsNew: false,
      })),
    ],
    fourthStage: [
      ...fourthStage.map((attendanceData) => ({
        ...attendanceData,
        procedureIsNew: false,
      })),
    ],
    fifthStage: [
      ...fifthStage.map((attendanceData) => ({
        ...attendanceData,
        procedureIsNew: false,
      })),
    ],
    patientDynamic: patientDynamic,
    beforeAttendance: beforeAttendance,
    afterAttendance: afterAttendance,
  };
  try {
    db.addItem(attendanceDataWithoutNew);
  } catch (e) {
    return res.sendStatus(500);
  }
  res.status(200).send(`successfully added`);
};

const attendanceController = {
  findByHealingPlan,
  create,
};

module.exports = attendanceController;
