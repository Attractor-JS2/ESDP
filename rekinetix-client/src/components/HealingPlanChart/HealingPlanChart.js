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

const HealingPlanChart = ({
  attendances,
  statuses,
  redFlags,
  patient,
  medic,
  diagnosis,
}) => {
  const [dateHeaderTitles, setHeaderTitles] = useState([]);
  const [chartData, setChartData] = useState([]);

  const getDates = (attendances) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (attendances && attendances.length > 0) {
      const dates = attendances.map(({ attendanceDate }) => {
        return format(attendanceDate, 'yyyy-MM-dd');
      });
      return [...dates, today].sort((a, b) => new Date(a) - new Date(b));
    } else {
      return [today];
    }
  };

  const getStageRows = (attendances, stage, statuses) => {
    const procedures = attendances.reduce((acc, curAttendance) => {
      const { attendanceDate } = curAttendance;
      const stageProcedures = [...curAttendance[stage]];
      let uniqueProcedures = [];
      stageProcedures.forEach((procedure) => {
        const accIndex = acc.findIndex(
          (accProcedure) =>
            accProcedure.procedureName === procedure.procedureName,
        );
        const statusesIndex = statuses.findIndex(
          (status) =>
            status.procedure.procedureName === procedure.procedureName,
        );
        const formattedDate = format(new Date(attendanceDate), 'yyyy-MM-dd');
        if (accIndex >= 0) {
          acc[accIndex] = {
            ...acc[accIndex],
            [formattedDate]: procedure.procedureDynamic,
            completed: acc[accIndex].completed + 1,
          };
        } else {
          const procedureEdited = {
            ...procedure,
            status: statuses[statusesIndex].status,
            planned: statuses[statusesIndex].planned,
            completed: 1,
            [formattedDate]: procedure.procedureDynamic,
          };
          uniqueProcedures = [...uniqueProcedures, procedureEdited];
        }
      });
      return [...acc, ...uniqueProcedures];
    }, []);
    return procedures;
  };

  const getRowGroupHeader = (rowTitle) => ({
    id: rowTitle,
    procedureName: <b>{rowTitle}</b>,
    procedureArea: '',
    status: 'shouldBeEmpty',
    planned: '',
    completed: '',
    attendances: [],
  });

  const getButtonRow = () => ({
    procedureName: 'AddRowButton',
    procedureArea: '',
    status: 'shouldBeEmpty',
    planned: '',
    completed: '',
    attendances: [],
  });

  const emptyRow = {
    procedureName: '',
    procedureArea: '',
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

  const updateProcedureStatus = (rowIndex, optionValue) => {
    setChartData((prevState) =>
      prevState.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...prevState[rowIndex],
            status: optionValue,
          };
        } else {
          return row;
        }
      }),
    );
  };

  // С помощью хука возвращаются данные определяющие столбцы таблицы react-table.
  // В документации react-table рекомендуется использовать memoize. По документации React его можно заменить
  // на useEffect.
  // Header - название столбца, String; accessor - ключ объекта для отображения
  // ячейки столбца. Данные получаются из массива объектов передаваемого в пропс data.
  const columns = useMemo(
    () => [
      {
        Header: 'Что делаем',
        accessor: 'procedureName',
        Cell: AddActionButton,
      },
      {
        Header: 'На что направлено',
        accessor: 'procedureArea',
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: EditableStatusSelect,
      },
      {
        Header: 'План',
        accessor: 'planned',
      },
      {
        Header: 'Факт',
        accessor: 'completed',
      },
      ...dateHeaderTitles,
    ],
    [dateHeaderTitles],
  );


  useEffect(() => {
    const formattedDates = getDates(attendances);
    const dynamicColumns = formattedDates.map((title) => ({
      id: title,
      Header: title,
      accessor: `${title}`,
      Cell: ({ cell: { value } }) => <DynamicBadges values={value} />,
    }));
    const firstStageRows = getStageRows(attendances, 'firstStage', statuses);
    const secondStageRows = getStageRows(attendances, 'secondStage', statuses);
    const thirdStageRows = getStageRows(attendances, 'thirdStage', statuses);
    const fourthStageRows = getStageRows(attendances, 'fourthStage', statuses);
    const fifthStageRows = getStageRows(attendances, 'fifthStage', statuses);
    const tableRows = [
      getRowGroupHeader('1. Обезболивание/противовоспалительная'),
      ...firstStageRows,
      getButtonRow(),
      getRowGroupHeader('2. Мобилизация'),
      ...secondStageRows,
      getButtonRow(),
      getRowGroupHeader('3. НМА и стабилизация'),
      ...thirdStageRows,
      getButtonRow(),
      getRowGroupHeader('4. Восстановление функций миофасциальных лент'),
      ...fourthStageRows,
      getButtonRow(),
      getRowGroupHeader('5. Профилактика дома'),
      ...fifthStageRows,
      getButtonRow(),
    ];
    setHeaderTitles(dynamicColumns);
    setChartData(tableRows);
  }, [attendances, statuses]);

  return (
    <ScopedCssBaseline>
      <Container>
        <Grid container spacing={2} direction="row" alignItems="stretch">
          <Grid item sm={12} md={4}>
            <Paper className="HealingPlanChart-paper">
              <Typography>
                <span>ПАЦИЕНТ: </span>
                {`${patient.secondName} ${patient.firstName} ${patient.patronymic}`}
              </Typography>
              <Typography>
                <span>ВРАЧ: </span>
                {`${medic.secondName} ${medic.firstName} ${medic.patronymic}`}
              </Typography>
            </Paper>
          </Grid>
          <Grid item sm={12} md={4}>
            <Paper className="HealingPlanChart-paper">
              <Typography>
                <b>Диагноз: </b>
                {`${diagnosis.main}`}
              </Typography>
            </Paper>
          </Grid>
          <Grid item sm={12} md={4}>
            <Paper className="HealingPlanChart-paper">
              <div>
                <Typography>
                  <b>Красные флаги: </b>
                </Typography>
                {redFlags && redFlags.length > 0
                  ? redFlags.map(({ id, title }) => (
                      <Chip key={id} color="secondary" label={title} />
                    ))
                  : null}
              </div>
            </Paper>
          </Grid>
        </Grid>
        {chartData && chartData.length > 0 && (
          <Table
            columns={columns}
            data={chartData}
            addRowHandler={addRowHandler}
            updateSelectData={updateProcedureStatus}
          />
        )}
      </Container>
    </ScopedCssBaseline>
  );
};

export default HealingPlanChart;
