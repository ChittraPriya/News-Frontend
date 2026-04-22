import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { HomeIcon, UserIcon } from "@heroicons/react/24/solid";

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            {/* LOGO */}
            <img src={logo} alt="Logo" className="w-10 h-10" />

            <h2 className="text-xl font-bold">Daily Express</h2>
          </div>

          <p className="text-white text-sm leading-6">
            Delivering fast, accurate, and unbiased news from around the world
            with a real-time digital experience.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>

          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-2 hover:text-white">
              <HomeIcon className="w-4 h-4" />
              <Link to="/">Home</Link>
            </li>

            <li className="flex items-center gap-2 hover:text-white">
              <UserIcon className="w-4 h-4" />
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT + SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>

          <p className="text-gray-400 text-sm">info@dailyexpress.com</p>
          <p className="text-gray-400 text-sm mb-4">support@dailyexpress.com</p>

          <h4 className="text-md font-semibold mb-2">Follow Us</h4>

          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-500">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-red-500">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 text-center py-4 text-white text-sm">
        © {new Date().getFullYear()} Daily Express. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
