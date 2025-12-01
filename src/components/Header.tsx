"use client";
import React, { useState } from "react";
import { ChevronDown, MoreVertical, Menu, X, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { logout as logoutAction } from "../store/authSlice";

const Header: React.FC = () => {
  const [roomOpen, setRoomOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [_langOpen, _setLangOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  // ✅ Logout logic
  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/signin");
  };

  // ✅ Handle location click
  const handleLocationClick = (location: string) => {
    setLocationOpen(false);
    navigate(`/rooms?location=${encodeURIComponent(location)}`);
  };

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
          <a href="#" className="hover:text-blue-600 transition-colors">
            FURNITURE
          </a>

          {/* === Room Dropdown === */}
          <div className="relative">
            <button
              onClick={() => setRoomOpen(!roomOpen)}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              ROOM <ChevronDown size={16} />
            </button>
            {roomOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50">
                {["Bedroom", "Living Room", "Kitchen"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* === Room by Location === */}
          <div className="relative">
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              ROOM BY LOCATION <ChevronDown size={16} />
            </button>
            {locationOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                {["Minal", "Lalghati", "Kolar", "Arera Colony", "MP Nagar"].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocationClick(loc)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    {loc}
                  </button>
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
  <div className="relative">
    <div className="flex items-center space-x-3 bg-white px-3 py-1 rounded-full shadow-md">
      {/* ✅ Profile click area */}
      <div
        onClick={() => navigate("/profile")}
        className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition"
      >
        <img
          src="https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg"
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

      {/* 3-dot dropdown trigger */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-1 rounded-full hover:bg-gray-100 transition"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
    </div>

    {/* Dropdown */}
    {isDropdownOpen && (
      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    )}
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
            <a href="#" className="hover:text-blue-600">
              FURNITURE
            </a>

            {/* Room Dropdown */}
            <button
              onClick={() => setRoomOpen(!roomOpen)}
              className="flex items-center justify-between py-2"
            >
              ROOM <ChevronDown size={16} />
            </button>
            {roomOpen && (
              <div className="pl-4 flex flex-col gap-2 text-gray-600">
                {["Bedroom", "Living Room", "Kitchen"].map((item) => (
                  <a key={item} href="#" className="hover:text-blue-600">
                    {item}
                  </a>
                ))}
              </div>
            )}

            {/* Room by Location */}
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center justify-between py-2"
            >
              ROOM BY LOCATION <ChevronDown size={16} />
            </button>
            {locationOpen && (
              <div className="pl-4 flex flex-col gap-2 text-gray-600">
                {["Minal", "Lalghati", "Kolar", "Arera Colony", "MP Nagar"].map(
                  (loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        handleLocationClick(loc);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left hover:text-blue-600"
                    >
                      {loc}
                    </button>
                  )
                )}
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
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src="https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg"
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-blue-600 font-semibold text-sm">
                      {user.name}
                    </span>
                    <span className="text-gray-600 text-xs">{user.email}</span>
                    <button
                      onClick={handleLogout}
                      className="mt-2 text-left text-red-500 hover:underline text-xs"
                    >
                      Logout
                    </button>
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
