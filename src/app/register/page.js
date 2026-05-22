"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function RegisterPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    callbackURL: "/login",
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

      toast.success("Signup Successfully");
            setTimeout(() => {
              window.location.href = "/login";
            }, 1500);
          } catch (err) {
            toast.error(err?.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
        };
      

   const handleGoogle = async () => {
      try {
        toast.info("Signup Successfully...");
        await authClient.signIn.social({
          provider: "google",
        });
      } catch (err) {
        toast.error("Google login failed!");
      }
    };

  return (
    <div className="min-h-screen bg-gradien-to-br from-[#edf6fb] to-[#d7ebf5] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        <ToastContainer position="top-right" autoClose={2000} />
        {/* LOGO */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] bg-clip-text text-transparent tracking-tight">
          RIDENEST
        </h1>

        {/* SUBTITLE */}
        <p className="text-sm sm:text-base text-center text-gray-600 mt-3 mb-8">
          Create your account and start renting 
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
                text-sm font-medium text-[#2A6F8F] cursor-pointer"
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
  bg-gradien-to-r from-[#1E3C5C] to-[#2A6F8F]
  hover:opacity-90 transition duration-300
  disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Creating Account...
    </>
  ) : (
    "CREATE AN ACCOUNT"
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
          height={40}
          width={40}
            className="w-4 h-auto cursor-pointer" 
            src="https://www.svgrepo.com/show/475656/google-color.svg" 
            alt="Google Logo" 
          />
          Sign up with Google Profile
        </button>

        {/* LOGIN */}
        <p className="text-center mt-6 text-sm text-gray-600">

          Already have an account?{" "}

          <Link
            href="/login"
            className="font-semibold text-[#1E3C5C] hover:underline"
          >
            Sign In
          </Link>

        </p>

      </div>
    </div>
  );
}