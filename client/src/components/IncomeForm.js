import React, { useState, useContext } from "react";
import { addIncome } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/Form.css";

function IncomeForm({ refresh }) {
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
      await addIncome(token, {
        ...form,
        amount: Number(form.amount),
      });

      setForm({
        title: "",
        amount: "",
        category: "",
        date: "",
        description: "",
      });

      setMessage("✅ Income added successfully!");
      if (typeof refresh === "function") refresh();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error adding income:", err);
      setError(err?.response?.data?.message || "Failed to add income");
    }
  };

  return (
    <>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

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

        <button type="submit">Add Income</button>
      </form>
    </>
  );
}

export default IncomeForm;
