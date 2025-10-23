import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddExpensePage from "./pages/AddExpensePage";
import ExpenseListPage from "./pages/ExpenseListPage";
import ExpensesByCategoryPage from "./pages/ExpensesByCategoryPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-expense" element={<AddExpensePage />} />
        <Route path="/expenses" element={<ExpenseListPage />} />
        <Route path="/categories" element={<ExpensesByCategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
