import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { getExpenses, deleteExpense } from "../services/api"; // import delete API
import ExpenseList from "../components/ExpenseList";

function ExpenseListPage() {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = useCallback(async () => {
  try {
    const data = await getExpenses(token);
    setExpenses(data || []);
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
}, [token]);


  const handleDelete = async (id) => {
  try {
    await deleteExpense(token, id); // ✅ FIXED ORDER
    setExpenses((prev) => prev.filter((exp) => exp._id !== id));
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};


  useEffect(() => {
  fetchExpenses();
}, [fetchExpenses]);


  return (
    <div className="page-container">
      <h1>All Expenses</h1>
      <ExpenseList
        expenses={expenses}
        onDelete={handleDelete} // ✅ pass it here
        token={token}
        refresh={fetchExpenses} // optional if you want to refresh after update
      />
    </div>
  );
}

export default ExpenseListPage;
