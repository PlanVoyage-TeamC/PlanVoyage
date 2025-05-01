import express from "express";
import cors from "cors";
import connectDB from "./config/dbconfig.js";
import dotenv from "dotenv";
import { recommendDestinations } from './routes/recommendDestinations.js';
import destRoutes from "./routes/fetchDestinations.js";
import authRoutes from './routes/auth.js';
import preferencesRoutes from "./routes/savePreferences.js";
import userRoutes from './routes/user.js';
import exploreRoutes from './routes/explore.js';
import recommendRoutes from './routes/recommendDestinationsRoute.js'
import similarDestRoutes from './routes/similarDestinations.js'
const app = express();

dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", destRoutes);
app.use("/api", authRoutes); 
app.use("/api", preferencesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/explore', exploreRoutes);
app.use('/api', recommendRoutes);
app.use('/api', similarDestRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));