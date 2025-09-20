"use client";
import React, { useState } from "react";
import { ChevronDown, MoreVertical, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { logout as logoutAction } from "../store/authSlice";

const Header: React.FC = () => {
  const [roomOpen, setRoomOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/rumin-logo.png"
            alt="Rumin Logo"
            width={120}
            height={40}
            className="cursor-pointer"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
          <a href="/" className="hover:text-blue-600">
            HOME
          </a>
          <a href="#" className="hover:text-blue-600">
            FURNITURE
          </a>

          {/* ROOM Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoomOpen(!roomOpen)}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              ROOM <ChevronDown size={16} />
            </button>
            {roomOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md py-2 w-40">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Bedroom
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Living Room
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Kitchen
                </a>
              </div>
            )}
          </div>

          {/* ROOM BY LOCATION Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              ROOM BY LOCATION <ChevronDown size={16} />
            </button>
            {locationOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md py-2 w-48">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Minal
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Lalghati
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Kolar
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Arera Colony
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  MP Nagar
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4 text-sm font-medium">
          {/* Language Dropdown (desktop only) */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              🌐 ENGLISH <ChevronDown size={16} />
            </button>
          </div>

          {/* Auth Section */}
          {user ? (
            <div className="relative hidden md:block">
              <div className="flex items-center space-x-3 bg-white pl-3 pr-4 py-1 rounded-full shadow-md">
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
                </div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="ml-1 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-[100]">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="hidden md:block px-4 py-2 cursor-pointer border-2 rounded-full transition-colors text-sm font-medium"
            >
              LOGIN / SIGNUP
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col gap-2 p-4 text-gray-800 text-sm font-medium">
            <a href="/" className="hover:text-blue-600">
              HOME
            </a>
            <a href="#" className="hover:text-blue-600">
              FURNITURE
            </a>

            {/* ROOM Dropdown */}
            <button
              onClick={() => setRoomOpen(!roomOpen)}
              className="flex items-center justify-between py-2"
            >
              ROOM <ChevronDown size={16} />
            </button>
            {roomOpen && (
              <div className="pl-4 flex flex-col gap-2 text-gray-600">
                <a href="#" className="hover:text-blue-600">
                  Bedroom
                </a>
                <a href="#" className="hover:text-blue-600">
                  Living Room
                </a>
                <a href="#" className="hover:text-blue-600">
                  Kitchen
                </a>
              </div>
            )}

            {/* ROOM BY LOCATION Dropdown */}
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center justify-between py-2"
            >
              ROOM BY LOCATION <ChevronDown size={16} />
            </button>
            {locationOpen && (
              <div className="pl-4 flex flex-col gap-2 text-gray-600">
                <a href="#" className="hover:text-blue-600">
                  Minal
                </a>
                <a href="#" className="hover:text-blue-600">
                  Lalghati
                </a>
                <a href="#" className="hover:text-blue-600">
                  Kolar
                </a>
                <a href="#" className="hover:text-blue-600">
                  Arera Colony
                </a>
                <a href="#" className="hover:text-blue-600">
                  MP Nagar
                </a>
              </div>
            )}

            {/* Language Dropdown */}
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center justify-between py-2"
            >
              🌐 ENGLISH <ChevronDown size={16} />
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3 mt-4">
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
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="mt-4 px-4 py-2 cursor-pointer border-2 rounded-full transition-colors text-sm font-medium w-full"
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
