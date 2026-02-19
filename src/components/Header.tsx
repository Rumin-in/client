"use client";
import React, { useState } from "react";
import { ChevronDown, Menu, X, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const DEFAULT_AVATAR = "https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg";

const Header: React.FC = () => {
  const [upcomingOpen, setUpcomingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* === Logo === */}
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <img
            src="/rumin-logo.png"
            alt="Rumin Logo"
            width={150}
            height={45}
            className="cursor-pointer"
          />
        </button>

        {/* === Desktop Navigation === */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
          <a href="/" className="hover:text-blue-600 transition-colors">
            HOME
          </a>
          <a href="/hostels" className="hover:text-blue-600 transition-colors">
            HOSTELS & PG
          </a>
          <a href="/about" className="hover:text-blue-600 transition-colors">
            ABOUT US
          </a>

          {/* === Upcoming Dropdown === */}
          <div className="relative">
            <button
              onClick={() => setUpcomingOpen(!upcomingOpen)}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              UPCOMING <ChevronDown size={16} />
            </button>
            {upcomingOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                {["Student Furniture", "PG", "Co-living Spaces"].map((item) => (
                  <span
                    key={item}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-default"
                  >
                    {item} <span className="text-xs text-blue-500">(Coming Soon)</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* === Right Side (Desktop) === */}
        <div className="hidden md:flex items-center gap-4">
          {/* Bookmarks */}
          {user && (
            <button
              onClick={() => navigate("/bookmarks")}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition"
              title="My Bookmarks"
            >
              <Bookmark className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Bookmarks</span>
            </button>
          )}

          {/* User / Auth */}
     {user ? (
  <div
    onClick={() => navigate("/profile")}
    className="flex items-center space-x-3 bg-white px-3 py-2 rounded-full shadow-md cursor-pointer hover:opacity-90 transition"
  >
    <img
      src={user.profilePicture || DEFAULT_AVATAR}
      alt="profile"
      className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
    />
    <div className="flex flex-col text-left">
      <span className="text-blue-600 font-semibold text-sm leading-none">
        {user.name}
      </span>
      <span className="text-gray-600 text-xs leading-none">
        {user.email}
      </span>
    </div>
  </div>
) : (
  <button
    onClick={() => navigate("/signin")}
    className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors text-sm font-medium"
  >
    LOGIN / SIGNUP
  </button>
)}

        </div>

        {/* === Mobile Menu Button === */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* === Mobile Menu === */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col gap-2 p-4 text-gray-800 text-sm font-medium">
            <a href="/" className="hover:text-blue-600">
              HOME
            </a>
            <a href="/hostels" className="hover:text-blue-600">
              HOSTELS & PG
            </a>
            <a href="/about" className="hover:text-blue-600">
              ABOUT US
            </a>

            {/* Upcoming Dropdown */}
            <button
              onClick={() => setUpcomingOpen(!upcomingOpen)}
              className="flex items-center justify-between py-2"
            >
              UPCOMING <ChevronDown size={16} />
            </button>
            {upcomingOpen && (
              <div className="pl-4 flex flex-col gap-2 text-gray-600">
                {["Student Furniture", "PG", "Co-living Spaces"].map((item) => (
                  <span key={item} className="text-gray-500">
                    {item} <span className="text-xs text-blue-500">(Coming Soon)</span>
                  </span>
                ))}
              </div>
            )}

            {/* Auth Section */}
            {user ? (
              <div className="flex flex-col gap-2 mt-3">
                {/* Bookmark Link */}
                <button
                  onClick={() => {
                    navigate("/bookmarks");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 py-2 hover:text-blue-600"
                >
                  <Bookmark className="w-5 h-5" />
                  My Bookmarks
                </button>

                {/* User Info */}
                <div
                  onClick={() => {
                    navigate("/profile");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 mt-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <img
                    src={user.profilePicture || DEFAULT_AVATAR}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-blue-600 font-semibold text-sm">
                      {user.name}
                    </span>
                    <span className="text-gray-600 text-xs">{user.email}</span>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="mt-4 px-4 py-2 border-2 rounded-full text-sm font-medium w-full hover:bg-blue-500 hover:text-white transition"
              >
                LOGIN / SIGNUP
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
