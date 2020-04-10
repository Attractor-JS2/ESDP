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
        Header: 'План лечения',
        columns: [
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
      {data && data.length > 0 && <Table columns={columns} data={data} />}
    </div>
  );
}

export default HealingPlanChart;
