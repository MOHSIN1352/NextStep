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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employers");
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
    <div className="min-h-screen bg-[#f6f6ef]">
      <Navbar />
      <div className="flex w-full mx-auto">
        {/* Sidebar Filters */}
        <div className="w-1/4 p-9  border-r border-t border-[#fce3cd] bg-[#fce3cd]/70 drop-shadow-r-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-amber-900">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <button
                className="text-amber-800 hover:text-amber-600 text-sm font-medium"
                onClick={clearFilters}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Locations */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("locations")}
            >
              <h3 className="font-bold text-amber-900">Locations</h3>
              {expandedSections.locations ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.locations && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
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
              </div>
            )}
          </div>

          {/* Salary Range */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("salaryRange")}
            >
              <h3 className="font-bold text-amber-900">Salary Range</h3>
              {expandedSections.salaryRange ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.salaryRange && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {salaryRanges.map((range, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
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
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-5 border-t border-gray-300 bg-[#f6f6ef]">
          {/* Header and Controls */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-amber-900">
                Employers Listings
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-amber-800">
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

          {/* Content Grid */}

          <div className="grid grid-cols-2 gap-6">
            {filteredEmployers.map((employer) => (
              <div
                key={employer._id}
                className="bg-[#f6f6ef] text-amber-900 drop-shadow-xl border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{employer.Name}</h3>
                <div className="flex items-center text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-2 text-amber-700" />
                  {employer.Location.City_Name}
                </div>
                <div className="flex items-center text-sm mb-3">
                  <Briefcase className="h-4 w-4 mr-2 text-amber-700" />
                  Average Salary: ₹{employer.Average_Salary.toLocaleString()}
                </div>
                <div className="flex justify-between items-center">
                  <a
                    href={employer.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>

          {viewMode === "grid" && filteredEmployers.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 mx-auto text-amber-300 mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">
                No employers found
              </h3>
              <p className="text-amber-700">
                Try adjusting your filters or search term
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employers;
