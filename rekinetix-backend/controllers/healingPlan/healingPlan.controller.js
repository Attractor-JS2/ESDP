const HealingPlan = require('../../models/HealingPlan');
const Procedure = require('../../models/Procedure');
const { getProcedureData } = require('./utilities');

const db = require('./db/db');

db.init();

const findByPrimaryAssessment = async (req, res) => {
  const filter = { primaryAssessment: req.query.primaryAssessment };

  try {
    const healingPlanDoc = await HealingPlan.findOne(filter);
    const proceduresFilter = { healingPlan: healingPlanDoc.id };
    const procedureDocs = await Procedure.find(proceduresFilter);

    const resultData = {
      ...healingPlanDoc.toObject(),
      procedures: [...procedureDocs],
    }

    res.send(resultData);
  } catch (error) {
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  const { body, userId } = req;
  const { primaryAssessment, patient, procedures } = body;

  try {
    const healingPlanDoc = await HealingPlan.create({
      primaryAssessment: primaryAssessment,
      medic: userId,
    });
    const proceduresData = procedures.map((procedure) =>
      getProcedureData(procedure, patient, userId, healingPlanDoc.id),
    );
    await Procedure.create(...proceduresData);

    res.status(201).send({ id: healingPlanDoc.id });
  } catch (error) {
    return res.sendStatus(500);
  }
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
  findByPrimaryAssessment,
  create,
  addProcedures,
  deleteProcedure,
};

module.exports = healingPlanController;
