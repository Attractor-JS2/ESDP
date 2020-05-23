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

  try {
    const objectiveExamData = getObjectiveExamData(objectiveExam);
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

const findByPatient = async (req, res) => {
  const filter = { patient: req.query.patient };

  try {
    const primaryAssessmentDocs = await PrimaryAssessment.find(filter)
      .sort({ assessmentDate: 'asc' })
      .populate({ path: 'objectiveExam' })
      .populate({ path: 'attendingDoctor', select: { fullname: 1, _id: 0 } });

    res.send(primaryAssessmentDocs);
  } catch (error) {
    res.sendStatus(500);
  }
};

const primaryAssessmentController = {
  create,
  findByPatient,
};

module.exports = primaryAssessmentController;
