// src/components/UpdateIncomeForm.jsx
import React, { useState, useEffect, useContext } from "react";
import { updateIncome } from "../services/api";
import "../styles/Form.css";
import { AuthContext } from "../context/AuthContext";

function UpdateIncomeForm({ income, onClose, refresh }) {
  const { token } = useContext(AuthContext); // ✅ get token from context

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill form when income changes
  useEffect(() => {
    if (income) {
      setForm({
        title: income?.title || "",
        amount: income?.amount || "",
        category: income?.category || "",
        date: income?.date ? income.date.split("T")[0] : "",
        description: income?.description || "",
      });
      setMessage("");
      setError("");
    }
  }, [income]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token || !income?._id) {
      setError("❌ Cannot update: Missing authentication or income data.");
      return;
    }

    setLoading(true);
    try {
      await updateIncome(token, income._id, form);
      setMessage("✅ Income updated successfully!");
      if (typeof refresh === "function") refresh();
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      console.error("Error updating income:", err);
      setError(err.message || "❌ Failed to update income");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-form-overlay" onClick={onClose}>
      <div
        className="update-form-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Update Income</h2>

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

export default UpdateIncomeForm;
