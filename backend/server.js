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

async function startServer() {
  try {
    await connectDB();  // wait for DB connection
    console.log('✅ Database connected');

    // Run recommendation logic after DB is connected
    await runRecommendation();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

async function runRecommendation() {
  try {
    const userEmail = 'asdf@g.com'; // Pass user's email
    const recommendations = await recommendDestinations(userEmail);
    console.log('Top Recommendations:', recommendations);
  } catch (error) {
    console.error('Error recommending destinations:', error);
  }
}

startServer();


