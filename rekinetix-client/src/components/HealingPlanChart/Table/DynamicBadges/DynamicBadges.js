import React from 'react';

const DynamicBadges = ({ values }) => {
  return (
    <>
      {
        {
          'стабильная': <span className="badge badge-warning">{values}</span>,
          'положительная': <span className="badge badge-success">{values}</span>,
          'отрицательная': <span className="badge badge-danger">{values}</span>,
          '': '',
        }[values] || `${values}`
      }
    </>
  );
};

export default DynamicBadges;
