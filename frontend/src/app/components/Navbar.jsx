"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar({ isDestinations, isHome, isPreferences }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div className="flex items-center justify-center text-xl font-light text-white  p-4 space-x-20">
      {isPreferences && (
        <a href="/preferences" className="">
          Preferences
        </a>
      )}
      {isHome && (
         <a href={isLoggedIn ? "/destinations" : "/home"}>
          Home
        </a>
      )}
      {isDestinations && (
        <a href="/destinations" className="">
          Destinations
        </a>
      )}
      <p
        className="cursor-pointer"
        onClick={() => {
          redirect("#footer");
        }}
      >
        About
      </p>
      <p
        className="cursor-pointer"
        onClick={() => {
          redirect("#footer");
        }}
      >
        Contact Us
      </p>
      {isLoggedIn && (
        <>
          <p className="cursor-pointer" onClick={() => redirect("/liked")}>
            Likes
          </p>
          <p className="cursor-pointer" onClick={() => redirect("/disliked")}>
            Dislikes
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              localStorage.clear();
              redirect("/");
            }}
          >
            Logout
          </p>
        </>
      )}
    </div>
  );

}
