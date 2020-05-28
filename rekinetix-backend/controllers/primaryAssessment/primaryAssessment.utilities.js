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
    complaints,
    anamnesisVitae,
    anamnesisMorbi,
    examinations,
    diagnosis,
  } = requestData;

  return {
    attendingDoctor: userId,
    objectiveExam: objectiveExamId,
    patient: patient,
    complaints: complaints,
    anamnesisVitae: anamnesisVitae,
    anamnesisMorbi: anamnesisMorbi,
    examinations: examinations,
    diagnosis: diagnosis,
  };
};

const getNewRedFlagData = (redFlagName, userId, patientId) => {
  return {
    title: redFlagName,
    patient: patientId,
    createdBy: userId,
  };
};

const getRedFlagsData = (redFlagNames, userId, patientId) => {
  if (redFlagNames.length > 1) {
    return redFlagNames.map((curFlagName) => {
      return getNewRedFlagData(curFlagName, userId, patientId);
    });
  } else {
    return getNewRedFlagData(redFlagNames[0], userId, patientId);
  }
};

const utilities = {
  getObjectiveExamData,
  getPrimaryAssessmentData,
  getRedFlagsData,
};

module.exports = utilities;
