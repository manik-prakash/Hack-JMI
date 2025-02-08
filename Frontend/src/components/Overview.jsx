// src/components/Overview.js
import React from 'react';

import { LineChart } from '@mui/x-charts/LineChart';

const Overview = () => {

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Public Finance Dashboard</h1>
      <div className="flex justify-between mb-4">
        <div className="bg-white p-4 rounded shadow w-full md:w-1/4 mr-2">
          <p className="font-semibold">Total Budget</p>
          <p className="text-xl">$1,000,000,000</p>
        </div>
        <div className="bg-white p-4 rounded shadow w-full md:w-1/4 mr-2">
          <p className="font-semibold">Spent to Date</p>
          <p className="text-xl">$654,321,000</p>
        </div>
        <div className="bg-white p-4 rounded shadow w-full md:w-1/4 mr-2">
          <p className="font-semibold">Departments</p>
          <p className="text-xl">15</p>
        </div>
        <div className="bg-white p-4 rounded shadow w-full md:w-1/4">
          <p className="font-semibold">Anomalies</p>
          <p className="text-xl">7</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Overview</h2>
        <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      width={500}
      height={300}
    />
      </div>
    </div>
  );
};

export default Overview;