import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>ExpenseTracker</h2>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>

        {token && (
          <>
            <li><Link to="/add-expense">Add Expense</Link></li>
            <li><Link to="/expenses">List of Expenses</Link></li>
            <li><Link to="/categories">Expenses by Category</Link></li>
          </>
        )}

        {!token && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>

      {token && (
        <div className="navbar-profile" ref={profileRef}>
          <div
            className="profile-icon"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            👤
          </div>

          {/* Always render, toggle class for animation */}
          <div className={`profile-dropdown ${showProfile ? "show" : ""}`}>
            <p className="profile-email">{user?.email}</p>
            <button onClick={handleLogout} className="btn logout-btn">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
