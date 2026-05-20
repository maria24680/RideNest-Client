"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
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

  // REGISTER
  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    // PASSWORD VALIDATION
    if (formData.password.length < 6) {
      setLoading(false);
      return setError("Password must be at least 6 characters");
    }

    if (!/[A-Z]/.test(formData.password)) {
      setLoading(false);
      return setError("Password must contain one uppercase letter");
    }

    if (!/[!@#$%^&*]/.test(formData.password)) {
      setLoading(false);
      return setError("Password must contain one special character");
    }

    try {

      const res = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photo,
      });

      if (res.error) {
        setError(res.error.message || "Registration failed");
        return;
      }

      alert("Registration Successful 🚀");

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
          Create your account and start renting 🚗
        </p>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">

          {/* NAME */}
          <div>

            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl
              bg-white text-black placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
            />

          </div>

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

          {/* PHOTO URL */}
          <div>

            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Photo URL
            </label>

            <input
              type="text"
              name="photo"
              placeholder="https://i.ibb.co/example.jpg"
              value={formData.photo}
              onChange={handleChange}
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

              {/* SHOW / HIDE */}
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
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        {/* LOGIN */}
        <p className="text-center mt-6 text-sm text-gray-600">

          Already have an account?{" "}

          <Link
            href="/login"
            className="font-semibold text-[#1E3C5C] hover:underline"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}