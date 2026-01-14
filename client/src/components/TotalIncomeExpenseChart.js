import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "../styles/TotalIncomeExpenseChart.css";

function TotalIncomeExpenseChart({ expenses = [], incomes = [] }) {
  const totals = useMemo(() => {
    const totalExpenses = expenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );
    const totalIncome = incomes.reduce(
      (sum, i) => sum + Number(i.amount),
      0
    );

    return [
      { name: "Income", amount: totalIncome },
      { name: "Expenses", amount: totalExpenses },
    ];
  }, [expenses, incomes]);

  const COLORS = ["#16A34A", "#F97316"]; // green, orange

  return (
    <div className="bar-chart-card">
      <h2>Income vs Expenses</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={totals}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />

          <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
            {totals.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="custom-legend">
        <span>
          <i className="legend income"></i> Income
        </span>
        <span>
          <i className="legend expense"></i> Expenses
        </span>
      </div>
    </div>
  );
}

export default TotalIncomeExpenseChart;
