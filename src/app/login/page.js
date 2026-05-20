"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // HANDLE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    // PASSWORD VALIDATION
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      console.log(formData);

      alert("Login Successful 🚀");

      // RESET FORM
      setFormData({
        email: "",
        password: "",
      });

    } catch (error) {
      console.log(error);
      setError("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        {/* TITLE */}
        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold text-[#1E3C5C]">
            Welcome Back
          </h1>

          <p className="text-gray-600 mt-2">
            Login to your RideNest account
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Email
            </label>

            <input
             type="email"
             name="email"
             placeholder="example@gmail.com"
             value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-xl
             bg-white text-black placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
           />
          </div>

          {/* PASSWORD */}
          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>

              <input
            type="password"
             name="password"
            placeholder="Example@123"
            value={formData.password}
            onChange={handleChange}
             required
                className="w-full p-3 border border-gray-300 rounded-xl
                 bg-white text-black placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
            />

          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-600 font-medium">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F]
            hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

        {/* REGISTER */}
        <p className="text-center text-gray-600 mt-6">

          Don&apos;t have an account?{" "}

          <Link
            href="/register"
            className="text-[#2A6F8F] font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>
    </div>
  );
}