import React from 'react';
import './DynamicIndicators.css';
import DailyDinamicsTypes from '../../DailyDynamicsTypes';

const ColorIndicator = ({ cellValue }) => {
  return (
    <>
      {{
        [DailyDinamicsTypes[1]]: <span className="status status_warning"></span>,
        [DailyDinamicsTypes[2]]: <span className="status status_success"></span>,
        [DailyDinamicsTypes[0]]: <span className="status status_danger"></span>,
      }[cellValue] || `${cellValue}`}
    </>
  );
};

const DynamicIndicators = ({
  value,
  row: {
    original: { role },
  },
}) => {
  if (value !== 0 && !value) {
    return '';
  } else if (role === 'PROCEDURE_DATA' || role === 'PATIENT_DYNAMIC') {
    return <ColorIndicator cellValue={value} />;
  } else {
    return value;
  }
};

export default DynamicIndicators;
