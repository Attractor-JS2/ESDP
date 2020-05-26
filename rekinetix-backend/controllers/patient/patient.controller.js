const Patient = require('../../models/Patient');
const HealingPlan = require('../../models/HealingPlan');
const RedFlag = require('../../models/RedFlag');
const PrimaryAssessment = require('../../models/PrimaryAssessment/PrimaryAssessment');

const { reducePlansToPatients } = require('./patient.utilities');

const getPatientData = (data) => ({
  fullname: data.fullname,
  birthday: data.birthday,
  gender: data.gender,
  height: data.height,
  weight: data.weight,
  phone: data.phone,
  address: data.address,
});

const create = async (req, res) => {
  const { body } = req;
  const patientData = getPatientData(body);
  const patient = new Patient(patientData);

  try {
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

    const redFlags = await RedFlag.find(filter);
    const latestPrimaryAssessment = await PrimaryAssessment.findOne(
      filter,
    ).sort({ assessmentDate: 'asc' }).select('assessmentDate diagnosis');
    const result = {
      patient,
      redFlags,
      primaryAssessment: latestPrimaryAssessment,
    };
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const patientController = {
  create,
  findAll,
  findByActiveHealingPlans,
  findById,
};

module.exports = patientController;
