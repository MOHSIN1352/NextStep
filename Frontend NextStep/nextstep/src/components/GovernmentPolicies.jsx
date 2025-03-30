"use client";

import { useState, useEffect } from "react";
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
import axios from "axios";
const GovernmentPolicies = () => {
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [policies, setPolicies] = useState([]);
  const [policyFilters, setPolicyFilters] = useState({
    Region: "",
    Department: "",
    Status: "",
    Year: "",
  });
  const [expandedSections, setExpandedSections] = useState({
    Regions: true,
    Departments: true,
    Status: true,
    Years: true,
  });
  const location = "67cffe734df4cc218981e357";

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/policies`, {
          params: { location }, // ✅ Pass location as a query parameter
        });
        setPolicies(response.data);
      } catch (err) {
        console.log("Error fetching policies:", err);
      }
    };

    fetchPolicies();
  }, [location]); // ✅ Re-run when location changes

  console.log(policies);

  // Get unique values for filters
  const Regions = [
    ...new Set(policies.map((policy) => policy.Region.State_Name)),
  ];
  const Departments = [...new Set(policies.map((policy) => policy.Department))];
  const Statuses = [...new Set(policies.map((policy) => policy.Status))];
  const Years = [...new Set(policies.map((policy) => policy.Year))];

  // Filter functions
  const filteredPolicies = policies.filter((policy) => {
    const search = searchTerm.toLowerCase().trim(); // Ensure safe string comparison

    return (
      (policyFilters.Region === "" ||
        policy.Region.State_Name === policyFilters.Region) &&
      (policyFilters.Department === "" ||
        policy.Department === policyFilters.Department) &&
      (policyFilters.Status === "" || policy.Status === policyFilters.Status) &&
      (policyFilters.Year === "" || policy.Year === policyFilters.Year) &&
      (search === "" ||
        (policy.Name && policy.Name.toLowerCase().includes(search)) ||
        (policy.Description &&
          policy.Description.toLowerCase().includes(search)) ||
        (policy.Department && policy.Department.toLowerCase().includes(search)))
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
      Region: "",
      Department: "",
      Status: "",
      Year: "",
    });
    setSearchTerm("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline"; // Handle empty or undefined values

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Handle incorrect date formats
    }

    return new Intl.DateTimeFormat("en-IN", {
      Year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Get Status color
  const getStatusColor = (Status) => {
    switch (Status) {
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
                onChange={(e) => setSearchTerm(e.target.value || "")}
                className="w-full p-2 pl-8 border border-amber-900 rounded bg-white"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-900" />
            </div>
          </div>

          {/* Departments */}
          <div className="border-t border-amber-900 py-4">
            <div
              className="flex justify-between items-center cursor-pointer mb-3"
              onClick={() => toggleSection("Departments")}
            >
              <h3 className="font-bold text-amber-900">Departments</h3>
              {expandedSections.Departments ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.Departments && (
              <div className="space-y-2">
                {Departments.map((Department, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={policyFilters.Department === Department}
                        onChange={() =>
                          setPolicyFilters({
                            ...policyFilters,
                            Department:
                              policyFilters.Department === Department
                                ? ""
                                : Department,
                          })
                        }
                      />
                      <span className="text-amber-900">{Department}</span>
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
              onClick={() => toggleSection("Status")}
            >
              <h3 className="font-bold text-amber-900">Status</h3>
              {expandedSections.Status ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.Status && (
              <div className="space-y-2">
                {Statuses.map((Status, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={policyFilters.Status === Status}
                        onChange={() =>
                          setPolicyFilters({
                            ...policyFilters,
                            Status:
                              policyFilters.Status === Status ? "" : Status,
                          })
                        }
                      />
                      <span className="text-amber-900">{Status}</span>
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
              onClick={() => toggleSection("Years")}
            >
              <h3 className="font-bold text-amber-900">Year Published</h3>
              {expandedSections.Years ? (
                <ChevronDown className="h-5 w-5 text-amber-700" />
              ) : (
                <ChevronRight className="h-5 w-5 text-amber-700" />
              )}
            </div>
            {expandedSections.Years && (
              <div className="space-y-2">
                {Years.map((Year, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-amber-600"
                        checked={policyFilters.Year === Year}
                        onChange={() =>
                          setPolicyFilters({
                            ...policyFilters,
                            Year: policyFilters.Year === Year ? "" : Year,
                          })
                        }
                      />
                      <span className="text-amber-900">{Year}</span>
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
              return (
                <div
                  key={policy.id}
                  className="bg-[#f6f6ef] text-amber-900 drop-shadow-xl border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded border ${getStatusColor(
                          policy.Status
                        )}`}
                      >
                        {policy.Status}
                      </span>
                      <span className="text-sm text-amber-700">
                        {policy.Year}
                      </span>
                    </div>
                    <span className={`text-sm font-medium text-red-600`}>
                      {policy.Deadline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{policy.Name}</h3>

                  <p className="text-sm text-amber-800 mb-4 line-clamp-3">
                    {policy.Description}
                  </p>

                  <div className="grid gap-2 mb-4">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-amber-700" />
                      <span>Region: {policy.Region.State_Name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Building className="h-4 w-4 mr-2 text-amber-700" />
                      <span>Department: {policy.Department}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-amber-700" />
                      <span>Deadline: {formatDate(policy.Deadline)}</span>
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
