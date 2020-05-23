const getProcedureData = (data, patientId, userId, healingPlanId) => {
  const {
    stage,
    procedureArea,
    procedureName,
    procedureQuantity,
    healingPlan,
  } = data;

  return {
    medic: userId,
    patient: patientId,
    healingPlan: healingPlan || healingPlanId,
    stage,
    procedureArea,
    procedureName,
    comments,
    status,
    procedureQuantity,
  };
};

const utilities = {
  getProcedureData,
};

module.exports = utilities;
