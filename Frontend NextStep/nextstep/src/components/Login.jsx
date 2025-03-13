import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update with your backend URL

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
console.log("login data",formData)
    try {
      const response =  await axios.post(`${API_URL}/user/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login successful:", response.data);
      alert("Login Successful!");
      
      // Store token in local storage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard or home page
      navigate("/governmentPolicies");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Invalid credentials, try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#F5E8D0] to-[#D8BFAA] relative overflow-hidden">
      {/* Branding */}
      <div className="absolute top-8 left-10 text-3xl font-bold text-[#4A3B2D] cursor-pointer" onClick={() => navigate("/")}>
        Next<span className="font-semibold">Step</span>
      </div>

      {/* Login Card */}
      <div className="relative bg-white/50 backdrop-blur-lg shadow-lg rounded-3xl px-10 py-12 w-96 border border-white/30">
        <h1 className="text-3xl font-bold text-[#4A3B2D] text-center">Login</h1>

        {/* Display error message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-[#6D5C4F] font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875] focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <label htmlFor="password" className="block text-[#6D5C4F] font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875] focus:outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <div className="mt-6 text-center">
            <button type="submit" className="w-full py-3 bg-[#B99875] text-white font-semibold rounded-xl shadow-md hover:bg-[#8A6E50] transition duration-300">
              Login
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-[#6D5C4F]">
            Don't have an account?{" "}
            <span className="text-[#B99875] font-semibold cursor-pointer hover:underline" onClick={() => navigate("/signup")}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
