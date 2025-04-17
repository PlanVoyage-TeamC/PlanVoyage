import express from "express";
import cors from "cors";
import connectDB from "./config/dbconfig.js";
import dotenv from "dotenv";
import destRoutes from "./routes/fetchDestinations.js";
import authRoutes from './routes/auth.js';

const app = express();

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", destRoutes);
app.use("/api", authRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
