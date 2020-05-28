const patient = {
  patient: {
    _id: '5ecf7a45594ef97b4261bef7',
    fullname: 'Сидоров Иван Петрович',
    birthday: '1970-02-01T18:00:00.000Z',
    gender: 'мужской',
    height: 178,
    weight: 78,
    phone: '77057778899',
    address: 'Казыбек би 47, 51',
    createdAt: '2020-05-28T08:45:57.220Z',
    updatedAt: '2020-05-28T08:45:57.220Z',
    __v: 0,
  },
  redFlags: [
    {
      active: true,
      _id: '5ecf7a45594ef97b4261bf02',
      title: 'Сахарный диабет',
      patient: '5ecf7a45594ef97b4261bef7',
      createdBy: '5ecf7a45594ef97b4261bef6',
      createdAt: '2020-05-28T08:45:57.279Z',
      updatedAt: '2020-05-28T08:45:57.279Z',
      __v: 0,
    },
    {
      active: true,
      _id: '5ecf7a45594ef97b4261bf01',
      title: 'Мочекаменная и желчекаменная болезни',
      patient: '5ecf7a45594ef97b4261bef7',
      createdBy: '5ecf7a45594ef97b4261bef6',
      createdAt: '2020-05-28T08:45:57.279Z',
      updatedAt: '2020-05-28T08:45:57.279Z',
      __v: 0,
    },
  ],
  primaryAssessment: {
    _id: '5ecf7a45594ef97b4261bf03',
    assessmentDate: '2020-05-28T08:45:57.300Z',
    diagnosis:
      'Внутренняя ротация плеча. Тендиноз собственной связки надколенника. Верхний и нижний кросс синдром.',
  },
};

export default patient;
