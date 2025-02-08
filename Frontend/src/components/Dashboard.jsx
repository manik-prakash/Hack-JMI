// src/components/Dashboard.js
import React from 'react';
import Overview from './Overview';
import RecentTransactions from './RecentTransactions';
import AnomalyAlerts from './AnomalyAlerts';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Public Finance Dashboard</h1>
      <div className="flex flex-wrap -mx-2 overflow-hidden">
        <div className="my-2 px-2 w-full md:w-1/2 lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold">Total Budget</h2>
            <p className="text-xl font-bold">$1,000,000,000</p>
            <p className="text-sm text-gray-500">+20% from last year</p>
          </div>
        </div>
        {/* Repeat similar divs for Spent to Date, Departments, Anomalies */}
      </div>
      <Overview />
      <div className="flex flex-wrap -mx-2 overflow-hidden">
        <div className="my-2 px-2 w-full md:w-2/3">
          <RecentTransactions />
        </div>
        <div className="my-2 px-2 w-full md:w-1/3">
          <AnomalyAlerts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;