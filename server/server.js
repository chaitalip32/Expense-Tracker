require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const path = require("path");

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// React build
// const clientBuildPath = path.join(__dirname, "..", "client", "build");
// app.use(express.static(clientBuildPath));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);

// EXPRESS v5 SAFE SPA FALLBACK
// app.get(/^(?!\/api).*/, (req, res) => {
//   res.sendFile(path.join(clientBuildPath, "index.html"));
// });
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB error:", err));
