import { useState } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../Context/userContext";
import { useContext } from "react";
const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    password: "password123",
    state: "California",
    city: "Los Angeles",
    gender: "Male",
    dob: "1995-06-15",
  });
  const { user, location } = useContext(UserContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-beige-200 to-gray-100">
      <Navbar />
      <div className=" p-12 flex items-center justify-center ">
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-12 border border-brown-300 flex flex-row gap-12">
          {/* Left Section */}
          <div className="flex-1">
            <h1 className="text-6xl font-extrabold text-brown-800 mb-10">
              Hello, {profile.name}!
            </h1>

            <div className="space-y-8">
              {/* Static Fields */}

              <div>
                <label className="block text-brown-600 mb-2 text-lg">
                  Gender:
                </label>
                <p className="text-xl text-gray-700">{profile.gender}</p>
              </div>

              <div>
                <label className="block text-brown-600 mb-2 text-lg">
                  Date of Birth:
                </label>
                <p className="text-xl text-gray-700">{profile.dob}</p>
              </div>
            </div>
          </div>

          {/* Right Section - Editable State & City */}
          <div className="flex-1 space-y-12">
            <div>
              <label className="block text-brown-600 mb-4 text-2xl font-semibold">
                State:
              </label>
              <input
                type="text"
                name="state"
                value={profile.state}
                onChange={handleChange}
                className="w-full p-4 text-xl border border-brown-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-gray-50 text-brown-800"
              />
            </div>

            <div>
              <label className="block text-brown-600 mb-4 text-2xl font-semibold">
                City:
              </label>
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                className="w-full p-4 text-xl border border-brown-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-gray-50 text-brown-800"
              />
            </div>

            <button className="mt-8 w-full bg-brown-700 text-white p-4 rounded-lg hover:bg-brown-800 transition-transform transform hover:scale-105">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
