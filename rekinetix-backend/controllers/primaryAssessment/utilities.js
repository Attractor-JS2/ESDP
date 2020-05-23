const getAreaDescriptionData = (areaData) => {
  const { D, S, additionalInfo } = areaData;
  return {
    D: D || '',
    S: S || '',
    additionalInfo: additionalInfo || '',
  };
};

const getObjectiveExamData = (requestData) => {
  const {
    foot,
    hip,
    pelvicSpine,
    lumbarSpine,
    thoracicSpine,
    shoulderGirdel,
    headAndNeck,
  } = requestData;

  return {
    foot: getAreaDescriptionData(foot),
    hip: getAreaDescriptionData(hip),
    pelvicSpine: getAreaDescriptionData(pelvicSpine),
    lumbarSpine: getAreaDescriptionData(lumbarSpine),
    thoracicSpine: getAreaDescriptionData(thoracicSpine),
    shoulderGirdel: getAreaDescriptionData(shoulderGirdel),
    headAndNeck: getAreaDescriptionData(headAndNeck),
  };
};

const getPrimaryAssessmentData = (requestData, userId, objectiveExamId) => {
  const {
    patient,
    attendanceDate,
    complaints,
    anamnesisVitae,
    anamnesisMorbi,
    examinations,
    diagnosis,
  } = requestData;

  return {
    attendingDoctor: userId,
    assessmentDate: attendanceDate,
    objectiveExam: objectiveExamId,
    patient,
    complaints,
    anamnesisVitae,
    anamnesisMorbi,
    examinations,
    diagnosis,
  };
};

const utilities = {
  getObjectiveExamData,
  getPrimaryAssessmentData,
};

module.exports = utilities;
