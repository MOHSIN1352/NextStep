import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  MapPin,
  Star,
  ChevronRight,
  Building,
  Code,
  Laptop,
  GraduationCap as GraduateCap,
} from "lucide-react";

function RecommendationsSection({ userId }) {
  const [RecommendedJobs, setRecommendedJobs] = useState({
    jobs: [],
    policies: [],
    institutes: [],
    courses: [],
  });

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/getRecommendations/${userId}`
        );

        setRecommendedJobs(res.data);
      } catch (error) {
        console.error("Error fetching recommendations", error);
      }
    };

    fetchRecommendations();
  }, [userId]);
  console.log("fetched recommendations", RecommendedJobs);
  const [activeTab, setActiveTab] = useState("Policies");
  const recommendedJobs = [
    {
      id: 1,
      title: "Associate | IndiaMART",
      company: "IndiaMART",
      location: "Remote",
      rating: 3.6,
      icon: Building,
      postedAgo: "1d ago",
      salary: "₹3.5-5.0 LPA",
    },
    {
      id: 2,
      title: "Technical Support Engineer",
      company: "Tech Mahindra",
      location: "Noida",
      rating: 3.5,
      icon: Code,
      postedAgo: "3d ago",
      salary: "₹4.0-6.0 LPA",
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Prologic Web Solutions",
      location: "Remote",
      rating: 4.0,
      icon: Laptop,
      postedAgo: "1w ago",
      salary: "₹5.0-8.0 LPA",
    },
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 ">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-[#8B4513]">
          Recommendations for you
        </h2>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          <button
            className={`pb-2 px-1 ${
              activeTab === "Policies"
                ? "border-b-2 border-[#8B4513] text-[#8B4513] font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Policies")}
          >
            Policies{" "}
            {RecommendedJobs.policies.length > 0 &&
              `(${RecommendedJobs.policies.length})`}
          </button>
          <button
            className={`pb-2 px-1 ${
              activeTab === "Institutes"
                ? "border-b-2 border-[#8B4513] text-[#8B4513] font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Institutes")}
          >
            Institutes{" "}
            {RecommendedJobs.institutes.length > 0 &&
              `(${RecommendedJobs.institutes.length})`}
          </button>
          <button
            className={`pb-2 px-1 ${
              activeTab === "Courses"
                ? "border-b-2 border-[#8B4513] text-[#8B4513] font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Courses")}
          >
            Courses{" "}
            {RecommendedJobs.courses.length > 0 &&
              `(${RecommendedJobs.courses.length})`}
          </button>
          <button
            className={`pb-2 px-1 ${
              activeTab === "Job"
                ? "border-b-2 border-[#8B4513] text-[#8B4513] font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Job")}
          >
            Job {RecommendedJobs.length > 0 && `(${recommendedJobs.length})`}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeTab === "Courses" &&
          RecommendedJobs.courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-[#F5F5DC] flex items-center justify-center">
                  <Laptop className="text-[#8B4513]" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {course.Name}
                  </h3>
                  <p className="text-gray-600 text-sm">{course.Platform}</p>
                  <p className="text-[#8B4513] text-sm font-medium mt-1">
                    {course.Category}
                  </p>
                </div>
                <span className="text-gray-400 text-sm">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <a
                  href={course.url}
                  className=" text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  Visit
                </a>
                <div className="flex items-center gap-1 ml-auto">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          ))}

        {activeTab === "Institutes" &&
          RecommendedJobs.institutes.map((institute) => (
            <div
              key={institute._id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-[#F5F5DC] flex items-center justify-center">
                  <GraduateCap className="text-[#8B4513]" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {institute.Name}
                  </h3>
                  <p className="text-gray-600 text-sm">{institute.address}</p>
                  <p className="text-[#8B4513] text-sm font-medium mt-1">
                    {institute.accreditation}
                  </p>
                  <a
                    href={institute.websiteLink}
                    className=" text-sm text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Visit
                  </a>
                </div>
              </div>
            </div>
          ))}

        {activeTab === "Jobs" &&
          RecommendedJobs.jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-[#F5F5DC] flex items-center justify-center">
                  <Building className="text-[#8B4513]" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{job.company}</p>
                  <p className="text-[#8B4513] text-sm font-medium mt-1">
                    {job.salary}
                  </p>
                </div>
                <span className="text-gray-400 text-sm">{job.postedAgo}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={16} />
                <span>{job.location}</span>
                <div className="flex items-center gap-1 ml-auto">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span>{job.rating}</span>
                </div>
              </div>
            </div>
          ))}

        {activeTab === "Policies" &&
          RecommendedJobs.policies.map((policy) => (
            <div
              key={policy._id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-[#F5F5DC] flex items-center justify-center">
                  <Code className="text-[#8B4513]" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {policy.Name}
                  </h3>
                  <p className="text-gray-600 text-sm">{policy.Department}</p>
                  <p className="text-[#8B4513] text-sm font-medium mt-1">
                    {policy.Region.State_Name}
                  </p>
                  <a
                    href={policy.documentLink}
                    className=" text-sm text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Visit
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecommendationsSection;
