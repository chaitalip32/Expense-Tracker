
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getExpenses } from "../services/api";
import ChartDisplay from "../components/ChartDisplay";

function ExpensesByCategoryPage() {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses(token);
      setExpenses(data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="page-container">
      <h1>Expenses by Category</h1>
      <ChartDisplay expenses={expenses} type="expense" />
    </div>
  );
}

export default ExpensesByCategoryPage;
