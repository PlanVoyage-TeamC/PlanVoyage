import express from "express";
import cors from "cors";
import connectDB from "./config/dbconfig.js";
import dotenv from "dotenv";
import destRoutes from "./routes/fetchDestinations.js";
import authRoutes from './routes/auth.js';
import preferencesRoutes from "./routes/savePreferences.js";
const app = express();

dotenv.config();
connectDB(); // Function call to connect DB

app.use(express.json()); 
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", destRoutes);
app.use("/api", authRoutes); 
app.use("/api", preferencesRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
