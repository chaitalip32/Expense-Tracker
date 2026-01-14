import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <section className="home">
      <div className="home-content">
        <h1>
          Take Control of <br /> Your Finances
        </h1>

        <p>
          Track expenses, manage income, and understand your spending with
          <span className="brand"> ExpenseTracker</span>.
        </p>

        <button className="home-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>

      <div className="home-image">
        <img src="/home.jpg" alt="Expense dashboard preview" />
      </div>
    </section>
  );
}

export default Home;
