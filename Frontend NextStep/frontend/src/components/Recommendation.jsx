import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Star,
  Building,
  Code,
  Laptop,
  GraduationCap as GraduateCap,
} from "lucide-react";
import cityList from "../assets/test.cities.json";

const getCityName = (id) => {
  const city = cityList.find((c) => c._id?.$oid === id);
  return city ? city.City_Name : "Unknown City";
};

function RecommendationsSection({ userId }) {
  const [RecommendedJobs, setRecommendedJobs] = useState({
    jobs: [],
    policies: [],
    institutes: [],
    courses: [],
  });

  const [activeTab, setActiveTab] = useState("Policies");

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

  const renderCard = (type, item) => {
    const baseStyle =
      "bg-[#F9F5F0] border border-[#e5d5c3] rounded-2xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between break-words inline-block";

    const titleClass =
      "text-md font-semibold text-gray-800 mb-1 line-clamp-2 break-words";
    const subtitleClass = "text-sm text-gray-600 mb-2 leading-snug";

    switch (type) {
      case "Courses":
        return (
          <div key={item._id} className={baseStyle}>
            <div className="flex items-start gap-4 mb-4 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#f0e8dc] flex items-center justify-center">
                <Laptop className="text-[#8B4513]" size={20} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <h3
                  className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 overflow-hidden text-ellipsis"
                  title={item.Name}
                >
                  {item.Name}
                </h3>
                <p
                  className="text-sm text-gray-600 mb-2 leading-snug line-clamp-2 overflow-hidden text-ellipsis"
                  title={item.Platform}
                >
                  {item.Platform}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mt-auto">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Visit
              </a>
              <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                <Star size={16} fill="currentColor" />
                <span>{item.rating}</span>
              </div>
            </div>
          </div>
        );

      case "Institutes":
        return (
          <div key={item._id} className={baseStyle}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f0e8dc] flex items-center justify-center">
                <GraduateCap className="text-[#8B4513]" size={20} />
              </div>
              <div>
                <h3 className={titleClass}>{item.Name}</h3>
                <p className={subtitleClass}>{item.address}</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm mt-auto">
              <span className="text-[#8B4513] font-medium">
                {item.accreditation}
              </span>
              <a
                href={item.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Visit
              </a>
            </div>
          </div>
        );

      case "Jobs":
        return (
          <div key={item._id} className={baseStyle}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f0e8dc] flex items-center justify-center">
                <Building className="text-[#8B4513]" size={20} />
              </div>
              <div className="flex flex-col flex-1 overflow-hidden min-w-0">
                <h3 className={titleClass}>{item.Title}</h3>
                <p className={subtitleClass}>{item.Company_Name}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mt-auto">
              <span className="flex items-center gap-1">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {getCityName(item.Location)}
                </span>
              </span>
              <span className="text-[#8B4513] font-semibold overflow-hidden">
                {item.Salary === 0 ? "Not Disclosed" : `₹${item.Salary}`}
              </span>
            </div>
          </div>
        );

      case "Policies":
        return (
          <div key={item._id} className={baseStyle}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f0e8dc] flex items-center justify-center">
                <Code className="text-[#8B4513]" size={20} />
              </div>
              <div>
                <h3 className={titleClass}>{item.Name}</h3>
                <p className={subtitleClass}>{item.Department}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm mt-auto">
              <span className="text-[#8B4513]">
                {item.Region?.State_Name || "All India"}
              </span>
              <a
                href={item.documentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                View
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const tabs = ["Policies", "Institutes", "Courses", "Jobs"];
  const tabKeyMap = {
    Policies: "policies",
    Institutes: "institutes",
    Courses: "courses",
    Jobs: "jobs",
  };
  const currentData = RecommendedJobs[tabKeyMap[activeTab]] || [];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#8B4513]">
          Recommendations for You
        </h2>
      </div>

      <div className="overflow-x-auto flex gap-6 mb-6 border-b border-[#e5d5c3] pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-1 text-base transition-all ${
              activeTab === tab
                ? "border-b-2 border-[#8B4513] text-[#8B4513] font-semibold"
                : "text-gray-500 hover:text-[#8B4513]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}{" "}
            {RecommendedJobs[tabKeyMap[tab]]?.length > 0 &&
              `(${RecommendedJobs[tabKeyMap[tab]].length})`}
          </button>
        ))}
      </div>

      {/* <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin"> */}
      <div className="flex gap-6 overflow-x-auto pb-2">
        {currentData.map((item) => renderCard(activeTab, item))}
      </div>
    </div>
  );
}

export default RecommendationsSection;
