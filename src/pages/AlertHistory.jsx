import React, { useEffect, useState } from "react";
import instance from "../instances/instances";

const AlertHistory = () => {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    const res = await instance.get("/api/v1/alerts");
    setAlerts(res.data);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const markRead = async (id) => {
    await instance.put(`/api/v1/alerts/${id}/read`);
    fetchAlerts();
  };

  const markAll = async () => {
    await instance.put("/api/v1/alerts/read-all");
    fetchAlerts();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Alert History</h2>

        <button
          onClick={markAll}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Mark All Read
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a._id}
            className={`p-4 border rounded ${
              a.isRead ? "bg-gray-100" : "bg-white"
            }`}
          >
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-gray-600">{a.description}</p>
            <p className="text-xs text-gray-400">{a.category}</p>

            <div className="flex gap-3 mt-2">
              {!a.isRead && (
                <button
                  onClick={() => markRead(a._id)}
                  className="text-blue-600 text-sm"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertHistory;