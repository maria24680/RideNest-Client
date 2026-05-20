"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const res = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (res.error) {
        setError(res.error.message || "Login failed");
        return;
      }

      alert("Login Successful 🚀");

      window.location.href = "/";

    } catch (err) {

      console.log(err);
      setError("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf6fb] to-[#d7ebf5] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8">

        {/* LOGO */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] bg-clip-text text-transparent tracking-tight">
          RIDENEST
        </h1>

        {/* SUBTITLE */}
        <p className="text-sm sm:text-base text-center text-gray-600 mt-3 mb-8">
          Rent your dream car anytime, anywhere 🚗
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
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
              className="w-full p-3 border border-gray-300 rounded-xl
              bg-white text-black placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
            />

          </div>

          {/* PASSWORD */}
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
                className="w-full p-3 border border-gray-300 rounded-xl
                bg-white text-black placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
              />

              {/* SHOW/HIDE */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2
                text-sm font-medium text-[#2A6F8F]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm font-medium">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F]
            hover:opacity-90 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* REGISTER */}
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