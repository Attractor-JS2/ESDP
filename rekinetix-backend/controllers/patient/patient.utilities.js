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

const utilities = { reducePlansToPatients };

module.exports = utilities;
