// import { useState } from "react";
// import Navbar from "./Navbar";
// const JobListings = () => {
//   const [jobFilters, setJobFilters] = useState({
//     jobType: {
//       fullTime: true,
//       partTime: true,
//       internship: false,
//       projectWork: true,
//       volunteering: false,
//     },
//     salaryRange: [50000],
//     experienceLevel: {
//       entry: false,
//       intermediate: true,
//       expert: true,
//     },
//   });

//   const jobs = [
//     {
//       id: 1,
//       title: "Product designer",
//       company: "Meta",
//       logo: "/placeholder.svg?height=40&width=40",
//       applicants: 36,
//       tags: ["Entry Level", "Full-Time"],
//       description:
//         "Doing the right thing for investors is what we're all about at Vanguard, and that in...",
//       salary: 250,
//       postedDays: 12,
//       isSaved: false,
//     },
//     {
//       id: 2,
//       title: "Sr. UX Designer",
//       company: "Netflix",
//       logo: "/placeholder.svg?height=40&width=40",
//       applicants: 14,
//       tags: ["Expert", "Part-Time", "Remote"],
//       description:
//         "Netflix is one of the world's leading streaming entertainment service with o...",
//       salary: 195,
//       postedDays: 5,
//       isSaved: false,
//     },
//     {
//       id: 3,
//       title: "Product designer",
//       company: "Microsoft",
//       logo: "/placeholder.svg?height=40&width=40",
//       applicants: 58,
//       tags: ["Intermediate", "Full-Time"],
//       description:
//         "Welcome to Lightspeed LA, the first U.S.-based, AAA game development studio f...",
//       salary: 210,
//       postedDays: 4,
//       isSaved: false,
//     },
//     {
//       id: 4,
//       title: "Product designer",
//       company: "Reddit",
//       logo: "/placeholder.svg?height=40&width=40",
//       applicants: 23,
//       tags: ["Expert", "Part-Time"],
//       description:
//         "Prelim is how banks onboard their customers for business checking accou...",
//       salary: 120,
//       postedDays: 22,
//       isSaved: false,
//     },
//     {
//       id: 5,
//       title: "Backend Dev.",
//       company: "Google",
//       logo: "/placeholder.svg?height=40&width=40",
//       applicants: 31,
//       tags: ["Intermediate", "Full-Time"],
//       description:
//         "Coastline is on a mission to make the world a safer place by solving our client...",
//       salary: 260,
//       postedDays: 5,
//       isSaved: false,
//     },
//     {
//       id: 6,
//       title: "SMM Manager",
//       company: "Spotify",
//       logo: "/placeholder.svg?height=40&width=40",
//       applicants: 41,
//       tags: ["Intermediate", "Full-Time"],
//       description:
//         "Join us as we increase access to banking and financial services, helping banks an...",
//       salary: 170,
//       postedDays: 8,
//       isSaved: false,
//     },
//   ];

//   const handleJobTypeChange = () => {
//     setJobFilters((prev) => ({
//       ...prev,
//       jobType: {
//         ...prev.jobType,
//         [type]: !prev.jobType[type],
//       },
//     }));
//   };

//   const handleExperienceLevelChange = () => {
//     setJobFilters((prev) => ({
//       ...prev,
//       experienceLevel: {
//         ...prev.experienceLevel,
//         [level]: !prev.experienceLevel[level],
//       },
//     }));
//   };

//   const getTagColor = () => {
//     switch (tag) {
//       case "Entry Level":
//         return "bg-purple-100 text-purple-600";
//       case "Intermediate":
//         return "bg-purple-100 text-purple-600";
//       case "Expert":
//         return "bg-purple-100 text-purple-600";
//       case "Full-Time":
//         return "bg-green-100 text-green-600";
//       case "Part-Time":
//         return "bg-green-100 text-green-600";
//       case "Remote":
//         return "bg-orange-100 text-orange-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="min-h-screen bg-gray-50 p-8">
//         <div className="max-w- mx-auto ">
//           <div className="flex justify-between items-center mb-8 border-2">
//             <h1 className="text-2xl font-semibold text-gray-900">
//               Recommended jobs
//             </h1>
//             <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-full border hover:bg-gray-50">
//               Most recent
//               <span>▼</span>
//             </button>
//           </div>

//           <div className="flex gap-8">
//             {/* Filters Sidebar */}
//             <div className="w-64 h-screen flex-shrink-0 bg-amber-400 p-3">
//               <div className="mb-8">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="font-medium text-gray-900">Job Type</h2>
//                   <button className="text-sm text-red-500">Clear all</button>
//                 </div>
//                 <div className="space-y-3">
//                   {Object.keys(jobFilters.jobType).map((type) => (
//                     <div key={type} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id={type}
//                         checked={jobFilters.jobType[type]}
//                         onChange={() => handleJobTypeChange(type)}
//                       />
//                       <label
//                         htmlFor={type}
//                         className="ml-2 text-sm text-gray-600"
//                       >
//                         {type.replace(/([A-Z])/g, " $1").trim()}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <h2 className="font-medium text-gray-900 mb-4">Salary Range</h2>
//                 <input
//                   type="range"
//                   min="50"
//                   max="120"
//                   value={jobFilters.salaryRange}
//                   onChange={(e) =>
//                     setJobFilters((prev) => ({
//                       ...prev,
//                       salaryRange: [parseInt(e.target.value)],
//                     }))
//                   }
//                 />
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>$50k</span>
//                   <span>$120k</span>
//                 </div>
//               </div>

//               <div>
//                 <h2 className="font-medium text-gray-900 mb-4">
//                   Experience Level
//                 </h2>
//                 {Object.keys(jobFilters.experienceLevel).map((level) => (
//                   <div
//                     key={level}
//                     className="flex items-center justify-between"
//                   >
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         id={level}
//                         checked={jobFilters.experienceLevel[level]}
//                         onChange={() => handleExperienceLevelChange(level)}
//                       />
//                       <label
//                         htmlFor={level}
//                         className="ml-2 text-sm text-gray-600"
//                       >
//                         {level.charAt(0).toUpperCase() + level.slice(1)} level
//                       </label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Job Cards Grid */}
//             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {jobs.map((job) => (
//                 <div
//                   key={job.id}
//                   className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="font-medium text-gray-900">{job.title}</h3>
//                       <p className="text-sm text-gray-500">
//                         {job.company} • {job.applicants} Applicants
//                       </p>
//                     </div>
//                     <button className="text-gray-400 hover:text-gray-600">
//                       ♥
//                     </button>
//                   </div>

//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {job.tags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>

//                   <p className="text-sm text-gray-600 mb-4">
//                     {job.description}
//                   </p>

//                   <div className="flex justify-between items-center">
//                     <span className="font-medium text-gray-900">
//                       ${job.salary}/hr
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       Posted {job.postedDays} days ago
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobListings;

"use client";

import { useState } from "react";
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

const JobListings = () => {
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilters, setJobFilters] = useState({
    industry: "",
    location: "",
    salaryRange: "",
    employer: "",
  });
  const [expandedSections, setExpandedSections] = useState({
    industries: true,
    locations: true,
    salaryRanges: true,
    employers: true,
  });

  // Mock employers data based on the Employer table
  const employers = [
    {
      employer_id: 1,
      name: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      average_salary: 120000,
      website: "https://techinnovations.example.com",
    },
    {
      employer_id: 2,
      name: "Global Finance Group",
      location: "New York, NY",
      average_salary: 110000,
      website: "https://globalfinance.example.com",
    },
    {
      employer_id: 3,
      name: "Healthcare Solutions",
      location: "Boston, MA",
      average_salary: 95000,
      website: "https://healthcaresolutions.example.com",
    },
    {
      employer_id: 4,
      name: "Green Energy Systems",
      location: "Austin, TX",
      average_salary: 105000,
      website: "https://greenenergy.example.com",
    },
    {
      employer_id: 5,
      name: "Creative Media Agency",
      location: "Los Angeles, CA",
      average_salary: 90000,
      website: "https://creativemedia.example.com",
    },
  ];

  // Mock jobs data based on the Job table
  const jobs = [
    {
      job_id: 1,
      employer_id: 1,
      title: "Senior Software Engineer",
      industry_type: "Technology",
      salary: 140000,
      location: "San Francisco, CA",
      job_description:
        "We are looking for an experienced software engineer to join our team. The ideal candidate will have 5+ years of experience in full-stack development with expertise in React, Node.js, and cloud infrastructure.",
    },
    {
      job_id: 2,
      employer_id: 1,
      title: "UX/UI Designer",
      industry_type: "Technology",
      salary: 110000,
      location: "San Francisco, CA",
      job_description:
        "Join our design team to create intuitive and engaging user experiences. You'll work closely with product managers and engineers to design and implement user interfaces for our flagship products.",
    },
    {
      job_id: 3,
      employer_id: 2,
      title: "Financial Analyst",
      industry_type: "Finance",
      salary: 95000,
      location: "New York, NY",
      job_description:
        "We're seeking a detail-oriented financial analyst to join our team. You'll be responsible for analyzing financial data, preparing reports, and making recommendations to improve financial performance.",
    },
    {
      job_id: 4,
      employer_id: 2,
      title: "Investment Banking Associate",
      industry_type: "Finance",
      salary: 130000,
      location: "New York, NY",
      job_description:
        "As an Investment Banking Associate, you'll work on financial models, conduct market research, and support senior bankers in client meetings and deal execution.",
    },
    {
      job_id: 5,
      employer_id: 3,
      title: "Clinical Research Coordinator",
      industry_type: "Healthcare",
      salary: 85000,
      location: "Boston, MA",
      job_description:
        "Coordinate clinical trials and research studies, ensuring compliance with protocols and regulatory requirements. You'll work with physicians, patients, and research sponsors.",
    },
    {
      job_id: 6,
      employer_id: 3,
      title: "Healthcare Data Scientist",
      industry_type: "Healthcare",
      salary: 115000,
      location: "Remote",
      job_description:
        "Apply data science techniques to healthcare data to improve patient outcomes and operational efficiency. Experience with machine learning and healthcare data systems required.",
    },
    {
      job_id: 7,
      employer_id: 4,
      title: "Renewable Energy Engineer",
      industry_type: "Energy",
      salary: 105000,
      location: "Austin, TX",
      job_description:
        "Design and implement renewable energy systems, focusing on solar and wind power. You'll work on projects from concept to completion, including feasibility studies and system design.",
    },
    {
      job_id: 8,
      employer_id: 5,
      title: "Digital Marketing Specialist",
      industry_type: "Marketing",
      salary: 80000,
      location: "Los Angeles, CA",
      job_description:
        "Drive digital marketing campaigns across multiple channels. You'll be responsible for SEO/SEM, social media, email marketing, and analyzing campaign performance.",
    },
    {
      job_id: 9,
      employer_id: 5,
      title: "Content Strategist",
      industry_type: "Marketing",
      salary: 90000,
      location: "Remote",
      job_description:
        "Develop content strategies that align with business goals. You'll create editorial calendars, style guides, and work with writers and designers to produce high-quality content.",
    },
    {
      job_id: 10,
      employer_id: 4,
      title: "Sustainability Consultant",
      industry_type: "Energy",
      salary: 95000,
      location: "Austin, TX",
      job_description:
        "Help organizations reduce their environmental impact and implement sustainable practices. You'll conduct assessments, develop sustainability plans, and track progress toward goals.",
    },
  ];

  // Join jobs with employers
  const jobsWithEmployers = jobs.map((job) => {
    const employer = employers.find(
      (emp) => emp.employer_id === job.employer_id
    );
    return {
      ...job,
      employer_name: employer ? employer.name : "Unknown",
      employer_website: employer ? employer.website : "#",
    };
  });

  // Get unique values for filters
  const industries = [...new Set(jobs.map((job) => job.industry_type))];
  const locations = [...new Set(jobs.map((job) => job.location))];
  const employerNames = [...new Set(employers.map((emp) => emp.name))];

  // Create salary ranges
  const salaryRanges = [
    { label: "Under $80,000", min: 0, max: 80000 },
    { label: "$80,000 - $100,000", min: 80000, max: 100000 },
    { label: "$100,000 - $120,000", min: 100000, max: 120000 },
    { label: "$120,000 - $140,000", min: 120000, max: 140000 },
    { label: "$140,000+", min: 140000, max: Number.POSITIVE_INFINITY },
  ];

  // Filter functions
  const filteredJobs = jobsWithEmployers.filter((job) => {
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
                key={job.job_id}
                className="bg-[#f6f6ef] text-amber-900 drop-shadow-xl border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 text-xs rounded border bg-amber-100 text-amber-800 border-amber-300">
                    {job.industry_type}
                  </span>
                  <span className="text-lg font-bold text-amber-700">
                    {formatSalary(job.salary)}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <div className="flex items-center text-sm mb-3">
                  <Building className="h-4 w-4 mr-2 text-amber-700" />
                  <span className="font-medium">{job.employer_name}</span>
                </div>

                <p className="text-sm text-amber-800 mb-4 line-clamp-3">
                  {job.job_description}
                </p>

                <div className="grid gap-2 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-amber-700" />
                    <span>{job.location}</span>
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
