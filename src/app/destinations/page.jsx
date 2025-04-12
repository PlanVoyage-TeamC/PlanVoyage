"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PlaceCard from "./placeCard";
import axios from "axios";
import placeCardData from "../tempResources/placeCardData";
import { useEffect, useState } from "react";

export default function Destination() {
  const [destinations,setDestinations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/destinations'); 
        setDestinations(res.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="destinationBg w-full h-screen relative">
      <div className="bg-[#3A2C2298] w-full h-full">
        <div className="">
          <Navbar isDestinations={false} isPreferences={false} isHome={true} />
        </div>
        <div className="overflow-x-scroll scrollbar-hide grid grid-rows-2 grid-flow-col p-4 gap-5">
          {destinations.map((item, index) => {
            return <PlaceCard key={index} image={item.Image} name={item.Loc_name} maxprice={item.Max_Price} minprice={item.Min_Price}/>;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
