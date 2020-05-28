import { format } from 'date-fns';

import DailyDynamicsTypes from './DailyDynamicsTypes';

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

const utilities = {
  getDates,
  getStageRows,
  getDynamicAndPainScaleRows,
}

export default utilities;
