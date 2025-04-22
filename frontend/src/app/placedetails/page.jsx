import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import Navbar from "../components/Navbar";
import SignInButton from "../components/signInButton";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="homeBg relative">
      <div className=" p-8">
        <Navbar isDestinations={true} isPreferences={false} isHome={false} isLiked={false} isDisliked={false} />
        <div className="text-8xl font-bold ">Macinac Island</div>
        <div className="">Car-free island known for its historic sites and natural beauty.</div>
        <div className="">
            <p className="">Category : Islands, Historical & Cultural Sites </p>
        </div>
      </div>
        
      <div className="">
          <Footer />
      </div>
    </div>
  );
}
