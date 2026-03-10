require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");

// Import Route Files
const userRoutes = require("./routes/users");
const jobRoutes = require("./routes/jobs");
const proposalRoutes = require("./routes/proposals");
const contractRoutes = require("./routes/contracts");
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/contracts", contractRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Upwork API is running correctly.");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
