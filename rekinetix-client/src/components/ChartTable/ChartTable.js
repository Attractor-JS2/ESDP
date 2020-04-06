import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import { format } from 'date-fns';

const ChartTable = ({ healingPlan }) => {
  const [chartData, setChartData] = useState([]);
  const [headerDates, setDates] = useState([]);
  const [dateTitles, setDateTitles] = useState([]);

  const tableHeaders = [
    { type: 'string', label: 'Что делаем' },
    { type: 'string', label: 'На что направлено' },
    { type: 'string', label: 'Статус' },
    { type: 'string', label: 'План' },
    { type: 'string', label: 'Факт' },
  ];

  const getProcedures = (plan) => {
    return [
      ...healingPlan.firstStage.procedures,
      ...healingPlan.secondStage.procedures,
      ...healingPlan.thirdStage.procedures,
      ...healingPlan.fourthStage.procedures,
      ...healingPlan.fifthStage.procedures,
    ];
  };

  const getDates = (proceduresArray) => {
    return proceduresArray.reduce((acc, { dates }) => {
      const procedureDates = dates.map((date) => date.toString());
      const uniqueDates = procedureDates.filter((curDate) => {
        if (!acc.includes(curDate)) return curDate;
      });
      return [...acc, ...uniqueDates];
    }, []);
  };

  const getChartData = (proceduresArray, datesArray) => {
    return proceduresArray.reduce(
      (acc, { id, title, targetArea, status, planned, completed, dates }) => {
        const rowData = datesArray.map((curColumnDate) => {
          if (dates.map(date => date.toString()).includes(curColumnDate)) return status;
          return '';
        });
        const flattenedProcedure = [
          title,
          targetArea,
          status,
          planned,
          completed,
          ...rowData,
        ];
        return [...acc, flattenedProcedure];
      },
      [],
    );
  };

  useEffect(() => {
    if (healingPlan) {
      const procedures = getProcedures(healingPlan);
      const headers = getDates(procedures);
      setDates([...headers]);
    }
  }, [healingPlan]);

  useEffect(() => {
    const curDateTitles = headerDates.map((curDateString) => {
      return format(new Date(curDateString), 'yyyy-MM-dd');
    });
    const procedures = getProcedures(healingPlan);
    const curChartData = getChartData(procedures, headerDates);
    setDateTitles(curDateTitles);
    setChartData(curChartData);
  }, [headerDates]);

  return (
    <div className="container">
      <Chart
        width={'100%'}
        height={'500px'}
        chartType="Table"
        loader={<div>Loading Chart</div>}
        data={[[...tableHeaders, ...dateTitles], ...chartData]}
        options={{
          showRowNumber: true,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default ChartTable;
