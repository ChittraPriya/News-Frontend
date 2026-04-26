import React, { useState } from "react";
import login from "../assets/login.png";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import instance from "../instances/instances";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const response = await instance.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        const user = response.data.user;

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login Successful");

        if (user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters");
          return;
        }

        await registerUser(formData);

        toast.success("Registered Successfully. Please Login");

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        setIsLogin(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9fb1e0] px-4 py-8 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-red-500 rounded-full blur-[120px] opacity-30 left-0 top-0"></div>

      {/* Main Card */}
      <div className="w-full max-w-5xl min-h-[620px] md:min-h-[520px] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white z-10">
        
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 relative h-64 md:h-auto">
          <img
            src={login}
            alt="News Background"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-Playfair">
              DAILY EXPRESS
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-200">
              Stay Updated With The World
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              {isLogin
                ? "Login to continue your real-time news journey"
                : "Join now and stay updated every second"}
            </p>
          </div>

          {/* Username */}
          {!isLogin && (
            <div className="relative mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full p-3 bg-transparent border border-black/40 rounded-md focus:outline-none focus:border-purple-400"
              />
              <label className="absolute left-3 top-3 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
                Username
              </label>
            </div>
          )}

          {/* Email */}
          <div className="relative mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="peer w-full p-3 bg-transparent border border-black/40 rounded-md focus:outline-none focus:border-purple-400"
            />
            <label className="absolute left-3 top-3 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
              Your Email
            </label>
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="peer w-full p-3 bg-transparent border border-black/40 rounded-md focus:outline-none focus:border-purple-400"
            />
            <label className="absolute left-3 top-3 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-valid:-top-2 peer-valid:text-xs bg-white px-1">
              Password
            </label>
          </div>

          {/* Remember */}
          {isLogin && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-black mb-4">
              <label>
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>

              <span className="hover:text-blue-500 cursor-pointer">
                Forgot password?
              </span>
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="bg-[#4338ca] text-white py-3 rounded-md hover:bg-[#3730a3] transition duration-300"
          >
            {isLogin ? "Login Now" : "Create Account"}
          </button>

          {/* Switch */}
          <p className="text-sm text-center mt-5 text-black">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;