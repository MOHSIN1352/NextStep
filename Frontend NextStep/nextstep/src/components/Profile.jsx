import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, Calendar, Star } from "lucide-react";
import Navbar from "./Navbar";
import { UserContext } from "../Context/UserContext"; // Assuming UserContext is defined elsewhere
import { BookOpen, Briefcase, Bookmark, Building2 } from "lucide-react";
import RecommendationsSection from "./Recommendation";
const Profile = () => {
  const { userData } = useContext(UserContext); // Get logged-in user's ID from context
  const [Data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    state: "",
    city: "",
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userData || !userData.id) return; // Ensure userData.id exists

      try {
        console.log("Fetching profile for user ID:", userData.id);

        const response = await axios.get(
          `http://localhost:5000/api/user/profile/${userData.id}`
        );
        const SavedItemsResponse = await axios.get(
          `http://localhost:5000/api/user/getSavedItem/${userData.id}`
        );
        console.log("User profile data:", SavedItemsResponse.data);
        setData(response.data);
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

  // Fetch states and cities when entering edit mode
  const handleEdit = async () => {
    try {
      // Pre-fill the form with existing data
      setFormData({
        phone: Data.user?.Phone_no || "",
        state: Data.user?.State?._id || "", // Ensure _id is used if State is a reference
        city: Data.user?.City?._id || "",
      });

      const statesResponse = await axios.get(
        "http://localhost:5000/api/state/all"
      );
      setStates(statesResponse.data);

      if (Data.user?.State?._id) {
        const citiesResponse = await axios.get(
          `http://localhost:5000/api/cities/${Data.user.State._id}`
        );
        setCities(citiesResponse.data);
      }

      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching states or cities:", error);
    }
  };

  // Fetch cities when a state is selected
  const handleStateChange = async (e) => {
    console.log("Selected state ID:", e.target.value);
    const selectedStateId = e.target.value;
    setFormData((prev) => ({ ...prev, state: selectedStateId }));

    try {
      const citiesResponse = await axios.get(
        `http://localhost:5000/api/cities/${selectedStateId}`
      );
      setCities(citiesResponse.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Save updated data
  const handleSave = async () => {
    try {
      const updatedData = {
        phone: formData.phone,
        state: formData.state,
        city: formData.city,
      };

      const response = await axios.put(
        `http://localhost:5000/api/user/useredit/${userData.id}`,
        updatedData
      );

      console.log("Updated user profile:", response.data);

      // Update the `Data` state correctly
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
    <div className="min-h-screen w-screen bg-[#f8f4f1] flex flex-col overflow-hidden">
      <Navbar />
      <div>
        <div className="h-h-1/2">
          <RecommendationsSection userId={userData.id} />
        </div>

        {/* edit section */}
        <div className="flex-1 bg-[#e6d5c9] w-[80%] h-[80%] m-4 mb-8 rounded-xl p-4 ">
          <h1 className="text-2xl text-[#6b4f3c] font-bold mb-3">
            Hi {Data.user?.Name || "User Name"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <ProfileField
              label="GENDER"
              value={Data.user?.Gender || "undefined"}
            />
            <ProfileField
              label="DOB"
              value={Data.user?.Date_of_Birth || "01/01/2000"}
              icon={<Calendar size={18} />}
            />
            <ProfileField
              label="EMAIL"
              value={Data.user?.email || "abc@gmail.com"}
            />
            <ProfileField
              label="PHONE NO"
              value={
                isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-transparent outline-none"
                  />
                ) : (
                  Data.user?.Phone_no || "1234567890"
                )
              }
            />
            <ProfileField
              label="STATE"
              value={
                isEditing ? (
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                    className="bg-transparent outline-none text-black"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state._id} value={state._id}>
                        {state.State_Name}
                      </option>
                    ))}
                  </select>
                ) : (
                  Data.user?.State?.State_Name || "State Name"
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
                    className="bg-transparent outline-none text-black"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city._id} value={city._id}>
                        {city.City_Name}
                      </option>
                    ))}
                  </select>
                ) : (
                  Data.user?.City?.City_Name || "City Name"
                )
              }
              icon={isEditing ? null : <ChevronDown size={18} />}
            />
          </div>
          <button
            onClick={isEditing ? handleSave : handleEdit}
            className="w-full bg-[#6b4f3c] text-white py-2 rounded-lg font-semibold hover:bg-[#5a4232] transition mt-6"
          >
            {isEditing ? "SAVE" : "EDIT"}
          </button>
        </div>

        {/* Saved section */}
        <div className="flex-1 p-4">
          <SavedItemsSection userId={userData.id} />
        </div>
      </div>
    </div>
  );
};

function ProfileField({ label, value, icon }) {
  return (
    <div className="h-[40px]">
      <label className="text-[#6b4f3c] font-semibold text-sm block">
        {label}
      </label>
      <div className="bg-[#fdf6f0] rounded-md px-3 py-1 flex justify-between items-center text-sm">
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

  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const SavedItemsResponse = await axios.get(
          `http://localhost:5000/api/user/getSavedItem/${userId}`
        );
        console.log("User profile data:", SavedItemsResponse.data);
        setSavedItems(SavedItemsResponse.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserWishlist();
  }, []);

  return (
    <div className="bg-[#F5F5DC] w-[80%] h-[90%] overflow-x-auto overflow-y-hidden shadow-lg rounded-tl-lg">
      <div className="container mx-auto p-4 min-w-full">
        <h2 className="text-xl font-bold text-[#8B4513] flex items-center gap-2 mb-4">
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
