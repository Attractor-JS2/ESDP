import React, { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import './HealingPlanChart.css';
import Table from './Table/Table';
import DynamicBadges from './Table/DynamicBadges/DynamicBadges';
import AddActionButton from './Table/AddActionButton/AddActionButton';
import EditableStatusSelect from './Table/EditableStatusSelect/EditableStatusSelect';

const HealingPlanChart = ({ healingPlan }) => {
  const [attendedDates, setAttendedDates] = useState([]);
  const [dateHeaderTitles, setHeaderTitles] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Возвращает массив объектов, необходимых для дальнейшей обработки
  // и построения строк таблицы. Принимает объект План лечения.
  const getProcedures = (planData) => [
    getRowGroupHeader(planData.firstStage.title),
    ...planData.firstStage.procedures,
    getButtonRow(),
    getRowGroupHeader(planData.secondStage.title),
    ...planData.secondStage.procedures,
    getButtonRow(),
    getRowGroupHeader(planData.thirdStage.title),
    ...planData.thirdStage.procedures,
    getButtonRow(),
    getRowGroupHeader(planData.fourthStage.title),
    ...planData.fourthStage.procedures,
    getButtonRow(),
    getRowGroupHeader(planData.fifthStage.title),
    ...planData.fifthStage.procedures,
    getButtonRow(),
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
    title: (
      <span className="h6">
        {rowTitle}
      </span>
    ),
    targetArea: '',
    status: 'shouldBeEmpty',
    planned: '',
    completed: '',
    attendances: [],
  });

  const getButtonRow = () => ({
    title: 'AddRowButton',
    targetArea: '',
    status: 'shouldBeEmpty',
    planned: '',
    completed: '',
    attendances: [],
  });

  const emptyRow = {
    id: '',
    title: '',
    targetArea: '',
    status: '',
    planned: '',
    completed: '',
    attendances: [],
  };

  const addRowHandler = (rowIndex) => {
    setChartData((prevState) => {
      const rows = [...prevState];
      rows.splice(rowIndex, 0, emptyRow);
      return [...rows];
    });
  };

  const updateProcedureStatus = (rowIndex, columnId, optionValue) => {
    console.log(rowIndex, columnId, optionValue);
  }

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
        Cell: ({ cell: { value, row } }) => (
          <AddActionButton
            values={value}
            row={row}
            addRowHandler={addRowHandler}
          />
        ),
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
        Cell: EditableStatusSelect,
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
    <Container>
      <ScopedCssBaseline>
        <Grid container spacing={2} direction="row" alignItems="stretch">
          <Grid item sm={12} md={4}>
            <Paper className="HealingPlanChart-paper">
              <Typography>
                <span>ПАЦИЕНТ: </span>
                {`${healingPlan.patient.secondName} ${healingPlan.patient.firstName} ${healingPlan.patient.patronymic}`}
              </Typography>
              <Typography>
                <span>ВРАЧ: </span>
                {`${healingPlan.medic.secondName} ${healingPlan.medic.firstName} ${healingPlan.medic.patronymic}`}
              </Typography>
            </Paper>
          </Grid>
          <Grid item sm={12} md={4}>
            <Paper className="HealingPlanChart-paper">
              <Typography>
                <b>Диагноз: </b>
                {`${healingPlan.diagnosis.main}`}
              </Typography>
            </Paper>
          </Grid>
          <Grid item sm={12} md={4}>
            <Paper className="HealingPlanChart-paper">
              <div>
                <Typography>
                  <b>Красные флаги: </b>
                </Typography>
                {healingPlan &&
                healingPlan.redFlags &&
                healingPlan.redFlags.length > 0
                  ? healingPlan.redFlags.map(({ id, title }) => (
                      <Chip key={id} color="secondary" label={title} />
                    ))
                  : null}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </ScopedCssBaseline>
      {chartData && chartData.length > 0 && (
        <Table
          columns={columns}
          data={chartData}
          addRowHandler={addRowHandler}
          updateSelectData={updateProcedureStatus}
        />
      )}
    </Container>
  );
};

export default HealingPlanChart;
