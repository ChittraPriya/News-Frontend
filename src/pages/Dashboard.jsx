import Navbar from "../components/Navbar";
import UserSidebar from "../components/UserSidebar";
import { useEffect, useState } from "react";
import instance from "../instances/instances";
import { Link } from "react-router-dom";
import { HiOutlineHandRaised, HiOutlineSparkles } from "react-icons/hi2";
import { TbHandStop } from "react-icons/tb";

const Dashboard = () => {
  const [news, setNews] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchAllNews();

    const interval = setInterval(fetchAllNews, 10000);

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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* TOP NAVBAR */}
      <div className="h-16 bg-white shadow z-10">
        <Navbar />
      </div>

      {/* BODY AREA */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <UserSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto pb-16">
          {/*  WELCOME HEADER */}
          <div className="mb-6 bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-bold text-gray-800">
              <TbHandStop className="text-3xl animate-bounce" />
              Hello {user?.name || "User"}
            </h1>

            <p className="text-gray-500 mt-1">
              <HiOutlineSparkles className="text-yellow-500 text-xl" />
              Welcome back to your real-time news dashboard
            </p>
          </div>

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
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                        item.category === "sports"
                          ? "bg-green-100 text-green-700"
                          : item.category === "technology"
                            ? "bg-blue-100 text-blue-700"
                            : item.category === "business"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.category === "politics"
                                ? "bg-red-100 text-red-700"
                                : item.category === "health"
                                  ? "bg-pink-100 text-pink-700"
                                  : item.category === "entertainment"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.category || "News"}
                    </span>

                    <h3 className="font-semibold text-lg mt-3 mb-2">
                      {item.title?.slice(0, 55)}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4">
                      {(item.description || item.content)?.slice(0, 90)}
                    </p>

                    <Link
                      to={`/news/${item._id}`}
                      state={{ from: "/dashboard" }}
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
