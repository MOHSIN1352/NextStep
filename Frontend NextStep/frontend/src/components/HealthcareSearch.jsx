import React, { useState, useEffect, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./Navbar";
import axios from "axios";
import { UserContext } from "../Context/userContext";
const MapUpdater = ({ facilities }) => {
  const map = useMap();
  if (facilities.length > 0) {
    map.setView([facilities[0].Latitude, facilities[0].Longitude], 12);
  }
  return null;
};

const HealthcareSearch = () => {
  const { userData } = useContext(UserContext);
  const [category, setCategory] = useState("hospital");
  const [facilities, setFacilities] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);

  const location = userData.City || "";

  const API_URL =
    import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/hospitals`, {
          params: { location },
        });

        setHospitalData(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    if (hospitalData) {
      setFacilities(
        hospitalData.filter(
          (facility) => facility.Facility_Type.toLowerCase() === category
        )
      );
    } else {
      setFacilities([]);
    }
  }, [category, hospitalData]);

  return (
    <div className="bg-[#f6f6ef]">
      <Navbar />
      <div className="flex h-screen bg-[#F5E8D0] font-sans border-y-1 border-gray-400">
        {/* Sidebar */}
        <div className="w-1/4 p-8 bg-[#f6f6ef] shadow-xl border-y-1 border-r-1 border-gray-300 flex flex-col gap-6 text-[#4A3B2D] font-medium">
          <h1 className="text-2xl font-bold text-[#815b37] tracking-wide drop-shadow-xl">
            Find Healthcare
          </h1>
          <div className="flex gap-3">
            <button
              className={`py-2 px-3 rounded-lg text-white text-md font-semibold shadow-md transition-all duration-300 ${
                category === "hospital"
                  ? "bg-[#9d7850]"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              onClick={() => setCategory("hospital")}
            >
              Hospitals
            </button>
            <button
              className={`py-2 px-3 rounded-lg text-white text-md font-semibold shadow-md transition-all duration-300 ${
                category === "clinic"
                  ? "bg-[#8A6E50]"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              onClick={() => setCategory("clinic")}
            >
              Clinics
            </button>
            <button
              className={`py-2 px-3 rounded-lg text-white text-md font-semibold shadow-md transition-all duration-300 ${
                category === "pharmacy"
                  ? "bg-[#8A6E50]"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              onClick={() => setCategory("pharmacy")}
            >
              Pharmacies
            </button>
          </div>
          <ul className="mt-4 text-lg">
            {facilities.map((facility) => (
              <li key={facility._id} className="py-2 border-b border-gray-300">
                {facility.Name}
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="w-3/4 relative">
          <MapContainer
            center={[40.7128, -74.006]}
            zoom={10}
            className="h-full w-full rounded-l-3xl overflow-hidden"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapUpdater facilities={facilities} />
            {facilities.map((facility) => (
              <Marker
                key={facility._id}
                position={[facility.Latitude, facility.Longitude]}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  opacity={1}
                  permanent
                >
                  {facility.Name}
                </Tooltip>
                <Popup>
                  <div className="p-4 text-[#4A3B2D]">
                    <h2 className="text-lg font-bold">{facility.Name}</h2>
                    <p>
                      <strong>Location:</strong> {facility.Location}
                    </p>
                    <p>
                      <strong>Contact:</strong> {facility.Contact}
                    </p>
                    <p>
                      <strong>Opening Hours:</strong> {facility.Timings}
                    </p>
                    <p>
                      <strong>Rating:</strong> {facility.Rating} ⭐
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default HealthcareSearch;
