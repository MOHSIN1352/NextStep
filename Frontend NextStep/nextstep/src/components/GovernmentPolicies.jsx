"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Search,
  Calendar,
  FileText,
  MapPin,
  Building,
} from "lucide-react";
import Navbar from "./Navbar";

const GovernmentPolicies = () => {
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [policyFilters, setPolicyFilters] = useState({
    region: "",
    department: "",
    status: "",
    year: "",
  });
  const [expandedSections, setExpandedSections] = useState({
    regions: true,
    departments: true,
    status: true,
    years: true,
  });

  // Policy data
  const policies = [
    {
      id: 1,
      name: "National Renewable Energy Policy",
      description:
        "Framework for increasing renewable energy adoption and reducing carbon emissions across all sectors.",
      region: "National",
      department: "Energy",
      deadline: "2023-12-31",
      status: "Active",
      year: "2022",
      documentLink: "https://example.gov/renewable-policy",
    },
    {
      id: 2,
      name: "Digital Infrastructure Development Plan",
      description:
        "Strategic plan to expand broadband access to rural communities and improve digital literacy.",
      region: "National",
      department: "Technology",
      deadline: "2024-06-30",
      status: "Active",
      year: "2023",
      documentLink: "https://example.gov/digital-plan",
    },
    {
      id: 3,
      name: "Urban Housing Affordability Initiative",
      description:
        "Program to increase affordable housing units in metropolitan areas through tax incentives and zoning reforms.",
      region: "Urban",
      department: "Housing",
      deadline: "2023-09-15",
      status: "Active",
      year: "2022",
      documentLink: "https://example.gov/housing-initiative",
    },
    {
      id: 4,
      name: "Agricultural Subsidy Reform",
      description:
        "Restructuring of agricultural subsidies to promote sustainable farming practices and support small-scale farmers.",
      region: "Rural",
      department: "Agriculture",
      deadline: "2023-11-01",
      status: "Pending Review",
      year: "2023",
      documentLink: "https://example.gov/ag-reform",
    },
    {
      id: 5,
      name: "Public Health Emergency Response Framework",
      description:
        "Comprehensive guidelines for coordinating federal, state, and local responses to public health emergencies.",
      region: "National",
      department: "Health",
      deadline: "2024-03-15",
      status: "Draft",
      year: "2023",
      documentLink: "https://example.gov/health-framework",
    },
    {
      id: 6,
      name: "Small Business Tax Relief Program",
      description:
        "Tax incentives and simplified filing procedures for small businesses affected by economic downturns.",
      region: "National",
      department: "Finance",
      deadline: "2023-10-15",
      status: "Expired",
      year: "2021",
      documentLink: "https://example.gov/tax-relief",
    },
    {
      id: 7,
      name: "Rural Infrastructure Development Grant",
      description:
        "Funding for critical infrastructure projects in rural communities, including roads, bridges, and water systems.",
      region: "Rural",
      department: "Infrastructure",
      deadline: "2024-01-31",
      status: "Active",
      year: "2023",
      documentLink: "https://example.gov/rural-infrastructure",
    },
  ];

  // Get unique values for filters
  const regions = [...new Set(policies.map((policy) => policy.region))];
  const departments = [...new Set(policies.map((policy) => policy.department))];
  const statuses = [...new Set(policies.map((policy) => policy.status))];
  const years = [...new Set(policies.map((policy) => policy.year))];

  // Filter functions
  const filteredPolicies = policies.filter((policy) => {
    return (
      (policyFilters.region === "" || policy.region === policyFilters.region) &&
      (policyFilters.department === "" ||
        policy.department === policyFilters.department) &&
      (policyFilters.status === "" || policy.status === policyFilters.status) &&
      (policyFilters.year === "" || policy.year === policyFilters.year) &&
      (searchTerm === "" ||
        policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.department.toLowerCase().includes(searchTerm.toLowerCase()))
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
    setPolicyFilters({
      region: "",
      department: "",
      status: "",
      year: "",
    });
    setSearchTerm("");
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadlineString) => {
    const today = new Date();
    const deadline = new Date(deadlineString);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-300";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Draft":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Expired":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Get urgency indicator based on days remaining
  const getUrgencyIndicator = (deadline) => {
    const daysRemaining = getDaysRemaining(deadline);

    if (daysRemaining < 0) {
      return { color: "text-gray-400", text: "Expired" };
    } else if (daysRemaining <= 30) {
      return { color: "text-red-600", text: `${daysRemaining} days left` };
    } else if (daysRemaining <= 90) {
      return { color: "text-amber-600", text: `${daysRemaining} days left` };
    } else {
      return { color: "text-green-600", text: `${daysRemaining} days left` };
    }
  };

  // Get active filters count
  const getActiveFilterCount = () => {
    return (
      Object.values(policyFilters).filter((value) => value !== "").length +
      (searchTerm ? 1 : 0)
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f6ef]">
      <Navbar />
      <div className="flex w-full mx-auto">
        {/* Sidebar Filters */}
        <div className="w-1/4 p-9 border-r border-t border-gray-500 bg-[#f6f6ef] drop-shadow-r-xl">
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

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-8 border border-amber-900 rounded bg-white"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-900" />
            </div>
          </div>

          {/* Regions */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("regions")}
            >
              <h3 className="font-bold text-amber-900">Regions</h3>
              {expandedSections.regions ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.regions && (
              <div className="space-y-2">
                {regions.map((region, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={policyFilters.region === region}
                        onChange={() =>
                          setPolicyFilters({
                            ...policyFilters,
                            region:
                              policyFilters.region === region ? "" : region,
                          })
                        }
                      />
                      <span className="text-amber-900">{region}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Departments */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("departments")}
            >
              <h3 className="font-bold text-amber-900">Departments</h3>
              {expandedSections.departments ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.departments && (
              <div className="space-y-2">
                {departments.map((department, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={policyFilters.department === department}
                        onChange={() =>
                          setPolicyFilters({
                            ...policyFilters,
                            department:
                              policyFilters.department === department
                                ? ""
                                : department,
                          })
                        }
                      />
                      <span className="text-amber-900">{department}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("status")}
            >
              <h3 className="font-bold text-amber-900">Status</h3>
              {expandedSections.status ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.status && (
              <div className="space-y-2">
                {statuses.map((status, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={policyFilters.status === status}
                        onChange={() =>
                          setPolicyFilters({
                            ...policyFilters,
                            status:
                              policyFilters.status === status ? "" : status,
                          })
                        }
                      />
                      <span className="text-amber-900">{status}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Years */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("years")}
            >
              <h3 className="font-bold text-amber-900">Year Published</h3>
              {expandedSections.years ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.years && (
              <div className="space-y-2">
                {years.map((year, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={policyFilters.year === year}
                        onChange={() =>
                          setPolicyFilters({
                            ...policyFilters,
                            year: policyFilters.year === year ? "" : year,
                          })
                        }
                      />
                      <span className="text-amber-900">{year}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-5 border-t border-gray-500 bg-[#f6f6ef]">
          {/* Header and Controls */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-amber-900">
                Government Policies
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-amber-800">
                {filteredPolicies.length} results
              </span>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-amber-800">Sort by</span>
                <select className="border border-amber-200 rounded p-1 text-sm bg-white text-amber-900">
                  <option>Relevance</option>
                  <option>Name (A-Z)</option>
                  <option>Deadline (Soonest)</option>
                  <option>Recently Published</option>
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
            {filteredPolicies.map((policy) => {
              const urgency = getUrgencyIndicator(policy.deadline);

              return (
                <div
                  key={policy.id}
                  className="bg-[#f6f6ef] text-amber-900 drop-shadow-xl border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded border ${getStatusColor(
                          policy.status
                        )}`}
                      >
                        {policy.status}
                      </span>
                      <span className="text-sm text-amber-700">
                        {policy.year}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${urgency.color}`}>
                      {urgency.text}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{policy.name}</h3>

                  <p className="text-sm text-amber-800 mb-4 line-clamp-3">
                    {policy.description}
                  </p>

                  <div className="grid gap-2 mb-4">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-amber-700" />
                      <span>Region: {policy.region}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Building className="h-4 w-4 mr-2 text-amber-700" />
                      <span>Department: {policy.department}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-amber-700" />
                      <span>Deadline: {formatDate(policy.deadline)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <a
                      href={policy.documentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View Policy Document
                    </a>

                    <button className="text-amber-700 hover:text-amber-900 text-sm font-medium">
                      Save for Later
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPolicies.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-amber-300 mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">
                No policies found
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

export default GovernmentPolicies;
