import React, { useMemo, useState, useEffect } from 'react';

import Table from './Table/Table';

const HealingPlanChart = ({ healingPlan }) => {
  const [data, setChartData] = useState([]);

  const getProcedures = (planData) => [
    ...planData.firstStage.procedures,
    ...planData.secondStage.procedures,
    ...planData.thirdStage.procedures,
    ...planData.fourthStage.procedures,
    ...planData.fifthStage.procedures,
  ];

  const columns = useMemo(
    () => [
      {
        columns: [
          {
            id: 'procedureTitle',
            Header: 'Что делаем',
            accessor: 'title',
          },
          {
            id: 'procedureTitle',
            Header: 'На что направлено',
            accessor: 'targetArea',
          },
          {
            id: 'procedureTitle',
            Header: 'Статус',
            accessor: 'status',
          },
          {
            id: 'procedureTitle',
            Header: 'План',
            accessor: 'planned',
          },
          {
            id: 'procedureTitle',
            Header: 'Факт',
            accessor: 'completed',
          },
        ],
      },
    ],
    [],
  );

  useEffect(() => {
    const procedures = getProcedures(healingPlan);
    setChartData([...procedures]);
  }, [healingPlan]);

  return (
    <div>
      {data && data.length > 0 && (
        <Table columns={columns} data={data} />
      )}
    </div>
  );
};

export default HealingPlanChart;
