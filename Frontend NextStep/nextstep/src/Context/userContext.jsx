import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT manually
      setUser({ id: payload.userId, name: payload.name, email: payload.email });
      console.log(user);
      // Check if location is already in localStorage to prevent unnecessary API calls
      const storedLocation = localStorage.getItem("userLocation");
      if (storedLocation) {
        setLocation(JSON.parse(storedLocation));
      } else {
        // Fetch location from backend once
        fetch(`/api/users/${payload.userId}/location`)
          .then((res) => res.json())
          .then((data) => {
            setLocation(data); // { state: "Gujarat", city: "Ahmedabad" }
            localStorage.setItem("userLocation", JSON.stringify(data)); // Cache it
          })
          .catch((error) => console.error("Error fetching location:", error));
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, location }}>
      {children}
    </UserContext.Provider>
  );
};
