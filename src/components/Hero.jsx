import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaBolt, FaGlobe, FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";

import img1 from "../assets/news1.png";
import img2 from "../assets/news2.jpg";
import img3 from "../assets/news3.jpg";

const Home = () => {
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const isAuthenticated = !!(user?._id || user?.id || user?.email);
  const images = [img1, img2, img3];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleExploreNews = () => {
    if (isAuthenticated) {
      navigate("/myfeed");
    } else {
      toast.info("Please login first to explore news");
      navigate("/login");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* HERO SECTION */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center"
      >
        {/* LEFT */}
        <motion.div variants={item}>
          <span className="text-red-500 font-semibold">
            Real-Time News Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-3 leading-tight">
            Stay Ahead with <span className="text-blue-600">Live News</span>
          </h1>

          <p className="text-gray-600 mt-4">
            Get breaking updates, personalized feeds, and global news in
            real-time. No delays. No noise. Just pure news.
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleGetStarted}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
            </button>

            <button
              onClick={handleExploreNews}
              className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
            >
              Explore News
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div variants={item}>
          <div className="relative w-full max-w-md h-[420px] overflow-hidden rounded-3xl shadow-2xl">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="News"
                className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ${
                  currentImage === index
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-110"
                }`}
              />
            ))}

            <div className="absolute inset-0 bg-black/20"></div>

            <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-xl text-sm font-semibold shadow">
              Live News
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <FaBolt className="text-blue-600 text-2xl" />
          <h3 className="font-bold mt-3">Real-Time Updates</h3>
          <p className="text-gray-500 text-sm mt-2">
            Instant breaking news updates from trusted sources.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <FaGlobe className="text-green-600 text-2xl" />
          <h3 className="font-bold mt-3">Global Coverage</h3>
          <p className="text-gray-500 text-sm mt-2">
            News from politics, sports, tech, entertainment & more.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <FaBell className="text-red-500 text-2xl" />
          <h3 className="font-bold mt-3">Smart Alerts</h3>
          <p className="text-gray-500 text-sm mt-2">
            Get notifications based on your interests.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="text-center py-16 bg-blue-500 text-white mt-10">
        <h2 className="text-3xl font-bold">
          Start Your Real-Time News Experience
        </h2>

        <p className="mt-2 text-sm opacity-90">
          Join thousands of users staying updated every second
        </p>

        <button
          onClick={() =>
            isAuthenticated ? navigate("/dashboard") : navigate("/login")
          }
          className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl"
        >
          Join Now
        </button>
      </section>
    </div>
  );
};

export default Home;
