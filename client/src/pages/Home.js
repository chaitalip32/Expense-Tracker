import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Home.css";

function Home() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (token) {
      navigate("/add-expense"); // if logged in, go to add expense page
    } else {
      navigate("/signup"); // if not logged in, go to signup page
    }
  };

  return (
    <section className="home">
      <div className="home-content" data-aos="fade-right">
        <h1>Track Your Expenses <br /> Easily & Smartly 💰</h1>
        <p>
          Manage your daily expenses, visualize spending trends, and save more money with
          <span className="brand"> ExpenseTracker!</span>
        </p>
        <button onClick={handleGetStarted} className="home-btn">
          Get Started
        </button>
      </div>

      <div className="home-image" data-aos="fade-left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt="Expense illustration"
        />
      </div>
    </section>
  );
}

export default Home;
