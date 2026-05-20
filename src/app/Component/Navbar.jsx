"use client";

import Link from "next/link";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { User, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setShowDropdown(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl text-[#1E3C5C]"
            >
              ☰
            </button>

            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] bg-clip-text text-transparent tracking-tight">
              RideNest
            </h1>
          </div>

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

          <div className="relative">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <p className="hidden md:block font-semibold text-[#1E3C5C]">
                  {session.user.name}
                </p>
                <img 
                  src={session.user.image || "https://placehold.co/100?text=User"}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover border cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                

                {showDropdown && (
                  <div className="absolute top-12 right-0 w-48 bg-[#1A2142] border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                    <Link
                      href="/add-car"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      <User size={16} /> Add Car
                    </Link>
                    <Link
                      href="/my-bookings"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors border-b border-white/5"
                    >
                      <Settings size={16} /> My Bookings
                    </Link>
                    <Link
                      href="/my-cars"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      <User size={16} /> My Added Cars
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="px-8 py-2 rounded-full bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] text-white text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg transition duration-300">
                <Link href="/login">Login</Link>
              </button>
            )}
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-5">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  className="block font-medium text-gray-700 hover:text-[#2A6F8F]"
                  href="/"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block font-medium text-gray-700 hover:text-[#2A6F8F]"
                  href="/explore-cars"
                  onClick={() => setOpen(false)}
                >
                  Explore Cars
                </Link>
              </li>
              <li>
                <Link
                  className="block font-medium text-gray-700 hover:text-[#2A6F8F]"
                  href="/add-car"
                  onClick={() => setOpen(false)}
                >
                  Add Car
                </Link>
              </li>
              <li>
                <Link
                  className="block font-medium text-gray-700 hover:text-[#2A6F8F]"
                  href="/my-bookings"
                  onClick={() => setOpen(false)}
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