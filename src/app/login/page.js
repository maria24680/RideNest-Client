"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        toast.error(res.error.message || "Login failed");
        return;
      }

      toast.success("Welcome to RideNest");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      toast.info("Welcome to RideNest...");
      await authClient.signIn.social({
        provider: "google",
        

      });
    } catch (err) {
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#edf6fb] to-[#d7ebf5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        <ToastContainer position="top-right" autoClose={2000} />
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] bg-clip-text text-transparent tracking-tight">
          RIDENEST
        </h1>

        <p className="text-sm sm:text-base text-center text-gray-600 mt-3 mb-8">
          Rent your dream car anytime, anywhere 🚗
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Example@123"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#2A6F8F]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

         <button
  type="submit"
  disabled={loading}
  className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] hover:opacity-90 transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Logging in...
    </>
  ) : (
    "Login"
  )}
</button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogle}
          type="button"
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dependency-focus transition duration-200"
        >
          <Image
          width={40}
          height={40}
            className="w-4 h-auto" 
            src="https://www.svgrepo.com/show/475656/google-color.svg" 
            alt="Google Logo" 
          />
          Sign in with Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#1E3C5C] hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}