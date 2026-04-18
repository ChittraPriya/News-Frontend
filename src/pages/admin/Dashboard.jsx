import React, { useEffect, useState } from "react";
import instance from "../../instances/instances";

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

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Users</p>
          <h1 className="text-3xl font-bold">{stats.totalUsers}</h1>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total News</p>
          <h1 className="text-3xl font-bold">{stats.totalNews}</h1>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Alerts</p>
          <h1 className="text-3xl font-bold">{stats.totalAlerts}</h1>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p>Today Users</p>
          <h1 className="text-3xl font-bold">{stats.todayUsers}</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
