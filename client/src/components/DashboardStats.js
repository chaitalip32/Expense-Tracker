// client/src/components/DashboardStats.js
import React from "react";
import "./Dashboard.css";

function DashboardStats({ expenses }) {
  const total = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <h4>Total Expenses</h4>
        <p className="amount">₹{total.toFixed(2)}</p>
      </div>

      <div className="stat-card">
        <h4>Number of Expenses</h4>
        <p className="count">{expenses.length}</p>
      </div>
    </div>
  );
}

export default DashboardStats;
  