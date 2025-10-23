// client/src/components/DashboardStats.js
import React from "react";
import "./Dashboard.css";

function DashboardStats({ expenses }) {
  const total = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  return (
    <div className="dashboard-stats">
      <h3>Dashboard Stats</h3>
      <p>Total Expenses: ₹{total}</p>
      <p>Number of Expenses: {expenses.length}</p>
    </div>
  );
}

export default DashboardStats;
