import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryDropdown from "./categoryDropdown";

export default function Preferences() {
  return (
    <div className="preferencesBg w-full h-screen relative ">
      <div className="p-5"></div>
      <div className="w-9/10 h-9/10 rounded-2xl bg-[#ffffff80]  m-auto p-5  ">
        <div className="flex items-center justify-center text-black text-2xl font-bold ">
          Tell us what you like !
        </div>
        <div className="flex items-center justify-center text-black text-lg">
          ( Note : This will help us suggest the perfect destinations for you
          the first time!)
        </div>
        <div className="mx-10">
          <div className="  text-black text-lg font-semibold  ">
            <div className="flex gap-50 my-5">
              <h2 className="">Category:</h2>
              <div className="">
                <CategoryDropdown />
              </div>
            </div>
            <div className="flex gap-50 my-5">
              <h2 className="">Weather:</h2>
              <div className="flex gap-10 ">
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  ☀️Sunny
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  🌦️Rainy
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  🌥️Cloudy
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  🌬️Windy
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  ❄️Snowy
                </button>
              </div>
            </div>
            <div className="flex gap-50 my-5">
              <h2 className="">Travel Partner:</h2>
              <div className="flex gap-10 ">
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  Solo
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  Couple
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  Family
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  Friends
                </button>
              </div>
            </div>
            <div className="flex gap-50 my-5">
              <h2 className="">Activities:</h2>
              <div className="flex gap-10 ">
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  Shopping
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  Adventure
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  Safari
                </button>
                <button className="px-4 py-1 border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200">
                  Dining
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-50 my-5">
            <h2 className="text-black text-lg font-semibold">Budget:</h2>
            <input
              type="number"
              placeholder="Enter Budget in USD"
              className="px-4 py-1 min-w-sm text-gray-600 border border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200 outline-none"
            />
          </div>
          <div className="flex gap-10 my-5">
                  <h2 className="text-black text-lg font-semibold">
              Describe your previous travel experience:
            </h2>
            <input className="px-4 py-1 min-w-sm text-gray-600 border border-white/30 backdrop-blur-lg bg-white rounded hover:bg-gray-200 outline-none" />
          </div>

          <button className="px-4 py-1 min-w-sm bg-[#00800025]">
            Suggest Destinations
          </button>
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
}
