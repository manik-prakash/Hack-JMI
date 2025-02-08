// src/components/RecentTransactions.js
import React from 'react';

const RecentTransactions = () => {
  const transactions = [
    { department: 'Education', amount: '$250,000', status: 'completed', date: '2023-01-15' },
    { department: 'Healthcare', amount: '$500,000', status: 'processing', date: '2023-01-16' },
    { department: 'Infrastructure', amount: '$5,000,000', status: 'completed', date: '2023-01-17' },
    { department: 'Defense', amount: '$750,000', status: 'completed', date: '2023-01-18' },
    { department: 'Agriculture', amount: '$300,000', status: 'processing', date: '2023-01-19' }
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Recent Transactions</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-200">Department</th>
            <th className="border p-2 bg-gray-200">Amount</th>
            <th className="border p-2 bg-gray-200">Status</th>
            <th className="border p-2 bg-gray-200">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-b">
              <td className="border p-2">{transaction.department}</td>
              <td className="border p-2">{transaction.amount}</td>
              <td className="border p-2">{transaction.status}</td>
              <td className="border p-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;