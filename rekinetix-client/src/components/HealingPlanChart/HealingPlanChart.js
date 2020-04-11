import React, { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';

import Table from './Table/Table';
import DynamicBadges from './Table/DynamicBadges/DynamicBadges';

const HealingPlanChart = ({ healingPlan }) => {
  const [chartData, setChartData] = useState([]);
  const [attendedDates, setAttendedDates] = useState([]);
  const [dateHeaderTitles, setHeaderTitles] = useState([]);

  const getProcedures = (planData) => [
    getRowGroupHeader(planData.firstStage.title),
    ...planData.firstStage.procedures,
    getRowGroupHeader(planData.secondStage.title),
    ...planData.secondStage.procedures,
    getRowGroupHeader(planData.thirdStage.title),
    ...planData.thirdStage.procedures,
    getRowGroupHeader(planData.fourthStage.title),
    ...planData.fourthStage.procedures,
    getRowGroupHeader(planData.fifthStage.title),
    ...planData.fifthStage.procedures,
  ];

  const getDates = (proceduresArray) => {
    return proceduresArray.reduce((acc, { attendances }) => {
      const allDates = attendances.map(({ dateTime }) => dateTime.toString());
      const uniqueDates = allDates.filter((curDate) => {
        if (!acc.includes(curDate)) return curDate;
      });
      return [...acc, ...uniqueDates];
    }, []);
  };

  const getChartData = (allProcedures, dateTitles) => {
    return allProcedures.reduce((acc, procedure) => {
      const { attendances } = procedure;
      const reducedDates = attendances.reduce((acc, { dateTime, dynamic }) => {
        const stringDate = format(new Date(dateTime), 'yyyy-MM-dd');
        return { ...acc, [stringDate]: dynamic };
      }, {});

      const rowData = {
        ...procedure,
        ...dateTitles.reduce((acc, currentDate) => {
          const curAttendance = {
            [currentDate]: reducedDates[currentDate] || '',
          };
          return { ...acc, ...curAttendance };
        }, {}),
      };

      return [...acc, rowData];
    }, []);
  };

  const getRowGroupHeader = (rowTitle) => ({
    id: rowTitle,
    title: rowTitle,
    targetArea: '',
    status: '',
    planned: '',
    completed: '',
    attendances: [],
  });

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
    setAttendedDates([...dynamicHeaders]);
  }, [healingPlan]);

  useEffect(() => {
    const formattedDates = attendedDates.map((dateString) => {
      return format(new Date(dateString), 'yyyy-MM-dd');
    });
    const dynamicColumns = formattedDates.map((title) => ({
      id: title,
      Header: title,
      accessor: `${title}`,
      Cell: ({ cell: { value } }) => <DynamicBadges values={value} />,
    }));

    const procedures = getProcedures(healingPlan);
    const dynamicData = getChartData(procedures, formattedDates);

    setHeaderTitles([...dynamicColumns]);
    setChartData([...dynamicData]);
  }, [attendedDates]);

  return (
    <div>
      {chartData && chartData.length > 0 && (
        <Table columns={columns} data={chartData} />
      )}
    </div>
  );
};

export default HealingPlanChart;
