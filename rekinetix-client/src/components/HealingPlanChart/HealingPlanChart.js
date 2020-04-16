import React, { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';

import Table from './Table/Table';
import DynamicBadges from './Table/DynamicBadges/DynamicBadges';

const HealingPlanChart = ({ healingPlan }) => {
  const [attendedDates, setAttendedDates] = useState([]);
  const [dateHeaderTitles, setHeaderTitles] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Возвращает массив объектов, необходимых для дальнейшей обработки
  // и построения строк таблицы. Принимает объект План лечения.
  const getProcedures = (planData) => [
    getRowGroupHeader(planData.firstStage.title),
    ...planData.firstStage.procedures,
    getRowGroupHeader(planData.secondStage.title),
    ...planData.secondStage.procedures,
    getRowGroupHeader(planData.thirdStage.title),
    ...planData.thirdStage.procedures,
    getRowGroupHeader(planData.fourthStage.title),
    ...planData.fourthStage.procedures,
    getRowGroupHeader(planData.fifthStage.title),
    ...planData.fifthStage.procedures,
    getRowGroupHeader(''),
    planData.condition,
    planData.painScaleBefore,
    planData.painScaleAfter,
  ];

  // Возвращает отсортированный по возрастанию массив дат, содержащихся в объектах процедура,
  // состояние и шкала боли. Даты представлены в строчном виде и не повторяются, необходимы для
  // построения столбцов динамической части таблицы.
  const getDates = (proceduresArray) => {
    const dates = proceduresArray.reduce((acc, { attendances }) => {
      const allDates = attendances.map(({ dateTime }) => dateTime.toString());
      const uniqueDates = allDates.filter((curDate) => {
        if (!acc.includes(curDate)) return curDate;
        return undefined;
      });
      return [...acc, ...uniqueDates];
    }, []);
    return dates.sort((a, b) => new Date(a) - new Date(b));
  };

  // Возвращает массив объектов представляющих строки тела таблицы. Принимает сырые объекты
  // из обработанного методом getProcedures плана лечения и массив уникальных отформатированных
  // дат.
  const getChartData = (allProcedures, dateTitles) => {
    return allProcedures.reduce((acc, procedure) => {
      const { attendances } = procedure;
      const reducedDates = attendances.reduce((acc, { dateTime, dynamic }) => {
        const stringDate = format(new Date(dateTime), 'yyyy-MM-dd');
        return { ...acc, [stringDate]: dynamic };
      }, {});

      const rowData = {
        ...procedure,
        ...dateTitles.reduce((acc, currentDate) => {
          const curAttendance = {
            [currentDate]: reducedDates[currentDate] || '',
          };
          return { ...acc, ...curAttendance };
        }, {}),
      };

      return [...acc, rowData];
    }, []);
  };

  // Возвращает объект, содержащий элемент для отображения строки с названием этапа или группы
  // строк
  const getRowGroupHeader = (rowTitle) => ({
    id: rowTitle,
    title: <span className="h6">{rowTitle}</span>,
    targetArea: '',
    status: '',
    planned: '',
    completed: '',
    attendances: [],
  });

  // С помощью хука возвращаются данные определяющие столбцы таблицы react-table.
  // В документации react-table рекомендуется использовать memoize. По документации React его можно заменить
  // на useEffect.
  // id - идентификатор, String; Header - название столбца, String; accessor - ключ объекта для отображения
  // ячейки столбца. Данные получаются из массива объектов передаваемого в пропс data.
  const columns = useMemo(
    () => [
      {
        id: 'procedureTitle',
        Header: 'Что делаем',
        accessor: 'title',
      },
      {
        id: 'procedureTarget',
        Header: 'На что направлено',
        accessor: 'targetArea',
      },
      {
        id: 'procedureStatus',
        Header: 'Статус',
        accessor: 'status',
      },
      {
        id: 'procedurePlan',
        Header: 'План',
        accessor: 'planned',
      },
      {
        id: 'procedureFact',
        Header: 'Факт',
        accessor: 'completed',
      },
      ...dateHeaderTitles,
    ],
    [dateHeaderTitles],
  );

  useEffect(() => {
    // В хуке сохраняется в стейт массив уникальных дат всех посещений приведённых к строчному типу.
    if (
      healingPlan &&
      healingPlan.constructor === Object &&
      Object.keys(healingPlan).length > 0
    ) {
      const procedures = getProcedures(healingPlan);
      const dynamicHeaders = getDates(procedures);
      setAttendedDates([...dynamicHeaders]);
    }
  }, [healingPlan]);

  useEffect(() => {
    // В хуке формируется columns динамической части таблицы и окончательные данные для пропса data таблицы.
    if (
      healingPlan &&
      healingPlan.constructor === Object &&
      Object.keys(healingPlan).length > 0
    ) {
      const formattedDates = attendedDates.map((dateString) => {
        return format(new Date(dateString), 'yyyy-MM-dd');
      });
      const dynamicColumns = formattedDates.map((title) => ({
        id: title,
        Header: title,
        accessor: `${title}`,
        Cell: ({ cell: { value } }) => <DynamicBadges values={value} />,
      }));

      const procedures = getProcedures(healingPlan);
      const dynamicData = getChartData(procedures, formattedDates);

      setHeaderTitles([...dynamicColumns]);
      setChartData([...dynamicData]);
    }
  }, [attendedDates, healingPlan]);

  return (
    <div className="container">
      <div className="row pt-3">
        <div className="col-sm-12 col-md-4">
          <p>
            <span>ПАЦИЕНТ: </span>
            {`${healingPlan.patient.secondName} ${healingPlan.patient.firstName} ${healingPlan.patient.patronymic}`}
          </p>
          <p>
            <span>ВРАЧ: </span>
            {`${healingPlan.medic.secondName} ${healingPlan.medic.firstName} ${healingPlan.medic.patronymic}`}
          </p>
        </div>
        <div className="col-sm-12 col-md-4">
          <p>
            <span>Диагноз: </span>
            {`${healingPlan.diagnosis.main}`}
          </p>
        </div>
        <div className="col-sm-12 col-md-4">
          <p>
            <span>Красные флаги: </span>
            {healingPlan &&
            healingPlan.redFlags &&
            healingPlan.redFlags.length > 0
              ? healingPlan.redFlags.map(({ id, title }) => (
                  <span key={id} className="badge badge-danger">{title}</span>
                ))
              : null}
          </p>
        </div>
      </div>
      {chartData && chartData.length > 0 && (
        <Table columns={columns} data={chartData} />
      )}
    </div>
  );
};

export default HealingPlanChart;
