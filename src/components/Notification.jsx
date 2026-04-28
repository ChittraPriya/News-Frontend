import { Bell } from "@heroicons/react";

const Notification = ({ count, onClick }) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <Bell className="w-7 h-7 text-gray-700 hover:text-blue-600" />

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default Notification;