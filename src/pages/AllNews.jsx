import React, { useEffect, useState } from "react";
import instance from "../instances/instances";
import Navbar from "../components/Navbar";

const AllNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchAllNews();
  }, []);

  const fetchAllNews = async () => {
    try {
      const res = await instance.get("/news/all");
      setNews(res.data.news);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">All News</h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden"
            >
              {item.image && (
                <img src={item.image} className="h-40 w-full object-cover" />
              )}

              <div className="p-4">
                <h2 className="font-semibold text-lg">
                  {item.title?.slice(0, 60)}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {item.description?.slice(0, 80)}
                </p>

                <a
                  href={item.link}
                  target="_blank"           
                  className="text-blue-600 text-sm mt-3 inline-block"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllNews;
