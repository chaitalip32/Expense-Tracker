import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h3>ExpenseTracker</h3>
          <p>
            Track expenses, manage income, and take control of your finances
            with ease.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-expense">Add Expense</Link>
            </li>
            <li>
              <Link to="/expenses">Expenses</Link>
            </li>
            <li>
              <Link to="/incomelist">Income</Link>
            </li>
            <li>
              <Link to="/totals">Summary</Link>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div className="footer-info">
          <h4>Support</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Help Center</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
