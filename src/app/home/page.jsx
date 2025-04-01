import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import Navbar from "../components/Navbar";
import SignInButton from "../components/signInButton";
import Footer from "../components/Footer";
import localFont from "next/font/local";

export default function Home() {
  return (
    <div className="homeBg w-full h-screen relative">
      <div className="bg-[#3A2C2285] w-full h-full">
        <Image src={Logo} alt="Logo" width={200} height={200} className="" />
        <div className="">
          <Navbar isDestinations={true} isPreferences={true} isHome={false} />
        </div>
        <div className="h-screen items-center text-center text-white mt-16">
          <div className="font-extrabold my-10 text-7xl">START EXPLORING,</div>
          <div className="font-extrabold my-10 text-7xl">TODAY</div>
          <div className="">
            <SignInButton />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
