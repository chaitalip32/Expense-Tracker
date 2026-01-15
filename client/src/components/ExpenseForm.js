import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addExpense } from "../services/api";
import "../styles/Form.css";

/* ✅ Helper function (OUTSIDE component) */
const normalizeDate = (dateString) => {
  if (!dateString) return "";
  // Ensures only YYYY-MM-DD is sent (no timezone)
  return new Date(dateString).toISOString().split("T")[0];
};

function ExpenseForm({ refresh }) {
  const today = new Date().toISOString().split("T")[0];
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("You are not logged in.");
      return;
    }

    if (Number(form.amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    try {
      await addExpense(token, {
        ...form,
        amount: Number(form.amount),
        date: normalizeDate(form.date), // ✅ FIXED
      });

      setForm({
        title: "",
        amount: "",
        category: "",
        date: "",
        description: "",
      });

      setMessage("✅ Expense added successfully!");
      if (typeof refresh === "function") refresh();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error adding expense:", err);
      setError(err?.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form className="expense-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          min="1"
          step="0.01"
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") e.preventDefault();
          }}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>
            Select category
          </option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Education">Education</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Groceries">Groceries</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Investment">Investment</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          max={today}
          required
          className={!form.date ? "date-empty" : ""}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">Add Expense</button>
      </form>
    </>
  );
}

export default ExpenseForm;
