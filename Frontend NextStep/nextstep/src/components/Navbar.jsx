import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthToggle = () => {
    setIsLoggedIn(!isLoggedIn);
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
          {isLoggedIn ? (
            <Link to="/profile" className="flex items-center hover:scale-105">
              <UserCircle size={32} />
              {/* <span className="ml-2">Profile</span> */}
            </Link>
          ) : (
            <button
              onClick={handleAuthToggle}
              className="px-4 py-2 hover:scale-105 cursor-pointer  rounded-lg "
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
