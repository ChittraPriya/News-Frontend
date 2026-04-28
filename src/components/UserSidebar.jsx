import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  NewspaperIcon,
  BellAlertIcon,
  TagIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const UserSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white shadow-md p-4 space-y-3">
      <button
        onClick={() => navigate("/myfeed")}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50"
      >
        <HomeIcon className="w-5 h-5" />
        My Feed
      </button>

      <button
        onClick={() => navigate("/alerts")}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50"
      >
        <BellAlertIcon className="w-5 h-5" />
        Alerts
      </button>

      <button
        onClick={() => navigate("/preferences")}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50"
      >
        <TagIcon className="w-5 h-5" />
        Preferences
      </button>
    </div>
  );
};

export default UserSidebar;