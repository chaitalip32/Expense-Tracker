import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getExpenses, getIncome } from "../services/api";
import TotalIncomeExpenseChart from "../components/TotalIncomeExpenseChart";

function TotalSummaryPage() {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exp = await getExpenses(token);
        const inc = await getIncome(token);
        setExpenses(exp || []);
        setIncomes(inc || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="page-container">
      <h1>Total Income vs Expenses</h1>
      <TotalIncomeExpenseChart expenses={expenses} incomes={incomes} />
    </div>
  );
}

export default TotalSummaryPage;
