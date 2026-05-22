"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import {
  User,
  Settings,
  LogOut,
  Car,
  PlusCircle,
  Calendar,
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
    `font-medium transition ${
      pathname === path
        ? "text-[#2A6F8F] border-b-2 border-[#2A6F8F] pb-1"
        : "text-gray-700 hover:text-[#2A6F8F]"
    }`;

  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="flex items-center justify-between py-4">
          
          <div className="flex items-center gap-4">
            
            <button
              onClick={() =>
                setOpen(!open)
              }
              className="md:hidden text-2xl text-[#1E3C5C] cursor-pointer"
            >
              ☰
            </button>

            <Link href="/">
              <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] bg-clip-text text-transparent tracking-tight">
                RideNest
              </h1>
            </Link>
          </div>

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

          <div className="relative">
            
            {session?.user ? (
              <div className="flex items-center gap-3">
                
                <p className="hidden md:block font-semibold text-[#1E3C5C]">
                  {session.user.name}
                </p>

                <Image
                height={40}
                width={40}
                  src={
                    session.user.image ||
                    "https://placehold.co/100?text=User"
                  }
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover border cursor-pointer"
                  onClick={() =>
                    setShowDropdown(
                      !showDropdown
                    )
                  }
                />
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
                      className="flex items-center gap-3 px-5 py-3 text-black hover:bg-gray-50 transition"
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
                      className="flex items-center gap-3 px-5 py-3 text-black hover:bg-gray-50 transition"
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
                      className="flex items-center gap-3 px-5 py-3 text-black hover:bg-gray-50 transition"
                    >
                      <Car size={18} />
                      My Cars
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-blue-900 hover:bg-red-50 transition cursor-pointer"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                )}
                
              </div>
            ) : (
              <Link href="/login" className="hidden md:block">
                <button className="px-8 py-2 rounded-full bg-gradient-to-r from-[#1E3C5C] to-[#2A6F8F] text-white text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg transition duration-300 cursor-pointer">
                  Login/Register
                </button>
              </Link>
            )}
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-5">
            
            <ul className="flex flex-col gap-4">
              
              <li>
                <Link
                  className={navLinkClass(
                    "/"
                  )}
                  href="/"
                  onClick={() =>
                    setOpen(false)
                  }
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
                  onClick={() =>
                    setOpen(false)
                  }
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
                      onClick={() =>
                        setOpen(false)
                      }
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
                      onClick={() =>
                        setOpen(false)
                      }
                    >
                      My Bookings
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={navLinkClass(
                        "/my-cars"
                      )}
                      href="/my-cars"
                      onClick={() =>
                        setOpen(false)
                      }
                    >
                      My Cars
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={
                        handleLogout
                      }
                      className="block font-medium text-red-400 cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

              {!session?.user && (
                <li>
                  <Link
                    className="block font-medium text-[#2A6F8F]"
                    href="/login"
                    onClick={() =>
                      setOpen(false)
                    }
                  >
                    Login/Register
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