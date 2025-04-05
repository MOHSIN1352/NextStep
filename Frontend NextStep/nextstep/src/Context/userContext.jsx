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
    setLoggedIn(res.data.message === "Login successful!" ? true : false);
  };

  const logout = () => {
    setToken("");
    setUserData(null);
    setLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{ token, userData, isLoggedIn, logIn, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
