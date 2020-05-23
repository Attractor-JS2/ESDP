const router = require('express').Router();
const db = require('./db/db');

db.init();

const findOne = (req, res) => {
  const data = db.getData();
  res.send(data);
};

const create = (req, res) => {
  const healingPlan = req.body.healingPlan;
  const {
    firstStage,
    secondStage,
    thirdStage,
    fourthStage,
    fifthStage,
  } = healingPlan;
  const healingPlanWithStatuses = {
    firstStage: [
      ...firstStage.map((procedure) => ({
        ...procedure,
        status: procedure.status || 'запланировано',
      })),
    ],
    secondStage: [
      ...secondStage.map((procedure) => ({
        ...procedure,
        status: procedure.status || 'запланировано',
      })),
    ],
    thirdStage: [
      ...thirdStage.map((procedure) => ({
        ...procedure,
        status: procedure.status || 'запланировано',
      })),
    ],
    fourthStage: [
      ...fourthStage.map((procedure) => ({
        ...procedure,
        status: procedure.status || 'запланировано',
      })),
    ],
    fifthStage: [
      ...fifthStage.map((procedure) => ({
        ...procedure,
        status: procedure.status || 'запланировано',
      })),
    ],
  };
  try {
    db.addItem(healingPlanWithStatuses);
  } catch (e) {
    return res.sendStatus(500);
  }
  res.status(200).send(`successfully added`);
};

const addProcedures = (req, res) => {
  const { stage, procedureName, procedureArea } = req.body;
  try {
    db.addProcedure(stage, {
      procedureArea,
      procedureName,
      status: 'запланировано',
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteProcedure = (req, res) => {
  if (req.query && req.query.stage && req.query.procedureName) {
    const { stage, procedureName } = req.query;
    try {
      db.deleteProcedure(stage, procedureName);
      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(500);
    }
  }
};

const healingPlanController = {
  findOne,
  create,
  addProcedures,
  deleteProcedure,
};

module.exports = healingPlanController;
