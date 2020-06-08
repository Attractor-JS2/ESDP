import { format } from 'date-fns';

import DailyDynamicsTypes from './DailyDynamicsTypes';
import stageTypes from './stageTypes';
import getAttendanceDTO from './attendanceDTO';

const getFormattedDate = (dateIsoString) =>
  format(new Date(dateIsoString), 'yyyy-MM-dd');

const getDates = (attendances) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  if (attendances && attendances.length > 0) {
    const dates = attendances.map(({ attendanceDate }) => {
      return getFormattedDate(attendanceDate);
    });
    if (!dates.includes(today)) dates.push(today);
    dates.sort((a, b) => new Date(a) - new Date(b));
    return dates;
  } else {
    return [today];
  }
};

const getStageProcedures = (allProcedures, stageNumber) => {
  return allProcedures.filter(({ stage }) => stage === stageNumber);
};

const getRowsFromProcedures = (procedures) => {
  return procedures.reduce(
    (
      acc,
      {
        _id,
        procedureName,
        procedureArea,
        procedureQuantity,
        status,
        stage,
        comments,
      },
    ) => {
      return [
        ...acc,
        {
          _id: _id,
          targetArea: procedureArea,
          procedureName: procedureName,
          comments: comments || '',
          status: status,
          planned: procedureQuantity,
          completed: 0,
          stageNumber: stage,
          role: 'PROCEDURE_DATA',
        },
      ];
    },
    [],
  );
};

const getStageRowsFromPlan = (planProcedures, stageNumber) => {
  const stageProcedures = getStageProcedures(planProcedures, stageNumber);
  return getRowsFromProcedures(stageProcedures);
};

const isRowRemovable = (row) => {
  return row.status === 'запланировано' && row.completed === 0;
};

const addRowStatusRemovable = (rows) => {
  return rows.map((row) => {
    if (!isRowRemovable(row)) return row;
    return {
      ...row,
      deleteControl: 'DeleteRowButton',
    };
  });
};

const populateRowsWithAttendance = (rows, attendance) => {
  const { procedureDynamics, attendanceDate } = attendance;
  return rows.map((row) => {
    const { _id } = row;
    const formattedDate = getFormattedDate(attendanceDate);
    const curProcedureDynamics = procedureDynamics.find(
      ({ procedure }) => procedure._id === _id,
    );
    if (curProcedureDynamics) {
      const { procedureDynamic } = curProcedureDynamics;
      return {
        ...row,
        [formattedDate]: DailyDynamicsTypes[procedureDynamic],
        completed: row.completed + 1,
      };
    } else {
      return row;
    }
  });
};

const getPopulatedRowsWithAttendances = (rowsData, attendancesData) => {
  return attendancesData.reduce((rows, attendance) => {
    return populateRowsWithAttendance(rows, attendance);
  }, rowsData);
};

const getStageRows = (stageNumber, planProcedures, attendances) => {
  const stageRowsFromPlan = getStageRowsFromPlan(planProcedures, stageNumber);
  const populatedRows = getPopulatedRowsWithAttendances(
    stageRowsFromPlan,
    attendances,
  );
  const stageRows = addRowStatusRemovable(populatedRows);
  return stageRows;
};

const getDynamicAndPainScaleRows = (attendances) => {
  const conditionRow = {
    targetArea: 'Состояние пациента',
    role: 'PATIENT_DYNAMIC',
  };
  const painScaleBeforeRow = { targetArea: 'Шкала боли до' };
  const painScaleAfterRow = { targetArea: 'Шкала боли после' };

  return attendances.reduce(
    (rows, curAttendance) => {
      const {
        attendanceDate,
        patientDynamic,
        beforeAttendance: { pain: painBefore },
        afterAttendance: { pain: painAfter },
      } = curAttendance;
      const date = getFormattedDate(attendanceDate);
      rows[0][date] = DailyDynamicsTypes[patientDynamic];
      rows[1][date] = painBefore;
      rows[2][date] = painAfter;
      return rows;
    },
    [conditionRow, painScaleBeforeRow, painScaleAfterRow],
  );
};

const getProcedureFromRow = (row) => ({
  _id: row._id,
  procedureName: row.procedureName,
  procedureArea: row.targetArea,
  comments: row.comments,
  procedureDynamic: 1,
  procedureIsNew: false,
});

const getDataByIndexes = (array, indexes) =>
  array.filter((_, id) => indexes.includes(id));

const mapRowsToAttendance = (rows) =>
  rows.reduce(
    (acc, { stageNumber, ...rest }) => {
      const mappedProcedure = getProcedureFromRow(rest);
      const stageKey = stageTypes[stageNumber];
      acc[stageKey].push(mappedProcedure);
      return acc;
    },
    { ...getAttendanceDTO() },
  );

const getAttendanceValuesFromTable = (selectedRowIds, tableData) => {
  const selectedRows = getDataByIndexes(
    tableData,
    Object.keys(selectedRowIds).map((x) => parseInt(x, 10)),
  );
  const procedureRows = selectedRows.filter(
    ({ role }) => role && role === 'PROCEDURE_DATA',
  );
  const attendance = mapRowsToAttendance(procedureRows);
  return attendance;
};

const utilities = {
  getDates,
  getStageRows,
  getDynamicAndPainScaleRows,
  getAttendanceValuesFromTable,
};

export default utilities;
