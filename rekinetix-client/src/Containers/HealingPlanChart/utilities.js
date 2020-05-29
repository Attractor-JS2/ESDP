import { format } from 'date-fns';

import DailyDynamicsTypes from './DailyDynamicsTypes';

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
    return [...dates];
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
          role: 'procedureData',
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

const populateRowsWithAttendance = (rows, attendance) => {
  const { procedureDynamics, attendanceDate } = attendance;
  return rows.map((row) => {
    const { _id } = row;
    const formattedDate = getFormattedDate(attendanceDate);
    const curProcedureDynamics = procedureDynamics.find(
      ({ procedure }) => procedure._id === _id,
    );
    if (curProcedureDynamics) {
      const {procedureDynamic} = curProcedureDynamics;
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
  const stageRows = addRowDeleteCondition(populatedRows);
  return stageRows;
};

const getDynamicAndPainScaleRows = (attendances) => {
  const conditionRow = { targetArea: 'Состояние пациента' };
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

const utilities = {
  getDates,
  getStageRows,
  getDynamicAndPainScaleRows,
};

export default utilities;
