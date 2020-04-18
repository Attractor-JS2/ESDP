import React from 'react';
import './DynamicBadges.css'

const DynamicBadges = ({ values }) => {
  if (!values) return '';
  return (
    <>
      {{
        стабильная: <span className="status status_warning"></span>,
        положительная: <span className="status status_success"></span>,
        отрицательная: <span className="status status_danger"></span>,
      }[values] || `${values}`}
    </>
  );
};

export default DynamicBadges;
