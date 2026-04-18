import React, { useEffect, useState } from "react";
import instance from "../instances/instances";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await instance.get("/alerts");
      setAlerts(res.data.alerts);
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
          alert._id === id ? { ...alert, isRead: true } : alert,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE ALERT
  const deleteAlert = async (id) => {
    try {
      await instance.delete(`/alerts/${id}`);

      setAlerts((prev) => prev.filter((item) => item._id !== id));

      await fetchAlerts();

      window.dispatchEvent(new Event("alerts-updated"));

      toast.success("Alert deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Alerts</h1>

        {alerts.length === 0 ? (
          <p className="text-gray-500">No alerts found</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert._id}
                className={`p-4 rounded-xl shadow flex justify-between items-start transition
                ${alert.isRead ? "bg-white" : "bg-blue-50 border-l-4 border-blue-500"}`}
              >
                {/* LEFT SIDE */}
                <div>
                  <h2 className="font-semibold text-lg">{alert.title}</h2>

                  <p className="text-gray-600 text-sm mt-1">
                    {alert.description}
                  </p>

                  {alert.link && (
                    <a
                      href={alert.link}
                      target="_blank"
                      className="text-blue-600 text-sm mt-2 inline-block"
                    >
                      Read News →
                    </a>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-2 items-end">
                  {!alert.isRead && (
                    <button
                      onClick={() => markAsRead(alert._id)}
                      className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      <CheckIcon className="w-5 h-5 text-white" />
                    </button>
                  )}

                  <button
                    onClick={() => deleteAlert(alert._id)}
                    className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
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
