import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getExpenses } from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ChartDisplay from "../components/ChartDisplay";
import "../styles/Dashboard.css";

function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const data = await getExpenses(token);
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="dashboard">
      {/* <header>
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header> */}

      <div className="dashboard-content">
        <ExpenseForm token={token} refresh={fetchExpenses} />
        <ExpenseList expenses={expenses} />
        <ChartDisplay expenses={expenses} />
      </div>
    </div>
  );
}

export default Dashboard;
