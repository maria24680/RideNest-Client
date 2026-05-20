"use client";

import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* TOP NAVBAR */}
        <div className="flex items-center justify-between py-4">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl text-[#1E3C5C]"
            >
              ☰
            </button>

            {/* LOGO */}
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] bg-clip-text text-transparent tracking-tight">
              RideNest
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link
                className="font-medium text-gray-700 hover:text-[#2A6F8F] transition"
                href="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className="font-medium text-gray-700 hover:text-[#2A6F8F] transition"
                href="/explore-cars"
              >
                Explore Cars
              </Link>
            </li>

            <li>
              <Link
                className="font-medium text-gray-700 hover:text-[#2A6F8F] transition"
                href="/add-car"
              >
                Add Car
              </Link>
            </li>

            <li>
              <Link
                className="font-medium text-gray-700 hover:text-[#2A6F8F] transition"
                href="/my-bookings"
              >
                My Bookings
              </Link>
            </li>
          </ul>

          {/* LOGIN BUTTON */}
          <div>
            <button className="px-8 py-2 rounded-full bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] text-white text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg transition duration-300">
              <Link href="/login">
  Login
</Link>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden pb-5">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  className="block font-medium text-gray-700 hover:text-[#2A6F8F]"
                  href="/"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className="block font-medium text-gray-700 hover:text-[#2A6F8F]"
                  href="/explore-cars"
                >
                  Explore Cars
                </Link>
              </li>

              <li>
                <Link
                  className="block font-medium text-gray-700 hover:text-[#2A6F8F]"
                  href="/add-car"
                >
                  Add Car
                </Link>
              </li>

              <li>
                <Link
                  className="block font-medium text-gray-700 hover:text-[#2A6F8F]"
                  href="/my-bookings"
                >
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;