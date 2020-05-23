const getProcedureData = (data, healingPlanId) => {
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
    healingPlan: healingPlan || healingPlanId,
    comments: comments || '',
    status: status,
    stage: stage,
    procedureArea: procedureArea,
    procedureName: procedureName,
    procedureQuantity: procedureQuantity,
  };
};

const utilities = {
  getProcedureData,
};

module.exports = utilities;
