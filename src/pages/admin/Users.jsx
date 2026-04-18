import React, { useEffect, useState } from "react";
import instance from "../../instances/instances";

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
    <div className="bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Users List
      </h2>

      {users.map((user) => (
        <div
          key={user._id}
          className="border-b py-4"
        >
          <h3 className="font-semibold">
            {user.name}
          </h3>
          <p className="text-gray-500">
            {user.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Users;