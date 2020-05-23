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

mongoose.connect(config.db.getDbPath(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const { connection } = mongoose;

connection.once('open', async () => {
  console.log('----Mongoose connected----')
  const { db } = connection;
  try {
    await db.dropCollection('users');
    await db.dropCollection('patients');
    await db.dropCollection('procedures');
    await db.dropCollection('objectiveexams');
    await db.dropCollection('redflags');
    await db.dropCollection('primaryassessments');
    await db.dropCollection('healingplans');
    await db.dropCollection('attendances');
    console.log('----Collections dropped----');
  } catch (error) {
    console.log(error);
  }

  try {
    const testUser = await User.create({
      fullname: 'testuser',
      username: 'testuser',
      password: 'testuser',
      role: 'admin',
    });
  
    const testPatient = await Patient.create({
      fullname: 'Сидоров Иван Петрович',
      birthday: new Date(1970, 1, 2).toISOString(),
      gender: 'мужской',
      height: '178',
      weight: '78',
      phone: '77057778899',
      address: 'Казыбек би 47, 51',
    });
  
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
        patient: testPatient.id,
        active: true,
        createdBy: testUser.id,
      },
      {
        title: 'Сахарный диабет',
        patient: testPatient.id,
        active: true,
        createdBy: testUser.id,
      },
    );
  
    const primaryAssessment = await PrimaryAssessment.create({
      patient: testPatient.id,
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
    });
  
    const healingPlan = await HealingPlan.create({
      primaryAssessment: primaryAssessment.id,
      medic: testUser.id,
    });
  
    const procedure = await Procedure.create({
      stage: 1,
      procedureArea: 'Плечо: левое',
      procedureName: 'ММТ: ПИР',
      comments: '60 дж 8гц 1500 уд',
      status: 'запланировано',
      procedureQuantity: 4,
      healingPlan: healingPlan.id,
      patient: testPatient._id,
      medic: testUser._id,
    });
  
    const attendance = await Attendance.create({
      healingPlan: healingPlan.id,
      medic: testUser.id,
      attendanceDate: new Date().toISOString(),
      procedures: [
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
    console.log('----Documents created----');  
  } catch (error) {
    console.log(error);
  }

  connection.close();
});
