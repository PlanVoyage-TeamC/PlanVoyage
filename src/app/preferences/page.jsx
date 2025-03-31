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
        <div className="flex my-2 ">
          <h1 className="ml-30">Category</h1>
          <div className="ml-80">
            <CategoryDropdown />
          </div>
        </div>
        <div className=""></div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
}
