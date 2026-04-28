import React, { useEffect, useState } from "react";
import instance from "../../instances/instances";
import {
  BellAlertIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { HiOutlineSparkles } from "react-icons/hi";

const Alerts = () => {
  const token = localStorage.getItem("token");

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await instance.get("/admin/alerts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlerts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-bold text-gray-800">
          <BellAlertIcon className="w-10 h-10 text-red-500 bg-red-100 p-2 rounded-2xl shadow" />

          <span>Alerts Center</span>

          <HiOutlineSparkles className="text-yellow-500 text-3xl animate-pulse" />
        </h2>

        <p className="text-gray-500 mt-3">
          Stay updated with all latest notifications and activities.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-md p-6 text-center text-gray-500">
          Loading alerts...
        </div>
      )}

      {/* No Alerts */}
      {!loading && alerts.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-6 text-center text-gray-500">
          No alerts available
        </div>
      )}

      {/* Alerts Cards */}
      {!loading && alerts.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {alerts.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border border-gray-100 relative overflow-hidden group"
            >
              {/* Glow */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-red-100 rounded-full blur-2xl opacity-50 group-hover:scale-125 transition"></div>

              {/* Title */}
              <div className="flex justify-between items-start gap-3">
                <h3 className="text-lg font-bold text-gray-800">
                  {item.title}
                </h3>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                  {item.type}
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-gray-500 mt-4">
                <EnvelopeIcon className="w-5 h-5 text-blue-500" />
                <span className="text-sm break-all">
                  {item.userId?.email || "Unknown User"}
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 text-gray-400 mt-3">
                <ClockIcon className="w-5 h-5" />
                <span className="text-sm">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Status */}
              <div className="mt-5">
                {item.isRead ? (
                  <span className="inline-flex items-center gap-2 text-green-600 text-sm font-semibold bg-green-100 px-4 py-2 rounded-xl">
                    <CheckCircleIcon className="w-5 h-5" />
                    Read
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-red-500 text-sm font-semibold bg-red-100 px-4 py-2 rounded-xl animate-pulse">
                    <BellAlertIcon className="w-5 h-5" />
                    New Alert
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;