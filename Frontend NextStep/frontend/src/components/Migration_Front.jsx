import { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../Context/userContext";
import { motion } from "framer-motion";

const JobListings = () => {
  const userData = useContext(UserContext);
  const [viewMode, setViewMode] = useState("list");
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBySalary, setSortBySalary] = useState(false);
  const [jobFilters, setJobFilters] = useState({
    industry: "",
    location: "",
    company: "",
  });

  const [expandedSections, setExpandedSections] = useState({
    industries: true,
    locations: true,
    companies: true,
  });

  const API_URL =
    import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs`);

        setJobs(response.data);
      } catch (err) {
        console.log(Error);
      }
    };

    fetchJobs();
  }, []);

  // Get unique values for filters
  const industries = [...new Set(jobs.map((job) => job.Industry_Type))];
  const locations = [...new Set(jobs.map((job) => job.Location.City_Name))];
  const companies = [...new Set(jobs.map((job) => job.Company_Name))]; // Get unique companies

  // Filter functions
  const filteredJobs = jobs
    .filter((job) => {
      // Filter by industry
      const industryMatch =
        jobFilters.industry === "" || job.Industry_Type === jobFilters.industry;

      // Filter by location
      const locationMatch =
        jobFilters.location === "" ||
        job.Location.City_Name === jobFilters.location;

      // Filter by company
      const companyMatch =
        jobFilters.company === "" || job.Company_Name === jobFilters.company;

      // Filter by search term
      const searchMatch =
        searchTerm === "" ||
        job.Title.toLowerCase().includes(searchTerm.toLowerCase());

      return industryMatch && locationMatch && companyMatch && searchMatch;
    })
    .sort((a, b) => {
      if (!sortBySalary) return 0;

      const salaryA = parseInt(a.Salary) || 0;
      const salaryB = parseInt(b.Salary) || 0;

      return salaryB - salaryA; // High to low
    });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Clear filters
  const clearFilters = () => {
    setJobFilters({
      industry: "",
      location: "",
      company: "",
    });
    setSearchTerm("");
  };

  // Get active filters count
  const getActiveFilterCount = () => {
    return (
      Object.values(jobFilters).filter((value) => value !== "").length +
      (searchTerm ? 1 : 0)
    );
  };

  const handleSaving = async (Id, str) => {
    try {
      const response = await axios.post(`${API_URL}/user/saveItems`, {
        userId: userData.userData.id,
        itemId: Id,
        itemType: "Job",
      });

      console.log("job saved successfully:", response.data);
    } catch (error) {
      console.log("Error saving policy:", error);
    }
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

          {/* Industries */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("industries")}
            >
              <h3 className="font-bold text-amber-900">Industries</h3>
              {expandedSections.industries ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.industries && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {industries.map((industry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={jobFilters.industry === industry}
                        onChange={() =>
                          setJobFilters({
                            ...jobFilters,
                            industry:
                              jobFilters.industry === industry ? "" : industry,
                          })
                        }
                      />
                      <span className="text-amber-900">{industry}</span>
                    </label>
                  </div>
                ))}
              </div>
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
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={jobFilters.location === location}
                        onChange={() =>
                          setJobFilters({
                            ...jobFilters,
                            location:
                              jobFilters.location === location ? "" : location,
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

          {/* Companies */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("companies")}
            >
              <h3 className="font-bold text-amber-900">Companies</h3>
              {expandedSections.companies ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.companies && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {companies.map((company, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={jobFilters.company === company}
                        onChange={() =>
                          setJobFilters({
                            ...jobFilters,
                            company:
                              jobFilters.company === company ? "" : company,
                          })
                        }
                      />
                      <span className="text-amber-900">{company}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sort by Salary */}
          <div className="border-t border-amber-900 py-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-amber-900">Sort by Salary</h3>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 accent-amber-600"
                  checked={sortBySalary}
                  onChange={() => setSortBySalary(!sortBySalary)}
                />
                <span className="text-amber-900 text-sm">
                  {sortBySalary ? "High → Low" : "Default"}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-5 border-t border-gray-300 bg-[#f6f6ef]">
          {/* Header and Controls */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-amber-900">
                Job Listings
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-amber-800">
                {filteredJobs.length} results
              </span>

              <div className="flex border border-amber-200 rounded bg-white">
                <button
                  className={`p-1 ${
                    viewMode === "list" ? "bg-amber-100" : "bg-white"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-5 w-5 text-amber-700" />
                </button>
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
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-2 gap-6" : "space-y-6"
            }
          >
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#fff8f2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold px-3 py-1 bg-amber-100 border border-amber-300 text-amber-800 rounded-full">
                    {job.Industry_Type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-xl-900">{job.Title}</h3>

                <div className="flex items-center text-sm text-amber-800">
                  <Building className="h-4 w-4 mr-2 text-amber-700" />
                  {job.Company_Name}
                </div>

                <div className="flex items-center text-sm text-amber-800">
                  <MapPin className="h-4 w-4 mr-2 text-amber-700" />
                  {job.Location.City_Name}
                </div>

                <div className="flex items-center text-sm text-amber-800">
                  💸{" "}
                  <span className="ml-2">
                    {job.Salary && job.Salary !== "0"
                      ? job.Salary
                      : "Not disclosed"}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-dashed border-amber-200 mt-3">
                  <a
                    href={job.Apply_Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Briefcase className="h-4 w-4 mr-1" />
                    Apply Now
                  </a>

                  <button
                    onClick={() => handleSaving(job._id, "Job")}
                    className="text-sm text-amber-700 hover:text-amber-900 font-medium"
                  >
                    Save for Later
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 mx-auto text-amber-300 mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">
                No jobs found
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

export default JobListings;
