import React, { useEffect, useState } from "react";
import instance from "../../instances/instances";

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
    <div className="bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Alerts
      </h2>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">
          Loading alerts...
        </p>
      )}

      {/* No Alerts */}
      {!loading && alerts.length === 0 && (
        <p className="text-gray-500">
          No alerts available
        </p>
      )}

      {/* Alerts List */}
      {!loading &&
        alerts.map((item) => (
          <div
            key={item._id}
            className="border-b py-4 flex justify-between items-start hover:bg-gray-50 px-2 rounded"
          >
            <div>
              <h3 className="font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.userId?.email || "Unknown User"}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-medium text-blue-600">
                {item.type}
              </p>

              <p
                className={`text-xs mt-1 font-semibold ${
                  item.isRead
                    ? "text-gray-400"
                    : "text-red-500"
                }`}
              >
                {item.isRead ? "Read" : "New"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Alerts;