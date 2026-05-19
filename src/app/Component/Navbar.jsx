// components/Navbar.jsx
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap py-5 gap-5">
          {/* Logo */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] bg-clip-text text-transparent tracking-tight">
              RideNest
            </h1>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
               <Link className="font-medium text-gray-700 hover:text-[#2A6F8F] transition" href={"/"}>Home</Link> 
            </li>
            <li>
               <Link className="font-medium text-gray-700 hover:text-[#2A6F8F] transition" href={"/explore-cars"}>Explore Cars</Link> 
            </li>
            <li>
               <Link className="font-medium text-gray-700 hover:text-[#2A6F8F] transition" href={"/add-car"}>Add Car</Link> 
            </li>
            <li>
               <Link className="font-medium text-gray-700 hover:text-[#2A6F8F] transition" href={"/my-bookings"}>My Bookings</Link> 
            </li>
            </ul>

          {/* Auth Buttons */}
          <div className="flex gap-3">
            <button className="px-5 py-2 text-sm font-semibold text-gray-700 hover:text-[#2A6F8F] transition">
              Login
            </button>
            <button className="px-5 py-2 text-sm font-semibold bg-[#2A6F8F] text-white rounded-full hover:bg-[#1E5A7A] transition shadow-sm">
              Register
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 text-xl">☰</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;