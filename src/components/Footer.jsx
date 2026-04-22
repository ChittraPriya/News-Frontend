import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { HomeIcon, UserIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-16 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white overflow-hidden">
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* MAIN */}
      <div className="relative max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 rounded-xl shadow-lg border border-white/20"
            />

            <h2 className="text-2xl font-bold tracking-wide">Daily Express</h2>
          </div>

          <p className="text-gray-300 leading-7 text-sm">
            Delivering fast, accurate, and unbiased global news with a
            next-generation real-time digital experience.
          </p>

          {/* Newsletter */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">
              Subscribe for Breaking News
            </p>
            <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-sm font-medium transition w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

          <ul className="space-y-4 text-gray-300">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <HomeIcon className="w-5 h-5 text-blue-400" />
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <UserIcon className="w-5 h-5 text-green-400" />
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT + SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold mb-5">Contact</h3>

          <p className="text-gray-300 text-sm mb-2">info@dailyexpress.com</p>

          <p className="text-gray-300 text-sm mb-6">support@dailyexpress.com</p>

          <h4 className="font-semibold mb-3">Follow Us</h4>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-500 flex items-center justify-center transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center transition"
            >
              <FaYoutube />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-500 flex items-center justify-center transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative border-t border-white/10 text-center py-5 text-sm text-gray-300">
        © {new Date().getFullYear()} Daily Express. Crafted for the future of
        news.
      </div>
    </footer>
  );
};

export default Footer;
