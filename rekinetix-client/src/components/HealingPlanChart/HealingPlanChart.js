import React, { useMemo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import Container from '@material-ui/core/Container';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import Table from './Table/Table';
import DynamicBadges from './Table/DynamicBadges/DynamicBadges';
import AddActionButton from './Table/AddActionButton/AddActionButton';
import EditableStatusSelect from './Table/EditableStatusSelect/EditableStatusSelect';
import PatientInfo from './PatientInfo/PatientInfo';
import { fetchHealingPlan } from '../../store/actions/healingPlan';

const HealingPlanChart = ({
  healingPlan,
  attendances,
  redFlags,
  patient,
  medic,
  diagnosis,
  onFetchHealingPlan,
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

  const getStageRowsFromPlan = (planData, stage) => {
    const procedures = [...planData[stage]];
    return procedures.reduce(
      (acc, { procedureName, procedureArea, procedureQuantity, status }) => {
        return [
          ...acc,
          {
            rowTitle: procedureName,
            procedureArea,
            status,
            planned: procedureQuantity,
            completed: 0,
          },
        ];
      },
      [],
    );
  };

  const getStageRows = (attendances, stage, planData) => {
    let planStageRows = getStageRowsFromPlan(planData, stage);

    if (attendances && Array.isArray(attendances) && attendances.length > 0) {
      attendances.forEach((curAttendance) => {
        const { attendanceDate } = curAttendance;
        const formattedDate = format(new Date(attendanceDate), 'yyyy-MM-dd');
        const stageProcedures = [...curAttendance[stage]];
        stageProcedures.forEach((procedure) => {
          const rowIndex = planStageRows.findIndex(
            ({ rowTitle }) => rowTitle === procedure.procedureName,
          );
          if (rowIndex >= 0) {
            planStageRows[rowIndex] = {
              ...planStageRows[rowIndex],
              completed: planStageRows[rowIndex].completed + 1,
              [formattedDate]: procedure.procedureDynamic,
            };
          } else {
            const procedureAbsentInPlan = {
              ...procedure,
              rowTitle: procedure.procedureName,
              status: 'действует',
              planned: '',
              completed: 1,
              [formattedDate]: procedure.procedureDynamic,
            };
            planStageRows = [...planStageRows, procedureAbsentInPlan];
          }
        });
      });
    }

    return planStageRows;
  };

  const getDynamicAndPainScaleRows = (attendances) => {
    const conditionRow = { rowTitle: 'Состояние пациента' };
    const painScaleBeforeRow = { rowTitle: 'Шкала боли до' };
    const painScaleAfterRow = { rowTitle: 'Шкала боли после' };
    if (attendances && Array.isArray(attendances) && attendances.length > 0) {
      const rows = attendances.reduce(
        (acc, curAttendance) => {
          const {
            attendanceDate,
            patientDynamic,
            beforeAttendance: { pain: painBefore },
            afterAttendance: { pain: painAfter },
          } = curAttendance;
          const formattedDate = format(new Date(attendanceDate), 'yyyy-MM-dd');
          acc[0] = {
            ...acc[0],
            [formattedDate]: patientDynamic,
          };
          acc[1] = {
            ...acc[1],
            [formattedDate]: painBefore,
          };
          acc[2] = {
            ...acc[2],
            [formattedDate]: painAfter,
          };
          return acc;
        },
        [conditionRow, painScaleBeforeRow, painScaleAfterRow],
      );
      return rows;
    } else {
      return [conditionRow, painScaleBeforeRow, painScaleAfterRow];
    }
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
    onFetchHealingPlan();
  }, []);

  useEffect(() => {
    console.dir(healingPlan);
  }, [healingPlan]);

  useEffect(() => {
    const formattedDates = getDates(attendances);
    const dynamicColumns = formattedDates.map((title) => ({
      id: title,
      Header: title,
      accessor: `${title}`,
      Cell: ({ cell: { value } }) => <DynamicBadges values={value} />,
    }));
    setHeaderTitles(dynamicColumns);
  }, [attendances]);

  useEffect(() => {
    if (healingPlan && Object.keys(healingPlan).length > 0) {
      const tableRows = [
        getRowGroupHeader('1. Обезболивание/противовоспалительная'),
        ...getStageRows(attendances, 'firstStage', healingPlan),
        getButtonRow(),
        getRowGroupHeader('2. Мобилизация'),
        ...getStageRows(attendances, 'secondStage', healingPlan),
        getButtonRow(),
        getRowGroupHeader('3. НМА и стабилизация'),
        ...getStageRows(attendances, 'thirdStage', healingPlan),
        getButtonRow(),
        getRowGroupHeader('4. Восстановление функций миофасциальных лент'),
        ...getStageRows(attendances, 'fourthStage', healingPlan),
        getButtonRow(),
        getRowGroupHeader('5. Профилактика дома'),
        ...getStageRows(attendances, 'fifthStage', healingPlan),
        getButtonRow(),
        ...getDynamicAndPainScaleRows(attendances),
      ];
      setChartData(tableRows);
    }
  }, [healingPlan, attendances]);

  return (
    <ScopedCssBaseline>
      <Container>
        <PatientInfo
          patient={patient}
          medic={medic}
          diagnosis={diagnosis}
          redFlags={redFlags}
        />
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

const mapStateToProps = (state) => ({
  healingPlan: state.healingPlan.healingPlan,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchHealingPlan: () => dispatch(fetchHealingPlan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HealingPlanChart);
