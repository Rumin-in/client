import { Search, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { logout as logoutAction } from "../store/authSlice";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#89B4DB] to-[#0085FE] overflow-x-hidden rounded-lg">
      <header className="flex justify-between items-center w-full absolute top-0 left-0 z-20 px-4 md:px-6 py-3 md:py-6">
        <div className="flex items-center">
          <img src="/rumin-logo.png" alt="logo" className="w-32 h-auto md:w-36" />
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-white text-lg">
          <a href="/" className="hover:text-gray-200 transition-colors">Home</a>
          <a href="/rooms" className="hover:text-gray-200 transition-colors">Room</a>
          <a href="#" className="hover:text-gray-200 transition-colors">Student Furniture</a>
        </nav>

        <div className="flex items-center space-x-2 md:space-x-3 pl-4 md:pl-8">
          {user ? (
            <div className="relative">
              <div className="flex items-center space-x-3 bg-white pl-3 pr-4 py-1 rounded-full shadow-md">
                <img
                  src="https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg"
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="flex flex-col">
                  <span className="text-blue-600 font-semibold">{user.name}</span>
                  <span className="text-gray-600 text-sm">{user.email}</span>
                </div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
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
            <>
              <button
                onClick={() => navigate("/signup")}
                className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                Signup
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-xs md:text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-xs md:text-sm font-medium"
              >
                About Us
              </button>
            </>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between h-full pt-32 md:pt-40">
        <div className="flex-1 max-w-full md:max-w-xl text-white">
          <h1 className="text-2xl md:text-5xl font-bold leading-tight mb-4 md:mb-6">
            Find your Perfect Rental Room With Ease.
          </h1>
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed md:leading-loose">
            Rumin redefines renting with a seamless experience tailored to your needs, offering innovative features that set us apart from the rest.
          </p>
          <div className="bg-white  rounded-full flex items-center shadow-lg mb-8 md:mb-12 w-full max-w-md overflow-hidden border-5 border-[#69b8f9]">
           <input
  type="text"
  placeholder="Ask me anything"
  className="flex-1 px-4 py-2 md:py-3 text-gray-700 bg-transparent outline-none placeholder-[#108cfe]"
/>

            <button className="text-[#108cfe] px-4 md:px-6 py-2 md:py-3 rounded-full transition-colors">
              <Search />
            </button>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-12">
            <div>
              <div className="text-2xl md:text-3xl font-bold">15K+</div>
              <div className="text-sm md:text-sm text-white/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">35+</div>
              <div className="text-sm md:text-sm text-white/80">Countries</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">20K+</div>
              <div className="text-sm md:text-sm text-white/80">Properties</div>
            </div>
          </div>
        </div>

        <div className="flex-1 relative mt-8 md:mt-0 w-full max-w-full md:max-w-2xl">
          <img src="/hero.png" alt="Modern house" className="w-full h-auto relative z-10" />
          <div className="absolute top-20 right-10 md:right-20 w-4 h-4 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-32 right-5 md:bottom-40 md:right-10 w-6 h-6 bg-white/15 rounded-full"></div>
          <div className="absolute top-36 right-32 md:top-40 md:right-40 w-3 h-3 bg-white/25 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
