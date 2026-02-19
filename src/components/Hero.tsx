import { Search, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg";

// COUNTER HOOK with synchronized looping animation
const useCounter = (
  target: number,
  duration = 1500,
  pauseAfterComplete = 3000,
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationTimer: ReturnType<typeof setInterval>;
    let resetTimer: ReturnType<typeof setTimeout>;

    const startAnimation = () => {
      let start = 0;
      const increment = target / (duration / 16);

      animationTimer = setInterval(() => {
        start += increment;
        if (start >= target) {
          clearInterval(animationTimer);
          setCount(target);

          // After pause, reset and start again
          resetTimer = setTimeout(() => {
            setCount(0);
            startAnimation();
          }, pauseAfterComplete);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    };

    startAnimation();

    return () => {
      clearInterval(animationTimer);
      clearTimeout(resetTimer);
    };
  }, [target, duration, pauseAfterComplete]);

  return count;
};

// TYPING ANIMATION HOOK
const useTypingAnimation = (
  texts: string[],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return displayText;
};

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Typing animation for placeholder
  const placeholderTexts = [
    "Search by location...",
    "Search by city...",
    "Search by area...",
    "Try: 2bhk Minal...",
    "Try: 10000 budget...",
    "Try: studio Lalghati...",
  ];
  const typingPlaceholder = useTypingAnimation(placeholderTexts, 80, 40, 1500);

  // Counters with synchronized animation (all start together)
  const happyCustomers = useCounter(500, 1500, 4000);
  const landlordsServed = useCounter(300, 1500, 4000);
  const properties = useCounter(650, 1500, 4000);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const query = searchQuery.trim();
      const params = new URLSearchParams();

      // Parse BHK (1bhk, 2bhk, 3bhk, 4bhk, studio, 1rk)
      const bhkMatch = query.match(/(\d+)\s*(?:bhk|BHK)/i);
      const studioBhkMatch = query.match(/studio/i);
      const rkMatch = query.match(/(\d+)\s*(?:rk|RK)/i);

      // Parse budget/rent (numbers like 10000, 15000, etc.)
      const budgetMatch = query.match(/(\d{4,})/);

      let remainingQuery = query;

      if (bhkMatch) {
        const bhkType = `${bhkMatch[1]} BHK`;
        params.append("type", bhkType);
        remainingQuery = remainingQuery.replace(bhkMatch[0], "").trim();
      } else if (studioBhkMatch) {
        params.append("type", "Studio Room");
        remainingQuery = remainingQuery.replace(studioBhkMatch[0], "").trim();
      } else if (rkMatch) {
        const rkType = `${rkMatch[1]} RK`;
        params.append("type", rkType);
        remainingQuery = remainingQuery.replace(rkMatch[0], "").trim();
      }

      if (budgetMatch) {
        const budget = parseInt(budgetMatch[1]);
        params.append("maxRent", budget.toString());
        remainingQuery = remainingQuery.replace(budgetMatch[0], "").trim();
      }

      // Add remaining text as location search
      if (remainingQuery) {
        params.append("search", remainingQuery);
      }

      const queryString = params.toString();
      navigate(`/rooms${queryString ? `?${queryString}` : ""}`);
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
    <>
      {/* Custom styles for 0-1000px range */}
      <style>{`
        @media (max-width: 1000px) {
          .hero-section {
            border-radius: 0 !important;
            background-size: cover !important;
          }
        }
        @media (min-width: 700px) and (max-width: 1000px) {
          .hero-content {
            flex-direction: column !important;
          }
          .hero-text {
            max-width: 100% !important;
            align-self: center !important;
          }
          .hero-image {
            margin-top: 2rem !important;
            max-width: 100% !important;
          }
        }
      `}</style>
      <section
        className="hero-section relative overflow-hidden bg-no-repeat bg-center bg-cover lg:rounded-lg lg:bg-[length:100%_100%]"
        style={{ backgroundImage: "url('/hero-frame.png')" }}
      >
        {/* === HEADER BAR === */}
        <header className="flex justify-between items-stretch w-full absolute top-0 left-0 z-20 px-4 md:px-0 pr-0">
          {/* LOGO */}
          <div className="flex items-center">
            <img
              src="/rumin-logo.png"
              alt="logo"
              className="w-24 h-auto md:w-28 sm:scale-125 sm:ml-10 sm:mt-5 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8 2xl:space-x-10 text-white">
            <a
              href="/"
              className="hover:text-gray-200 transition-colors hover:underline text-base xl:text-xl 2xl:text-2xl"
            >
              Home
            </a>
            <a
              href="/rooms"
              className="hover:text-gray-200 transition-colors hover:underline text-base xl:text-xl 2xl:text-2xl"
            >
              Room
            </a>
            <a
              href="/hostels"
              className="hover:text-gray-200 transition-colors hover:underline text-base xl:text-xl 2xl:text-2xl"
            >
              Hostel & PG
            </a>
          </nav>

          {/* USER / AUTH */}
          <div className="flex items-center justify-center space-x-2 md:space-x-5 h-full py-4 px-6 lg:px-0 lg:py-0 ">
            {user ? (
              <div className="relative flex items-center">
                <div
                  onClick={() => navigate("/profile")}
                  className="flex items-center xl:space-x-3 md:bg-white p-1 md:pl-3 md:pr-4 md:py-2 md:rounded-full md:shadow-md cursor-pointer hover:opacity-90 transition"
                >
                  <img
                    src={user.profilePicture || DEFAULT_AVATAR}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div className="hidden xl:flex flex-col">
                    <span className="text-blue-600 font-semibold">
                      {user.name}
                    </span>
                    <span className="text-gray-600 text-sm">{user.email}</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Desktop buttons - hidden below lg (1024px) */}
                <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 2xl:space-x-4">
                  <button
                    onClick={() => navigate("/signup")}
                    className="px-3 py-1.5 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5 text-sm xl:text-base 2xl:text-lg text-black hover:text-white rounded-full hover:bg-blue-700 transition-colors font-medium whitespace-nowrap shadow-md hover:shadow-lg"
                  >
                    Signup
                  </button>
                  <button
                    onClick={() => navigate("/signin")}
                    className="px-3 py-1.5 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm xl:text-base 2xl:text-lg font-medium whitespace-nowrap"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/about")}
                    className="px-3 py-1.5 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm xl:text-base 2xl:text-lg font-medium whitespace-nowrap"
                  >
                    About
                  </button>
                </div>

                {/* Hamburger menu - visible below lg (1024px) */}
                <div className="lg:hidden flex items-center">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-white rounded-md hover:bg-white/10"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* === Mobile Menu (Full Width Dropdown) === */}
        {isMobileMenuOpen && !user && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-40">
            <nav className="flex flex-col gap-2 p-4 text-gray-800 text-sm font-medium">
              <a
                href="/"
                className="py-2 hover:text-blue-600 transition-colors border-b border-gray-100"
              >
                HOME
              </a>
              <a
                href="/rooms"
                className="py-2 hover:text-blue-600 transition-colors border-b border-gray-100"
              >
                ROOMS
              </a>
              <a
                href="/hostels"
                className="py-2 hover:text-blue-600 transition-colors border-b border-gray-100"
              >
                HOSTELS & PG
              </a>
              <a
                href="/about"
                className="py-2 hover:text-blue-600 transition-colors border-b border-gray-100"
              >
                ABOUT US
              </a>
              <div className="flex flex-col gap-2 mt-3">
                <button
                  onClick={() => {
                    navigate("/signin");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors font-medium"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium"
                >
                  SIGNUP
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* === HERO SECTION CONTENT === */}
        <div className="hero-content container mx-auto px-2 sm:px-4 md:px-6 flex flex-col sm:mt-7 md:flex-row items-end justify-between h-full pt-32 md:pt-40">
          {/* TEXT COLUMN */}
          <div className="hero-text flex-1 max-w-full md:max-w-5xl text-white self-center">
            <h1 className="text-2xl md:text-7xl font-bold leading-tight mb-4 md:mb-6">
              Find your Perfect Rental Room With Ease.
            </h1>

            <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed md:leading-loose">
              Rumin redefines renting with a seamless experience tailored to
              your needs, offering innovative features that set us apart from
              the rest.
            </p>

            {/* SEARCH BAR */}
            <div className="bg-white rounded-full flex items-center shadow-lg mb-8 md:mb-18 w-full max-w-md overflow-hidden border-5 border-[#69b8f9]">
              <input
                type="text"
                placeholder={typingPlaceholder || "Search..."}
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
            <div className="flex flex-wrap gap-6 md:gap-16 pb-12 md:pb-20">
              <div>
                <div className="text-2xl md:text-4xl font-bold">
                  {happyCustomers}+
                </div>
                <div className="text-sm text-white/80">Happy Customers</div>
              </div>

              <div>
                <div className="text-2xl md:text-4xl font-bold">
                  {landlordsServed}+
                </div>
                <div className="text-sm text-white/80">Landlords Served</div>
              </div>

              <div>
                <div className="text-2xl md:text-4xl font-bold">
                  {properties}+
                </div>
                <div className="text-sm text-white/80">Properties</div>
              </div>
            </div>
          </div>

          {/* IMAGE COLUMN */}
          <div className="hero-image flex-1 relative mt-8 md:mt-0 w-full max-w-full md:max-w-2xl self-end">
            <img
              src="/hero.png"
              alt="Modern house"
              className="w-full h-auto relative z-10 scale-120 scale-y-125"
            />
            <div className="absolute top-20 right-10 md:right-20 w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-32 right-5 md:bottom-40 md:right-10 w-6 h-6 bg-white/15 rounded-full"></div>
            <div className="absolute top-36 right-32 md:top-40 md:right-40 w-3 h-3 bg-white/25 rounded-full"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
