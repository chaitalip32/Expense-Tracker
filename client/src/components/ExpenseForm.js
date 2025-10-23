import React, { useState } from "react";
import { addExpense } from "../services/api";
import "../styles/Form.css";

function ExpenseForm({ token, refresh }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [message, setMessage] = useState(""); // ✅ state for success/error messages

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense(token, form);

      // Reset form
      setForm({
        title: "",
        amount: "",
        category: "",
        date: "",
        description: "",
      });

      // Show success message
      setMessage("Expense added successfully!");

      // Refresh the list if function provided
      if (typeof refresh === "function") refresh();

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error adding expense:", error);
      setMessage("Failed to add expense. Please try again."); // show error message
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      {message && <p className="form-message">{message}</p>} {/* ✅ show message */}
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
        <button type="submit">Add Expense</button>
      </form>
    </>
  );
}

export default ExpenseForm;
