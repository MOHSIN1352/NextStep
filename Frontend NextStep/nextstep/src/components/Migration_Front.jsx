import { useState ,useEffect} from "react";
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
    salaryRange: "",
   
  });

  const [expandedSections, setExpandedSections] = useState({
    industries: true,
    locations: true,
    salaryRanges: true,
   
  });
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs"); 
        setJobs(response.data);
      } catch (err) {
        console.log(Error)
      }
    };

    fetchJobs();
  }, []);


  // Get unique values for filters
  const industries = [...new Set(jobs.map((job) => job.industry_type))];
  const locations = [...new Set(jobs.map((job) => job.location))];


  // Create salary ranges
  const salaryRanges = [
    { label: "Under $80,000", min: 0, max: 80000 },
    { label: "$80,000 - $100,000", min: 80000, max: 100000 },
    { label: "$100,000 - $120,000", min: 100000, max: 120000 },
    { label: "$120,000 - $140,000", min: 120000, max: 140000 },
    { label: "$140,000+", min: 140000, max: Number.POSITIVE_INFINITY },
  ];

  // Filter functions
  const filteredJobs = jobs.filter((job) => {
    // Filter by industry
    const industryMatch =
      jobFilters.industry === "" || job.industry_type === jobFilters.industry;

    // Filter by location
    const locationMatch =
      jobFilters.location === "" || job.location === jobFilters.location;

    // Filter by salary range
    let salaryMatch = true;
    if (jobFilters.salaryRange !== "") {
      const selectedRange = salaryRanges.find(
        (range) => range.label === jobFilters.salaryRange
      );
      if (selectedRange) {
        salaryMatch =
          job.salary >= selectedRange.min && job.salary < selectedRange.max;
      }
    }

    // Filter by employer
    const employerMatch =
      jobFilters.employer === "" || job.employer_name === jobFilters.employer;

    // Filter by search term
    const searchMatch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.job_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.employer_name.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      industryMatch &&
      locationMatch &&
      salaryMatch &&
      employerMatch &&
      searchMatch
    );
  });
console.log("filter:",filteredJobs)
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
      salaryRange: "",
      employer: "",
    });
    setSearchTerm("");
  };

  // Format salary
  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(salary);
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
              <div className="space-y-2">
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
              <div className="space-y-2">
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

          {/* Salary Ranges */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("salaryRanges")}
            >
              <h3 className="font-bold text-amber-900">Salary Range</h3>
              {expandedSections.salaryRanges ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.salaryRanges && (
              <div className="space-y-2">
                {salaryRanges.map((range, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={jobFilters.salaryRange === range.label}
                        onChange={() =>
                          setJobFilters({
                            ...jobFilters,
                            salaryRange:
                              jobFilters.salaryRange === range.label
                                ? ""
                                : range.label,
                          })
                        }
                      />
                      <span className="text-amber-900">{range.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Employers */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("employers")}
            >
              <h3 className="font-bold text-amber-900">Employers</h3>
              {expandedSections.employers ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.employers && (
              <div className="space-y-2">
                {employerNames.map((employer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={jobFilters.employer === employer}
                        onChange={() =>
                          setJobFilters({
                            ...jobFilters,
                            employer:
                              jobFilters.employer === employer ? "" : employer,
                          })
                        }
                      />
                      <span className="text-amber-900">{employer}</span>
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
                  <span className="text-lg font-bold text-amber-700">
                    {formatSalary(job.Salary)}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{job.Title}</h3>
                <div className="flex items-center text-sm mb-3">
                  <Building className="h-4 w-4 mr-2 text-amber-700" />
                  {/* <span className="font-medium">{job.employer_name}</span> */}
                </div>

                <p className="text-sm text-amber-800 mb-4 line-clamp-3">
                  {job.job_description}
                </p>

                <div className="grid gap-2 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-amber-700" />
                    <span>{job.Location.City_Name}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href="#"
                    className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
                  >
                    <Briefcase className="h-4 w-4 mr-1" />
                    Apply Now
                  </a>

                  <a
                    href={job.employer_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-amber-700 hover:text-amber-900 text-sm font-medium"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Company Site
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
