"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
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

  // HANDLE REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    // PASSWORD VALIDATION
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (!/[A-Z]/.test(formData.password)) {
      return setError(
        "Password must contain one uppercase letter"
      );
    }

    if (!/[!@#$%^&*]/.test(formData.password)) {
      return setError(
        "Password must contain one special character"
      );
    }

    try {
      console.log(formData);

      alert("Registration Successful 🚀");

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        photo: "",
        password: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

        {/* TITLE */}
        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold text-[#1E3C5C]">
            Create Account
          </h1>

          <p className="text-gray-600 mt-2">
            Register to access RideNest
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

       {/* NAME */}
<div>

  <label className="block mb-2 font-semibold text-gray-700">
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
    bg-white text-black placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-[#2A6F8F]"
  />

</div>

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

{/* PHOTO URL */}
<div>

  <label className="block mb-2 font-semibold text-gray-700">
    Photo URL
  </label>

  <input
    type="text"
    name="photo"
    placeholder="https://i.ibb.co/example.jpg"
    value={formData.photo}
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
            Register
          </button>

        </form>

        {/* LOGIN */}
        <p className="text-center text-gray-600 mt-6">

          Already have an account?{" "}

          <Link
            href="/login"
            className="text-[#2A6F8F] font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}