"use client";
export default function AuthCard({ isSignUp, form, errors, error, onChange, onSubmit, onToggle }) {
  return (
    <div className={`top-1/2 transform -translate-y-1/2 w-100
         ${isSignUp ? "h-[580px] mt-130" : "h-[370px] mt-80"} bg-[#D9D9D9] p-8 rounded-xl shadow-lg mt-80`}>
      <h2 className="text-black text-2xl font-serif text-center mb-6">
        {isSignUp ? "Create Account" : "Welcome!"}
      </h2>

      {isSignUp && (
        <>
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            className="w-full p-3 mb-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={form.name}
            onChange={onChange}
          />
          {errors.name && <p className="text-blue-500 text-xs mb-2">{errors.name}</p>}

          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            className="w-full p-3 mb-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={form.name}
            onChange={onChange}
          />
          {errors.name && <p className="text-blue-500 text-xs mb-2">{errors.name}</p>}
        </>
        
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-3 mb-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={form.email}
        onChange={onChange}
      />
      {errors.email && <p className="text-blue-500 text-xs mb-2">{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-3 mb-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={form.password}
        onChange={onChange}
      />
      {errors.password && <p className="text-blue-500 text-xs mb-2">{errors.password}</p>}

      {isSignUp && (
        <>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 mb-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={form.confirmPassword}
            onChange={onChange}
          />
          {errors.confirmPassword && <p className="text-blue-500 text-xs mb-2">{errors.confirmPassword}</p>}
        </>
      )}

      {error && <p className="text-blue-500 text-xs mb-2">{error}</p>}
      
      <div className="flex justify-center">
        <button
          className="w-30 bg-[#00800050] text-black font-serif py-2 px-4 rounded-lg hover:bg-[#00800080] transition mt-4"
          onClick={onSubmit}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </div>

      <div className="flex justify-end mt-4 mb-8">
        <h2 className="text-black text-sm font-serif">
          {isSignUp ? "Already have an account?" : "New User?"}
          <button onClick={onToggle} className="text-blue-500 hover:underline cursor-pointer ml-2">
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </h2>
      </div>
    </div>
  );
}



