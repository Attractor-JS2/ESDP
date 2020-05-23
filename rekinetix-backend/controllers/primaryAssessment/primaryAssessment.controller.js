const PrimaryAssessment = require('../../models/PrimaryAssessment/PrimaryAssessment');
const ObjectiveExam = require('../../models/PrimaryAssessment/ObjectiveExam');

const getAreaDescriptionData = (data) => ({
  D: data.D || '',
  S: data.S || '',
  additionalInfo: data.additionalInfo || '',
});

const getObjectiveExamData = (data) => ({
  foot: getAreaDescriptionData(data.foot),
  hip: getAreaDescriptionData(data.hip),
  pelvicSpine: getAreaDescriptionData(data.pelvicSpine),
  lumbarSpine: getAreaDescriptionData(data.lumbarSpine),
  thoracicSpine: getAreaDescriptionData(data.thoracicSpine),
  shoulderGirdel: getAreaDescriptionData(data.shoulderGirdel),
  headAndNeck: getAreaDescriptionData(data.headAndNeck),
});

const getPrimaryAssessmentData = (data, userId, objectiveExamId) => ({
  patient: data.patient,
  attendingDoctor: userId,
  assessmentDate: data.attendanceDate,
  complaints: data.complaints,
  anamnesisVitae: data.anamnesisVitae,
  anamnesisMorbi: data.anamnesisMorbi,
  objectiveExam: objectiveExamId,
  examinations: data.examinations,
  diagnosis: data.diagnosis,
});

const create = async (req, res) => {
  const { objectiveExam } = req.body;
  if (!(objectiveExam && objectiveExam.constructor === Object)) {
    res.sendStatus(400);
  }

  const objectiveExamData = getObjectiveExamData(objectiveExam);

  try {
    const objectiveExamDoc = await ObjectiveExam.create(objectiveExamData);
    const primaryAssessmentData = getPrimaryAssessmentData(
      req.body,
      req.userId,
      objectiveExamDoc.id,
    );
    const primaryAssessmentDoc = await PrimaryAssessment.create(
      primaryAssessmentData,
    );
    res.status(201).send({ id: primaryAssessmentDoc.id });
  } catch (error) {
    res.sendStatus(400);
  }
};

const primaryAssessmentController = {
  create,
};

module.exports = primaryAssessmentController;
