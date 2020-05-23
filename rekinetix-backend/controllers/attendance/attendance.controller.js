const router = require('express').Router();
const db = require('./db/db');

db.init();

const findAll = async (req, res) => {
  const data = db.getData();
  res.send(data);
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
  findAll,
  create,
};

module.exports = attendanceController;
