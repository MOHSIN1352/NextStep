import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  Venus,
  Mars,
  ChevronDown,
  Calendar,
  Star,
  BookOpen,
  Briefcase,
  Bookmark,
  Building2,
  Pencil,
  Save,
} from "lucide-react";
import { motion } from "framer-motion";

// Components
import Navbar from "./Navbar";
import RecommendationsSection from "./Recommendation";
import femaleAvatar from "../assets/avatars/female.png";
import maleAvatar from "../assets/avatars/male.png";
// Context
import { UserContext } from "../Context/userContext.jsx";

const Profile = () => {
  const { userData } = useContext(UserContext); // Get logged-in user's ID from context
  // const maleAvatar = "../src/assets/avatars/male.png";
  // const femaleAvatar = "../src/assets/avatars/female.png";

  const [Data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    state: "",
    city: "",
  });

  const API_URL =
    import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userData || !userData.id) return;

      try {
        console.log("Fetching profile for user ID:", userData.id);

        const [profileRes, savedItemsRes] = await Promise.all([
          axios.get(`${API_URL}/user/profile/${userData.id}`),
          axios.get(`${API_URL}/user/getSavedItem/${userData.id}`),
        ]);

        console.log("User profile data:", savedItemsRes.data);
        setData(profileRes.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      setFormData({
        phone: Data.user?.Phone_no || "",
        state: Data.user?.State?._id || "",
        city: Data.user?.City?._id || "",
      });

      const statesRes = await axios.get(`${API_URL}/state/all`);

      setStates(statesRes.data);

      if (Data.user?.State?._id) {
        const citiesRes = await axios.get(
          `${API_URL}/cities/${Data.user.State._id}`
        );
        setCities(citiesRes.data);
      }

      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching states or cities:", error);
    }
  };

  // Fetch cities when a state is selected
  const handleStateChange = async (e) => {
    const selectedStateId = e.target.value;
    console.log("Selected state ID:", selectedStateId);

    setFormData((prev) => ({ ...prev, state: selectedStateId }));

    try {
      const citiesRes = await axios.get(`${API_URL}/cities/${selectedStateId}`);

      setCities(citiesRes.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Save updated user data
  const handleSave = async () => {
    try {
      const updatedData = {
        phone: formData.phone,
        state: formData.state,
        city: formData.city,
      };

      const res = await axios.put(
        `${API_URL}/user/useredit/${userData.id}`,

        updatedData
      );

      console.log("Updated user profile:", res.data);

      // Update the displayed data in local state
      setData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          Phone_no: updatedData.phone,
          State: {
            _id: updatedData.state,
            State_Name:
              states.find((s) => s._id === updatedData.state)?.State_Name ||
              prev.user?.State?.State_Name,
          },
          City: {
            _id: updatedData.city,
            City_Name:
              cities.find((c) => c._id === updatedData.city)?.City_Name ||
              prev.user?.City?.City_Name,
          },
        },
      }));

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving updated profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4f1] to-[#f4ebe4] px-4 pt-8 font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 flex justify-center mt-12"
        >
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#e3d5c6] w-full max-w-md relative">
            {/* Avatar */}
            <div className="flex justify-center -mt-20 mb-4">
              <img
                src={
                  Data.user?.Gender?.toLowerCase() === "female"
                    ? { femaleAvatar }
                    : { maleAvatar }
                }
                alt="Profile Avatar"
                className="w-28 h-28 rounded-full border-4 border-[#decdbd] shadow-md transition-all duration-300 hover:scale-105 hover:ring hover:ring-[#cdb6a2] bg-white"
              />
            </div>

            {/* Greeting */}
            <h1 className="text-2xl font-semibold text-center text-[#5c4433] mb-6">
              Hi {Data.user?.Name || "User"} <span className="wave">👋</span>
            </h1>

            {/* Keyframe animation */}
            <style>
              {`
                @keyframes wave {
                  0% { transform: rotate(0.0deg); }
                  10% { transform: rotate(14.0deg); }
                  20% { transform: rotate(-8.0deg); }
                  30% { transform: rotate(14.0deg); }
                  40% { transform: rotate(-4.0deg); }
                  50% { transform: rotate(10.0deg); }
                  60% { transform: rotate(0.0deg); }
                  100% { transform: rotate(0.0deg); }
                }
                .wave {
                  display: inline-block;
                  animation: wave 2s infinite;
                  transform-origin: 70% 70%;
                }
              `}
            </style>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 gap-4">
              <ProfileField
                label="GENDER"
                value={Data.user?.Gender || "-"}
                icon={
                  Data.user?.Gender?.toLowerCase() === "female" ? (
                    <Venus size={18} />
                  ) : (
                    <Mars size={18} />
                  )
                }
              />

              <ProfileField
                label="DOB"
                value={Data.user?.Date_of_Birth || "01/01/2000"}
                icon={<Calendar size={18} />}
              />

              <ProfileField
                label="EMAIL"
                value={Data.user?.email || "abc@example.com"}
                icon={<Mail size={18} />}
              />

              <ProfileField
                label="PHONE NO"
                value={
                  isEditing ? (
                    <input
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-transparent outline-none text-[#5c4433] w-full truncate"
                    />
                  ) : (
                    <span className="block truncate">
                      {Data.user?.Phone_no || "-"}
                    </span>
                  )
                }
                icon={<Phone size={18} />}
              />

              <ProfileField
                label="STATE"
                value={
                  isEditing ? (
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      className="bg-transparent outline-none text-[#5c4433] w-full"
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state._id} value={state._id}>
                          {state.State_Name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="block truncate">
                      {Data.user?.State?.State_Name || "-"}
                    </span>
                  )
                }
                icon={isEditing ? null : <ChevronDown size={18} />}
              />

              <ProfileField
                label="CITY"
                value={
                  isEditing ? (
                    <select
                      name="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      className="bg-transparent outline-none text-[#5c4433] w-full"
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.City_Name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="block truncate">
                      {Data.user?.City?.City_Name || "-"}
                    </span>
                  )
                }
                icon={isEditing ? null : <ChevronDown size={18} />}
              />

              {/* INTEREST Field */}
              {/* <ProfileField
                label="INTEREST"
                value={
                  isEditing ? (
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          interest: e.target.value,
                        }))
                      }
                      className="bg-transparent outline-none text-[#5c4433] w-full"
                    >
                      <option value="">Select Interest</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Business">Business</option>
                      <option value="Government Services">Government Services</option>
                    </select>
                  ) : (
                    <span className="block truncate">{Data.user?.Interest || "-"}</span>
                  )
                }
                icon={isEditing ? null : <ChevronDown size={18} />}
              /> */}
            </div>

            {/* Button */}
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="w-full mt-6 py-2 bg-[#5c4433] text-white rounded-xl font-medium hover:bg-[#493527] transition-all duration-300 shadow flex justify-center gap-2 items-center"
            >
              {isEditing ? <Save size={18} /> : <Pencil size={18} />}
              {isEditing ? "SAVE" : "EDIT"}
            </button>
          </div>
        </motion.div>

        {/* Right Section */}
        <div className="col-span-2 flex flex-col space-y-2 mt-12">
          <div>
            <div className=" whitespace-nowrap space-x-4 flex scrollbar-thin scrollbar-thumb-[#cdb6a2] scrollbar-track-transparent pb-2">
              <RecommendationsSection userId={userData.id} />
            </div>
          </div>

          <div>
            <SavedItemsSection userId={userData.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

function ProfileField({ label, value, icon }) {
  return (
    <div className="space-y-1 group transition-all duration-200">
      <label className="text-[#6b4f3c] font-semibold text-sm">{label}</label>
      <div className="bg-[#fdf6f0] rounded-xl px-4 py-2 flex justify-between items-center text-sm border border-[#e0cfc0] group-hover:border-[#cdb6a2] transition">
        <span className="text-[#6b4f3c]">{value}</span>
        {icon}
      </div>
    </div>
  );
}

export default Profile;

function SavedItemsSection({ userId }) {
  // Mock data for saved items
  const [savedItems, setSavedItems] = useState({
    jobs: [],
    policies: [],
    institutes: [],
    courses: [],
  });

  const API_URL =
    import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const SavedItemsResponse = await axios.get(
          `${API_URL}/user/getSavedItem/${userId}`
        );
        console.log("User profile data:", SavedItemsResponse.data);
        setSavedItems(SavedItemsResponse.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserWishlist();
  }, [userId]);

  return (
    <div className="bg-[#fff9f6] shadow-md border border-[#e6d5c9] w-full max-w-screen-xl mx-auto rounded-xl p-6">
      <div className="container mx-auto p-4 min-w-full ">
        <h2 className="text-xl font-bold text-[#8B4513] flex items-center gap-2 mb-4 ">
          <Bookmark />
          Saved Items
        </h2>

        {/* Scrollable Row */}
        <div className="flex space-x-6 overflow-x-auto overflow-y-hidden pb-4">
          {/* Saved Jobs */}
          <div className="bg-white min-w-[300px] rounded-lg shadow-lg p-6 flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="text-[#8B4513]" />
              <h3 className="text-xl font-semibold text-[#8B4513]">
                Saved Jobs
              </h3>
            </div>
            <div className="space-y-4">
              {savedItems.jobs.length > 0 ? (
                savedItems.jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 bg-[#F5F5DC] rounded-lg overflow-hidden"
                  >
                    <h4 className="font-semibold">{job.Name}</h4>
                    <p className="text-sm text-[#8B4513]">{job.Company_Name}</p>
                    <p className="text-sm text-gray-600">{job.Industry_Type}</p>
                    <a
                      href={job.Apply_Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Apply Now
                    </a>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-[#F5F5DC] rounded-lg">
                  <h4 className="font-semibold">No Saved Jobs</h4>
                </div>
              )}
            </div>
          </div>

          {/* Saved Policies */}
          <div className="bg-white min-w-[300px] rounded-lg shadow-lg p-6 flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="text-[#8B4513]" />
              <h3 className="text-xl font-semibold text-[#8B4513]">
                Saved Policies
              </h3>
            </div>
            <div className="space-y-4">
              {savedItems.policies.length > 0 ? (
                savedItems.policies.map((policy) => (
                  <div key={policy._id} className="p-4 bg-[#F5F5DC] rounded-lg">
                    <h4 className="font-semibold">{policy.Name}</h4>
                    <p className="text-sm text-[#8B4513]">{policy.company}</p>
                    <a
                      href={policy.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Visit Now
                    </a>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-[#F5F5DC] rounded-lg">
                  <h4 className="font-semibold">No Saved Policies</h4>
                </div>
              )}
            </div>
          </div>

          {/* Saved Institutes */}
          <div className="bg-white min-w-[300px] rounded-lg shadow-lg p-6 flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="text-[#8B4513]" />
              <h3 className="text-xl font-semibold text-[#8B4513]">
                Saved Institutes
              </h3>
            </div>
            <div className="space-y-4">
              {savedItems.institutes.length > 0 ? (
                savedItems.institutes.map((institute) => (
                  <div
                    key={institute.id}
                    className="p-4 bg-[#F5F5DC] rounded-lg"
                  >
                    <h4 className="font-semibold">{institute.Name}</h4>
                    <p className="text-sm text-[#8B4513]">
                      {institute.address}
                    </p>
                    <a
                      href={institute.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Visit Now
                    </a>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-[#F5F5DC] rounded-lg">
                  <h4 className="font-semibold">No Saved Institutes</h4>
                </div>
              )}
            </div>
          </div>

          {/* Saved Courses */}
          <div className="bg-white min-w-[300px] rounded-lg shadow-lg p-6 flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-[#8B4513]" />
              <h3 className="text-xl font-semibold text-[#8B4513]">
                Saved Courses
              </h3>
            </div>
            <div className="space-y-4">
              {savedItems.courses.length > 0 ? (
                savedItems.courses.map((course) => (
                  <div key={course.id} className="p-4 bg-[#F5F5DC] rounded-lg">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold">{course.Name}</h4>
                      <h4 className="font-semibold">
                        {course.rating}
                        <Star
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      </h4>
                    </div>
                    <p className="text-sm text-[#8B4513]">{course.Platform}</p>
                    <p className="text-sm text-gray-600">{course.duration}</p>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Visit Now
                    </a>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-[#F5F5DC] rounded-lg">
                  <h4 className="font-semibold">No Saved Courses</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
