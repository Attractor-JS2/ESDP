import React from 'react';
import './DynamicBadges.css'
import DailyDinamicsTypes from '../../DailyDynamicsTypes';

const DynamicBadges = ({ values }) => {
  if (values !== 0 && !values) return '';
  return (
    <>
      {{
        [DailyDinamicsTypes[1]]: <span className="status status_warning"></span>,
        [DailyDinamicsTypes[2]]: <span className="status status_success"></span>,
        [DailyDinamicsTypes[0]]: <span className="status status_danger"></span>,
      }[values] || `${values}`}
    </>
  );
};

export default DynamicBadges;
