import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getIncome } from "../services/api";
import ChartDisplay from "../components/ChartDisplay";

function IncomeByCategoryPage() {
  const { token } = useContext(AuthContext);
  const [incomes, setIncomes] = useState([]);

  const fetchIncome = async () => {
    try {
      const data = await getIncome(token);
      setIncomes(data || []);
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []); // <-- remove fetchIncome from deps

  return (
    <div className="page-container">
      <h1>Income by Category</h1>
      <ChartDisplay incomes={incomes} type="income" />
    </div>
  );
}

export default IncomeByCategoryPage;
