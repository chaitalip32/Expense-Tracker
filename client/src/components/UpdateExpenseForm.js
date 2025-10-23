// src/components/UpdateExpenseForm.jsx
import React, { useState, useEffect } from "react";
import { updateExpense } from "../services/api";
import "../styles/Form.css";

function UpdateExpenseForm({ token, expense, onClose, refresh }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [message, setMessage] = useState(""); // success message
  const [error, setError] = useState(""); // error message
  const [loading, setLoading] = useState(false); // loading state

  // Prefill form when expense changes
  useEffect(() => {
    if (expense) {
      setForm({
        title: expense?.title || "",
        amount: expense?.amount || "",
        category: expense?.category || "",
        date: expense?.date ? expense.date.split("T")[0] : "",
        description: expense?.description || "",
      });
      setMessage("");
      setError("");
    }
  }, [expense]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token || !expense?._id) {
      setError("❌ Cannot update: Missing authentication or expense data.");
      return;
    }

    setLoading(true);
    try {
      await updateExpense(token, expense._id, form);
      setMessage("✅ Expense updated successfully!");
      if (typeof refresh === "function") refresh();
      setTimeout(() => onClose(), 1000); // auto-close after 1s
    } catch (err) {
      console.error("Error updating expense:", err);
      setError(err.message || "❌ Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-overlay" onClick={onClose}>
      <div
        className="update-form-container"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2>Update Expense</h2>

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
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
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
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <div className="form-buttons">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateExpenseForm;
