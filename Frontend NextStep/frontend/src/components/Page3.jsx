import React from "react";
// import map from "../assets/page4map.jpg"; // Ensure correct path
// import { Fullscreen } from "lucide-react";
import { motion } from "motion/react";
const Pagemap = () => {
  return (
    <div className="relative h-screen ">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 bg-[#f5f0e3] h-[5%] w-full rounded-b-4xl z-10"></div>

      <iframe
        src="https://lottie.host/embed/92234c77-78e0-41c7-9028-7715cd729590/zkRLzzJZuR.lottie"
        height={1000}
        width={1000}
        className="absolute -top-30 w-full"
      ></iframe>
      {/* Background Image */}
      <div className="absolute "></div>

      <motion.div
        whileInView={{ scale: [0.6, 1] }}
        transition={{ duration: 1 }}
        className="bg-[#f5f0e3] absolute w-150 top-[30%] left-[30%] px-15 py-15 text-center rounded-2xl shadow-2xl"
      >
        <h1 className="absolute top-5   left-55 font-bold text-3xl">
          Our mission
        </h1>
        <p className=" text-xl leading-7 mt-5 text-gray-700">
          NextStep bridges the gap between individuals and essential services,
          ensuring a seamless transition into unfamiliar environments. By
          providing real-time insights, curated guides, and local support
          networks, we empower users to navigate their new city with confidence
        </p>
      </motion.div>

      {/* Another Layer */}
      <div className="absolute bottom-0 left-0 bg-[#f5f0e3] h-[5%] w-full rounded-t-4xl z-20"></div>
    </div>
  );
};

export default Pagemap;
