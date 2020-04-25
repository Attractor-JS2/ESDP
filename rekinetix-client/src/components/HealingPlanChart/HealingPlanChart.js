import React, { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';
import Container from '@material-ui/core/Container';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import Table from './Table/Table';
import DynamicBadges from './Table/DynamicBadges/DynamicBadges';
import AddActionButton from './Table/AddActionButton/AddActionButton';
import EditableStatusSelect from './Table/EditableStatusSelect/EditableStatusSelect';
import PatientInfo from './PatientInfo/PatientInfo';

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
            rowTitle: procedure.procedureName,
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

  const getDynamicAndPainScaleRows = (attendances) => {
    const conditionRow = { rowTitle: 'Состояние пациента' };
    const painScaleBeforeRow = { rowTitle: 'Шкала боли до' };
    const painScaleAfterRow = { rowTitle: 'Шкала боли после' };
    const rows = attendances.reduce(
      (acc, curAttendance) => {
        const { attendanceDate } = curAttendance;
        const formattedDate = format(new Date(attendanceDate), 'yyyy-MM-dd');
        acc[0] = {
          ...acc[0],
          [formattedDate]: curAttendance.patientDynamic,
        };
        acc[1] = {
          ...acc[1],
          [formattedDate]: curAttendance.beforeAttendance.pain,
        };
        acc[2] = {
          ...acc[2],
          [formattedDate]: curAttendance.afterAttendance.pain,
        };
        return acc;
      },
      [conditionRow, painScaleBeforeRow, painScaleAfterRow],
    );
    return rows;
  };

  const getRowGroupHeader = (rowTitle) => ({
    id: rowTitle,
    rowTitle: <b>{rowTitle}</b>,
    status: 'shouldBeEmpty',
  });

  const getButtonRow = () => ({
    rowTitle: 'AddRowButton',
    status: 'shouldBeEmpty',
  });

  const emptyRow = {
    rowTitle: '',
    procedureArea: '',
    status: '',
    planned: '',
    completed: '',
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
        accessor: 'rowTitle',
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
    const tableRows = [
      getRowGroupHeader('1. Обезболивание/противовоспалительная'),
      ...getStageRows(attendances, 'firstStage', statuses),
      getButtonRow(),
      getRowGroupHeader('2. Мобилизация'),
      ...getStageRows(attendances, 'secondStage', statuses),
      getButtonRow(),
      getRowGroupHeader('3. НМА и стабилизация'),
      ...getStageRows(attendances, 'thirdStage', statuses),
      getButtonRow(),
      getRowGroupHeader('4. Восстановление функций миофасциальных лент'),
      ...getStageRows(attendances, 'fourthStage', statuses),
      getButtonRow(),
      getRowGroupHeader('5. Профилактика дома'),
      ...getStageRows(attendances, 'fifthStage', statuses),
      getButtonRow(),
      ...getDynamicAndPainScaleRows(attendances),
    ];
    setHeaderTitles(dynamicColumns);
    setChartData(tableRows);
  }, [attendances, statuses]);

  return (
    <ScopedCssBaseline>
      <Container>
        <PatientInfo patient={patient} medic={medic} diagnosis={diagnosis} redFlags={redFlags} />
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
