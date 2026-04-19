import React, { useEffect, useState } from "react";

import instance from "../../instances/instances";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  const token = localStorage.getItem("token");

  const [categoryStats, setCategoryStats] = useState([]);

  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
  fetchAnalytics();
  fetchNews();

  const interval = setInterval(() => {
    fetchAnalytics();
    fetchNews();
  }, 3000); // every 3 sec

  return () => clearInterval(interval);
}, []);

  const categories = [
    "technology",
    "sports",
    "business",
    "health",
    "science",
    "entertainment",
    "politics",
    "world",
  ];

  const fetchAnalytics = async () => {
    try {
      const res = await instance.get("/admin/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(res.data)) {
        setCategoryStats(res.data);
      } else {
        setCategoryStats([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await instance.get("/admin/news", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(res.data)) {
        setNewsList(res.data);
      } else {
        setNewsList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // show all categories
  const chartData = categories.map((cat) => {
    const found = categoryStats.find(
      (item) => item.category?.toLowerCase() === cat,
    );

    return {
      category: cat,
      total: found?.total || 0,
      api: found?.api || 0,
      admin: found?.admin || 0,
    };
  });

  const pieData = [
    {
      name: "API News",
      value: newsList.filter((n) => n.source?.toLowerCase() === "api").length,
    },
    {
      name: "Admin News",
      value: newsList.filter((n) => n.source?.toLowerCase() !== "api").length,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      </div>

      {/* BAR CHART */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-bold mb-4">Category News Stats</h3>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="total" fill="#3b82f6" name="Total" />

            <Bar dataKey="api" fill="#10b981" name="API" />

            <Bar dataKey="admin" fill="#f59e0b" name="Admin" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PieChart */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-center">
        <div>
          <h3 className="font-bold mb-4 text-center">Source Distribution</h3>

          <PieChart width={350} height={300}>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              <Cell fill="#3b82f6" />
              <Cell fill="#10b981" />
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
