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
    setDateTitles(curDateTitles);
  }, [headerDates]);

  return (
    <Chart
      width={'500px'}
      height={'300px'}
      chartType="Table"
      loader={<div>Loading Chart</div>}
      data={[[...tableHeaders, ...dateTitles]]}
      options={{
        showRowNumber: true,
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default ChartTable;
