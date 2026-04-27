import React, { useEffect, useState } from "react";
import instance from "../instances/instances";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import {
  BellIcon,
  CheckIcon,
  TrashIcon,
  BellAlertIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await instance.get("/alerts");
      setAlerts(res.data.alerts || res.data || []);
    } catch (error) {
      toast.error("Failed to load alerts");
    }
  };

  // MARK AS READ
  const markAsRead = async (id) => {
    try {
      await instance.put(`/alerts/${id}`);

      setAlerts((prev) =>
        prev.map((alert) =>
          alert._id === id ? { ...alert, isRead: true } : alert
        )
      );

      toast.success("Marked as read");
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE ALERT
  const deleteAlert = async (id) => {
    try {
      await instance.delete(`/alerts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAlerts((prev) => prev.filter((item) => item._id !== id));

      window.dispatchEvent(new Event("alerts-updated"));

      toast.success("Alert deleted");
    } catch (error) {
      console.log("DELETE ERROR:", error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button>

        {alerts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center mt-10">
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
              <BellIcon className="w-10 h-10 text-blue-600 animate-pulse" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-6">
              No Alerts Yet
            </h2>

            <p className="text-gray-500 mt-3 max-w-md mx-auto leading-7">
              When admin publishes news matching your selected preferences,
              you'll receive instant alerts here.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
                Real-Time Notifications
              </span>

              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                Preference Based News
              </span>

              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">
                Stay Updated
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert._id}
                className={`p-5 rounded-2xl shadow flex justify-between items-start transition duration-300
                ${
                  alert.isRead
                    ? "bg-white"
                    : "bg-blue-50 border-l-4 border-blue-500"
                }`}
              >
                {/* LEFT SIDE */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{alert.title}</h2>

                  <p className="text-gray-600 text-sm mt-1">
                    {alert.description}
                  </p>

                  {alert.link && (
                    <a
                      href={alert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                    >
                      Read News →
                    </a>
                  )}

                  {/* STATUS BADGE */}
                  <div className="mt-4">
                    {alert.isRead ? (
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

                {/* ACTIONS */}
                <div className="flex flex-col gap-2 items-end ml-4">
                  {!alert.isRead && (
                    <button
                      onClick={() => markAsRead(alert._id)}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <CheckIcon className="w-5 h-5" />
                    </button>
                  )}

                  <button
                    onClick={() => deleteAlert(alert._id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;