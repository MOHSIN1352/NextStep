import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#F5E8D0] to-[#D8BFAA] relative overflow-hidden">
      {/* Branding */}
      <div
        className="absolute top-8 left-10 text-3xl font-bold text-[#4A3B2D] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Next<span className="font-semibold">Step</span>
      </div>

      {/* Login Card */}
      <div className="relative bg-white/50 backdrop-blur-lg shadow-lg rounded-3xl px-10 py-12 w-96 border border-white/30">
        <h1 className="text-3xl font-bold text-[#4A3B2D] text-center">Login</h1>

        <form className="mt-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-[#6D5C4F] font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875] focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-[#6D5C4F] font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875] focus:outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full py-3 bg-[#B99875] text-white font-semibold rounded-xl shadow-md hover:bg-[#8A6E50] transition duration-300"
            >
              Login
            </button>
          </div>

          {/* Forgot Password Button */}
          <div className="mt-4 text-center">
            <button className="w-full py-3 bg-transparent text-[#B99875] font-semibold rounded-xl border border-[#B99875] shadow-md hover:bg-[#B99875] hover:text-white transition duration-300">
              Forgot Password
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-[#6D5C4F]">
            Don't have an account?{" "}
            <span
              className="text-[#B99875] font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
