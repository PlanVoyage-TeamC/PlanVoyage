import express from "express";
import cors from "cors";
import connectDB from "./config/dbconfig.js";
import dotenv from "dotenv";
import destRoutes from "./routes/fetchDestinations.js";
import preferencesRoutes from "./routes/savePreferences.js";
const app = express();

dotenv.config();
connectDB(); // Function call to connect DB

app.use(cors());
app.use(express.json()); 
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", destRoutes);
app.use("/api", preferencesRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
