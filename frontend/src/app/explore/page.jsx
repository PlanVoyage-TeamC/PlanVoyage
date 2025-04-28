"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PlaceCard from "../destinations/placeCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "../components/SearchBar";

export default function Explore() {
  const [results, setResults] = useState([]);
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const router = useRouter();

  useEffect(() => {
    setSearchQueryInput(searchQuery);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/explore`, {
          params: { search: searchQuery },
        });
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  const handleNewSearch = () => {
    if (searchQueryInput.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQueryInput)}`);
    }
  };

  return (
    <div className="searchBg relative w-full h-screen">
      <div className="bg-[#3A2C2298] w-full min-h-screen">
        <Navbar isHome={true} />
        <SearchBar />

        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-[#FDFBD4] mb-6 tracking-wide">
            Search Results for:{" "}
            <span className="text-[#EFBF04]">{searchQuery}</span>
          </h1>
        </div>

        {results.length === 0 ? (
          <div className="p-4 text-white text-center">
            No destinations found for "{searchQuery}".
          </div>
        ) : (
          <div className="overflow-x-scroll scrollbar-hide grid grid-rows-2 grid-flow-col p-4 gap-5">
              {results.map((item, index) => (
                <PlaceCard
                  key={index}
                  id={item.id}
                  image={item.Image}
                  name={item.Loc_name}
                  maxprice={item.Max_Price}
                  minprice={item.Min_Price}
                />
              ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
