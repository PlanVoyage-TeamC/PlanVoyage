import { Router } from "express";
const router = Router();
import preferencesModel from "../models/Preferences.js";

router.post("/preferences", async (req,res) => {
    console.log(req.body);
    const { selectedCategories, selectedWeather, selectedPartners, selectedActivities, budget, travelExperience } = req.body;
    const Category = selectedCategories;
    const Weather = selectedWeather;
    const Travel_Partner = selectedPartners;
    const Activities = selectedActivities;
    const Budget = budget;
    const Travel_experience = travelExperience;
    try{
       const preferences = new preferencesModel({Category,Weather,Travel_Partner,Activities,Budget,Travel_experience});
       await preferences.save();
       res.send("Preferences Added");
    }
    catch (err) {
        console.log(err);
    }
})
export default router;