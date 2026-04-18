import React from "react";
import {
  HomeIcon,
  NewspaperIcon,
  UsersIcon,
  BellAlertIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const menu = [
    { name: "Dashboard", icon: HomeIcon, path: "/admin/dashboard" },
    { name: "Add News", icon: NewspaperIcon, path: "/admin/news" },
    { name: "Users", icon: UsersIcon, path: "/admin/users" },
    { name: "Alerts", icon: BellAlertIcon, path: "/admin/alerts" },
    { name: "Analytics", icon: ChartBarIcon, path: "/admin/analytics" },
  ];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="w-64 bg-white shadow-xl p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h1>

        <div className="space-y-3">
          {menu.map((item, i) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-blue-50"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-3 text-red-500 px-4 py-3 rounded-xl hover:bg-red-50"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
