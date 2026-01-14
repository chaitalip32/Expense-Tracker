// services/api.js

// ✅ Use environment variable for production URL, fallback to localhost for dev
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ---------------- User ----------------

// Register a new user
export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Login user
export async function loginUser(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Get profile
export async function getProfile(token) {
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

// ---------------- Expenses ----------------

// Get all expenses
export async function getExpenses(token) {
  const res = await fetch(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// Add new expense
export async function addExpense(token, data) {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Update expense
export async function updateExpense(token, id, data) {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update expense");
  return res.json();
}

// Delete expense
export async function deleteExpense(token, id) {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete expense");
  return res.json();
}

// ---------------- Income ----------------

// Get all income
export async function getIncome(token) {
  const res = await fetch(`${API_URL}/income`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch income");
  return res.json();
}

// Add new income
export async function addIncome(token, data) {
  const res = await fetch(`${API_URL}/income`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add income");
  return res.json();
}

// Update income
export async function updateIncome(token, id, data) {
  const res = await fetch(`${API_URL}/income/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update income");
  return res.json();
}

// Delete income
export async function deleteIncome(token, id) {
  const res = await fetch(`${API_URL}/income/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete income");
  return res.json();
}
