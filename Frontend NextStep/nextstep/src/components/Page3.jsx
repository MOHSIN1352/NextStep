import { useEffect, useState } from "react";
import {
  Heart,
  DollarSign,
  Building2,
  GitFork,
  Search,
  Users,
  Award,
  GitPullRequest,
} from "lucide-react";
import videoE from "../assets/videoearth.mp4";

export default function Page3() {
  const stats = [
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      label: "Sponsors",
      value: 130000,
      growth: "+204%",
    },
    {
      icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
      label: "Sponsorships",
      value: 500000,
      growth: "+45%",
    },
    {
      icon: <Building2 className="w-5 h-5 text-blue-500" />,
      label: "Organizations",
      value: 340000000,
      growth: "+14%",
    },
    {
      icon: <GitFork className="w-5 h-5 text-purple-500" />,
      label: "Repositories",
      value: 988000000,
      growth: "+8%",
    },
    {
      icon: <Search className="w-5 h-5 text-amber-500" />,
      label: "Code searches",
      value: 391000000,
      growth: "+100%",
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      label: "Teams",
      value: 268000,
      growth: "+8.4%",
    },
    {
      icon: <Award className="w-5 h-5 text-orange-500" />,
      label: "Achievements",
      value: 150000000,
      growth: "+30%",
    },
    {
      icon: <GitPullRequest className="w-5 h-5 text-cyan-500" />,
      label: "Most contributed repo",
      value: "19.8k",
      growth: "microsoft/vscode",
      isRepo: true,
    },
  ];

  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      let current = 0;
      const step = Math.ceil(stat.value / 100);
      return setInterval(() => {
        setAnimatedStats((prev) => {
          const newValues = [...prev];
          newValues[index] = Math.min(current + step, stat.value);
          return newValues;
        });
        current += step;
        if (current >= stat.value) clearInterval(intervals[index]);
      }, 20);
    });
    return () => intervals.forEach((interval) => clearInterval(interval));
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-900">
      {/* Stats Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col space-y-2 p-6 rounded-lg bg-white shadow-lg border border-gray-300 hover:shadow-2xl transition"
            >
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-gray-200">{stat.icon}</div>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {stat.isRepo
                    ? stat.value
                    : animatedStats[index].toLocaleString()}
                </span>
                <span
                  className={`text-sm ${
                    stat.isRepo ? "text-gray-500" : "text-green-600"
                  }`}
                >
                  {stat.growth}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section with Video */}
        <div className="relative mt-12 h-[50vh] text-center text-white   overflow-hidden">
          <div className="relative z-10 px-6">
            <h2 className="text-6xl font-bold ">
              Go further, read the expert's report
            </h2>
          </div>
          <div className="absolute top-7 ">
            <video
              src={videoE}
              autoPlay
              loop
              muted
              className="w-[200%] h-full object-cover"
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
}
