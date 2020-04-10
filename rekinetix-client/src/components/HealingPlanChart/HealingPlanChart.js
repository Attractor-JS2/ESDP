import React, { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';

import Table from './Table/Table';

const HealingPlanChart = ({ healingPlan }) => {
  const [chartData, setChartData] = useState([]);
  const [attendedDates, setAttendedDates] = useState([]);
  const [dateHeaderTitles, setHeaderTitles] = useState([]);

  const getProcedures = (planData) => [
    ...planData.firstStage.procedures,
    ...planData.secondStage.procedures,
    ...planData.thirdStage.procedures,
    ...planData.fourthStage.procedures,
    ...planData.fifthStage.procedures,
  ];

  const getDates = (proceduresArray) => {
    return proceduresArray.reduce((acc, { dates }) => {
      const allDates = dates.map((date) => date.toString());
      const uniqueDates = allDates.filter((curDate) => {
        if (!acc.includes(curDate)) return curDate;
      });
      return [...acc, ...uniqueDates];
    }, []);
  };

  const columns = useMemo(
    () => [
      {
        id: 'procedureTitle',
        Header: 'Что делаем',
        accessor: 'title',
      },
      {
        id: 'procedureTarget',
        Header: 'На что направлено',
        accessor: 'targetArea',
      },
      {
        id: 'procedureStatus',
        Header: 'Статус',
        accessor: 'status',
      },
      {
        id: 'procedurePlan',
        Header: 'План',
        accessor: 'planned',
      },
      {
        id: 'procedureFact',
        Header: 'Факт',
        accessor: 'completed',
      },
      ...dateHeaderTitles,
    ],
    [dateHeaderTitles],
  );

  useEffect(() => {
    const procedures = getProcedures(healingPlan);
    const dynamicHeaders = getDates(procedures);
    setChartData([...procedures]);
    setAttendedDates([...dynamicHeaders]);
  }, [healingPlan]);

  useEffect(() => {
    const formattedDates = attendedDates.map((dateString) => {
      return format(new Date(dateString), 'yyyy-MM-dd');
    });
    const dynamicColumns = formattedDates.map((title) => ({
      id: title,
      Header: title,
      accessor: 'status'
    }))
    setHeaderTitles([...dynamicColumns]);
  }, [attendedDates]);

  return (
    <div>
      {chartData && chartData.length > 0 && <Table columns={columns} data={chartData} />}
    </div>
  );
};

export default HealingPlanChart;
