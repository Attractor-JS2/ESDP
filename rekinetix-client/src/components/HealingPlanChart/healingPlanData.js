export const healingPlanByPatient = {
  patient: {
    id: '001002p',
    firstName: 'Иван',
    secondName: 'Сидоров',
    patronymic: 'Петрович',
  },
  medic: {
    id: '001001ph',
    firstName: 'Кирилл',
    secondName: 'Смирнов',
    patronymic: '',
  },
  diagnosis: {
    createdAt: '',
    main: 'Импиджмент синдром плечевого сустава',
  },
  redFlags: [
    {
      id: '001rf',
      createdAt: '',
      title: 'быстрая потеря веса',
    },
    {
      id: '002rf',
      createdAt: '',
      title: 'кашель более 2-х недель',
    }
  ],
  firstStage: {
    title: '1. Обезболивание/противовоспалительная',
    procedures: [
      {
        id: '001',
        title: 'Расслабление',
        targetArea: 'Надостная мышца',
        status: 'Завершено',
        planned: '3',
        completed: '2',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'стабильная',
          },
          {
            dateTime: new Date(2020, 2, 24),
            dynamic: 'положительная',
          },
        ],
      },
      {
        id: '002',
        title: 'Ультразвук',
        targetArea: 'Подлопаточная мышца',
        status: 'Прервано',
        planned: '5',
        completed: '2',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'стабильная',
          },
          {
            dateTime: new Date(2020, 2, 24),
            dynamic: 'положительная',
          },
        ],
      },
      {
        id: '003',
        title: 'Плазмолифтинг',
        targetArea: 'Латеральная связка',
        status: 'Действует',
        planned: '5',
        completed: '2',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'стабильная',
          },
          {
            dateTime: new Date(2020, 3, 4),
            dynamic: 'стабильная',
          },
        ],
      },
    ],
  },
  secondStage: {
    title: '2. Мобилизация',
    procedures: [
      {
        id: '004',
        title: 'Тракция',
        targetArea: 'Грудной отдел позвоночника',
        status: 'Приостановлено',
        planned: '3',
        completed: '2',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'стабильная',
          },
          {
            dateTime: new Date(2020, 2, 24),
            dynamic: 'стабильная',
          },
        ],
      },
      {
        id: '005',
        title: 'Компрессия',
        targetArea: 'Шейный отдел позвоночника',
        status: 'Действует',
        planned: '5',
        completed: '2',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'стабильная',
          },
          {
            dateTime: new Date(2020, 2, 24),
            dynamic: 'стабильная',
          },
        ],
      },
      {
        id: '006',
        title: 'Мобилизация',
        targetArea: 'Поясничный отдел позвоночника',
        status: 'Действует',
        planned: '5',
        completed: '2',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'отрицательная',
          },
          {
            dateTime: new Date(2020, 3, 4),
            dynamic: 'положительная',
          },
        ],
      },
    ],
  },
  thirdStage: {
    title: '3. НМА и стабилизация',
    procedures: [
      {
        id: '007',
        title: 'Упражнение: Активация нижнего цилиндра',
        targetArea: '',
        status: 'Действует',
        planned: '3',
        completed: '2',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'стабильная',
          },
          {
            dateTime: new Date(2020, 2, 24),
            dynamic: 'стабильная',
          },
        ],
      },
      {
        id: '008',
        title: 'Упражнение: Тренировка нижнего цилиндра',
        targetArea: '',
        status: 'Действует',
        planned: '5',
        completed: '3',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'стабильная',
          },
          {
            dateTime: new Date(2020, 2, 24),
            dynamic: 'стабильная',
          },
        ],
      },
      {
        id: '009',
        title: 'Стабилизация коленного сустава',
        targetArea: '',
        status: 'Действует',
        planned: '5',
        completed: '2',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'стабильная',
          },
          {
            dateTime: new Date(2020, 3, 4),
            dynamic: 'стабильная',
          },
        ],
      },
    ],
  },
  fourthStage: {
    title: '4. Восстановление функций миофасциальных лент',
    procedures: [
      {
        id: '010',
        title: 'Тренировка передней ленты',
        targetArea: '',
        status: 'Действует',
        planned: '3',
        completed: '2',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'стабильная',
          },
          {
            dateTime: new Date(2020, 2, 24),
            dynamic: 'стабильная',
          },
        ],
      },
    ],
  },
  fifthStage: {
    title: '5. Профилактика дома',
    procedures: [
      {
        id: '011',
        title: 'Упражнение: Тренировка нижнего цилиндра',
        targetArea: '',
        status: 'Действует',
        planned: '3',
        completed: '1',
        attendances: [
          {
            dateTime: new Date(2020, 2, 23),
            dynamic: 'стабильная',
          },
        ],
      },
      {
        id: '012',
        title: 'Упражнение: Подъём правой ноги',
        targetArea: '',
        status: 'Действует',
        planned: '5',
        completed: '1',
        attendances: [
          {
            dateTime: new Date(2020, 2, 24),
            dynamic: 'стабильная',
          },
        ],
      },
      {
        id: '013',
        title: 'Упражнение: Отведение левой ноги',
        targetArea: '',
        status: 'Прервано',
        planned: '5',
        completed: '1',
        attendances: [
          {
            dateTime: new Date(2020, 2, 24),
            dynamic: 'стабильная',
          },
        ],
      },
    ],
  },
  condition: {
    title: 'Состояние пациента',
    attendances: [
      {
        dateTime: new Date(2020, 2, 23),
        dynamic: 'стабильная',
      },
      {
        dateTime: new Date(2020, 2, 24),
        dynamic: 'стабильная',
      },
      {
        dateTime: new Date(2020, 2, 25),
        dynamic: 'положительная',
      },
    ],
  },
  painScaleBefore: {
    title: 'Шкала боли до',
    attendances: [
      {
        dateTime: new Date(2020, 2, 23),
        dynamic: '8',
      },
      {
        dateTime: new Date(2020, 2, 24),
        dynamic: '7',
      },
      {
        dateTime: new Date(2020, 2, 25),
        dynamic: '4',
      },
    ],
  },
  painScaleAfter: {
    title: 'Шкала боли после',
    attendances: [
      {
        dateTime: new Date(2020, 2, 23),
        dynamic: '4',
      },
      {
        dateTime: new Date(2020, 2, 24),
        dynamic: '3',
      },
      {
        dateTime: new Date(2020, 2, 25),
        dynamic: '2',
      },
    ],
  },
};
