const Patient = require('../../models/Patient');

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

const patientController = {
  create,
  findAll,
};

module.exports = patientController;
