const Patient = require('../../models/Patient');
const HealingPlan = require('../../models/HealingPlan');
const RedFlag = require('../../models/RedFlag');
const PrimaryAssessment = require('../../models/PrimaryAssessment/PrimaryAssessment');

const {
  getPatientData,
  reducePlansToPatients,
} = require('./patient.utilities');

const create = async (req, res) => {
  const { body } = req;

  try {
    const patientData = getPatientData(body);
    const patient = await Patient.create(patientData);
    res.send(await patient.save());
  } catch (error) {
    res.sendStatus(400);
  }
};

const findAll = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.send(patients);
  } catch (error) {
    res.sendStatus(500);
  }
};

const findByActiveHealingPlans = async (req, res) => {
  const filter = { statusActive: true };

  try {
    const healingPlanDocs = await HealingPlan.find(filter).populate({
      path: 'primaryAssessment',
      select: 'patient',
      populate: {
        path: 'patient',
        select: 'fullname birthday gender',
      },
    });
    const patients = reducePlansToPatients(healingPlanDocs);
    res.send(patients);
  } catch (error) {
    res.sendStatus(500);
  }
};

const findById = async (req, res) => {
  const patientId = req.params.id;
  const filter = { patient: patientId };

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.sendStatus(404);
    }

    const redFlags = await RedFlag.find(filter);
    const latestPrimaryAssessment = await PrimaryAssessment.findOne(filter)
      .sort({ assessmentDate: 'desc' })
      .select('assessmentDate diagnosis');
    if (latestPrimaryAssessment) {
      const healingPlan = await HealingPlan.findOne({
        primaryAssessment: latestPrimaryAssessment._id,
      });
      const result = {
        patient,
        redFlags,
        primaryAssessment: latestPrimaryAssessment,
        healingPlan: healingPlan,
      };
      return res.send(result);
    } else {
      const result = {
        patient,
        redFlags,
        primaryAssessment: {},
        healingPlan: {},
      };
      return res.send(result);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

const patientController = {
  create,
  findAll,
  findByActiveHealingPlans,
  findById,
};

module.exports = patientController;
