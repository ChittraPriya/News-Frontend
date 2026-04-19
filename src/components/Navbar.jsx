import React, { useState, useEffect, useCallback } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import instance from "../instances/instances";

import {
  Cog6ToothIcon,
  BellIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

import socket from "../socket/socket";
import { toast } from "react-toastify";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  /* GET USER FROM LOCAL STORAGE */
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const user = {
    name: storedUser?.name || "User",
    email: storedUser?.email || "",
    role: storedUser?.role || "user",
  };

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await instance.get("/alerts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(response.data.alerts || []);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const fetchUnreadCount = async () => {
    try {
      const res = await instance.get("/alerts/unread-count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUnreadCount(res.data.unreadCount || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  if (isAuthenticated) {
    fetchNotifications();
    fetchUnreadCount();
  }

  socket.on("new-news", (data) => {
    setNotifications((prev) => {
      const exists = prev.some(
        (item) =>
          item.title === data.alert.title ||
          item.link === data.alert.link
      );

      if (exists) return prev;

      return [data.alert, ...prev];
    });

    fetchUnreadCount();
  });

  const refreshAlerts = () => {
    fetchNotifications();
    fetchUnreadCount();
  };

  window.addEventListener("alerts-updated", refreshAlerts);

  return () => {
    socket.off("new-news");
    window.removeEventListener("alerts-updated", refreshAlerts);
  };
}, [isAuthenticated, fetchNotifications]);

  /* MARK ALL READ */
  const handleBellClick = async () => {
    setShowPanel(!showPanel);

    try {
      await instance.put(
        "/alerts/mark-all-read",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        })),
      );

      setUnreadCount(0);

      window.dispatchEvent(new Event("alerts-updated"));
    } catch (error) {
      console.log(error);
    }
  };

  /* CLEAR ALL */
  const clearAllNotifications = async () => {
    try {
      await instance.delete("/alerts/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications([]);
      setUnreadCount(0);

      toast.success("All notifications cleared");
    } catch (error) {
      toast.error("Failed to clear notifications");
    }
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-3">
      <div className="flex items-center justify-between">
        <img src={logo} alt="Logo" className="h-14 w-auto" />

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-800 font-semibold hover:text-blue-600"
          >
            Home
          </Link>

          {/* NOTIFICATION */}
          {isAuthenticated && (
            <div className="relative">
              <BellIcon
                onClick={handleBellClick}
                className="w-7 h-7 cursor-pointer text-gray-700 hover:text-blue-600"
              />

              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {unreadCount}
                </span>
              )}

              {showPanel && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-xl shadow-xl p-4 z-50">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold">Notifications</h2>

                    <button
                      onClick={clearAllNotifications}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>

                  {notifications.length === 0 ? (
                    <p className="text-gray-500">No alerts</p>
                  ) : (
                    notifications.slice(0, 5).map((item) => (
                      <div
                        key={item._id}
                        className="border-b py-2 text-sm hover:bg-gray-50"
                      >
                        {item.title}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* PROFILE */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="text-gray-800 hover:text-blue-600 font-medium text-lg"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <Cog6ToothIcon className="w-5 h-5" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                  >
                    <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
