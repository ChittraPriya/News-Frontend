import React, { useState } from "react";
import {
  HomeIcon,
  NewspaperIcon,
  UsersIcon,
  BellAlertIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", icon: HomeIcon, path: "/admin/dashboard" },
    { name: "Add News", icon: NewspaperIcon, path: "/admin/news" },
    { name: "Users", icon: UsersIcon, path: "/admin/users" },
    { name: "Alerts", icon: BellAlertIcon, path: "/admin/alerts" },
    { name: "Analytics", icon: ChartBarIcon, path: "/admin/analytics" },
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* MOBILE MENU BUTTON ONLY */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="bg-white p-2 rounded-lg shadow-md"
        >
          <Bars3Icon className="w-7 h-7 text-black" />
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 p-5 flex flex-col justify-between transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex`}
      >
        <div>
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-blue-600">
              Admin Panel
            </h1>

            {/* CLOSE BUTTON MOBILE */}
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden"
            >
              <XMarkIcon className="w-7 h-7 text-black" />
            </button>
          </div>

          {/* MENU */}
          <div className="space-y-3">
            {menu.map((item, i) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={i}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-50"
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

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-500 px-4 py-3 rounded-xl hover:bg-red-50"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;