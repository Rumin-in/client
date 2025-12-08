import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';

const UniquePreferences: React.FC = () => {
  const navigate = useNavigate();

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedFurnishing, setSelectedFurnishing] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter options
  const locations = [
    "Minal Residency", "Lalghati", "Indrapuri", "Karond", "Anand Nagar", "MP Nagar", "Arera Colony", "Kolar Road"
  ];

  const budgetRanges = [
    { label: "Under ₹5,000", min: 0, max: 5000 },
    { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
    { label: "₹10,000 - ₹15,000", min: 10000, max: 15000 },
    { label: "₹15,000 - ₹20,000", min: 15000, max: 20000 },
    { label: "Above ₹20,000", min: 20000, max: 100000 },
  ];

  const furnishingOptions = ["Furnished", "Semi-Furnished", "Unfurnished"];
  const genderOptions = ["Male", "Female", "Any"];
  const roomTypes = ["Single Room", "1 RK", "1 BHK", "2 BHK", "Studio Room", "Duplex"];

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim());
    }
    if (selectedLocation) {
      params.append('location', selectedLocation);
    }
    if (selectedBudget) {
      const budget = budgetRanges.find(b => b.label === selectedBudget);
      if (budget) {
        params.append('minRent', budget.min.toString());
        params.append('maxRent', budget.max.toString());
      }
    }
    if (selectedFurnishing) {
      params.append('furnishing', selectedFurnishing);
    }
    if (selectedGender) {
      params.append('gender', selectedGender);
    }
    if (selectedRoomType) {
      params.append('type', selectedRoomType);
    }

    const queryString = params.toString();
    navigate(`/rooms${queryString ? `?${queryString}` : ''}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-2 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6">
            Find your home with{' '}
            <span className="text-blue-500">unique preferences</span>
          </h2>
          <p className="text-lg px-5 max-w-4xl mx-auto font-bold leading-relaxed">
            Explore a curated selection of homes designed to match your unique preferences, making it
            effortless to find the ideal property that perfectly fits your lifestyle and needs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="bg-blue-100 rounded-[10px] sm:rounded-[30px] p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Location Filter */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 pr-10 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-blue-500 font-medium text-sm sm:text-base border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
            </div>

            {/* Budget Filter */}
            <div className="relative">
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="appearance-none bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 pr-10 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-blue-500 font-medium text-sm sm:text-base border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Budget</option>
                {budgetRanges.map((range) => (
                  <option key={range.label} value={range.label}>{range.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
            </div>

            {/* Furnishing Filter */}
            <div className="relative">
              <select
                value={selectedFurnishing}
                onChange={(e) => setSelectedFurnishing(e.target.value)}
                className="appearance-none bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 pr-10 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-blue-500 font-medium text-sm sm:text-base border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Furnishing</option>
                {furnishingOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
            </div>

            {/* Gender Filter */}
            <div className="relative">
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="appearance-none bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 pr-10 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-blue-500 font-medium text-sm sm:text-base border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Gender</option>
                {genderOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
            </div>

            {/* Room Type Filter */}
            <div className="relative">
              <select
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
                className="appearance-none bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 pr-10 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-blue-500 font-medium text-sm sm:text-base border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Room Type</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-full flex items-center shadow-sm hover:shadow-md transition-shadow overflow-hidden border-2 border-[#69b8f9] w-full sm:w-auto sm:min-w-[200px]">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 px-4 py-2 sm:py-2.5 text-gray-700 bg-transparent outline-none placeholder-[#108cfe] text-sm sm:text-base"
              />
              <button
                onClick={handleSearch}
                className="text-[#108cfe] px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-colors hover:bg-blue-50"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniquePreferences;
