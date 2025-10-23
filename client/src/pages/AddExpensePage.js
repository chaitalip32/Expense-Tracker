import React, { useContext } from "react";
import ExpenseForm from "../components/ExpenseForm";
import { AuthContext } from "../context/AuthContext";

function AddExpensePage() {
  const { token } = useContext(AuthContext);

  return (
    <div className="page-container">
      <h1>Add New Expense</h1>
      <ExpenseForm token={token} />
    </div>
  );
}

export default AddExpensePage;
