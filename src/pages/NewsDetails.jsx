import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../instances/instances";
import Navbar from "../components/Navbar";

import logo1 from "../assets/logos/bbc.png";
import logo2 from "../assets/logos/theHindu.png";
import logo3 from "../assets/logos/ndtv.jpg";
import logo4 from "../assets/logos/Forbes.jpg";
import logo5 from "../assets/logos/CNBC.jpg";
import logo6 from "../assets/logos/TechCrunch.jpg";
import logo7 from "../assets/logos/apple.jpg";

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const backPage = location.state?.from || "/dashboard";

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await instance.get(`/news/${id}`);
      setNews(res.data.news);
    } catch (err) {
      console.log(err);
    }
  };

  if (!news)
    return (
      <div>
        <Navbar />
        <h1 className="text-center mt-20 text-xl font-semibold">
          Loading...
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(backPage)}
          className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          ← Back
        </button>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* IMAGE */}
          {news?.image ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${news.image}`}
              alt={news.title}
              className="w-full h-[420px] object-cover"
            />
          ) : (
            <div className="w-full h-[420px] bg-gray-200 flex items-center justify-center">
              No Image Available
            </div>
          )}

          {/* CONTENT */}
          <div className="p-8">
            {/* CATEGORY */}
            <span className="inline-block bg-blue-100 text-blue-700 text-sm px-4 py-1 rounded-full font-medium mb-4 capitalize">
              {news.category}
            </span>

            {/* TITLE */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {news.title}
            </h1>

            {/* META */}
            <div className="flex gap-6 mt-4 text-sm text-gray-500">
              <span>
                {new Date(news.createdAt).toLocaleDateString()}
              </span>
              <span>Breaking News</span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 text-lg text-gray-700 leading-8">
              {news.description}
            </p>
          </div>
        </div>

        {/* SOURCES */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">
            Coverage From Other Sources
          </h2>

          <div className="grid gap-5">
            <Channel logo={logo1} text={news.desc1} name="BBC" />
            <Channel logo={logo2} text={news.desc2} name="The Hindu" />
            <Channel logo={logo3} text={news.desc3} name="NDTV" />
            <Channel logo={logo4} text={news.desc4} name="Forbes" />
            <Channel logo={logo5} text={news.desc5} name="CNBC" />
            <Channel logo={logo6} text={news.desc6} name="TechCrunch" />
            <Channel logo={logo7} text={news.desc7} name="Apple" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Channel = ({ logo, text, name }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 border overflow-hidden flex items-center justify-center">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>

        <h3 className="text-xl font-bold text-gray-800">
          {name}
        </h3>
      </div>

      <p className="text-gray-600 leading-7">
        {text || "No coverage available"}
      </p>
    </div>
  );
};

export default NewsDetails;