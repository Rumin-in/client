import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const UniquePreferences: React.FC = () => {
  const navigate = useNavigate();

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedFurnishing, setSelectedFurnishing] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');

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
  const roomTypes = ["Single Room", "1 RK", "1 BHK", "2 BHK", "Studio Room", "Duplex"];

  const handleSearch = () => {
    const params = new URLSearchParams();

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
    if (selectedRoomType) {
      params.append('type', selectedRoomType);
    }

    const queryString = params.toString();
    navigate(`/rooms${queryString ? `?${queryString}` : ''}`);
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

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-6 sm:px-8 py-2 sm:py-3 shadow-sm hover:shadow-md transition-all text-sm sm:text-base"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniquePreferences;
