// "use client";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import PlaceCard from "./placeCard";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function Destination() {
//   const [destinations, setDestinations] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const mail = localStorage.getItem("email");
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations`,{
//             params : {email: mail}
          
//       });
//         setDestinations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <div className="destinationBg w-full h-screen relative">
//       <div className="bg-[#3A2C2298] w-full h-full">
//         <div className="">
//         <Navbar isDestinations={false} isPreferences={false} isHome={true} isProfileShown={true} />
//         </div>
//         <div className="overflow-x-scroll scrollbar-hide grid grid-rows-2 grid-flow-col p-4 gap-5">
//           {destinations.map((item, index) => {
//             return (
//               <PlaceCard
//                 key={index}
//                 id={item.id}
//                 image={item.Image}
//                 name={item.Loc_name}
//                 maxprice={item.Max_Price}
//                 minprice={item.Min_Price}
//               />
//             );
//           })}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PlaceCard from "./placeCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Destination() {
  const [destinations, setDestinations] = useState([]);
  const [recommendedDestinations, setRecommendedDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mail = localStorage.getItem("email");
      try {
        // Fetch normal destinations
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations`);
        setDestinations(res.data);

        // Fetch recommended destinations
        const recommendedRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recommendDestinations`, {
          params: { email: mail }
        });
        setRecommendedDestinations(recommendedRes.data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="destinationBg w-full min-h-screen relative">
      <div className="bg-[#3A2C2298] w-full h-full pb-10">
        <Navbar isDestinations={false} isPreferences={false} isHome={true} isProfileShown={true} />

        {/* Recommended Destinations Section */}
        {recommendedDestinations.length > 0 && (
          <div className="p-4">
            <h2 className="text-2xl text-white font-bold mb-4">Recommended for You</h2>
            <div className="overflow-x-scroll scrollbar-hide grid grid-rows-2 grid-flow-col gap-5">
              {recommendedDestinations.map((item, index) => (
                <PlaceCard
                  key={`recommended-${index}`}
                  id={item.id}
                  image={item.Image}
                  name={item.Loc_name}
                  maxprice={item.maxprice}
                  minprice={item.minprice}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Destinations Section */}
        <div className="p-4">
          <h2 className="text-2xl text-white font-bold mb-4">All Destinations</h2>
          <div className="overflow-x-scroll scrollbar-hide grid grid-rows-2 grid-flow-col gap-5">
            {destinations.map((item, index) => (
              <PlaceCard
                key={index}
                id={item.id}
                item_id={item._id}
                image={item.Image}
                name={item.Loc_name}
                maxprice={item.Max_Price}
                minprice={item.Min_Price}
              />
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
