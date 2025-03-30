import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Split the JWT token to get the payload
        const payloadBase64 = token.split(".")[1]; // Extract the payload part
        const decodedPayload = JSON.parse(atob(payloadBase64)); // Decode and parse JSON

        setUser({ id: decodedPayload.userId, email: decodedPayload.email });
        localStorage.setItem("loggedIn", user.id); //logged in users ID is in localstorage
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, []);

  const handleAuthClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="text-orange-900">
      <div className="w-full px-10 py-4 flex justify-between items-center">
        <div className="text-3xl font-bold">
          <Link to="/">
            Next<span className="font-stretch-50% font-semibold">step</span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-10 font-sans">
          <Link to="/governmentPolicies" className="hover:scale-105">
            Government Scheme
          </Link>
          <Link to="/institute" className="hover:scale-105">
            Education
          </Link>
          <Link to="/healthCareSearch" className="hover:scale-105">
            Healthcare
          </Link>
          <Link to="/jobListings" className="hover:scale-105">
            Jobs
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={handleAuthClick}
            className="px-4 py-2 hover:scale-105 cursor-pointer rounded-lg"
          >
            {user ? (
              <div className="flex items-center">
                <UserCircle size={32} />
                <span className="ml-2">{user.name}</span> {/* Show user name */}
              </div>
            ) : (
              "Login / Signup"
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
