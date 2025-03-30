import Image from "next/image";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/loginBg.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-transparent to-black/40 backdrop-blur-sm"></div>

      
      <div className="absolute top-1/2 right-45 transform -translate-y-1/2 w-96 bg-white p-8 rounded-xl shadow-lg  h-[350px]">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-black-1800 text-2xl font-serif ">Welcome!</h2>
        </div>
        
        <input
          type="text"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <div className="flex justify-center">
          <button className="w-30 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition mt-4">
            Login
          </button>
        </div>

        <div className="flex justify-end mt-4 mb-8">
        <h2 className="text-black-800 text-sm font-serif">
          New User?<a href="/signup" className="text-blue-500 hover:underline ml-2">Sign Up</a>
        </h2>
        </div>
        
      </div>
      <div>
        {/*className="w-full absolute bottom-0">*/}
        <Footer />
      </div>
    </div>
  );
}
