import express from "express";
import connectDB from "./config/Db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ message: "Server is running!", timestamp: new Date() });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
