import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/ChartDisplay.css";

function ChartDisplay({ expenses = [], incomes = [], type = "expense" }) {
  const items = type === "income" ? incomes : expenses;

  if (!items.length) {
    return <p className="no-data">No data available</p>;
  }

  const categoryTotals = {};
  items.forEach((item) => {
    const category = item.category || "Uncategorized";
    categoryTotals[category] =
      (categoryTotals[category] || 0) + Number(item.amount);
  });

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS =
    type === "income"
      ? ["#059669", "#10B981", "#34D399", "#6EE7B7"]
      : ["#F97316", "#FB923C", "#FDBA74", "#FED7AA"];

  return (
    <div className="chart-container">
      <h2>{type === "income" ? "Income by Category" : "Expenses by Category"}</h2>

      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDisplay;
