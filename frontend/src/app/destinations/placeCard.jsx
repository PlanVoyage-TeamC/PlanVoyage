"use client";
import Image from "next/image";
import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function PlaceCard({ image, name, maxprice, minprice }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false); // Only one active at a time
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
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
            onClick={handleLike}
            className={`cursor-pointer text-xl transition-colors  ${
              liked ? "text-white" : "text-black"
            }`}
          />
          <FaThumbsDown
            onClick={handleDislike}
            className={`cursor-pointer text-xl transition-colors ${
              disliked ? "text-white" : "text-black"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
