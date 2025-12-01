import { Search, MoreVertical } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { logout as logoutAction } from "../store/authSlice";

// COUNTER HOOK
const useCounter = (target: number, duration = 700) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(timer);
        setCount(target);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const happyCustomers = useCounter(15000);
  const countries = useCounter(35);
  const properties = useCounter(20000);

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/signin");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/rooms?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/rooms");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative pb-10 overflow-x-hidden sm:rounded-lg" style={{ backgroundImage: "url('/hero-frame.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      {/* === HEADER BAR === */}
      <header className="flex justify-between items-stretch w-full absolute top-0 left-0 z-20 px-4 md:px-0 pr-0">
        
        {/* LOGO */}
        <div className="flex items-center">
          <img
            src="/rumin-logo.png"
            alt="logo"
            className="w-32 h-auto md:w-36 sm:scale-160 sm:ml-10 sm:mt-2 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center space-x-10 text-white">
          <a href="/" className="hover:text-gray-200 transition-colors hover:underline text-2xl">
            Home
          </a>
          <a href="/rooms" className="hover:text-gray-200 transition-colors hover:underline text-2xl">
            Room
          </a>

          {/* UPCOMING DROPDOWN */}
          <div className="relative group cursor-pointer">
            <span className="text-2xl hover:text-gray-200 transition-colors">Upcoming</span>

            <div className="absolute hidden group-hover:block bg-white text-black rounded-md shadow-lg mt-2 min-w-[160px]">
              <p className="px-4 py-2 hover:bg-gray-100">Student Furniture</p>
              <p className="px-4 py-2 hover:bg-gray-100">Hostel</p>
              <p className="px-4 py-2 hover:bg-gray-100">PG</p>
            </div>
          </div>
        </nav>

        {/* USER / AUTH */}
        <div className="flex items-center justify-center space-x-2 md:space-x-5 h-full py-4 px-6 2xl:py-0 2xl:px-0">

          {user ? (
            <div className="relative flex items-center">
              <div className="flex items-center space-x-3 md:bg-white p-1 md:pl-3 md:pr-4 md:py-2 md:rounded-full md:shadow-md">

                {/* PROFILE */}
                <div
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition"
                >
                  <img
                    src="https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg"
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div className="hidden md:flex flex-col">
                    <span className="text-blue-600 font-semibold">{user.name}</span>
                    <span className="text-gray-600 text-sm">{user.email}</span>
                  </div>
                </div>

                {/* DROPDOWN TOGGLE */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hidden md:block ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* LOGOUT DROPDOWN */}
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
                className="px-3 py-1 sm:text-black sm:hover:text-white md:px-4 md:py-2 text-xs md:text-xl text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                Signup
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-xs md:text-xl font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/about")}
                className="hidden sm:block px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-xs md:text-xl font-medium"
              >
                About Us
              </button>
            </>
          )}
        </div>
      </header>

      {/* === HERO SECTION CONTENT === */}
      <div className="container mx-auto px-4 md:px-6 flex flex-col sm:mt-7 md:flex-row items-center justify-between h-full pt-32 md:pt-40">
        
        {/* TEXT COLUMN */}
        <div className="flex-1 max-w-full md:max-w-5xl text-white">
          <h1 className="text-2xl md:text-7xl font-bold leading-tight mb-4 md:mb-6">
            Find your Perfect Rental Room With Ease.
          </h1>

          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed md:leading-loose">
            Rumin redefines renting with a seamless experience tailored to your needs,
            offering innovative features that set us apart from the rest.
          </p>

          {/* SEARCH BAR */}
          <div className="bg-white rounded-full flex items-center shadow-lg mb-8 md:mb-18 w-full max-w-md overflow-hidden border-5 border-[#69b8f9]">
            <input
              type="text"
              placeholder="Search by location, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-4 py-2 md:py-3 text-gray-700 bg-transparent outline-none placeholder-[#108cfe]"
            />
            <button
              onClick={handleSearch}
              className="text-[#108cfe] px-4 md:px-6 py-2 md:py-3 rounded-full transition-colors hover:bg-blue-50"
            >
              <Search />
            </button>
          </div>

          {/* STATS WITH COUNTER */}
          <div className="flex flex-wrap gap-6 md:gap-16">
            <div>
              <div className="text-2xl md:text-4xl font-bold">{happyCustomers}+ </div>
              <div className="text-sm text-white/80">Happy Customers</div>
            </div>

            <div>
              <div className="text-2xl md:text-4xl font-bold">{countries}+ </div>
              <div className="text-sm text-white/80">Countries</div>
            </div>

            <div>
              <div className="text-2xl md:text-4xl font-bold">{properties}+ </div>
              <div className="text-sm text-white/80">Properties</div>
            </div>
          </div>
        </div>

        {/* IMAGE COLUMN */}
        <div className="flex-1 relative mt-4 md:mt-0 w-full max-w-full md:max-w-2xl overflow-hidden">
          <img
            src="/hero.png"
            alt="Modern house"
            className="w-full h-auto relative z-10 md:scale-110 sm:scale-105 scale-100"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
