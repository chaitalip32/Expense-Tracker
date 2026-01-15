import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { getIncome, deleteIncome } from "../services/api";
import IncomeList from "../components/IncomeList";

function IncomeListPage() {
  const { token } = useContext(AuthContext);
  const [income, setIncome] = useState([]);

  // Fetch all income records
  const fetchIncome = useCallback(async () => {
    if (!token) return;

    try {
      const data = await getIncome(token);
      setIncome(data || []);
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  }, [token]); // ✅ token is a dependency

  // Delete income by ID
  const handleDelete = async (id) => {
  try {
    await deleteIncome(token, id); // ✅ FIXED ORDER
    setIncome((prev) => prev.filter((inc) => inc._id !== id));
  } catch (error) {
    console.error("Error deleting income:", error);
  }
};

  useEffect(() => {
    fetchIncome();
  }, [fetchIncome]); // ✅ warning gone

  return (
    <div className="page-container">
      <h1>All Income Records</h1>
      <IncomeList
        income={income}
        onDelete={handleDelete}
        token={token}
        refresh={fetchIncome}
      />
    </div>
  );
}

export default IncomeListPage;
