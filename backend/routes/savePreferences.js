import { Router } from "express";
const router = Router();
import preferencesModel from "../models/Preferences.js";

router.post("/preferences", async (req,res) => {
    console.log(req.body);
    const { selectedPlaces, selectedWeather, selectedPartner, selectedActivity, selectedBudget, selectedExperience } = req.body;
    const Category = selectedPlaces;
    const Weather = selectedWeather;
    const Travel_Partner = selectedPartner;
    const Activities = selectedActivity;
    const Budget = selectedBudget;
    const Travel_experience = selectedExperience;
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