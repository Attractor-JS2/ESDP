import React, { useMemo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import Container from '@material-ui/core/Container';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import './HealingPlanChart.css';
import Table from './Table/Table';
import DynamicBadges from './Table/DynamicBadges/DynamicBadges';
import AddActionButton from './Table/AddActionButton/AddActionButton';
import DeleteActionButton from './Table/DeleteActionButton/DeleteActionButton';
import EditableStatusSelect from './Table/EditableStatusSelect/EditableStatusSelect';
import PatientInfo from './PatientInfo/PatientInfo';
import AddProcedureForm from './AddProcedureForm/AddProcedureForm';
import ConfirmDialog from './ConfirmDialog/ConfirmDialog';
import {
  fetchHealingPlan,
  removeProcedureFromPlan,
} from '../../store/actions/healingPlan';
import {
  fetchAttendanceData,
  proceedToAttendance,
} from '../../store/actions/attendance';
import DailyDynamicsTypes from './DailyDynamicsTypes';

const HealingPlanChart = ({
  healingPlan,
  attendance,
  redFlags,
  patient,
  medic,
  diagnosis,
  onFetchHealingPlan,
  onFetchAttendances,
  onProcedureDelete,
  onProceedToAttendance,
}) => {
  const [dateHeaderTitles, setHeaderTitles] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isProcedureAdding, setAddProcedure] = useState(false);
  const [currentStage, setCurrentStage] = useState('');
  const [isProcedureDeleting, setDeleting] = useState(false);
  const [deletedProcedure, setToDelete] = useState({});

  const getDates = (attendances) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (
      attendances &&
      attendances.length > 0 &&
      Object.keys(attendances[0]).length > 0
    ) {
      const dates = attendances.map(({ attendanceDate }) => {
        return format(new Date(attendanceDate), 'yyyy-MM-dd');
      });
      if (!dates.includes(today)) dates.push(today);
      dates.sort((a, b) => new Date(a) - new Date(b));
      return [...dates];
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
            stage,
            purpose: 'procedureData',
          },
        ];
      },
      [],
    );
  };

  const isRowDeletable = (row) => {
    return row.status === 'запланировано' && row.completed === 0;
  };

  const addRowDeleteCondition = (rows) => {
    return rows.map((row) => {
      if (!isRowDeletable(row)) return row;
      return {
        ...row,
        deleteControl: 'DeleteRowButton',
      };
    });
  };

  const getStageRows = (attendances, stage, planData) => {
    let planStageRows = getStageRowsFromPlan(planData, stage);

    if (
      attendances &&
      Array.isArray(attendances) &&
      attendances.length > 0 &&
      Object.keys(attendances[0]).length > 0
    ) {
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
              [formattedDate]: DailyDynamicsTypes[procedure.procedureDynamic],
            };
          } else {
            const procedureAbsentInPlan = {
              ...procedure,
              rowTitle: procedure.procedureName,
              status: 'действует',
              planned: '',
              completed: 1,
              [formattedDate]: DailyDynamicsTypes[procedure.procedureDynamic],
              stage: stage,
              purpose: 'procedureData',
            };
            planStageRows = [...planStageRows, procedureAbsentInPlan];
          }
        });
      });
    }

    const stageRows = addRowDeleteCondition(planStageRows);

    return stageRows;
  };

  const getDynamicAndPainScaleRows = (attendances) => {
    const conditionRow = { rowTitle: 'Состояние пациента' };
    const painScaleBeforeRow = { rowTitle: 'Шкала боли до' };
    const painScaleAfterRow = { rowTitle: 'Шкала боли после' };
    if (
      attendances &&
      Array.isArray(attendances) &&
      attendances.length > 0 &&
      Object.keys(attendances[0]).length > 0
    ) {
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
            [formattedDate]: DailyDynamicsTypes[patientDynamic],
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

  const getButtonRow = (stage) => ({
    rowTitle: 'AddRowButton',
    status: 'shouldBeEmpty',
    stage,
  });

  const addProcedureHandler = (stageType) => {
    setCurrentStage(stageType);
    setAddProcedure(true);
  };

  const cancelProcedureAdding = () => {
    setAddProcedure(false);
  };

  const cancelProcedureDeleting = () => {
    setToDelete({ stage: undefined, rowTitle: undefined });
    setDeleting(false);
  };

  const proceedToDeleteProcedure = (row) => {
    const { stage, rowTitle } = row;
    setToDelete({ stage, rowTitle });
    setDeleting(true);
  };

  const procedureDeleteHandler = (planStage, procedureName) => {
    onProcedureDelete(planStage, procedureName);
    cancelProcedureDeleting();
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
        id: 'deleteBtnColumn',
        Header: '',
        accessor: 'deleteControl',
        Cell: DeleteActionButton,
      },
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
    onFetchAttendances();
  }, []);

  useEffect(() => {
    const attendances = [{ ...attendance }]; // Изменить при подключении БД. Так как сейчас приходит один объект приёма я из него сформировал массив.
    const formattedDates = getDates(attendances);
    const dynamicColumns = formattedDates.map((title) => ({
      id: title,
      Header: title,
      accessor: `${title}`,
      Cell: ({ cell: { value } }) => <DynamicBadges values={value} />,
    }));
    setHeaderTitles(dynamicColumns);
  }, [attendance]);

  useEffect(() => {
    const attendances = [{ ...attendance }]; // Изменить при подключении БД. Так как сейчас приходит один объект приёма я из него сформировал массив.
    if (healingPlan && Object.keys(healingPlan).length > 0) {
      const tableRows = [
        getRowGroupHeader('1. Обезболивание/противовоспалительная'),
        ...getStageRows(attendances, 'firstStage', healingPlan),
        getButtonRow('firstStage'),
        getRowGroupHeader('2. Мобилизация'),
        ...getStageRows(attendances, 'secondStage', healingPlan),
        getButtonRow('secondStage'),
        getRowGroupHeader('3. НМА и стабилизация'),
        ...getStageRows(attendances, 'thirdStage', healingPlan),
        getButtonRow('thirdStage'),
        getRowGroupHeader('4. Восстановление функций миофасциальных лент'),
        ...getStageRows(attendances, 'fourthStage', healingPlan),
        getButtonRow('fourthStage'),
        getRowGroupHeader('5. Профилактика дома'),
        ...getStageRows(attendances, 'fifthStage', healingPlan),
        getButtonRow('fifthStage'),
        ...getDynamicAndPainScaleRows(attendances),
      ];
      setChartData(tableRows);
    }
  }, [healingPlan, attendance]);

  return (
    <ScopedCssBaseline>
      <Container className="HealingPlanChart-content">
        <AddProcedureForm
          open={isProcedureAdding}
          handleClose={cancelProcedureAdding}
          selectedStage={currentStage}
        />
        <ConfirmDialog
          open={isProcedureDeleting}
          handleConfirm={() =>
            procedureDeleteHandler(
              deletedProcedure.stage,
              deletedProcedure.rowTitle,
            )
          }
          handleClose={cancelProcedureDeleting}
          procedure={deletedProcedure}
        />
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
            addProcedureHandler={addProcedureHandler}
            proceedToDeleteProcedure={proceedToDeleteProcedure}
            updateSelectData={updateProcedureStatus}
            handleProceed={onProceedToAttendance}
          />
        )}
      </Container>
    </ScopedCssBaseline>
  );
};

const mapStateToProps = (state) => ({
  healingPlan: state.healingPlan.healingPlan,
  attendance: state.attendance,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchHealingPlan: () => dispatch(fetchHealingPlan()),
  onFetchAttendances: () => dispatch(fetchAttendanceData()),
  onProcedureDelete: (stage, procedureName) =>
    dispatch(removeProcedureFromPlan(stage, procedureName)),
  onProceedToAttendance: (attendanceData) =>
    dispatch(proceedToAttendance(attendanceData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HealingPlanChart);
