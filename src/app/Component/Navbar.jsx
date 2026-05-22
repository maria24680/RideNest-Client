"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

import {
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Car,
  Calendar,
  PlusCircle,
} from "lucide-react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const [showDropdown, setShowDropdown] =
    useState(false);

  const [session, setSession] =
    useState(null);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      const { data } =
        await authClient.getSession();

      setSession(data);
    };

    getSession();
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setShowDropdown(false);

      router.push("/login");

      window.location.reload();
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
  };

  const navLinkClass = (path) =>
    `relative font-medium transition duration-300 ${
      pathname === path
        ? "text-[#2A6F8F]"
        : "text-gray-700 hover:text-[#2A6F8F]"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() =>
                setOpen(!open)
              }
              className="md:hidden text-[#1E3C5C]"
            >
              {open ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>

            {/* LOGO */}
            <Link href="/">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] bg-clip-text text-transparent tracking-tight cursor-pointer">
                RideNest
              </h1>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-8">

            <li>
              <Link
                className={navLinkClass("/")}
                href="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className={navLinkClass(
                  "/explore-cars"
                )}
                href="/explore-cars"
              >
                Explore Cars
              </Link>
            </li>

            {session?.user && (
              <>
                <li>
                  <Link
                    className={navLinkClass(
                      "/add-car"
                    )}
                    href="/add-car"
                  >
                    Add Car
                  </Link>
                </li>

                <li>
                  <Link
                    className={navLinkClass(
                      "/my-bookings"
                    )}
                    href="/my-bookings"
                  >
                    My Bookings
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* RIGHT */}
          <div className="relative">

            {session?.user ? (

              <div className="flex items-center gap-3">

                {/* USER NAME */}
                <p className="hidden md:block font-semibold text-[#1E3C5C]">
                  {session.user.name}
                </p>

                {/* USER IMAGE */}
                <Image
                  height={42}
                  width={42}
                  src={
                    session.user.image ||
                    "https://placehold.co/100"
                  }
                  alt="user"
                  onClick={() =>
                    setShowDropdown(
                      !showDropdown
                    )
                  }
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#2A6F8F] cursor-pointer hover:scale-105 transition"
                />

                {/* DROPDOWN */}
                {showDropdown && (
                  <div className="absolute top-14 right-0 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

                    <div className="px-5 py-4 border-b bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F]">
                      <p className="text-white font-semibold">
                        {session.user.name}
                      </p>

                      <p className="text-white/80 text-sm truncate">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/add-car"
                      onClick={() =>
                        setShowDropdown(
                          false
                        )
                      }
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
                    >
                      <PlusCircle size={18} />
                      Add Car
                    </Link>

                    <Link
                      href="/my-bookings"
                      onClick={() =>
                        setShowDropdown(
                          false
                        )
                      }
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
                    >
                      <Calendar size={18} />
                      My Bookings
                    </Link>

                    <Link
                      href="/my-cars"
                      onClick={() =>
                        setShowDropdown(
                          false
                        )
                      }
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
                    >
                      <Car size={18} />
                      My Cars
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-red-50 transition cursor-pointer"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                )}
              </div>

            ) : (

              <Link href="/login">
                <button className="px-7 py-3 rounded-full bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer">
                  Login/Register
                </button>
              </Link>

            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden pb-5 animate-in slide-in-from-top-2 duration-300">

            <ul className="flex flex-col gap-4 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">

              <li>
                <Link
                  href="/"
                  onClick={() =>
                    setOpen(false)
                  }
                  className={navLinkClass("/")}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/explore-cars"
                  onClick={() =>
                    setOpen(false)
                  }
                  className={navLinkClass(
                    "/explore-cars"
                  )}
                >
                  Explore Cars
                </Link>
              </li>

              {session?.user && (
                <>
                  <li>
                    <Link
                      href="/add-car"
                      onClick={() =>
                        setOpen(false)
                      }
                      className={navLinkClass(
                        "/add-car"
                      )}
                    >
                      Add Car
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/my-bookings"
                      onClick={() =>
                        setOpen(false)
                      }
                      className={navLinkClass(
                        "/my-bookings"
                      )}
                    >
                      My Bookings
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/my-cars"
                      onClick={() =>
                        setOpen(false)
                      }
                      className={navLinkClass(
                        "/my-cars"
                      )}
                    >
                      My Cars
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={
                        handleLogout
                      }
                      className="text-red-500 font-medium"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

              {!session?.user && (
                <li>
                  <Link
                    href="/login"
                    onClick={() =>
                      setOpen(false)
                    }
                    className="text-[#2A6F8F] font-semibold"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;