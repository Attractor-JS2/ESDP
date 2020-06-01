const HealingPlan = require('../../models/HealingPlan');
const Procedure = require('../../models/Procedure');
const { getProcedureData } = require('./healingPlan.utilities');

const create = async (req, res) => {
  const { body, userId } = req;
  const { primaryAssessment, procedures } = body;

  try {
    const healingPlanDoc = await HealingPlan.create({
      primaryAssessment: primaryAssessment,
      medic: userId,
    });
    const proceduresData = procedures.map((procedure) =>
      getProcedureData(procedure, healingPlanDoc.id),
    );
    await Procedure.create(...proceduresData);

    res.status(201).send({ id: healingPlanDoc.id });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const findByPrimaryAssessment = async (req, res) => {
  const filter = { primaryAssessment: req.query.primaryAssessment };

  try {
    const healingPlanDoc = await HealingPlan.findOne(filter).populate({
      path: 'medic',
      select: { fullname: 1, _id: 0 },
    });
    if (!healingPlanDoc) {
      return res.sendStatus(404);
    }

    const proceduresFilter = { healingPlan: healingPlanDoc.id };
    const procedureDocs = await Procedure.find(proceduresFilter);

    const resultData = {
      ...healingPlanDoc.toObject(),
      procedures: [...procedureDocs],
    };

    res.send(resultData);
  } catch (error) {
    res.sendStatus(500);
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const healingPlanDoc = await HealingPlan.findById(id).populate({
      path: 'medic',
      select: { fullname: 1, _id: 0 },
    }).exec();
    if (!healingPlanDoc) {
      return res.sendStatus(404);
    }

    const proceduresFilter = { healingPlan: healingPlanDoc.id };
    const procedureDocs = await Procedure.find(proceduresFilter);

    const resultData = {
      ...healingPlanDoc.toObject(),
      procedures: [...procedureDocs],
    };

    res.send(resultData);
  } catch (error) {
    res.sendStatus(500);
  }
};

const addProcedure = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  try {
    const procedureData = getProcedureData(body, id);
    const procedureDoc = await Procedure.create(procedureData);
    return res.status(201).send({ id: procedureDoc.id });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const editProcedureStatus = async (req, res) => {
  const { body, params } = req;
  const { procedureId } = params;
  const { status } = body;

  try {
    const procedureDoc = await Procedure.findById(procedureId);
    if (!procedureDoc) return res.sendStatus(404);

    procedureDoc.status = status;
    await procedureDoc.save();
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deleteProcedure = async (req, res) => {
  const { id } = req.params;

  try {
    const procedureDoc = await Procedure.findById(id);
    if (procedureDoc && procedureDoc.status === 'запланировано') {
      await procedureDoc.remove();
      return res.sendStatus(204);
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

const healingPlanController = {
  create,
  findByPrimaryAssessment,
  findById,
  addProcedure,
  editProcedureStatus,
  deleteProcedure,
};

module.exports = healingPlanController;
