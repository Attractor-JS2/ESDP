import React, { useMemo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
  fetchPlanByPrimaryAssessment,
  removeProcedureFromPlan,
} from '../../store/actions/healingPlan';
import {
  fetchAttendanceData,
  proceedToAttendance,
} from '../../store/actions/attendance';
import utilities from './utilities';


import mockPatient from './mockPatientData';

const HealingPlanChart = ({
  healingPlan,
  attendance,
  patient,
  medic,
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
    onFetchHealingPlan(patient.primaryAssessment._id);
    onFetchAttendances();
  }, []);

  useEffect(() => {
    const attendances = [{ ...attendance }]; // Изменить при подключении БД. Так как сейчас приходит один объект приёма я из него сформировал массив.
    const formattedDates = utilities.getDates(attendances);
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
        ...utilities.getStageRows(attendances, 'firstStage', healingPlan),
        getButtonRow('firstStage'),
        getRowGroupHeader('2. Мобилизация'),
        ...utilities.getStageRows(attendances, 'secondStage', healingPlan),
        getButtonRow('secondStage'),
        getRowGroupHeader('3. НМА и стабилизация'),
        ...utilities.getStageRows(attendances, 'thirdStage', healingPlan),
        getButtonRow('thirdStage'),
        getRowGroupHeader('4. Восстановление функций миофасциальных лент'),
        ...utilities.getStageRows(attendances, 'fourthStage', healingPlan),
        getButtonRow('fourthStage'),
        getRowGroupHeader('5. Профилактика дома'),
        ...utilities.getStageRows(attendances, 'fifthStage', healingPlan),
        getButtonRow('fifthStage'),
        ...utilities.getDynamicAndPainScaleRows(attendances),
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
          patient={patient.patient.fullname}
          medic={medic}
          diagnosis={patient.primaryAssessment.diagnosis}
          redFlags={patient.redFlags}
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
  patient: mockPatient,
  healingPlan: state.healingPlan.healingPlan,
  attendance: state.attendance,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchHealingPlan: (primaryAssessmentId) =>
    dispatch(fetchPlanByPrimaryAssessment(primaryAssessmentId)),
  onFetchAttendances: () => dispatch(fetchAttendanceData()),
  onProcedureDelete: (stage, procedureName) =>
    dispatch(removeProcedureFromPlan(stage, procedureName)),
  onProceedToAttendance: (attendanceData) =>
    dispatch(proceedToAttendance(attendanceData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HealingPlanChart);
