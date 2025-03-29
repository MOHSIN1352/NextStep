import { Users, BookOpen, MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Demo() {
  const impactStats = [
    {
      id: 1,
      number: 100,
      description:
        "Individuals successfully guided through their city transitions",
      icon: <Users className="w-8 h-8 text-gray-700" />,
    },
    {
      id: 2,
      number: 146,
      description: "Healthcare facilities mapped and made accessible",
      icon: <BookOpen className="w-8 h-8 text-gray-700" />,
    },
    {
      id: 3,
      number: 120,
      description: "Users connected with local community networks for support",
    },
  ];

  return (
    <div className="relative w-screen h-[120vh] bg-[#f5f0e3] overflow-x-hidden">
      {/* Impact Overview */}
      <section className="absolute top-10 container mx-auto p-8 py-8">
        {/* Impact Headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-40 max-w-6xl mb-10"
        >
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Breaking barriers to a smooth transition by simplifying access to
            essential services and local knowledge.
          </h1>
        </motion.div>

        {/* Impact Statistics */}
        <div className="absolute top-100 w-[90%] grid grid-cols-3 gap-8 md:gap-12 mt-20">
          {impactStats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: stat.id * 0.2 }}
              className="flex flex-col items-start h-full"
            >
              <p className="mb-10 border-t-1 border-gray-300 pr-5 w-full text-lg">
                {stat.description}
              </p>
              <div className="flex-grow"></div>

              {/* Animated Number Counter */}
              <motion.h3
                className="text-7xl font-bold text-gray-900 self-start tracking-tighter"
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <AnimatedNumber targetNumber={stat.number} />
              </motion.h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Number Animation Component (Triggers only when in view)
const AnimatedNumber = ({ targetNumber }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const increment = targetNumber / (duration / 16);

      const interval = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          start = targetNumber;
          clearInterval(interval);
        }
        setCount(Math.floor(start));
      }, 16);

      return () => clearInterval(interval);
    }
  }, [isInView, targetNumber]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};
