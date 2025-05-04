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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) setIsLoggedIn(true);

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

  const handleCardClick = (e, id) => {
    const tagName = e.target.tagName.toLowerCase();
    const classList = e.target.classList;

    // Ignore clicks on icons or buttons
    if (
      tagName === "svg" ||
      tagName === "path" ||
      classList.contains("text-xl") ||
      classList.contains("cursor-pointer")
    ) {
      return; // Don't navigate
    }

    const email = localStorage.getItem("email");
    if (email) {
      router.push(`/destinations/${id}`);
    } else {
      setShowLoginPopup(true);
    }
  };

  const handleNewSearch = () => {
    if (searchQueryInput.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQueryInput)}`);
    }
  };

  return (
    <div className="searchBg relative w-full min-h-screen">
      <div className="bg-[#3A2C2298] w-full min-h-screen">
        <Navbar isHome={true} isProfileShown={isLoggedIn} />
        <SearchBar />

        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-[#FDFBD4] mb-6 tracking-wide">
            Search Results for: <span className="text-[#EFBF04]">{searchQuery}</span>
          </h1>
        </div>

        {results.length === 0 ? (
          <div className="p-4 text-white text-center">
            No destinations found for "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center px-4 pb-10">
            {results.map((item) => (
              <div
                key={item._id}
                className="cursor-pointer"
                onClick={(e) => handleCardClick(e, item._id)}
              >
                <PlaceCard
                  id={item.id}
                  item_id={item._id}
                  image={item.Image}
                  name={item.Loc_name}
                  maxprice={item.Max_Price}
                  minprice={item.Min_Price}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showLoginPopup && (
        <div className="fixed inset-0 bg-[#3A2C2280] bg-opacity-30 backdrop-blur flex items-center justify-center z-50">
          <div className="relative bg-[#D9D9D9] bg-opacity-90 p-8 rounded-lg w-[400px] shadow-2xl">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
              onClick={() => setShowLoginPopup(false)}
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-black text-2xl font-serif text-center mb-4">Login Required</h2>
            <p className="text-red-500 text-md font-serif text-center mb-2">
              Please Login or SignUp to view more details about this place.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => router.push("/login")}
                className="w-40 bg-[#00800050] text-black font-serif py-2 px-4 rounded-lg hover:bg-[#00800080] transition mt-4"
              >
                Login/SignUp
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

/*"use client";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) setIsLoggedIn(true);

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

  const handleCardClick = (e, id) => {
    e.stopPropagation();
    const email = localStorage.getItem("email");

    if (email) {
      router.push(`/destinations/${id}`);
    } else {
      setShowLoginPopup(true);
    }
  };

  return (
    <div className="searchBg relative w-full min-h-screen">
      <div className="bg-[#3A2C2298] w-full min-h-screen">
        <Navbar isHome={true} isProfileShown={isLoggedIn} />
        <SearchBar />

        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-[#FDFBD4] mb-6 tracking-wide">
            Search Results for: <span className="text-[#EFBF04]">{searchQuery}</span>
          </h1>
        </div>

        {results.length === 0 ? (
          <div className="p-4 text-white text-center">
            No destinations found for "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center px-4 pb-10">
            {results.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={(e) => handleCardClick(e, item._id)}
                style={{ pointerEvents: "auto" }}
              >
                <div style={{ pointerEvents: "none" }}>
                  <PlaceCard
                    id={item.id}
                    item_id={item._id}
                    image={item.Image}
                    name={item.Loc_name}
                    maxprice={item.Max_Price}
                    minprice={item.Min_Price}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showLoginPopup && (
        <div className="fixed inset-0 bg-[#3A2C2280] bg-opacity-30 backdrop-blur flex items-center justify-center z-50">
          <div className="relative bg-[#D9D9D9] bg-opacity-90 p-8 rounded-lg w-[400px] shadow-2xl">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
              onClick={() => setShowLoginPopup(false)}
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-black text-2xl font-serif text-center mb-4">Login Required</h2>
            <p className="text-red-500 text-md font-serif text-center mb-2">
              Please Login or SignUp to view more details about this place. </p> 

            <div className="flex justify-center">
              <button
                onClick={() => router.push("/login")}
                className=" w-40 bg-[#00800050] text-black font-serif py-2 px-4 rounded-lg hover:bg-[#00800080] transition mt-4"
              >
                Login/SignUp
              </button>
              </div>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
}*/
