import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useContext(UserContext);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    console.log("Login button clicked");
    e.preventDefault();

    try {
      await logIn(email, password);
      setError("");
      navigate("/jobListings"); // Redirect on success
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword"); // Navigate to the Forgot Password page
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f5f0e3]  relative overflow-hidden">
      {/* Branding */}
      <div
        className="absolute top-8 left-10 text-3xl font-bold text-orange-900 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Next<span className="font-semibold">Step</span>
      </div>
      <div>
        <iframe
          src="https://lottie.host/embed/4eb61a03-4a7f-4409-baf4-1ebb8fd4e3e3/L8TuJEfMz4.lottie"
          className="absolute top-[40%] left-0"
          width={600}
          height={400}
        ></iframe>
        <iframe
          src="https://lottie.host/embed/7c125179-f12b-4784-a8b0-e6db77832119/MfDnwXqDAe.lottie"
          className="absolute top-[40%] right-0"
          width={600}
          height={400}
        ></iframe>
      </div>
      {/* Login Card */}
      <div className="relative   backdrop-blur-2xl shadow-xl rounded-3xl px-10 py-12 w-96 border border-white/30">
        <h1 className="text-3xl font-bold text-amber-900 text-center">Login</h1>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875] focus:outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full py-3 bg-orange-900 text-white font-semibold rounded-xl shadow-md hover:bg-[#8A6E50] transition duration-300"
            >
              Login
            </button>
          </div>

          {/* Forgot Password Button */}
          <div className="mt-4 text-center">
            <button
              className="w-full py-3 bg-transparent text-[#B99875] font-semibold rounded-xl border border-[#B99875] shadow-md hover:bg-amber-900 hover:text-white transition duration-300"
              onClick={handleForgotPassword}
            >
              Forgot Password
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-[#6D5C4F]">
            Don't have an account?{" "}
            <span
              className="text-amber-900 font-semibold cursor-pointer hover:underline"
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
