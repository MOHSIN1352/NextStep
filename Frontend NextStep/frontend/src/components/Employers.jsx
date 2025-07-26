import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Search,
  Briefcase,
  MapPin,
  Building,
  Globe,
} from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";
import { motion } from "framer-motion";

const Employers = () => {
  const [viewMode, setViewMode] = useState("list");
  const [employers, setEmployers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [employerFilters, setEmployerFilters] = useState({
    location: "",
    salaryRange: "",
  });

  const [expandedSections, setExpandedSections] = useState({
    locations: true,
    salaryRange: true,
  });

  const API_URL =
    import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/employers`);

        setEmployers(response.data);
      } catch (err) {
        console.log(Error);
      }
    };

    fetchData();
  }, []);

  const locations = [
    ...new Set(employers.map((employer) => employer.Location.City_Name)),
  ];
  const salaryRanges = ["<500000", "500000-1000000", ">1000000"];

  const filteredEmployers = employers.filter((employer) => {
    const locationMatch =
      employerFilters.location === "" ||
      employer.Location.City_Name === employerFilters.location;

    const salaryMatch =
      employerFilters.salaryRange === "" ||
      (employerFilters.salaryRange === "<500000" &&
        employer.Average_Salary < 500000) ||
      (employerFilters.salaryRange === "500000-1000000" &&
        employer.Average_Salary >= 500000 &&
        employer.Average_Salary <= 1000000) ||
      (employerFilters.salaryRange === ">1000000" &&
        employer.Average_Salary > 1000000);

    const searchMatch =
      searchTerm === "" ||
      employer.Name.toLowerCase().includes(searchTerm.toLowerCase());

    return locationMatch && salaryMatch && searchMatch;
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const clearFilters = () => {
    setEmployerFilters({
      location: "",
      salaryRange: "",
    });
    setSearchTerm("");
  };

  const getActiveFilterCount = () => {
    return (
      Object.values(employerFilters).filter((value) => value !== "").length +
      (searchTerm ? 1 : 0)
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-[#f6f6ef]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      <div className="flex w-full mx-auto">
        {/* Sidebar Filter */}
        <motion.div
          className="w-1/4 p-6 border-r border-[#fce3cd] bg-[#fce3cd]/70"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-amber-900">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <button
                className="text-sm text-amber-800 hover:text-amber-600"
                onClick={clearFilters}
              >
                Clear All
              </button>
            )}
          </div>
          {/* Location Filter */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("locations")}
            >
              <h3 className="font-bold text-amber-900">Locations</h3>
              {expandedSections.locations ? (
                <ChevronDown className="w-5 h-5 text-amber-700" />
              ) : (
                <ChevronRight className="w-5 h-5 text-amber-700" />
              )}
            </div>
            {expandedSections.locations && (
              <motion.div
                className="space-y-2 max-h-40 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {locations.map((location, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={employerFilters.location === location}
                        onChange={() =>
                          setEmployerFilters({
                            ...employerFilters,
                            location:
                              employerFilters.location === location
                                ? ""
                                : location,
                          })
                        }
                      />
                      <span className="text-amber-900">{location}</span>
                    </label>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Salary Filter */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("salaryRange")}
            >
              <h3 className="font-bold text-amber-900">Salary Range</h3>
              {expandedSections.salaryRange ? (
                <ChevronDown className="w-5 h-5 text-amber-700" />
              ) : (
                <ChevronRight className="w-5 h-5 text-amber-700" />
              )}
            </div>
            {expandedSections.salaryRange && (
              <motion.div
                className="space-y-2 max-h-40 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {salaryRanges.map((range, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={employerFilters.salaryRange === range}
                        onChange={() =>
                          setEmployerFilters({
                            ...employerFilters,
                            salaryRange:
                              employerFilters.salaryRange === range
                                ? ""
                                : range,
                          })
                        }
                      />
                      <span className="text-amber-900">{range}</span>
                    </label>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
        {/* Main Content Area */}
        <motion.div
          className="w-3/4 p-6 bg-[#f6f6ef]"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-6">
            <h1 className="text-2xl font-bold text-amber-900">Employers</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-amber-800">
                {filteredEmployers.length} results
              </span>
              <div className="flex border border-amber-200 rounded bg-white">
                <button
                  className={`p-1 ${
                    viewMode === "grid" ? "bg-amber-100" : "bg-white"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-5 w-5 text-amber-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid View with animations */}
          <div className="grid grid-cols-2 gap-6">
            {filteredEmployers.map((employer, index) => (
              <motion.div
                key={employer._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#fff8f2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 p-6 space-y-4"
              >
                <h3 className="text-lg font-bold mb-1">{employer.Name}</h3>
                <p className="text-sm mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-amber-700" />
                  {employer.Location.City_Name}
                </p>
                <p className="text-sm mb-3 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-amber-700" />
                  Avg. Salary: ₹{employer.Average_Salary.toLocaleString()}
                </p>
                <a
                  href={employer.Website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Visit Website
                </a>
              </motion.div>
            ))}
          </div>

          {/* No results found */}
          {filteredEmployers.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Briefcase className="h-12 w-12 mx-auto text-amber-300 mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">
                No employers found
              </h3>
              <p className="text-amber-700">
                Try adjusting your filters or search criteria.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Employers;
