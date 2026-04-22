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
        // LOGIN API
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
        // REGISTER
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
      console.log(error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9fb1e0] text-black relative overflow-hidden">
      {/* GLOW CIRCLE */}
      <div className="absolute w-[400px] h-[400px] bg-red-500 rounded-full blur-[120px] opacity-30 left-20 top-20"></div>

      {/* CARD */}
      <div className="w-[900px] h-[520px] flex rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl z-10">
        {/* LEFT SIDE */}
        <div className="w-1/2 relative overflow-hidden">
          {/* Background Image */}
          <img
            src={login}
            alt="News Background"
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
            <h1 className="text-5xl font-bold mb-4 font-Playfair">
              DAILY EXPRESS
            </h1>

            <p className="text-lg text-gray-200">Stay Updated With The World</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-black/10 backdrop-blur-md">
        <div className="text-center mb-2">
    <h2 className="text-3xl font-bold text-gray-900">
      {isLogin ? "Welcome Back" : "Create Account"}
    </h2>

    <p className="text-gray-500 text-sm mt-2">
      {isLogin
        ? "Login to continue your real-time news journey"
        : "Join now and stay updated every second"}
    </p>
  </div>

          {/* INPUTS */}
          {!isLogin && (
            <div className="relative mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full p-3 bg-transparent border border-black/40 rounded-md focus:outline-none focus:border-purple-400 focus:shadow-[0_0_12px_#a855f7]"
              />
              <label className="absolute left-3 top-3 text-black text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-valid:-top-2 peer-valid:text-xs">
                Username
              </label>
            </div>
          )}

          <div className="relative mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="peer w-full p-3 bg-transparent border border-black/40 rounded-md focus:outline-none"
            />
            <label className="absolute left-3 top-3 text-black text-sm transition-all peer-focus:-top-2 peer-focus:text-xs  peer-focus:text-black peer-valid:-top-2 peer-valid:text-xs ">
              Your Email
            </label>
          </div>

          <div className="relative mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="peer w-full p-3 bg-transparent border border-black/40 rounded-md focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_12px_#1e3a8a]"
            />
            <label className="absolute left-3 top-3 text-black text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black peer-valid:-top-2 peer-valid:text-xs">
              Password
            </label>
          </div>

          {/* REMEMBER */}
          {isLogin && (
            <div className="flex justify-between text-xs text-black mb-4">
              <label>
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>
              <span className="hover:text-blue-400 cursor-pointer">
                Forgot password?
              </span>
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="bg-[#4338ca] text-white py-2 rounded-md hover:bg-[#3730a3] transition duration-300 shadow-lg"
          >
            {isLogin ? "LOGIN" : "REGISTER"}
          </button>

          {/* SWITCH */}
          <p className="text-xs text-center mt-5 text-black">
            {isLogin ? "Create An Account ? " : "Already have account?"}
            <span
              className="text-white ml-2 cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create account" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
