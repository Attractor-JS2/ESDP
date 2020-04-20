import React from 'react';
import './DynamicBadges.css'

const DynamicBadges = ({ values }) => {
  if (values != 0 && !values) return '';
  return (
    <>
      {{
        1: <span className="status status_warning"></span>,
        2: <span className="status status_success"></span>,
        0: <span className="status status_danger"></span>,
      }[values] || `${values}`}
    </>
  );
};

export default DynamicBadges;
