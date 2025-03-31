"use client";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("Search for Category");

  const places = [
    "Beaches",
    "Mountains",
    "Cities & Lights",
    "Deserts",
    "Islands",
    "Forests & Jungles",
    "Historical & Cultural Sites",
    "Theme Parks & Resorts",
    "Scenic",
  ];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSelect = (place) => {
    setSelectedPlace(place);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-lg px-4 py-2 bg-white text-sm font-medium text-black hover:bg-gray-50"
          onClick={toggleDropdown}
        >
          {selectedPlace}
          <FaCaretDown className="ml-2" />
        </button>

        {isOpen && (
          <div className="w-56 rounded-md shadow-lg bg-white border-2 border-gray-300 absolute  focus:outline-none">
            <div className="py-1">
              {places.map((place, index) => (
                <div className=" flex justify-center ">
                    <a
                      key={index}
                      href="#"
                      className="block px-4  py-1 text-sm text-gray-600 hover:text-black border-y-1 border-gray-100"
                      onClick={() => handleSelect(place)}
                    >
                
                  {place}
                </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
