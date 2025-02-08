// src/components/AnomalyAlerts.js
import React from 'react';

const AnomalyAlerts = () => {
  const alerts = [
    { message: 'Education - Unusual spike in expenditure - 2023-01-20' },
    { message: 'Healthcare - Unaccounted fund transfer - 2023-01-21' },
    { message: 'Infrastructure - Delayed project completion - 2023-01-22' }
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Anomaly Alerts</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index} className="border border-red-200 p-2 mb-2 bg-red-50 text-red-700 rounded">
            {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnomalyAlerts;