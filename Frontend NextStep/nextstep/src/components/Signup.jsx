import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5E8D0] to-[#D8BFAA] relative overflow-hidden">
      {/* Branding */}
      <div
        className="absolute top-8 left-10 text-3xl font-bold text-[#4A3B2D] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Next<span className="font-semibold">Step</span>
      </div>

      {/* Signup Card */}
      <div className="relative bg-white/50 backdrop-blur-lg shadow-lg rounded-3xl px-10 py-12 w-[700px] border border-white/30">
        <h1 className="text-3xl font-bold text-[#4A3B2D] text-center mb-6">
          Signup
        </h1>

        {/* Form Grid */}
        <form className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <label className="block text-[#6D5C4F]">Name</label>
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            />
          </div>

          <div>
            <label className="block text-[#6D5C4F]">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            />
          </div>

          <div>
            <label className="block text-[#6D5C4F]">City</label>
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            />
          </div>

          <div>
            <label className="block text-[#6D5C4F]">State</label>
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            />
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-[#6D5C4F]">Gender</label>
            <select className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[#6D5C4F]">Date of Birth</label>
            <input
              type="date"
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            />
          </div>

          {/* Full-Width Button */}
          <div className="col-span-2 mt-6 text-center">
            <button className="w-full py-3 bg-[#B99875] text-white rounded-xl shadow-md hover:bg-[#8A6E50] transition duration-300">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
