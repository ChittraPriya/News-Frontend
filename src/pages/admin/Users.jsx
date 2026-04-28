import React, { useEffect, useState } from "react";
import instance from "../../instances/instances";
import {
  UsersIcon,
  UserCircleIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { HiOutlineSparkles } from "react-icons/hi";

const Users = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await instance.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUsers(res.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-bold text-gray-800">
          <UsersIcon className="w-10 h-10 text-blue-600 bg-blue-100 p-2 rounded-2xl shadow" />

          <span>Users List</span>

          <HiOutlineSparkles className="text-yellow-500 text-3xl animate-pulse" />
        </h2>

        <p className="text-gray-500 mt-3">
          Manage and monitor all registered users easily.
        </p>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border border-gray-100 relative overflow-hidden group"
          >
            {/* Top Glow */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 group-hover:scale-125 transition"></div>

            {/* User Icon */}
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl text-white shadow-md">
                <UserCircleIcon className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-400">
                  User #{index + 1}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
              <EnvelopeIcon className="w-5 h-5 text-blue-500" />
              <span className="text-sm break-all">
                {user.email}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;