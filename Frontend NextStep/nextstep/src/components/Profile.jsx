import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { User, ChevronDown, Calendar } from "lucide-react";
import Navbar from "./Navbar";
import { UserContext } from "../Context/UserContext"; // Assuming UserContext is defined elsewhere

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
    <div className="h-screen w-screen bg-[#f8f4f1] flex flex-col overflow-hidden">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto ">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-6">
          {/* Profile Information */}
          <div className="flex-1 bg-[#e6d5c9] mt-[8%] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 bg-[#c39b7e] rounded-full flex items-center justify-center">
                  <span className="text-3xl text-white font-semibold">HI!</span>
                </div>
                <h1 className="text-3xl text-[#6b4f3c] font-bold">
                  {Data.user?.Name || "User Name"}
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  label="EMAIL"
                  value={Data.user?.email || "abc@gmail.com"}
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
                <ProfileField
                  label="GENDER"
                  value={Data.user?.Gender || "undefined"}
                />
                <ProfileField
                  label="DOB"
                  value={Data.user?.Date_of_Birth || "01/01/2000"}
                  icon={<Calendar size={18} />}
                />
              </div>
            </div>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="w-full bg-[#6b4f3c] text-white py-2 rounded-lg font-semibold hover:bg-[#5a4232] transition mt-6"
            >
              {isEditing ? "SAVE" : "EDIT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function ProfileField({ label, value, icon }) {
  return (
    <div>
      <label className="text-[#6b4f3c] font-semibold text-sm block">
        {label}
      </label>
      <div className="bg-[#fdf6f0] rounded-md px-4 py-2 flex justify-between items-center text-sm">
        <span className="text-[#6b4f3c]">{value}</span>
        {icon}
      </div>
    </div>
  );
}

export default Profile;
