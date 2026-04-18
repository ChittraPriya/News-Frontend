import React, { useEffect, useState } from "react";
import instance from "../../instances/instances";

const Alerts = () => {
  const token = localStorage.getItem("token");
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    const res = await instance.get("/admin/alerts", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setAlerts(res.data);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Alerts
      </h2>

      {alerts.map((item) => (
        <div
          key={item._id}
          className="border-b py-4 flex justify-between"
        >
          <div>
            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500">
              {item.userId?.email}
            </p>

            <p className="text-xs text-gray-400">
              {new Date(
                item.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs">
              {item.type}
            </p>

            <p
              className={`text-xs ${
                item.isRead
                  ? "text-gray-400"
                  : "text-red-500"
              }`}
            >
              {item.isRead
                ? "Read"
                : "New"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alerts;