import React, { useState, useContext } from "react";
import { addIncome } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/Form.css";

function IncomeForm({ refresh }) {
  const { token } = useContext(AuthContext); // ✅ token from context

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You are not logged in.");
      return;
    }

    try {
      await addIncome(token, form);

      setForm({
        title: "",
        amount: "",
        category: "",
        date: "",
        description: "",
      });

      setMessage("Income added successfully!");
      if (typeof refresh === "function") refresh();

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error adding income:", error);
      setMessage("Failed to add income. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      {message && <p className="form-message">{message}</p>}

      <form className="income-form" onSubmit={handleSubmit}>
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
          <option value="Salary">Salary</option>
          <option value="Business">Business</option>
          <option value="Gift">Gift</option>
          <option value="Interest">Interest</option>
          <option value="Investment Return">Investment Return</option>
          <option value="Freelance">Freelance</option>
          <option value="Bonus">Bonus</option>
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

        <button type="submit">Add Income</button>
      </form>
    </>
  );
}

export default IncomeForm;
