import { Router } from "express";
const router = Router();
import destinationModel from "../models/Destinations.js";
import preferencesModel from "../models/Preferences.js";

router.get("/destinations", async (req, res) => {
  const { email } = req.query;

  try {
    if (email) {
      // Logged-in user with preferences
      const preferences = await preferencesModel.findOne({ email });
      console.log(preferences);
      if (!preferences) {
        return res.status(404).json({ message: "No preferences found for this email" });
      }

      const {
        Category = [],
        Seasons = [],
        Travel_Partner = [],
        Activities = [],
        // Budget,
      } = preferences;

      const matchingDestinations = await destinationModel.find({
        Category: { $in: Category },
        Seasons: { $in: Seasons },
        Travel_Partner: { $in: Travel_Partner },
        Activities: { $in: Activities },
      });

      return res.status(200).json(matchingDestinations);
    } else {
      // Not logged in — return all destinations
      const destinations = await destinationModel.find();
      return res.status(200).json(destinations);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
