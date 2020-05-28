const getPatientData = (data) => ({
  fullname: data.fullname,
  birthday: data.birthday,
  gender: data.gender,
  height: data.height,
  weight: data.weight,
  phone: data.phone,
  address: data.address,
});

const reducePlansToPatients = (planDocs) => {
  return planDocs.reduce((acc, planDoc) => {
    plan = planDoc.toObject();
    const { primaryAssessment } = plan;
    const { patient } = primaryAssessment;
    const modifiedPatient = {
      ...patient,
      primaryAssessment: primaryAssessment._id,
      healingPlan: plan._id,
    };
    acc.push(modifiedPatient);
    return acc;
  }, []);
};

const utilities = { getPatientData, reducePlansToPatients };

module.exports = utilities;
