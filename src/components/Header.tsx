"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [roomOpen, setRoomOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="container mx-auto px-6 flex justify-between items-center ">
        {/* Logo */}
        <button onClick={()=>{navigate("/")}} className="flex items-center gap-2 cursor-pointer">
          <img
            src="/rumin-logo.png"
            alt="Rumin Logo"
            width={120}
            height={40}
            className="cursor-pointer"
          />
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
          <a href="#" className="hover:text-blue-600">
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
                  City Apartments
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Beach Houses
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Mountain Cabins
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              🌐 ENGLISH <ChevronDown size={16} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-32">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  English
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Hindi
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Spanish
                </a>
              </div>
            )}
          </div>

          <a href="#" className="hover:text-blue-600">
            LOGIN / SIGNUP
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
