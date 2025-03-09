import React, { useState } from "react";
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

const mockData = {
  "New York": {
    hospitals: [
      {
        id: 1,
        name: "NYC Health Center",
        lat: 40.7128,
        lng: -74.006,
        contact: "123-456-7890",
        location: "Manhattan",
        timings: "9 AM - 9 PM",
        rating: 4.5,
      },
      {
        id: 2,
        name: "Manhattan Hospital",
        lat: 40.73061,
        lng: -73.935242,
        contact: "987-654-3210",
        location: "Downtown",
        timings: "8 AM - 8 PM",
        rating: 4.2,
      },
    ],
    clinics: [
      {
        id: 3,
        name: "NYC Family Clinic",
        lat: 40.7228,
        lng: -74.01,
        contact: "555-666-7777",
        location: "Brooklyn",
        timings: "10 AM - 6 PM",
        rating: 4.0,
      },
    ],
    pharmacies: [
      {
        id: 4,
        name: "New York Pharmacy",
        lat: 40.7158,
        lng: -74.002,
        contact: "111-222-3333",
        location: "Queens",
        timings: "24 Hours",
        rating: 4.8,
      },
    ],
  },
};

const MapUpdater = ({ facilities }) => {
  const map = useMap();
  if (facilities.length > 0) {
    map.setView([facilities[0].lat, facilities[0].lng], 12);
  }
  return null;
};

const HealthcareSearch = () => {
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("hospitals");
  const [facilities, setFacilities] = useState([]);

  const searchFacilities = () => {
    if (mockData[area]) {
      setFacilities(mockData[area][category] || []);
    } else {
      setFacilities([]);
    }
  };

  return (
    <div className="bg-[#f6f6ef]">
      <Navbar />
      <div className="flex h-screen bg-[#F5E8D0] font-sans  border-y-1 border-gray-400">
        {/* Sidebar */}
        <div className="w-1/4 p-8  bg-[#f6f6ef] shadow-xl border-y-1 border-r-1 border-gray-300 flex flex-col gap-6  text-[#4A3B2D] font-medium">
          <h1 className="text-2xl font-bold text-[#815b37] tracking-wide drop-shadow-xl ">
            Find Healthcare
          </h1>
          <input
            type="text"
            placeholder="Enter an area..."
            className="p-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A6E50] text-md"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
          <div className="flex gap-3">
            <button
              className={`py-2 px-3 rounded-lg text-white text-md font-semibold shadow-md transition-all duration-300 ${
                category === "hospitals"
                  ? "bg-[#9d7850]"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              onClick={() => setCategory("hospitals")}
            >
              Hospitals
            </button>
            <button
              className={`py-2 px-3 rounded-lg text-white text-md font-semibold shadow-md transition-all duration-300 ${
                category === "clinics"
                  ? "bg-[#8A6E50]"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              onClick={() => setCategory("clinics")}
            >
              Clinics
            </button>
            <button
              className={`py-2 px-3 rounded-lg text-white text-md font-semibold shadow-md transition-all duration-300 ${
                category === "pharmacies"
                  ? "bg-[#8A6E50]"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              onClick={() => setCategory("pharmacies")}
            >
              Pharmacies
            </button>
          </div>
          <button
            className="py-2 bg-[#9d7447] text-white rounded-xl text-md  shadow-md hover:bg-[#b88d5f] transition-all duration-300"
            onClick={searchFacilities}
          >
            Search
          </button>
          <ul className="mt-4 text-lg">
            {facilities.map((facility) => (
              <li key={facility.id} className="py-2 border-b border-gray-300">
                {facility.name}
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
              <Marker key={facility.id} position={[facility.lat, facility.lng]}>
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  opacity={1}
                  permanent
                >
                  {facility.name}
                </Tooltip>
                <Popup>
                  <div className="p-4 text-[#4A3B2D]">
                    <h2 className="text-lg font-bold">{facility.name}</h2>
                    <p>
                      <strong>Location:</strong> {facility.location}
                    </p>
                    <p>
                      <strong>Contact:</strong> {facility.contact}
                    </p>
                    <p>
                      <strong>Opening Hours:</strong> {facility.timings}
                    </p>
                    <p>
                      <strong>Rating:</strong> {facility.rating} ⭐
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
