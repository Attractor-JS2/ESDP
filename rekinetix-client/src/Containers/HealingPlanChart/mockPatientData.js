const patient = {
  patient: {
    _id: '5ed0fd18b8c4b554cfbd988d',
    fullname: 'Сидоров Иван Петрович',
    birthday: '1970-02-01T18:00:00.000Z',
    gender: 'мужской',
    height: 178,
    weight: 78,
    phone: '77057778899',
    address: 'Казыбек би 47, 51',
    createdAt: '2020-05-29T12:16:24.566Z',
    updatedAt: '2020-05-29T12:16:24.566Z',
    __v: 0,
  },
  redFlags: [
    {
      active: true,
      _id: '5ed0fd18b8c4b554cfbd9897',
      title: 'Мочекаменная и желчекаменная болезни',
      patient: '5ed0fd18b8c4b554cfbd988d',
      createdBy: '5ed0fd18b8c4b554cfbd988c',
      createdAt: '2020-05-29T12:16:24.624Z',
      updatedAt: '2020-05-29T12:16:24.624Z',
      __v: 0,
    },
    {
      active: true,
      _id: '5ed0fd18b8c4b554cfbd9898',
      title: 'Сахарный диабет',
      patient: '5ed0fd18b8c4b554cfbd988d',
      createdBy: '5ed0fd18b8c4b554cfbd988c',
      createdAt: '2020-05-29T12:16:24.624Z',
      updatedAt: '2020-05-29T12:16:24.624Z',
      __v: 0,
    },
  ],
  primaryAssessment: {
    _id: '5ed0fd18b8c4b554cfbd9899',
    assessmentDate: '2020-05-29T12:16:24.644Z',
    diagnosis:
      'Внутренняя ротация плеча. Тендиноз собственной связки надколенника. Верхний и нижний кросс синдром.',
  },
};

export default patient;
