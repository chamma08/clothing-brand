import express from 'express';
import connectDB from './config/Db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})