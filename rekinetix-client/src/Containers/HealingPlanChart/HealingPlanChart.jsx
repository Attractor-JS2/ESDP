import React, { useMemo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import queryString from 'query-string';
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
  fetchPlanById,
} from '../../store/actions/healingPlan';
import {
  fetchAttendancesByHealingPlan,
  proceedToAttendance,
} from '../../store/actions/attendances';
import utilities from './utilities/utilities';

const HealingPlanChart = ({
  healingPlan,
  attendances,
  currentPatient,
  fetchPlanByAssessment,
  fetchPlanById,
  fetchAttendances,
  removeProcedure,
  updateProcedureStatus,
  proceedToAttendance,
}) => {
  const [dateHeaderTitles, setHeaderTitles] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isProcedureBeingAdded, setIsAdding] = useState(false);
  const [currentStage, setCurrentStage] = useState('');
  const [isProcedureBeingDeleted, setIsDeleting] = useState(false);
  const [deletedProcedureId, setToDelete] = useState(null);
  const { planId } = useParams();
  const { search } = useLocation();
  const searchParams = queryString.parse(search);

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
    removeProcedure(procedureId);
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
    if (planId) {
      fetchPlanById(planId);
    } else if (searchParams.primaryAssessment) {
      fetchPlanByAssessment(searchParams.primaryAssessment);
    } else if (
      currentPatient &&
      currentPatient.primaryAssessment &&
      currentPatient.primaryAssessment._id
    ) {
      fetchPlanByAssessment(currentPatient.primaryAssessment._id);
    }
  }, [currentPatient, planId, fetchPlanByAssessment]);

  useEffect(() => {
    if (healingPlan && healingPlan._id) {
      fetchAttendances(healingPlan._id);
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
          currentPatient={currentPatient}
          healingPlan={healingPlan}
        />

        {chartData && chartData.length > 0 && (
          <Table
            columns={columns}
            data={chartData}
            addProcedureHandler={addProcedureHandler}
            proceedToDeleteProcedure={proceedToDeleteProcedure}
            updateSelectData={updateProcedureStatus}
            handleProceed={proceedToAttendance}
          />
        )}
      </Container>
    </ScopedCssBaseline>
  );
};

const mapStateToProps = (state) => ({
  currentPatient: state.patients.currentPatient,
  healingPlan: state.healingPlan.healingPlan,
  attendances: state.attendances.attendances,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPlanByAssessment: (primaryAssessmentId) =>
    dispatch(fetchPlanByPrimaryAssessment(primaryAssessmentId)),
  fetchPlanById: (healingPlanId) => dispatch(fetchPlanById(healingPlanId)),
  fetchAttendances: (healingPlanId) =>
    dispatch(fetchAttendancesByHealingPlan(healingPlanId)),
  removeProcedure: (stage, procedureName) =>
    dispatch(removeProcedureFromPlan(stage, procedureName)),
  proceedToAttendance: (attendanceData) =>
    dispatch(proceedToAttendance(attendanceData)),
  updateProcedureStatus: (procedureId, status) =>
    dispatch(updateProcedureStatus(procedureId, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HealingPlanChart);
