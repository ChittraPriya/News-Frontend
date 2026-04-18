import React from "react";
import news from "../assets/news.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Hero = () => {
  const navigate = useNavigate();

  const handleExplore = ({ user }) => {
    if (!user) {
      toast.info("Please login to explore news");
      navigate("/login");
      return;
    }
  };
  return (
    <section className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-6 grid md:grid-cols-2 gap-6 items-center">
        {/* LEFT CONTENT */}
        <div>
          {/* Breaking Tag */}
          <span className="text-red-500 font-semibold text-sm">
            Breaking News
          </span>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 leading-tight">
            Stay Updated with{" "}
            <span className="text-blue-600">Real-Time News</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 mt-3 text-sm md:text-base">
            Get the latest trending news, breaking updates, and personalized
            stories based on your interests — all in one place.
          </p>

          {/* Buttons */}
          <div className="mt-5 flex gap-3">
            <button
              onClick={handleExplore}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Explore News
            </button>

            <button className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              Latest Updates
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="inline-block">
          <img src={news} alt="News" className="block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
