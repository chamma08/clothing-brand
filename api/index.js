import express from "express";
import connectDB from "./config/Db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

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
