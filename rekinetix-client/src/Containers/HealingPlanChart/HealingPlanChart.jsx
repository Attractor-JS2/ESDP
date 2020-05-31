import React, { useMemo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import './HealingPlanChart.css';
import Table from './Table/Table';
import DynamicIndicators from './Table/DynamicIndicators/DynamicIndicators';
import AddActionButton from './Table/AddActionButton/AddActionButton';
import DeleteActionButton from './Table/DeleteActionButton/DeleteActionButton';
import EditableStatusSelect from './Table/EditableStatusSelect/EditableStatusSelect';
import PatientInfo from './PatientInfo/PatientInfo';
import AddProcedureForm from './AddProcedureForm/AddProcedureForm';
import ConfirmDialog from './ConfirmDialog/ConfirmDialog';
import {
  fetchPlanByPrimaryAssessment,
  removeProcedureFromPlan,
  updateProcedureStatus,
} from '../../store/actions/healingPlan';
import {
  fetchAttendancesByHealingPlan,
  proceedToAttendance,
} from '../../store/actions/attendances';
import utilities from './utilities/utilities';

import mockPatient from './mockPatientData';

const HealingPlanChart = ({
  healingPlan,
  attendances,
  patient,
  medic,
  onFetchHealingPlan,
  onFetchAttendances,
  onProcedureDelete,
  onUpdateProcedureStatus,
  onProceedToAttendance,
}) => {
  const [dateHeaderTitles, setHeaderTitles] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isProcedureBeingAdded, setIsAdding] = useState(false);
  const [currentStage, setCurrentStage] = useState('');
  const [isProcedureBeingDeleted, setIsDeleting] = useState(false);
  const [deletedProcedureId, setToDelete] = useState(null);

  const getRowGroupHeader = (rowTitle) => ({
    id: rowTitle,
    targetArea: <b>{rowTitle}</b>,
  });

  const getAddProcedureButtonRow = (stageNumber) => ({
    targetArea: 'AddRowButton',
    stageNumber,
  });

  const addProcedureHandler = (stageNumber) => {
    setCurrentStage(stageNumber);
    setIsAdding(true);
  };

  const cancelProcedureAdding = () => {
    setIsAdding(false);
  };

  const cancelProcedureDeleting = () => {
    setToDelete({ stage: undefined, rowTitle: undefined });
    setIsDeleting(false);
  };

  const proceedToDeleteProcedure = (procedureId) => {
    setToDelete(procedureId);
    setIsDeleting(true);
  };

  const procedureDeleteHandler = (procedureId) => {
    onProcedureDelete(procedureId);
    cancelProcedureDeleting();
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
        Header: 'На что направлено',
        accessor: 'targetArea',
        Cell: AddActionButton,
      },
      {
        Header: 'Что делаем',
        accessor: 'procedureName',
      },
      {
        Header: 'Комментарии',
        accessor: 'comments',
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
  }, [patient]);

  useEffect(() => {
    if (healingPlan && healingPlan._id) {
      onFetchAttendances(healingPlan._id);
    }
  }, [healingPlan._id]);

  useEffect(() => {
    const formattedDates = utilities.getDates(attendances);
    const dynamicColumns = formattedDates.map((title) => ({
      id: title,
      Header: title,
      accessor: `${title}`,
      Cell: DynamicIndicators,
    }));
    setHeaderTitles(dynamicColumns);
  }, [attendances]);

  useEffect(() => {
    if (healingPlan && Object.keys(healingPlan).length > 0) {
      const tableRows = [
        getRowGroupHeader('1. Обезболивание/противовоспалительная'),
        ...utilities.getStageRows(1, healingPlan.procedures, attendances),
        getAddProcedureButtonRow(1),
        getRowGroupHeader('2. Мобилизация'),
        ...utilities.getStageRows(2, healingPlan.procedures, attendances),
        getAddProcedureButtonRow(2),
        getRowGroupHeader('3. НМА и стабилизация'),
        ...utilities.getStageRows(3, healingPlan.procedures, attendances),
        getAddProcedureButtonRow(3),
        getRowGroupHeader('4. Восстановление функций миофасциальных лент'),
        ...utilities.getStageRows(4, healingPlan.procedures, attendances),
        getAddProcedureButtonRow(4),
        getRowGroupHeader('5. Профилактика дома'),
        ...utilities.getStageRows(5, healingPlan.procedures, attendances),
        getAddProcedureButtonRow(5),
        ...utilities.getDynamicAndPainScaleRows(attendances),
      ];
      setChartData(tableRows);
    }
  }, [healingPlan, attendances]);

  return (
    <ScopedCssBaseline>
      <Container className="HealingPlanChart-content">
        <AddProcedureForm
          open={isProcedureBeingAdded}
          handleClose={cancelProcedureAdding}
          selectedStageNumber={currentStage}
        />

        <ConfirmDialog
          open={isProcedureBeingDeleted}
          handleConfirm={() => procedureDeleteHandler(deletedProcedureId)}
          handleClose={cancelProcedureDeleting}
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
            updateSelectData={onUpdateProcedureStatus}
            handleProceed={onProceedToAttendance}
          />
        )}
      </Container>
    </ScopedCssBaseline>
  );
};

const mapStateToProps = (state) => ({
  patient: mockPatient, // Временный мок
  healingPlan: state.healingPlan.healingPlan,
  attendances: state.attendances.attendances,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchHealingPlan: (primaryAssessmentId) =>
    dispatch(fetchPlanByPrimaryAssessment(primaryAssessmentId)),
  onFetchAttendances: (healingPlanId) =>
    dispatch(fetchAttendancesByHealingPlan(healingPlanId)),
  onProcedureDelete: (stage, procedureName) =>
    dispatch(removeProcedureFromPlan(stage, procedureName)),
  onProceedToAttendance: (attendanceData) =>
    dispatch(proceedToAttendance(attendanceData)),
  onUpdateProcedureStatus: (procedureId, status) =>
    dispatch(updateProcedureStatus(procedureId, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HealingPlanChart);
