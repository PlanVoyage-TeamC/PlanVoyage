"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";


export default function PlaceCard({ id, image, name, maxprice, minprice, onToggle }) {
  const [preference, setPreference] = useState(null); // 'like', 'dislike', or null
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkPreference = async () => {
      const email = localStorage.getItem("email");
      if (!email) return;

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/liked-places`, {
          params: { email },
        });
        const isLiked = res.data.likedPlaces.some(p => p.id === id);
        
        if (isLiked) {
          setPreference('like');
          return;
        }

        const dislikeRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/disliked-places`, {
          params: { email },
        });
        const isDisliked = dislikeRes.data.dislikedPlaces.some(p => p.id === id);
        
        if (isDisliked) {
          setPreference('dislike');
        }
      } catch (err) {
        console.error("Error checking preference:", err);
      }
    };

    checkPreference();
  }, [id]);

  const handlePreference = async (newPreference) => {
    const email = localStorage.getItem("email");
    if (!email) 

    setIsLoading(true);
    try {
      // If clicking the same preference, remove it (toggle off)
      const finalPreference = preference === newPreference ? 'none' : newPreference;
      
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/set-preference`, {
        email,
        placeId: id,
        preference: finalPreference
      });

        // Immediate UI update
    if (onToggle && (newPreference === preference || preference)) {
      onToggle(id); // This removes the card from the list
    }
    
      setPreference(finalPreference === 'none' ? null : finalPreference);
      
      if (onToggle && (finalPreference === 'none' || preference === 'like' || preference === 'dislike')) {
        onToggle(id);
      }

      // window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-w-[350px] h-[260px] flex flex-col shadow-lg rounded-2xl">
      <Image
        src={image}
        alt={name}
        width={350}
        height={250}
        className="h-[200px] w-full object-cover rounded-t-2xl"
      />
      <div className="bg-[#ffffff80] text-black rounded-b-2xl flex justify-between px-4 py-2">
        <div>
          <h3 className="text-[15px] font-bold">{name}</h3>
          <p className="text-base">${minprice} - ${maxprice}</p>
        </div>

        <div className="flex gap-3 items-center justify-end pb-2">
          <FaThumbsUp
            onClick={() => handlePreference('like')}
            className={`cursor-pointer text-xl transition-colors  ${
              preference === 'like' ?  "text-white" : "text-black"
            }`}
          />
          <FaThumbsDown
            onClick={() => handlePreference('dislike')}
            className={`cursor-pointer text-xl transition-colors ${
              preference === 'dislike' ? "text-white" : "text-black"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
