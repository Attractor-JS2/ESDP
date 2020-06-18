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
      fullname: 'Петров Сергей',
      username: 'testuser',
      password: 'testuser',
      role: 'admin',
    });

    const [
      patientWIthPlan,
      patientWithLessProcedures,
      patientWithoutPlan,
      patientWithoutAssessment,
    ] = await Patient.create([
      {
        fullname: 'Алексеев Иван Петрович',
        birthday: new Date(1970, 1, 2).toISOString(),
        gender: 'мужской',
        height: '178',
        weight: '78',
        phone: '77057778899',
        address: 'Казыбек би 47, 51',
      },
      {
        fullname: 'Иванов Пётр Сергеевич',
        birthday: new Date(1965, 1, 2).toISOString(),
        gender: 'мужской',
        height: '178',
        weight: '78',
        phone: '77057778899',
        address: 'Казыбек би 47, 51',
      },
      {
        fullname: 'Борисов Петр Леонидович',
        birthday: new Date(1975, 1, 2).toISOString(),
        gender: 'мужской',
        height: '178',
        weight: '78',
        phone: '77057778899',
        address: 'Казыбек би 47, 51',
      },
      {
        fullname: 'Баикеева Перизат Омирбековна',
        birthday: new Date(1980, 1, 2).toISOString(),
        gender: 'женский',
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
      redFlags: [],
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

    const redFlags = await RedFlag.create(
      {
        title: 'Мочекаменная и желчекаменная болезни',
        patient: patientWIthPlan.id,
        active: true,
        createdBy: testUser.id,
      },
      {
        title: 'Сахарный диабет',
        patient: patientWIthPlan.id,
        active: true,
        createdBy: testUser.id,
      },
    );

    const primaryAssessments = await PrimaryAssessment.create([
      {
        patient: patientWIthPlan.id,
        attendingDoctor: testUser.id,
        assessmentDate: new Date().toISOString(),
        complaints: 'Боли в пояснице',
        anamnesisVitae: 'Сидячий образ жизни',
        anamnesisMorbi:
          'Беспокоит в течении многих лет. Лечения и диагностики не было.',
        objectiveExam: objectiveExam.id,
        examinations: '',
        diagnosis:
          'Внутренняя ротация плеча. Тендиноз собственной связки надколенника. Верхний и нижний кросс синдром.',
      },
      {
        patient: patientWithoutPlan.id,
        attendingDoctor: testUser.id,
        assessmentDate: new Date().toISOString(),
        complaints: 'Боли в пояснице',
        anamnesisVitae: 'Сидячий образ жизни',
        anamnesisMorbi:
          'Беспокоит в течении многих лет. Лечения и диагностики не было.',
        objectiveExam: objectiveExam.id,
        examinations: '',
        diagnosis:
          'Внутренняя ротация плеча. Тендиноз собственной связки надколенника. Верхний и нижний кросс синдром.',
      },
    ]);

    const healingPlans = await HealingPlan.create([
      {
        primaryAssessment: primaryAssessments[0].id,
        medic: testUser.id,
      },
    ]);

    const procedures = await Procedure.create(
      {
        stage: 1,
        procedureArea: 'Плечо: левое. Большай круглая мышца',
        procedureName: 'ММТ: ПИР',
        comments: '60 дж 8гц 1500 уд',
        status: 'действует',
        procedureQuantity: 4,
        healingPlan: healingPlans[0].id,
      },
      {
        stage: 1,
        procedureArea: 'Плечо: левое. Длинная головка бицепса',
        procedureName: 'Тейпирование функциональное',
        comments: 'внутренней и наружной лодыжки',
        status: 'действует',
        procedureQuantity: 4,
        healingPlan: healingPlans[0].id,
      },
      {
        stage: 2,
        procedureArea: 'Плечо: правое. Малая круглая мышца',
        procedureName: 'СТЖ Помпаж',
        comments: '',
        status: 'действует',
        procedureQuantity: 4,
        healingPlan: healingPlans[0].id,
      },
      {
        stage: 3,
        procedureArea: 'Верхний цилиндр',
        procedureName: 'Постановка шейного отдела на животе',
        comments: 'На животе',
        status: 'действует',
        procedureQuantity: 4,
        healingPlan: healingPlans[0].id,
      },
      {
        stage: 4,
        procedureArea: 'Задняя МФЛ',
        procedureName: 'Мостик лёжа на спине',
        comments: 'Техника: упражнение в статике',
        status: 'действует',
        procedureQuantity: 4,
        healingPlan: healingPlans[0].id,
      },
      {
        stage: 5,
        procedureArea: 'Плечевой пояс. Подлопаточная мышца',
        procedureName: 'Отведение бедра 90',
        comments: 'Изометрическое напряжение 2/2/6',
        status: 'действует',
        procedureQuantity: 4,
        healingPlan: healingPlans[0].id,
      },
    );

    const attendances = await Attendance.create(
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 4, 20).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 0,
          },
          {
            procedure: procedures[5].id,
            procedureDynamic: 2,
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
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 4, 21).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[5].id,
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
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 4, 22).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[5].id,
            procedureDynamic: 0,
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
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 4, 25).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[5].id,
            procedureDynamic: 2,
          },
        ],
        patientDynamic: 2,
        beforeAttendance: {
          comments: '',
          pain: 5,
        },
        afterAttendance: {
          comments: '',
          pain: 5,
        },
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 4, 26).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 0,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[5].id,
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
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 4, 27).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 0,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 0,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[5].id,
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
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 4, 28).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[5].id,
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
          pain: 3,
        },
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 4, 29).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[5].id,
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
          pain: 3,
        },
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 5, 1).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[5].id,
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
          pain: 3,
        },
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 5, 2).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[5].id,
            procedureDynamic: 1,
          },
        ],
        patientDynamic: 1,
        beforeAttendance: {
          comments: '',
          pain: 2,
        },
        afterAttendance: {
          comments: '',
          pain: 2,
        },
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 5, 3).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[5].id,
            procedureDynamic: 1,
          },
        ],
        patientDynamic: 1,
        beforeAttendance: {
          comments: '',
          pain: 2,
        },
        afterAttendance: {
          comments: '',
          pain: 2,
        },
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 5, 4).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[5].id,
            procedureDynamic: 1,
          },
        ],
        patientDynamic: 1,
        beforeAttendance: {
          comments: '',
          pain: 1,
        },
        afterAttendance: {
          comments: '',
          pain: 1,
        },
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 5, 5).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[5].id,
            procedureDynamic: 1,
          },
        ],
        patientDynamic: 1,
        beforeAttendance: {
          comments: '',
          pain: 1,
        },
        afterAttendance: {
          comments: '',
          pain: 1,
        },
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 5, 8).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[5].id,
            procedureDynamic: 1,
          },
        ],
        patientDynamic: 1,
        beforeAttendance: {
          comments: '',
          pain: 1,
        },
        afterAttendance: {
          comments: '',
          pain: 1,
        },
      },
      {
        healingPlan: healingPlans[0].id,
        medic: testUser.id,
        attendanceDate: new Date(2020, 5, 9).toISOString(),
        procedureDynamics: [
          {
            procedure: procedures[0].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[1].id,
            procedureDynamic: 1,
          },
          {
            procedure: procedures[2].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[3].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[4].id,
            procedureDynamic: 2,
          },
          {
            procedure: procedures[5].id,
            procedureDynamic: 1,
          },
        ],
        patientDynamic: 1,
        beforeAttendance: {
          comments: '',
          pain: 1,
        },
        afterAttendance: {
          comments: '',
          pain: 1,
        },
      },
    );

    await RedFlagType.create(redFlagTypesData);
    await StageType.create(stageTypesData);

    console.log('----Documents created----');
  } catch (error) {
    console.log(error);
  }

  connection.close();
});
