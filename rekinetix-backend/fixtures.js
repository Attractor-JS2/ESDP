const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Patient = require('./models/Patient');
const ObjectiveExam = require('./models/PrimaryAssessment/ObjectiveExam');
const RedFlag = require('./models/RedFlag');
const PrimaryAssessment = require('./models/PrimaryAssessment/PrimaryAssessment');
const HealingPlan = require('./models/HealingPlan');
const Procedure = require('./models/Procedure');
const Attendance = require('./models/Attendance');

const RedFlagType = require('./models/Autocomplete/RedFlagType');
const StageType = require('./models/Autocomplete/StageType');

const { redFlagTypesData, stageTypesData } = require('./fixturesData');

const dropCollection = async (connectedDB, collectionName) => {
  try {
    await connectedDB.dropCollection(collectionName);
  } catch (error) {
    if (error.code !== 26) {
      console.log(error);
    }
  }
};

mongoose.connect(config.db.getDbPath(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const { connection } = mongoose;

connection.once('open', async () => {
  console.log('----Mongoose connected----');
  const { db } = connection;

  dropCollection(db, 'users');
  dropCollection(db, 'patients');
  dropCollection(db, 'procedures');
  dropCollection(db, 'objectiveexams');
  dropCollection(db, 'redflags');
  dropCollection(db, 'primaryassessments');
  dropCollection(db, 'healingplans');
  dropCollection(db, 'attendances');
  dropCollection(db, 'redflagtypes');
  dropCollection(db, 'stagetypes');

  try {
    const testUser = await User.create({
      fullname: 'testuser',
      username: 'testuser',
      password: 'testuser',
      role: 'admin',
    });

    const testPatients = await Patient.create([
      {
        fullname: 'Сидоров Иван Петрович',
        birthday: new Date(1970, 1, 2).toISOString(),
        gender: 'мужской',
        height: '178',
        weight: '78',
        phone: '77057778899',
        address: 'Казыбек би 47, 51',
      },
      {
        fullname: 'Иванов Пётр Сергеевич',
        birthday: new Date(1970, 1, 2).toISOString(),
        gender: 'мужской',
        height: '178',
        weight: '78',
        phone: '77057778899',
        address: 'Казыбек би 47, 51',
      },
    ]);

    const objectiveExam = await ObjectiveExam.create({
      foot: {
        D: 'вальгус',
        S: 'вальгус',
        additionalInfo: '',
      },
      hip: {
        D: '',
        S: '',
        additionalInfo: '',
      },
      pelvicSpine: {
        D: 'передний наклон',
        S: 'передний наклон',
        additionalInfo: '',
      },
      lumbarSpine: {
        D: 'гиперлордоз',
        S: 'гиперлордоз',
        additionalInfo: '',
      },
      thoracicSpine: {
        D: 'гиперкифоз',
        S: 'гиперкифоз',
        additionalInfo: '',
      },
      shoulderGirdel: {
        D: 'Отведение. Внутрення ротация плеча',
        S: 'Отведение',
        additionalInfo: 'Провокационные тесты на плечевой сустав отрицательные',
      },
      headAndNeck: {
        D: 'протракция',
        S: 'протракция',
        additionalInfo: '',
      },
    });

    const redFlag = await RedFlag.create(
      {
        title: 'Мочекаменная и желчекаменная болезни',
        patient: testPatients[0].id,
        active: true,
        createdBy: testUser.id,
      },
      {
        title: 'Сахарный диабет',
        patient: testPatients[0].id,
        active: true,
        createdBy: testUser.id,
      },
    );

    const primaryAssessments = await PrimaryAssessment.create([
      {
        patient: testPatients[0].id,
        attendingDoctor: testUser.id,
        assessmentDate: new Date().toISOString(),
        complaints: 'Боли в пояснице',
        anamnesisVitae: 'Сидячий образ жизни',
        anamnesisMorbi:
          'Беспокоит в течении многих лет. Лечения и диагностики не было.',
        objectiveExam: objectiveExam.id,
        examinations: '',
        diagnosis:
          '«Внутренняя ротация плеча. Тендиноз собственной связки надколенника. Верхний и нижний кросс синдром.» 1) Мягкие мануальные техники ( глубокий мануальный массаж, терапия триггерных точек, растяжение мышц ) — внутренние ротаторы плеча, верхняя трапеция, четырехлавая мышца бедра. 2) Кинезитерапия — коррекция осанки, стабилизация лопаток, плечевого и коленного сустава. 3) Коррекция стельками Родион Фомин 8 747 587 43 67',
      },
      {
        patient: testPatients[1].id,
        attendingDoctor: testUser.id,
        assessmentDate: new Date().toISOString(),
        complaints: 'Боли в пояснице',
        anamnesisVitae: 'Сидячий образ жизни',
        anamnesisMorbi:
          'Беспокоит в течении многих лет. Лечения и диагностики не было.',
        objectiveExam: objectiveExam.id,
        examinations: '',
        diagnosis:
          '«Внутренняя ротация плеча. Тендиноз собственной связки надколенника. Верхний и нижний кросс синдром.» 1) Мягкие мануальные техники ( глубокий мануальный массаж, терапия триггерных точек, растяжение мышц ) — внутренние ротаторы плеча, верхняя трапеция, четырехлавая мышца бедра. 2) Кинезитерапия — коррекция осанки, стабилизация лопаток, плечевого и коленного сустава. 3) Коррекция стельками Родион Фомин 8 747 587 43 67',
      },
    ]);

    const healingPlans = await HealingPlan.create([
      {
        primaryAssessment: primaryAssessments[0].id,
        medic: testUser.id,
      },
      {
        primaryAssessment: primaryAssessments[1].id,
        medic: testUser.id,
      },
    ]);

    const procedure = await Procedure.create({
      stage: 1,
      procedureArea: 'Плечо: левое',
      procedureName: 'ММТ: ПИР',
      comments: '60 дж 8гц 1500 уд',
      status: 'запланировано',
      procedureQuantity: 4,
      healingPlan: healingPlans[0].id,
    });

    const attendance = await Attendance.create({
      healingPlan: healingPlans[0].id,
      medic: testUser.id,
      attendanceDate: new Date().toISOString(),
      procedureDynamics: [
        {
          procedure: procedure.id,
          procedureDynamic: 1,
        },
      ],
      patientDynamic: 1,
      beforeAttendance: {
        comments: '',
        pain: 5,
      },
      afterAttendance: {
        comments: '',
        pain: 5,
      },
    });

    await RedFlagType.create(redFlagTypesData);
    await StageType.create(stageTypesData);

    console.log('----Documents created----');
  } catch (error) {
    console.log(error);
  }

  connection.close();
});
