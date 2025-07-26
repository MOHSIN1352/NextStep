import { Link } from "react-router-dom";
import healthcare from "../assets/job.svg";
import gov from "../assets/gov.svg";
import edu from "../assets/edu.svg";
import jobs from "../assets/job.svg";
import { motion } from "framer-motion"; // Fix import here
import { useState } from "react";

export default function DemoPage() {
  const [hoverIndex, setHoverIndex] = useState(null); // Track hovered card index

  const cardData = [
    {
      title: "Healthcare",
      image: healthcare,

      description:
        "We provide information on healthcare facilities to ensure better medical accessibility for all.",
    },
    {
      title: "Government",
      image: gov,
      description:
        "Stay informed about government policies and schemes that can benefit your career and well-being.",
    },
    {
      title: "Education",
      image: edu,
      //   <iframe src="https://lottie.host/embed/f494248a-6a82-4432-b884-2da91ccecc66/oBAVECO2te.lottie"></iframe>
      //   <iframe src="https://lottie.host/embed/06f685fc-4eda-40f1-ab2d-491f4d73eba1/7o0lBAfEje.lottie"></iframe>
      //   <iframe src="https://lottie.host/embed/bb9d7f6a-88a7-4cd8-b4c0-43f2035e970e/73hVeDk8KP.lottie"></iframe> login
      //   <iframe src="https://lottie.host/embed/4eb61a03-4a7f-4409-baf4-1ebb8fd4e3e3/L8TuJEfMz4.lottie"></iframe> signup
      //   <iframe src="https://lottie.host/embed/7c125179-f12b-4784-a8b0-e6db77832119/MfDnwXqDAe.lottie"></iframe>
      description:
        "Explore educational opportunities and resources for students and professionals seeking growth.",
    },
    {
      title: "Jobs",
      image: jobs,
      description:
        "Find job opportunities and career guidance to help you settle in a new city with ease.",
    },
  ];

  return (
    <>
      <section className="relative bg-[#f5f0e3] py-24 h-screen w-full">
        <div>
          <div className="absolute top-30 left-10 bg-amber-500/25 h-[200px] w-[200px] rounded-full z-0"></div>
          <div className="absolute top-[25%] left-10 px-10">
            <motion.div
              className="max-w-xl z-40 "
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="w-fit py-4 mb-4">
                <h1 className="text-5xl font-bold text-black leading-13">
                  Empowering people through tailored support and authentic
                  connection.
                </h1>
              </div>
              <p className="text-gray-700 mt-4 text-lg">
                Empowering people through tailored support and authentic
                connections, helping young migrants navigate jobs, education,
                healthcare, and government policies in a new city with ease.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute right-20 top-25">
          {/* <DotLottieReact
            src="https://lottie.host/embed/1ff6dc53-3640-47a8-af53-eef20040e913/VWOwYru1fi.lottie"
            loop
            autoplay
          /> */}
          <iframe
            src="https://lottie.host/embed/1ff6dc53-3640-47a8-af53-eef20040e913/VWOwYru1fi.lottie"
            width={600}
            height={400}
            loop={false}
          ></iframe>
          {/* <img src={Logo} alt="Logo" width={500} height={400} /> */}
        </div>
      </section>

      {/* What We Do Section */}
      {/* <section className=" py-16 ">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What we do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                className="relative   p-6 text-center"
                onMouseEnter={() => setHoverIndex(index)} 
                onMouseLeave={() => setHoverIndex(null)} 
              >
              
                <motion.div
                  animate={{
                    scale: hoverIndex === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-md rounded-lg w-full h-60 flex justify-center"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full object-contain z-40"
                  />
                </motion.div>

          
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoverIndex === index ? 1 : 0,
                    y: hoverIndex === index ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-4 left-0 w-full uppercase text-3xl font-extrabold text-amber-500"
                >
                  {card.title}
                </motion.h3>

              
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoverIndex === index ? 1 : 0,
                    y: hoverIndex === index ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-700 mb-4"
                >
                  {card.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="bg-[#f5f0e3] py-16 px-12">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What we do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setHoverIndex(index)} // Track hovered card
                onMouseLeave={() => setHoverIndex(null)}
                className="bg-white shadow-md rounded-lg p-6 text-center"
              >
                <motion.div
                  animate={{
                    scale: hoverIndex === index ? 1.2 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-40 flex justify-center"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full object-contain"
                  />
                </motion.div>
                <h3 className="text-xl font-bold mt-4 mb-2">{card.title}</h3>
                <p className="text-gray-700 mb-4">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
