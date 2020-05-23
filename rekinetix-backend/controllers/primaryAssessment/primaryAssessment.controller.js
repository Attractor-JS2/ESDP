const PrimaryAssessment = require('../../models/PrimaryAssessment/PrimaryAssessment');
const ObjectiveExam = require('../../models/PrimaryAssessment/ObjectiveExam');
const {
  getObjectiveExamData,
  getPrimaryAssessmentData,
} = require('./utilities');

const create = async (req, res) => {
  const { body, userId } = req;
  const { objectiveExam } = body;

  // TODO: Добавить валидацию.
  if (!(objectiveExam && objectiveExam.constructor === Object)) {
    res.sendStatus(400);
  }

  const objectiveExamData = getObjectiveExamData(objectiveExam);

  try {
    const objectiveExamDoc = await ObjectiveExam.create(objectiveExamData);
    const primaryAssessmentData = getPrimaryAssessmentData(
      body,
      userId,
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
