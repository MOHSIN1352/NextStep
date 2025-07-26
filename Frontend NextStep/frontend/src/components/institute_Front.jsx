import { useState, useEffect, useContext } from "react";
import { ChevronDown, ChevronRight, Grid, List, Search } from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";
import { motion } from "framer-motion";
import { UserContext } from "../Context/userContext";

const Institues = () => {
  const userData = useContext(UserContext);
  const [view, setView] = useState("courses");
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setcourses] = useState([]);
  const [institutes, setinstitutes] = useState([]);
  const [courseFilters, setCourseFilters] = useState({
    category: "",
    platform: "",
    certification: null,
    minRating: 0,
  });
  const [instituteFilters, setInstituteFilters] = useState({
    degree: "",
    location: "",
    accreditation: "",
    establishmentYear: "",
  });
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    platforms: true,
    features: true,
    degrees: true,
    locations: true,
  });

  const API_URL =
    import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

  // Course data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses`);
        const institutesResponse = await axios.get(`${API_URL}/institutes`);

        console.log("institutes", institutesResponse.data);
        setcourses(response.data);
        setinstitutes(institutesResponse.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Get unique values for filters
  const categories = [...new Set(courses.map((course) => course.Category))];
  const platforms = [...new Set(courses.map((course) => course.Platform))];
  const locations = [
    ...new Set(
      institutes.map((institute) => {
        const city = institute.address.split(",")[0].trim();
        return city;
      })
    ),
  ];
  const degrees = [
    ...new Set(institutes.flatMap((institute) => institute.degreesOffered)),
  ];
  const accreditations = [
    ...new Set(institutes.map((institute) => institute.accreditation)),
  ];

  // Filter functions
  const filteredCourses = courses.filter((course) => {
    return (
      (courseFilters.category === "" ||
        course.Category === courseFilters.category) &&
      (courseFilters.platform === "" ||
        course.Platform === courseFilters.platform) &&
      (courseFilters.certification === null ||
        course.certification === courseFilters.certification) &&
      (courseFilters.minRating === 0 ||
        course.rating >= courseFilters.minRating) &&
      (searchTerm === "" ||
        course.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.Category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const filteredInstitutes = institutes.filter((institute) => {
    const name = (institute.Name || "").toLowerCase();
    const address = (institute.address || "").toLowerCase();
    const degreeList = institute.degreesOffered || [];
    const accreditation = institute.accreditation || "";
    const yearStr = institute.establishmentYear?.toString() || "";

    const cityMatch =
      instituteFilters.location === "" ||
      address.includes(instituteFilters.location.toLowerCase());

    const degreeMatch =
      instituteFilters.degree === "" ||
      degreeList.includes(instituteFilters.degree);

    const accreditationMatch =
      instituteFilters.accreditation === "" ||
      accreditation === instituteFilters.accreditation;

    const yearMatch =
      instituteFilters.establishmentYear === "" ||
      yearStr === instituteFilters.establishmentYear;

    const searchMatch =
      searchTerm === "" ||
      name.includes(searchTerm.toLowerCase()) ||
      address.includes(searchTerm.toLowerCase());

    return (
      cityMatch && degreeMatch && accreditationMatch && yearMatch && searchMatch
    );
  });

  // Toggle section expansion
  // const toggleSection = (section) => {
  //   setExpandedSections({
  //     ...expandedSections,
  //     [section]: !expandedSections[section],
  //   });
  // };

  // Clear filters
  const clearFilters = () => {
    if (view === "courses") {
      setCourseFilters({
        category: "",
        platform: "",
        certification: null,
        minRating: 0,
      });
    } else {
      setInstituteFilters({
        degree: "",
        location: "",
        accreditation: "",
        establishmentYear: "",
      });
    }
    setSearchTerm("");
  };

  const [filters, setFilters] = useState({
    category: "",
    platform: "",
    certification: null,
    minRating: 0,
    degree: "",
    location: "",
    accreditation: "",
    establishmentYear: "",
  });

  // Remove a specific filter
  const removeFilter = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: filterName === "certification" ? null : "",
    });
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  // Count active filters
  const activeFilterCount =
    Object.entries(filters).filter(([key, value]) => {
      return value !== "" && value !== null && value !== 0;
    }).length + (searchTerm ? 1 : 0);

  // Get active filters count
  const getActiveFilterCount = () => {
    if (view === "courses") {
      return (
        Object.values(courseFilters).filter(
          (value) => value !== "" && value !== null && value !== 0
        ).length + (searchTerm ? 1 : 0)
      );
    } else {
      return (
        Object.values(instituteFilters).filter((value) => value !== "").length +
        (searchTerm ? 1 : 0)
      );
    }
  };

  const handleSaving = async (Id, str) => {
    try {
      const response = await axios.post(`${API_URL}/user/saveItems`, {
        userId: userData.userData.id,
        itemId: Id,
        itemType: str == "Courses" ? "Course" : "Institute",
      });

      console.log("course/institute saved successfully:", response.data);
    } catch (error) {
      console.log("Error saving policy:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6ef]">
      <Navbar />
      <div className="flex w-full  mx-auto">
        {/* Sidebar Filters */}
        <div className="w-1/4 p-6 border-r border-t border-gray-500 bg-[#fce3cd]/70 drop-shadow-r-xl overflow-y-auto max-h-[calc(100vh-64px)] sticky top-16">
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
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-8 border border-amber-900 rounded bg-white"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-900" />
            </div>
          </div>

          {/* Course Filters */}
          {view === "courses" && (
            <>
              {/* Categories */}
              <div className="border-t border-amber-900 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() =>
                    setExpandedSections({
                      ...expandedSections,
                      categories: !expandedSections.categories,
                    })
                  }
                >
                  <h3 className="font-bold text-amber-900">Categories</h3>
                  {expandedSections.categories ? (
                    <ChevronDown className="h-5 w-5 text-amber-700" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-amber-700" />
                  )}
                </div>
                {expandedSections.categories && (
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 h-4 w-4 accent-amber-600"
                            checked={courseFilters.category === category}
                            onChange={() =>
                              setCourseFilters({
                                ...courseFilters,
                                category:
                                  courseFilters.category === category
                                    ? ""
                                    : category,
                              })
                            }
                          />
                          <span className="text-amber-900">{category}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Platforms */}
              <div className="border-t border-amber-900 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() =>
                    setExpandedSections({
                      ...expandedSections,
                      platforms: !expandedSections.platforms,
                    })
                  }
                >
                  <h3 className="font-bold text-amber-900">Platforms</h3>
                  {expandedSections.platforms ? (
                    <ChevronDown className="h-5 w-5 text-amber-700" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-amber-700" />
                  )}
                </div>
                {expandedSections.platforms && (
                  <div className="space-y-2">
                    {platforms.map((platform, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 h-4 w-4 accent-amber-600"
                            checked={courseFilters.platform === platform}
                            onChange={() =>
                              setCourseFilters({
                                ...courseFilters,
                                platform:
                                  courseFilters.platform === platform
                                    ? ""
                                    : platform,
                              })
                            }
                          />
                          <span className="text-amber-900">{platform}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="border-t border-amber-900 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() =>
                    setExpandedSections({
                      ...expandedSections,
                      features: !expandedSections.features,
                    })
                  }
                >
                  <h3 className="font-bold text-amber-900">Features</h3>
                  {expandedSections.features ? (
                    <ChevronDown className="h-5 w-5 text-amber-700" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-amber-700" />
                  )}
                </div>
                {expandedSections.features && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-amber-900 mb-2">
                        Certification
                      </h4>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="certification"
                            className="mr-2 h-4 w-4 accent-amber-600"
                            checked={courseFilters.certification === true}
                            onChange={() =>
                              setCourseFilters({
                                ...courseFilters,
                                certification: true,
                              })
                            }
                          />
                          <span className="text-amber-900">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="certification"
                            className="mr-2 h-4 w-4 accent-amber-600"
                            checked={courseFilters.certification === false}
                            onChange={() =>
                              setCourseFilters({
                                ...courseFilters,
                                certification: false,
                              })
                            }
                          />
                          <span className="text-amber-900">No</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-amber-900 mb-2">
                        Minimum Rating
                      </h4>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={courseFilters.minRating}
                        onChange={(e) =>
                          setCourseFilters({
                            ...courseFilters,
                            minRating: Number.parseFloat(e.target.value),
                          })
                        }
                        className="w-full accent-amber-600"
                      />
                      <div className="flex justify-between text-sm text-amber-900">
                        <span>Any</span>
                        <span>
                          {courseFilters.minRating > 0
                            ? courseFilters.minRating.toFixed(1)
                            : "Any"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Institute Filters */}
          {view === "institutes" && (
            <>
              {/* Degrees */}
              <div className="border-t border-amber-900 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() =>
                    setExpandedSections({
                      ...expandedSections,
                      degrees: !expandedSections.degrees,
                    })
                  }
                >
                  <h3 className="font-bold text-amber-900">Degrees Offered</h3>
                  {expandedSections.degrees ? (
                    <ChevronDown className="h-5 w-5 text-amber-700" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-amber-700" />
                  )}
                </div>
                {expandedSections.degrees && (
                  <div className="space-y-2">
                    {degrees.map((degree, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 h-4 w-4 accent-amber-600"
                            checked={instituteFilters.degree === degree}
                            onChange={() =>
                              setInstituteFilters({
                                ...instituteFilters,
                                degree:
                                  instituteFilters.degree === degree
                                    ? ""
                                    : degree,
                              })
                            }
                          />
                          <span className="text-amber-900">{degree}</span>
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
                  onClick={() =>
                    setExpandedSections({
                      ...expandedSections,
                      locations: !expandedSections.locations,
                    })
                  }
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
                            checked={instituteFilters.location === location}
                            onChange={() =>
                              setInstituteFilters({
                                ...instituteFilters,
                                location:
                                  instituteFilters.location === location
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
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-5 border-t border-gray-300 bg-[#f6f6ef]">
          {/* Tabs and Controls */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-6">
            <div className="flex space-x-8">
              <button
                className={`text-lg font-bold pb-2 ${
                  view === "courses"
                    ? "border-b-2 border-amber-900 text-amber-800"
                    : "text-gray-400"
                }`}
                onClick={() => setView("courses")}
              >
                COURSES
              </button>
              <button
                className={`text-lg font-bold pb-2 ${
                  view === "institutes"
                    ? "border-b-2 border-amber-900 text-amber-800"
                    : "text-gray-400"
                }`}
                onClick={() => setView("institutes")}
              >
                INSTITUTES
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-amber-800">
                {view === "courses"
                  ? filteredCourses.length
                  : filteredInstitutes.length}{" "}
                results
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
            {view === "courses"
              ? filteredCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#fff8f2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
                  transition-all duration-300 p-6 space-y-4"
                  >
                    <div className="font-medium mb-2">
                      {course.Category} | {course.Platform}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{course.Name}</h3>
                    <div className="grid gap-2 mb-4">
                      <span>
                        <span className="text-sm">
                          Duration: {course.duration}{" "}
                        </span>
                        {course.certification && (
                          <span className="ml-10 text-sm text-green-700 rounded-full bg-green-200 py-1 px-2">
                            Certification
                          </span>
                        )}
                      </span>
                      <div className="text-sm">Rating: {course.rating} ⭐</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 font-medium"
                      >
                        View Course →
                      </a>
                      <button
                        className="text-amber-700 hover:text-amber-900 text-sm font-medium"
                        onClick={() => handleSaving(course._id, "Courses")}
                      >
                        Save for Later
                      </button>
                    </div>
                  </motion.div>
                ))
              : filteredInstitutes.map((institute) => (
                  <motion.div
                    key={institute._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#fff8f2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
                  transition-all duration-300 p-6 space-y-4"
                  >
                    <div className="text-amber-700 font-medium mb-2">
                      Est. {institute.establishmentYear} |{" "}
                      {institute.accreditation}
                    </div>
                    <h3 className="text-xl font-bold text-xl-900 mb-3">
                      {institute.Name}
                    </h3>
                    <div className="text-amber-800 mb-4">
                      <div className="text-sm mb-2">{institute.address}</div>
                      <div className="text-sm font-medium mb-1">
                        Degrees Offered:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {institute.degreesOffered.map((degree, index) => (
                          <span
                            key={index}
                            className="bg-amber-50 px-2 py-1 text-xs rounded border border-amber-900"
                          >
                            {degree}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <a
                        href={institute.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 font-medium"
                      >
                        Visit Website →
                      </a>
                      <button
                        className="text-amber-700 hover:text-amber-900 text-sm font-medium"
                        onClick={() =>
                          handleSaving(institute._id, "institutes")
                        }
                      >
                        Save for Later
                      </button>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Institues;
