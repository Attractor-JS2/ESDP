const getStageProcedureDynamics = (procedures, stageNumber) => {
  if (procedures && procedures.length > 0) {
    return procedures
      .filter(
        ({ procedureArea, procedureName }) => procedureArea && procedureName,
      )
      .map(({ procedureDynamic, ...rest }) => ({
        procedureDynamic,
        procedure: {
          ...rest,
          stage: stageNumber,
        },
      }));
  } else {
    return [];
  }
};

const getProcedureDynamics = (formData) => {
  const {
    firstStage,
    secondStage,
    thirdStage,
    fourthStage,
    fifthStage,
  } = formData;

  return [
    ...getStageProcedureDynamics(firstStage, 1),
    ...getStageProcedureDynamics(secondStage, 2),
    ...getStageProcedureDynamics(thirdStage, 3),
    ...getStageProcedureDynamics(fourthStage, 4),
    ...getStageProcedureDynamics(fifthStage, 5),
  ];
};

const getAttendance = (formData, healingPlanId) => {
  const {
    attendanceDate,
    patientDynamic,
    beforeAttendance,
    afterAttendance,
  } = formData;

  return {
    healingPlan: healingPlanId,
    procedureDynamics: getProcedureDynamics(formData),
    attendanceDate,
    patientDynamic,
    beforeAttendance,
    afterAttendance,
  };
};

const attendanceUtilities = {
  getAttendance,
};

export default attendanceUtilities;
