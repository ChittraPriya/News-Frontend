import React, { useEffect, useState } from "react";
import instance from "../../instances/instances";
import {
  UsersIcon,
  NewspaperIcon,
  BellAlertIcon,
  UserPlusIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { HiOutlineSparkles } from "react-icons/hi";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await instance.get("/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setStats(res.data);
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: UsersIcon,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total News",
      value: stats.totalNews || 0,
      icon: NewspaperIcon,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Alerts",
      value: stats.totalAlerts || 0,
      icon: BellAlertIcon,
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Today Users",
      value: stats.todayUsers || 0,
      icon: UserPlusIcon,
      color: "from-purple-500 to-violet-600",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-100 to-blue-50 min-h-screen">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="flex items-center gap-3 text-4xl font-bold text-gray-800 whitespace-nowrap">
          <ShieldCheckIcon className="w-10 h-10 text-blue-600 bg-blue-100 p-2 rounded-xl shadow" />

          Welcome Admin 
          <HiOutlineSparkles className="text-yellow-500 text-3xl animate-pulse" />
        </h2>
        <p className="text-gray-500 mt-2">
          Monitor your platform performance in real-time
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 relative overflow-hidden group"
            >
              {/* Gradient top bar */}
              <div
                className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.color}`}
              ></div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">{item.title}</p>
                  <h1 className="text-4xl font-bold mt-2 text-gray-800">
                    {item.value}
                  </h1>
                </div>

                <div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg`}
                >
                  <Icon className="w-7 h-7" />
                </div>
              </div>

              {/* Bottom glow */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-40 group-hover:scale-125 transition"></div>
            </div>
          );
        })}
      </div>

      {/* Extra Section */}
      <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Quick Summary
        </h3>
        <p className="text-gray-500 leading-7">
          Your news platform is growing steadily. Keep adding fresh content,
          monitor alerts, and engage users daily for better reach 
        </p>
      </div>
    </div>
  );
};

export default Dashboard;