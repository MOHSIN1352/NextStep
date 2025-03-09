import React from "react";
import healthcare from "../assets/healthcare.png";
import gov from "../assets/government.png";
import edu from "../assets/education.png";
import jobs from "../assets/jobs.png";

const Page2 = () => {
  return (
    <div className="min-h-[50%] mx-[10%] bg-white text-gray-800 p-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Magic Cards Section (Medium Size) */}
        <div className="col-span-5 p-6 bg-gray-100 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Healthcare</h2>
            <h3 className="text-3xl font-bold mb-4">Find health facilities</h3>
            <p>
              This feature enables people to find the best health
              facilities in their area.
            </p>
          </div>
          <img
            src={healthcare}
            alt="healthcare"
            className="mx-35 w-1/2 h-fit object-cover rounded-lg "
          />
        </div>

        {/* Secure with 2FA Section (Small Size) */}
        <div className="col-span-7 p-6 bg-gray-100 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Government</h2>
            <h3 className="text-3xl font-bold mb-4">explore schemes</h3>
            <p>
              This feature enables easier budgeting, tracking, and management.
            </p>
          </div>
          <div className="">
            <img
              src={gov}
              alt="government"
              className="w-full h-fit object-contain"
            />
          </div>
        </div>

        {/* Growth with New Wallety Series (Large Size) */}
        <div className="col-span-7 px-6 py-0 bg-gray-100 rounded-xl shadow-lg flex justify-center items-center">
          <div>
            <h2 className="text-lg font-semibold mb-2">Education</h2>
            <h3 className="text-4xl font-bold mb-4">Upgrade your skills</h3>
            <p>
              This feature offers various degrees and courses for users to
              upgrade their skills
            </p>
          </div>

          <img
            src={edu}
            alt="education"
            className=" w-1/2 h-fit object-cover rounded-lg"
          />
        </div>

        {/* Join the Ecosystem (Tall Size) */}
        <div className="col-span-5 p-6 bg-gray-100 rounded-xl shadow-lg flex flex-col justify-between  items-center">
          <div className="">
            <h2 className="text-lg font-semibold mb-2">Jobs</h2>
            <h3 className="text-3xl font-bold mb-4">Find your dream job</h3>
            <p>
              This feature helps the user to find the best job in
              their locality.
            </p>
            <img
              src={jobs}
              alt="jobs"
              className="mx-36 mt-6 w-1/2 h-1/2 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
