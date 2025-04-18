"use client";
import { redirect } from "next/navigation";

export default function Navbar({ isDestinations, isHome, isPreferences }) {
  return (
    <div className="flex items-center justify-center text-xl font-light text-white  p-4 space-x-20">
      {isPreferences && (
        <a href="/preferences" className="">
          Preferences
        </a>
      )}
      {isHome && (
        <a href="/home" className="">
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
    </div>
  );
}
