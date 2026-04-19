import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  Bars3Icon,
  BellAlertIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  HomeIcon,
  NewspaperIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import instance from "../instances/instances";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  const navigate = useNavigate();

  useEffect(() => {
 fetchAllNews();

 const interval = setInterval(fetchAllNews, 30000);

 return () => clearInterval(interval);
}, []);

  const fetchAllNews = async () => {
    try {
      const response = await instance.get("/dashboard");
      setNews(response.data.news);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* TOP NAVBAR */}
      <div className="h-16 bg-white shadow z-10">
        <Navbar />
      </div>

      <div className="md:hidden px-4 py-3 bg-white shadow">
        <Bars3Icon
          className="w-8 h-8 cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        />
      </div>

      {/* BODY AREA (sidebar + content) */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div
          className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          {/* Close Button Mobile */}
          <div className="flex justify-end p-4 md:hidden">
            <XMarkIcon
              className="w-7 h-7 cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          <div className="space-y-3">
            <button
              onClick={() => {
                setActive("dashboard");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50"
            >
              <HomeIcon className="w-5 h-5" />
              Home
            </button>
            <button
              onClick={() => {
                setActive("dashboard");
                setSidebarOpen(false);
                navigate("/all-news");
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50"
            >
              <NewspaperIcon className="w-5 h-5" />
              All News
            </button>
            <button
              onClick={() => {
                setActive("dashboard");
                setSidebarOpen(false);
                navigate("/alerts");
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50"
            >
              <BellAlertIcon className="w-5 h-5" />
              Alerts
            </button>
            <button
              onClick={() => {
                setActive("dashboard");
                setSidebarOpen(false);
                navigate("/preferences");
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50"
            >
              <TagIcon className="w-5 h-5" />
              Preferences
            </button>
            <button
              onClick={() => {
                setActive("dashboard");
                setSidebarOpen(false);
                navigate("/settings");
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50"
            >
              <Cog6ToothIcon className="w-5 h-5" />
              Settings
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-center text-sm text-blue-500 font-semibold">
              NEWS ON THE GO
            </h2>

            <h1 className="text-center text-2xl font-bold mt-2">
              Latest News & Updates
            </h1>

            <p className="text-center text-gray-500 mt-2 mb-8">
              Live News Feed with Real-Time Updates
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {news.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  {(item.image_url || item.urlToImage || item.image) && (
                    <img
                      src={item.image_url || item.urlToImage || item.image}
                      alt="news"
                      className="h-40 w-full object-cover"
                    />
                  )}

                  <div className="p-4">
                    {/* Source Badge */}
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {item.source || "News"}
                    </span>

                    <h3 className="font-semibold text-lg mt-3 mb-2">
                      {item.title?.slice(0, 55)}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4">
                      {(item.description || item.content)?.slice(0, 90)}
                    </p>

                    <a
                      href={item.link || item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
