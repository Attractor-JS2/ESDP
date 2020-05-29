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
      console.log(curProcedureDynamics);
      return {
        ...row,
        [formattedDate]: curProcedureDynamics.procedureDynamic,
        completed: row.completed + 1
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

const utilities = {
  getDates,
  getStageRows,
  getDynamicAndPainScaleRows,
};

export default utilities;
