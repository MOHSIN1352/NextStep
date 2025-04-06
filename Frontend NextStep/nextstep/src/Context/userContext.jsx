import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("token") || ""
  );
  const [userData, setUserData] = useState(() => {
    const storedData = sessionStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });
  const [isLoggedIn, setLoggedIn] = useState(() =>
    JSON.parse(sessionStorage.getItem("isLoggedIn") || "false")
  );

  // Sync to sessionStorage when any of these change
  useEffect(() => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userData", JSON.stringify(userData));
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [token, userData, isLoggedIn]);

  const logIn = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/user/login", {
      email,
      password,
    });

    console.log("Login response", res.data);

    setToken(res.data.token);
    setUserData(res.data.userData);
    setLoggedIn(res.data.message === "Login successful!");
  };

  const logout = () => {
    setToken("");
    setUserData(null);
    setLoggedIn(false);
    sessionStorage.clear();
  };

  // Fetch updated profile location only when userData exists
  useEffect(() => {
    if (userData?.id) {
      const fetchUpdatedLocation = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/profile/${userData.id}`
          );
          console.log("Updated Location data:", response.data);

          // Update userData with new location info
          const updatedUser = response.data.user;
          setUserData((prevData) => ({
            ...prevData,
            State: updatedUser.State,
            City: updatedUser.City,
          }));
        } catch (error) {
          console.error("Error fetching updated location:", error);
        }
      };

      fetchUpdatedLocation();
    }
  }, [userData?.id]); // Only re-run when the user logs in or ID changes

  return (
    <UserContext.Provider
      value={{ token, userData, isLoggedIn, logIn, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
