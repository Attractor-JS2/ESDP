const Patient = require('../../models/Patient');
const HealingPlan = require('../../models/HealingPlan');

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
  } catch (e) {
    res.sendStatus(500);
  }
};

const findByActiveHealingPlans = async (req, res) => {
  const filter = { statusActive: true };

  try {
    const healingPlans = await HealingPlan.find(filter).populate({
      path: 'primaryAssessment',
      select: 'patient',
      populate: {
        path: 'patient',
        select: 'fullname birthday gender',
      },
      options: { sort: '-fullname' },
    });
    res.send(healingPlans);
  } catch (error) {
    res.sendStatus(500);
  }
};

const patientController = {
  create,
  findAll,
  findByActiveHealingPlans,
};

module.exports = patientController;
