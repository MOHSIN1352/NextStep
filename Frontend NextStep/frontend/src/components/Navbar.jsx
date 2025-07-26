import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { UserContext } from "../Context/userContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/");
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
          {isLoggedIn ? (
            <>
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
              <Link to="/employers" className="hover:scale-105">
                Employers
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:scale-105"
              >
                Government Scheme
              </button>
              <button
                onClick={() => navigate("/login")}
                className="hover:scale-105"
              >
                Education
              </button>
              <button
                onClick={() => navigate("/login")}
                className="hover:scale-105"
              >
                Healthcare
              </button>
              <button
                onClick={() => navigate("/login")}
                className="hover:scale-105"
              >
                Jobs
              </button>
              <button
                onClick={() => navigate("/login")}
                className="hover:scale-105"
              >
                Employers
              </button>
            </>
          )}
        </div>

        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <div className="flex items-center">
              <Link to="/profile" className="hover:scale-105">
                <UserCircle size={32} />
              </Link>
              <button
                className="px-4 py-2 hover:scale-105 cursor-pointer rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="px-4 py-2 hover:scale-105 cursor-pointer rounded-lg"
              onClick={() => navigate("/login")}
            >
              LogIn
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
