import { Router } from "express";
const router = Router();
import destinationModel from "../models/Destinations.js";
import preferencesModel from "../models/Preferences.js";

router.get("/destinations", async (req, res) => {
  const { email } = req.query;
  console.log(email);

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const preferences = await preferencesModel.findOne({ email });
    if (!preferences) {
      return res.status(404).json({ message: "No preferences found for this email" });
    }

    const {
      Category = [],
//      Seasons = [],
//      Travel_Partner = [],
//      Activities = [],
//      Budget,
    } = preferences;

    const matchingDestinations = await destinationModel.find({
      Category: { $in: Category },
    });
    res.status(200).json(matchingDestinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;


/*import { Router } from "express";
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
export default router;*/
