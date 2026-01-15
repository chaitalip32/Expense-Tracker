import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ add this line
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddExpensePage from "./pages/AddExpensePage";
import ExpenseListPage from "./pages/ExpenseListPage";
import ExpensesByCategoryPage from "./pages/ExpensesByCategoryPage";
import AddIncomePage from "./pages/AddIncomePage";
import IncomeListPage from "./pages/IncomeListPage";
import IncomeByCategoryPage from "./pages/IncomeByCategory";
import TotalSummaryPage from "./pages/TotalSummaryPage";
import Footer from "./components/Footer";

function AppContent() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <AddExpensePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <AddIncomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <ExpenseListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <ExpensesByCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incomelist"
          element={
            <ProtectedRoute>
              <IncomeListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incomeCategories"
          element={
            <ProtectedRoute>
              <IncomeByCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/totals"
          element={
            <ProtectedRoute>
              <TotalSummaryPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
