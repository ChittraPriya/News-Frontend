import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import instance from "../instances/instances";
import { Link, useNavigate } from "react-router-dom";

const MyFeed = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [filteredNews, setFilteredNews] = useState([]);
  const navigate = useNavigate();

  const fetchAllNews = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/news/all");
      setNews(res.data.news || []);
      setFilteredNews(res.data.news || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsByPreferences = async (preferences) => {
    try {
      setLoading(true);

      const res = await instance.get("/dashboard", {
        params: {
          category: preferences.join(","),
        },
      });

      setNews(res.data.news || []);
      setFilteredNews(res.data.news || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.preferences?.length > 0) {
      fetchNewsByPreferences(user.preferences);
    } else {
      fetchAllNews();
    }
  }, []);

  const handleSearch = () => {
    let result = [...news];

    if (search) {
      result = result.filter((item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      result = result.filter(
        (item) =>
          item.category?.toLowerCase().trim() === category.toLowerCase().trim(),
      );
    }

    if (sort === "latest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    setFilteredNews(result);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setSort("latest");
    setFilteredNews(news);
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);

    const diffMs = now - past;

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-3xl shadow-xl p-4">
        <marquee className="bg-red-500 text-white py-2 px-4">
          {news
            .slice(0, 5)
            .map((item) => item.title)
            .join(" | ")}
        </marquee>

        <div className="p-6">
          {loading && (
            <p className="text-center text-blue-600 mb-4">Loading news...</p>
          )}

          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-3 rounded-lg md:col-span-2"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 rounded-lg"
            >
              <option value="All">All</option>
              <option value="technology">Technology</option>
              <option value="sports">Sports</option>
              <option value="business">Business</option>
              <option value="politics">Politics</option>
              <option value="health">Health</option>
              <option value="entertainment ">Entertainment</option>
              <option value="world">World</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border p-3 rounded-lg"
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 rounded-lg"
              >
                Search
              </button>

              <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-4 rounded-lg"
              >
                Reset
              </button>
            </div>
          </div>

          {!loading && filteredNews.length === 0 && (
            <p className="text-center text-gray-500">No news found</p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNews.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                {item.image && (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                    alt="news"
                    className="h-40 w-full object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="font-semibold mb-2">
                    {item.title?.slice(0, 60)}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    {(item.description || item.content)?.slice(0, 90)}
                  </p>
                  {/* TIME */}

                  <p className="text-xs text-gray-400 mb-3">
                    {getTimeAgo(item.createdAt)}
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

        <div className="flex justify-center mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyFeed;
