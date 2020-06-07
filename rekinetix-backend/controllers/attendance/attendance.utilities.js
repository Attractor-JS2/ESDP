const sortProcedureDynamicsByPresence = (procedureDynamics) => {
  return procedureDynamics.reduce(
    (acc, curValue) => {
      const { procedure } = curValue;
      if (procedure.procedureIsNew || !procedure._id) {
        acc.dynamicsWithNewProcedures.push(curValue);
      } else {
        acc.dynamicsWithExistingProcedures.push(curValue);
      }
      return acc;
    },
    { dynamicsWithNewProcedures: [], dynamicsWithExistingProcedures: [] },
  );
};

const getProcedureFullData = (procedure, healingPlanId) => {
  const {
    stage,
    procedureArea,
    procedureName,
    comments,
    status,
    procedureQuantity,
    healingPlan,
  } = procedure;

  return {
    stage: stage,
    procedureArea: procedureArea,
    procedureName: procedureName,
    comments: comments,
    status: status || 'действует',
    procedureQuantity: procedureQuantity,
    healingPlan: healingPlanId || healingPlan,
  };
};

const getProcedureDynamicData = (dynamicsData) => {
  const data = { ...dynamicsData };
  const { procedure, procedureDynamic } = data;

  return {
    procedure: procedure._id,
    procedureDynamic: procedureDynamic,
  };
};

const getProceduresDynamicsData = (proceduresDynamics) => {
  return proceduresDynamics.map((procedureDynamic) =>
    getProcedureDynamicData(procedureDynamic),
  );
};

const getPainData = (painData) => {
  const { comments, pain } = painData;

  return {
    comments: comments,
    pain: pain,
  };
};

const getAttendanceData = (requestData, procedureDynamics, userId, healingPlanId) => {
  const {
    healingPlan,
    attendanceDate,
    patientDynamic,
    beforeAttendance,
    afterAttendance,
  } = requestData;

  return {
    healingPlan: healingPlan || healingPlanId,
    medic: userId,
    attendanceDate: attendanceDate,
    patientDynamic: patientDynamic,
    procedureDynamics: getProceduresDynamicsData(procedureDynamics),
    beforeAttendance: getPainData(beforeAttendance),
    afterAttendance: getPainData(afterAttendance),
  };
};

const utilities = {
  getAttendanceData,
  sortProcedureDynamicsByPresence,
  getProcedureFullData,
};

module.exports = utilities;
