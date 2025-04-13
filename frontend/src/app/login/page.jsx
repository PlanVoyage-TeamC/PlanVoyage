"use client"; 
import Footer from "../components/Footer";
import { useState } from "react";

export default function Auth() {
  const [isSignUp, setisSignUp] = useState(false);

  return (
    <div className="loginBg relative w-full h-screen">
      <div className="flex items-center justify-center ml-auto w-1/2 bg-[#3A2C2280] h-full">
            <div className='top-1/2 right-45 transform -translate-y-1/2 w-100
                            ${isSignUp? " h-[450px]" : "h-[350px]"} 
                            bg-[#D9D9D9] p-8 rounded-xl shadow-lg mt-80'>
                <div className="flex items-center justify-center">
                  <h2 className="text-black-1800 text-2xl font-serif mb-6 ">
                    {isSignUp? "Create Account" : "Welcome!"}
                  </h2>
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full p-3 mb-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                {isSignUp && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-3 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                )}
                <div className="flex justify-center">
                  <button className="w-30 bg-[#00800050] border-black-1 text-black font-serif py-2 rounded-lg hover:bg-[#00800080] transition mt-4">
                    {isSignUp? "Sign Up" : "Login"}
                  </button>
                </div>
                <div className="flex justify-end mt-4 mb-8">
                    {isSignUp ? (
                    <h2 className="text-black-800 text-sm font-serif">
                      Already have an account?
                      <button 
                        onClick={() => setisSignUp(false)}
                        className="text-blue-500 hover:underline ml-2"
                      >Login</button>
                    </h2>
                    ) : (
                    <h2 className="text-black-800 text-sm font-serif">
                      New User?
                      <button 
                        onClick={() => setisSignUp(true)}
                        className="text-blue-500 hover:underline ml-2"
                      >Sign Up</button>
                    </h2>
                    )}          
                </div>
                <div 
                  className="g-signin2" data-onsuccess="onSignIn">
                </div>
          </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
