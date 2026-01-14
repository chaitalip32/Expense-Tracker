import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
      <div className="navbar-logo">ExpenseTracker</div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {/* Home always visible */}
        <li>
          <Link to="/home" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>

        {/* Logged-in user links */}
        {token && !isAuthPage && (
          <>
            <li>
              <Link to="/add-expense" onClick={() => setMenuOpen(false)}>
                Add Expense
              </Link>
            </li>
            <li>
              <Link to="/expenses" onClick={() => setMenuOpen(false)}>
                Expenses
              </Link>
            </li>
            <li>
              <Link to="/categories" onClick={() => setMenuOpen(false)}>
                Expense Categories
              </Link>
            </li>
            <li>
              <Link to="/income" onClick={() => setMenuOpen(false)}>
                Add Income
              </Link>
            </li>
            <li>
              <Link to="/incomelist" onClick={() => setMenuOpen(false)}>
                Income
              </Link>
            </li>
            <li>
              <Link to="/incomeCategories" onClick={() => setMenuOpen(false)}>
                Income Categories
              </Link>
            </li>
            <li>
              <Link to="/totals" onClick={() => setMenuOpen(false)}>
                Summary
              </Link>
            </li>
          </>
        )}

        {/* Auth links (only when NOT logged in) */}
        {!token && (
          <>
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Profile dropdown (only when logged in) */}
      {token && !isAuthPage && (
        <div className="navbar-profile" ref={profileRef}>
          <div
            className="profile-icon"
            onClick={() => setShowProfile(!showProfile)}
          >
            👤
          </div>

          <div className={`profile-dropdown ${showProfile ? "show" : ""}`}>
            <p>{user?.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
