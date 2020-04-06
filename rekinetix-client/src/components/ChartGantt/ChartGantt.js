import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

function hoursToMilliseconds(hours) {
  return hours * 60 * 60 * 1000;
}

const ChartGantt = ({ healingPlan }) => {
  const [chartData, setChartData] = useState([]);
  const [chartHeight, setChartHeight] = useState(400);

  useEffect(() => {
    if (healingPlan) {
      const procedures = [
        ...healingPlan.firstStage.procedures,
        ...healingPlan.secondStage.procedures,
        ...healingPlan.thirdStage.procedures,
        ...healingPlan.fourthStage.procedures,
        ...healingPlan.fifthStage.procedures,
      ];
      const chartData = procedures.reduce(
        (acc, { id, title, status, dates }) => {
          const populatedProcedures = dates.map((date, index) => [
            id + index,
            title,
            status,
            date,
            null,
            daysToMilliseconds(1),
            0,
            null,
          ]);
          acc = [...acc, ...populatedProcedures];
          return acc;
        },
        [],
      );
      setChartData(chartData);
      setChartHeight(chartData.length * 35 + 30);
      console.dir(chartData);
    }
  }, [healingPlan]);

  return (
    <Chart
      width={'100%'}
      height={chartHeight}
      chartType="Gantt"
      loader={<div>Loading Chart</div>}
      data={[
        [
          { type: 'string', label: 'ID' },
          { type: 'string', label: 'Название' },
          { type: 'string', label: 'Статус' },
          { type: 'date', label: 'Дата начала' },
          { type: 'date', label: 'Дата завершения' },
          { type: 'number', label: 'Длительность' },
          { type: 'number', label: 'Процент выполнения' },
          { type: 'string', label: 'Зависимости' },
        ],
        ...chartData,
      ]}
      options={{
        gantt: {
          trackHeight: 30,
        },
      }}
      rootProps={{ 'data-testid': '2' }}
    />
  );
};

export default ChartGantt;
