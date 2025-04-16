"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";
import CategoryDropdown from "./categoryDropdown";

export default function Preferences() {
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState([]);
  const [selectedBudget,setBudget] = useState();
  const [selectedExperience, setExperience] = useState();

  async function fetchDestinations() {
    console.log(selectedPlaces); 
    console.log(selectedWeather); 
    console.log(selectedPartner); 
    console.log(selectedActivity); 
    try{
      const res = await axios.post( `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/preferences`,{
        selectedPlaces,
        selectedWeather,
        selectedPartner,
        selectedActivity,
        selectedBudget,
        selectedExperience
      });
      console.log(res);
    }
    catch (err) {
      console.log(err);
    }
  }
  const selectWeather = (weather) => {
    if(selectedWeather.includes(weather)){
      setSelectedWeather(selectedWeather.filter((w) => w !== weather));
    }
    else
      setSelectedWeather([...selectedWeather,weather]);
  }
  const selectPartner = (partner) => {
    if(selectedPartner.includes(partner)){
      setSelectedPartner(selectedPartner.filter((p) => p !== partner));
    }
    else
      setSelectedPartner([...selectedPartner,partner]);
  }
  const selectActivity = (activity) => {
    if(selectedActivity.includes(activity)){
      setSelectedActivity(selectedActivity.filter((a) => a !== activity));
    }
    else
      setSelectedActivity([...selectedActivity,activity]);
  }

  return (
    <div className="preferenceBg w-full h-screen relative homeBg ">
      <div className="p-5"></div>
      <div className="w-9/10 h-9/10 rounded-2xl bg-[#ffffff80]  m-auto p-5  ">
        <div className="flex items-center justify-center text-black text-2xl font-bold ">
          Tell us what you like !
        </div>
        <div className="flex items-center justify-center text-black text-lg">
          ( Note : This will help us suggest the perfect destinations for you
          the first time!)
        </div>
        <div className="mx-10">
          <div className="  text-black text-lg font-semibold  ">
            <div className="flex gap-50 my-5">
              <h2 className="">Category:</h2>
              <div className="">
                <CategoryDropdown 
                selectedPlaces={selectedPlaces}
                setSelectedPlaces={setSelectedPlaces}
                />
              </div>
            </div>
            <div className="flex gap-50 my-5">
              <h2 className="">Weather:</h2>
              <div className="flex gap-10 ">
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {()=>selectWeather('Sunny')}>
                  ☀️Sunny
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {()=>selectWeather('Rainy')}>
                  🌦️Rainy
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {()=>selectWeather('Cloudy')}>
                  🌥️Cloudy
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {()=>selectWeather('Windy')}>
                  🌬️Windy
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {()=>selectWeather('Snowy')}>
                  ❄️Snowy
                </button>
              </div>
            </div>
            <div className="flex gap-50 my-5">
              <h2 className="">Travel Partner:</h2>
              <div className="flex gap-10 ">
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {() => selectPartner("Solo")}>
                  Solo
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {() => selectPartner("Couple")}>
                  Couple
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {() => selectPartner("Family")}>
                  Family
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {() => selectPartner("Friends")}>
                  Friends
                </button>
              </div>
            </div>
            <div className="flex gap-50 my-5">
              <h2 className="">Activities:</h2>
              <div className="flex gap-10 ">
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {() => selectActivity("Shopping")}>
                  Shopping
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {() => selectActivity("Adventure")}>
                  Adventure
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {() => selectActivity("Safari")}>
                  Safari
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200" onClick = {() => selectActivity("Dining")}>
                  Dining
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-50 my-5">
            <h2 className="text-black text-lg font-semibold">Budget:</h2>
            <input
              type="number"
              min="0"
              placeholder="Enter Budget in USD"
              className="px-4 py-1 min-w-sm text-gray-600 border border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200 outline-none"
              onChange = {(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="flex gap-10 my-5">
                  <h2 className="text-black text-lg font-semibold">
              Describe your previous travel experience:
            </h2>
            <input className="px-4 py-1 min-w-sm text-gray-600 border border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200 outline-none" 
            onChange = {(e) => setExperience(e.target.value)}
            />
          </div>

          <button className="px-4 py-1 min-w-sm bg-[#00800025]" onClick ={ () => fetchDestinations()} >
            Suggest Destinations
          </button>
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
}

  