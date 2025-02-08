// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen p-4">
      <ul>
        <li className="mb-2"><a href="#overview" className="text-blue-500 hover:text-blue-700">Overview</a></li>
        <li className="mb-2"><a href="#transactions" className="text-blue-500 hover:text-blue-700">Transactions</a></li>
        <li className="mb-2"><a href="#anomalies" className="text-blue-500 hover:text-blue-700">Anomalies</a></li>
        <li className="mb-2"><a href="#budgetForecast" className="text-blue-500 hover:text-blue-700">Budget Forecast</a></li>
        <li className="mb-2"><a href="#settings" className="text-blue-500 hover:text-blue-700">Settings</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;