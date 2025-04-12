import { Router } from "express";
const router = Router();
import destinationModel from "../models/Destinations.js";

router.get("/destinations", async (req, res) => {
  try {
    const destinations = await destinationModel.find();
    res.status(200).json(destinations);
    //      console.log(destinations);
  } catch (err) {
    res.status(500).send("Server error");
  }
});
export default router;
