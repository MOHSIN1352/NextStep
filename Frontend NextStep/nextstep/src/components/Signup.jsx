import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

const Signup = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
    city: "",
    state: "",
    gender: "",
    dob: "",
  });

  // Dropdown Data
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch States
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${API_URL}/state/all`);
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  // Fetch Cities when state changes
  useEffect(() => {
    if (formData.state) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`${API_URL}/cities/${formData.state}`);
          setCities(response.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [formData.state]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (!formData.name || !formData.email || !formData.phone_no || !formData.city || !formData.state || !formData.gender || !formData.dob || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      // Ensure the correct data format
      const requestData = {
        Name: formData.name,
        email: formData.email,
        Phone_no: formData.phone_no,
        City: formData.city,
        State: formData.state,
        Gender: formData.gender,
        Date_of_Birth: formData.dob,
        password: formData.password,
      };
  
      console.log("Sending Data:", requestData);
  
      await axios.post(`${API_URL}/user/register`, requestData, {
        headers: {
         
          "Content-Type": "application/json",
        },
      });
  
      alert("Signup successful!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      alert(`Signup failed: ${error.response?.data?.error || "Please try again."}`);
    }
  };

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
        <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Left Column */}
          <div>
            <label className="block text-[#6D5C4F]">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            />
          </div>

          <div>
            <label className="block text-[#6D5C4F]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            />
          </div>

          <div>
            <label className="block text-[#6D5C4F]">Phone No</label>
            <input
              type="tel"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            />
          </div>

          <div>
            <label className="block text-[#6D5C4F]">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            />
          </div>

          <div>
            <label className="block text-[#6D5C4F]">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-xl border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>{state.State_Name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#6D5C4F]">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state}
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>{city.City_Name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#6D5C4F]">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            >
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
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-xl bg-white/60 border border-gray-300 text-[#4A3B2D] focus:ring-2 focus:ring-[#B99875]"
            />
          </div>

          <div className="col-span-2 mt-6 text-center">
            <button type="submit" className="w-full py-3 bg-[#B99875] text-white rounded-xl shadow-md hover:bg-[#8A6E50] transition duration-300">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
