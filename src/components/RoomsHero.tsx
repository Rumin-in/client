import { useState } from "react";
import { MapPin, Search } from "lucide-react";

const RoomsHero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Find Rooms
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-4xl mx-auto font-bold leading-relaxed tracking-wider">
          Browse our verified listings organized by cities and neighborhoods to
          find your perfect accommodation.
        </p>

        {/* Search Container */}
        <div className="bg-white rounded-full shadow-lg p-2 max-w-2xl mx-auto flex items-center gap-2 sm:gap-4">
          {/* Search Icon (left side) */}
          <div className="pl-2 sm:pl-4 pr-2">
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="search by city, neighbourhood or area"
            className="flex-1 py-2 sm:py-3 px-2 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-sm sm:text-base"
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none
                       w-10 h-10 sm:w-auto sm:h-auto sm:py-3 sm:px-8"
          >
            {/* Show icon only on mobile, text on larger screens */}
            <Search className="w-5 h-5 sm:hidden" />
            <span className="hidden sm:inline">Find Locations</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomsHero;
