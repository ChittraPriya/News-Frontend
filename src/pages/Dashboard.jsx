import Navbar from "../components/Navbar";
import UserSidebar from "../components/UserSidebar";
import { useEffect, useState } from "react";
import instance from "../instances/instances";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [news, setNews] = useState([]);

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

      {/* BODY AREA */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <UserSidebar />

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
                  {item.image && (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                      alt="news"
                      className="h-40 w-full object-cover"
                    />
                  )}

                  <div className="p-4">
                    {/* Source Badge */}
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.source === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.source || "News"}
                    </span>

                    <h3 className="font-semibold text-lg mt-3 mb-2">
                      {item.title?.slice(0, 55)}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4">
                      {(item.description || item.content)?.slice(0, 90)}
                    </p>

                    <Link
                      to={`/news/${item._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Read More
                    </Link>
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
