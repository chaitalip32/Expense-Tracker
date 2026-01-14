import React, { useState } from "react";
import { registerUser } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/login_signup.css";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      minLength.test(password) &&
      upper.test(password) &&
      lower.test(password) &&
      number.test(password) &&
      special.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      setValidationError("❌ Please enter a valid email address.");
      return;
    }

    if (!validatePassword(form.password)) {
      setValidationError(
        "❌ Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    setValidationError("");

    try {
      const data = await registerUser(form);

      if (data.message === "User created") {
        setMessage("✅ Account created successfully!");
        setError("");
        setForm({ name: "", email: "", password: "" });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(data.message || "❌ Signup failed. Please try again.");
        setMessage("");
      }
    } catch (err) {
      setError("❌ Server error. Please try again later.");
      setMessage("");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      {validationError && <p className="error">{validationError}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          onBlur={() => {
            if (form.email && !validateEmail(form.email)) {
              setValidationError("❌ Invalid email format.");
            } else {
              setValidationError("");
            }
          }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          onBlur={() => {
            if (form.password && !validatePassword(form.password)) {
              setValidationError(
                "❌ Password must contain uppercase, lowercase, number, special char, and be 8+ chars long."
              );
            } else {
              setValidationError("");
            }
          }}
        />

        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>

      <p className="redirect-text">
        Already have an account?{" "}
        <Link to="/login" className="redirect-link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
