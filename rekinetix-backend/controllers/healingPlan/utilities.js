const getProcedureData = (data, patientId, userId, healingPlanId) => {
  const {
    stage,
    procedureArea,
    procedureName,
    comments,
    status,
    procedureQuantity,
    healingPlan,
  } = data;

  return {
    medic: userId,
    patient: patientId,
    healingPlan: healingPlan || healingPlanId,
    comments: comments || '',
    status: status,
    stage,
    procedureArea,
    procedureName,
    procedureQuantity,
  };
};

const utilities = {
  getProcedureData,
};

module.exports = utilities;
