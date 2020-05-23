const getProcedureDynamicsData = (dynamicsData) => {
  const data = { ...dynamicsData };
  const { procedure, procedureDynamic } = data;

  return {
    procedure: procedure,
    procedureDynamic: procedureDynamic,
  };
};

const getProceduresData = (proceduresData) => {
  return proceduresData.map((procedure) => getProcedureDynamicsData(procedure));
};

const getPainData = (painData) => {
  const { comments, pain } = painData;

  return {
    comments: comments,
    pain: pain,
  };
};

const getAttendanceData = (requestData, userId, healingPlanId) => {
  const {
    healingPlan,
    attendanceDate,
    patientDynamic,
    beforeAttendance,
    afterAttendance,
    procedures,
  } = requestData;

  return {
    healingPlan: healingPlan || healingPlanId,
    medic: userId,
    attendanceDate: attendanceDate,
    patientDynamic: patientDynamic,
    procedures: getProceduresData(procedures),
    beforeAttendance: getPainData(beforeAttendance),
    afterAttendance: getPainData(afterAttendance),
  };
};

const utilities = {
  getAttendanceData,
};

module.exports = utilities;
