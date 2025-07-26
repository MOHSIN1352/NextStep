import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP and new password
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/forgotPassword`, {
        email,
      });

      setMessage(response.data.message);
      setStep(2); // Move to step 2
      setError("");
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
      setMessage("");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/user/resetPasswordWithOTP`,

        { email, otp, newPassword }
      );
      setMessage(response.data.message);
      setError("");
      navigate("/login"); // Redirect to login page after successful reset
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f5f0e3]">
      <div className="relative backdrop-blur-2xl shadow-xl rounded-3xl px-10 py-12 w-96 border border-white/30">
        <h1 className="text-3xl font-bold text-amber-900 text-center">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h1>

        {message && (
          <p className="text-green-500 text-center mt-2">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {step === 1 && (
          <form className="mt-6" onSubmit={handleForgotPassword}>
            <div>
              <label
                htmlFor="email"
                className="block text-[#6D5C4F] font-medium"
              >
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

            <div className="mt-6 text-center">
              <button
                type="submit"
                className="w-full py-3 bg-orange-900 text-white font-semibold rounded-xl shadow-md hover:bg-[#8A6E50] transition duration-300"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="mt-6" onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="otp" className="block text-[#6D5C4F] font-medium">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875] focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="newPassword"
                className="block text-[#6D5C4F] font-medium"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875] focus:outline-none"
                required
              />
            </div>

            <div className="mt-6 text-center">
              <button
                type="submit"
                className="w-full py-3 bg-orange-900 text-white font-semibold rounded-xl shadow-md hover:bg-[#8A6E50] transition duration-300"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-[#6D5C4F]">
            Remembered your password?{" "}
            <span
              className="text-amber-900 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
