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

const JobListings = () => {
  const [viewMode, setViewMode] = useState("list");
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
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
  const filteredJobs = jobs.filter((job) => {
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
              <div className="flex items-center">
                <span className="mr-2 text-sm text-amber-800">Sort by</span>
                <select className="border border-amber-200 rounded p-1 text-sm bg-white text-amber-900">
                  <option>Relevance</option>
                  <option>Salary (High-Low)</option>
                  <option>Salary (Low-High)</option>
                  <option>Title (A-Z)</option>
                </select>
              </div>
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
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#f6f6ef] text-amber-900 drop-shadow-xl border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 text-xs rounded border bg-amber-100 text-amber-800 border-amber-300">
                    {job.Industry_Type}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{job.Title}</h3>
                <div className="flex items-center text-sm mb-3">
                  <Building className="h-4 w-4 mr-2 text-amber-700" />
                  {job.Company_Name}
                </div>

                <div className="grid gap-2 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-amber-700" />
                    <span>{job.Location.City_Name}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={job.Apply_Link}
                    className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
                  >
                    <Briefcase className="h-4 w-4 mr-1" />
                    Apply Now
                  </a>
                </div>
              </div>
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
