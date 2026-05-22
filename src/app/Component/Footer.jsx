"use client";
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Contact Info Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradien-to-r from-[#2A6F8F] to-[#1E5A7A] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h2 className="text-2xl font-extrabold bg-gradien-to-r from-white to-gray-400 bg-clip-text text-transparent">
                RideNest
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted car rental platform across Bangladesh. Book with confidence and drive with comfort.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3 text-sm">
                <MdPhone className="text-[#2A6F8F] text-lg flex-shrin-0" />
                <span className="text-gray-400 hover:text-white transition">+880 1700 000000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MdEmail className="text-[#2A6F8F] text-lg flex-shrin-0" />
                <span className="text-gray-400 hover:text-white transition">info@ridenest.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MdLocationOn className="text-[#2A6F8F] text-lg flex-shrin-0" />
                <span className="text-gray-400">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <BiTime className="text-[#2A6F8F] text-lg flex-shrin-0" />
                <span className="text-gray-400">24/7 Customer Support</span>
              </div>
            </div>
          </div>

          {/* Useful Links Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Useful Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#2A6F8F] rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#2A6F8F] transition-all"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore-cars" className="text-gray-400 hover:text-white transition text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#2A6F8F] transition-all"></span>
                  Explore Cars
                </Link>
              </li>
              <li>
                <Link href="/add-car" className="text-gray-400 hover:text-white transition text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#2A6F8F] transition-all"></span>
                  Add Your Car
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="text-gray-400 hover:text-white transition text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#2A6F8F] transition-all"></span>
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Account
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#2A6F8F] rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white transition text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#2A6F8F] transition-all"></span>
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-white transition text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#2A6F8F] transition-all"></span>
                  Register
                </Link>
              </li>
              <li>
                <Link href="/my-profile" className="text-gray-400 hover:text-white transition text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#2A6F8F] transition-all"></span>
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/my-added-cars" className="text-gray-400 hover:text-white transition text-sm flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#2A6F8F] transition-all"></span>
                  My Added Cars
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Newsletter & Social Links Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Stay Connected
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#2A6F8F] rounded-full"></span>
            </h3>
            
            {/* Social Media Icons */}
            <div className="flex gap-4 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#2A6F8F] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#2A6F8F] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaTwitter size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#2A6F8F] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#2A6F8F] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#2A6F8F] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaYoutube size={18} />
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-3">
                Subscribe to get special offers, new car alerts, and exclusive deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#2A6F8F] transition"
                />
                <button className="px-4 py-2 bg-[#2A6F8F] text-white text-sm font-semibold rounded-lg hover:bg-[#1E5A7A] transition cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">Secure Payments</p>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">VISA</span>
                </div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">MC</span>
                </div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">AMEX</span>
                </div>
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">bkash</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} RideNest. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-white transition">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;