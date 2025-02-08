// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import RecentTransactions from './components/RecentTransactions';
import AnomalyAlerts from './components/AnomalyAlerts';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4">
        <Overview />
        <div className="flex mt-4">
          <div className="w-2/3 mr-4">
            <RecentTransactions />
          </div>
          <div className="w-1/3">
            <AnomalyAlerts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;