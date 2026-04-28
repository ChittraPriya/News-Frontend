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
  CartesianGrid,
} from "recharts";

const Analytics = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await instance.get("/admin/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategoryStats(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();

    const interval = setInterval(fetchAllData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Published News + User Preferences
  const chartData = categories.map((cat) => {
    const found = categoryStats.find(
      (item) => item.category?.toLowerCase() === cat
    );

    return {
      category: cat,
      news: found?.total || 0,
      preferences: found?.preferences || 0,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Analytics Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Content published vs categories selected by users
          </p>
        </div>

        <button
          onClick={fetchAllData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* Chart */}
      <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            📊 User Interests vs Published News
          </h3>
        </div>

        <ResponsiveContainer width="100%" height={430}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            barGap={8}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="category"
              tick={{ fill: "#374151", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#374151", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(59,130,246,0.08)" }}
              contentStyle={{
                borderRadius: "14px",
                border: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
              }}
            />

            <Legend wrapperStyle={{ paddingTop: "10px" }} />

            <Bar
              dataKey="news"
              fill="#3b82f6"
              radius={[10, 10, 0, 0]}
              name="Published News"
            />

            <Bar
              dataKey="preferences"
              fill="#10b981"
              radius={[10, 10, 0, 0]}
              name="User Preferences"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;