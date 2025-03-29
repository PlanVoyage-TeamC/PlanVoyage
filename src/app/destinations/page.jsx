import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PlaceCard from "./placeCard";
import placeCardData from "../tempResources/placeCardData";

export default function Destination() {
  return (
    <div className="destinationBg w-full h-screen relative">
      <div className="bg-[#3A2C2298] w-full h-full">
        <div className="">
          <Navbar isDestinations={false} isPreferences={false} isHome={true} />
        </div>
        <div className="overflow-x-scroll grid grid-rows-2 grid-flow-col p-4 gap-5">
          {placeCardData.map((item, index) => {
            return <PlaceCard key={index} image={item.image} name={item.name} price={item.price} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
