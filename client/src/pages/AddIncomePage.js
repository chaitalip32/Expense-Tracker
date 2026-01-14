import React, { useContext } from "react";
import IncomeForm from "../components/IncomeForm";
import { AuthContext } from "../context/AuthContext";

function AddIncomePage() {
  const { token } = useContext(AuthContext);

  return (
    <div className="page-container">
      <h1>Add New Income</h1>
      <IncomeForm token={token} />
    </div>
  );
}

export default AddIncomePage;
