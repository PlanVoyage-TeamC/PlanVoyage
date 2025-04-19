import { Router } from "express";
const router = Router();
import preferencesModel from "../models/Preferences.js";

router.post("/preferences", async (req,res) => {
    console.log(req.body);
    const { email, selectedCategories, selectedWeather, selectedPartners, selectedActivities, budget, travelExperience } = req.body;
    const Category = selectedCategories;
    const Weather = selectedWeather;
    const Travel_Partner = selectedPartners;
    const Activities = selectedActivities;
    const Budget = budget;
    const Travel_experience = travelExperience;
    try{
       const preferences = new preferencesModel({email,Category,Weather,Travel_Partner,Activities,Budget,Travel_experience});
       await preferences.save();

/*       const matchingDestinations = await destinationsModel.find({
        Category: { $in: Category },
      });
      console.log("Category filter:", Category);
      console.log("Travel_Partner filter:", Travel_Partner);

      console.log(matchingDestinations);*/

      res.status(200).json({
        message: "Preferences saved ",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

export default router;