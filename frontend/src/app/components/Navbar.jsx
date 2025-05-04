"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, Menu } from "lucide-react";

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
  "Sports",
];

export default function Navbar({ isDestinations, isHome, isPreferences }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("email");
      setIsLoggedIn(!!email); // true if email exists
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleCategoryClick = (category) => {
    router.push(`/destinations?category=${encodeURIComponent(category)}`);
    setMenuOpen(false);
  };  

  return (
    <div className="relative">
        {isLoggedIn && (
          <div className="absolute top-4 left-4 z-50">
            <Menu
              size={32}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-white cursor-pointer hover:scale-105 transition-transform duration-200"
            />
            {menuOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white text-black rounded-md shadow-lg py-2 max-h-96 overflow-y-auto">
                {places.map((place) => (
                  <p
                    key={place}
                    onClick={() => handleCategoryClick(place)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {place}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      <div className="flex items-center justify-center text-xl font-light text-white p-4 space-x-20">
        {isPreferences && <a href="/preferences">Preferences</a>}
        {isHome && <a href="/home">Home</a>}
        {isDestinations && <a href="/destinations">Destinations</a>}
        <p className="cursor-pointer" onClick={() => router.push("#footer")}>About</p>
        <p className="cursor-pointer" onClick={() => router.push("#footer")}>Contact Us</p>
      </div>

      {/* Show profile button only if user is signed in */}
      {isLoggedIn && (isHome || isDestinations) && (
        <div className="absolute top-4 right-4 z-50" ref={dropdownRef}>
          <UserCircle
            size={36}
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-white cursor-pointer hover:scale-105 transition-transform duration-200"
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2">
              <p
                onClick={() => {
                  router.push("/liked");
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Likes
              </p>
              <p
                onClick={() => {
                  router.push("/disliked");
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Dislikes
              </p>
              <p
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
