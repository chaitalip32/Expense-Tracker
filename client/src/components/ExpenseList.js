import React, { useState, useMemo, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/List.css";
import UpdateExpenseForm from "./UpdateExpenseForm";

// ✅ Date formatter (dd/mm/yyyy)
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
};

function ExpenseList({ expenses = [], onDelete, refresh }) {
  const { token } = useContext(AuthContext); // ✅ here

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [message, setMessage] = useState("");

  const filteredExpenses = useMemo(() => {
    return expenses.filter(
      (exp) =>
        exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.date.includes(searchTerm)
    );
  }, [expenses, searchTerm]);

  const totals = useMemo(() => {
    const daily = {};
    const monthly = {};
    const yearly = {};

    expenses.forEach((exp) => {
      const date = new Date(exp.date);
      if (isNaN(date)) return;

      const dayKey = date.toISOString().split("T")[0];
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const yearKey = `${date.getFullYear()}`;

      daily[dayKey] = (daily[dayKey] || 0) + Number(exp.amount);
      monthly[monthKey] = (monthly[monthKey] || 0) + Number(exp.amount);
      yearly[yearKey] = (yearly[yearKey] || 0) + Number(exp.amount);
    });

    const today = new Date().toISOString().split("T")[0];
    const thisMonth = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }`;
    const thisYear = `${new Date().getFullYear()}`;

    return {
      today: daily[today] || 0,
      month: monthly[thisMonth] || 0,
      year: yearly[thisYear] || 0,
    };
  }, [expenses]);

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await onDelete(id); // call parent's delete function
        setMessage("Expense deleted successfully!");

        setTimeout(() => setMessage(""), 3000); // hide after 3s
      } catch (error) {
        setMessage("Failed to delete expense. Try again.");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  if (!expenses.length) {
    return <p className="no-expense-text">No expenses found.</p>;
  }

  return (
    <div className="expense-list-container">
      {message && <p className="form-message">{message}</p>}{" "}
      {/* ✅ show message */}
      <div className="expense-header">
        <input
          type="text"
          placeholder="Search by title, category, or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="totals-container">
          <div className="total-box">
            <h4>Today</h4>
            <p className="total-amount expense-total">
              ₹{totals.today.toFixed(2)}
            </p>
          </div>
          <div className="total-box">
            <h4>This Month</h4>
            <p className="total-amount expense-total">
              ₹{totals.month.toFixed(2)}
            </p>
          </div>
          <div className="total-box">
            <h4>This Year</h4>
            <p className="total-amount expense-total">
              ₹{totals.year.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="expense-list">
        {filteredExpenses.map((expense) => (
          <div className="expense-item" key={expense._id}>
            <h3>{expense.title}</h3>
            <p>
              <strong>Amount:</strong> ₹{expense.amount}
            </p>
            <p>
              <strong>Category:</strong> {expense.category}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(expense.date)}
            </p>
            {expense.description && (
              <p className="description">{expense.description}</p>
            )}

            <div className="expense-actions">
              <button
                className="update-btn"
                onClick={() => setSelectedExpense(expense)}
              >
                Update
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(expense._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedExpense && (
        <UpdateExpenseForm
          token={token}
          expense={selectedExpense}
          refresh={refresh}
          onClose={() => setSelectedExpense(null)}
        />
      )}
    </div>
  );
}

export default ExpenseList;
