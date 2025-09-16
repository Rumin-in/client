import { useState } from "react";
import {
  ChevronDown,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Shield,
  Tv,
  Waves,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Define types
type Room = {
  id: number;
  image: string;
  price: string;
  title: string;
  location: string;
  amenities: string[];
  rating: number;
  reviews: number;
  verified: boolean;
};

const RoomSearchLayout = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([2000, 12000]);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("");
  const [showAvailability, setShowAvailability] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Recommended");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sample room data
  const rooms: Room[] = [
    {
      id: 1,
      image: "/api/placeholder/300/200",
      price: "₹6000/month",
      title: "Make it Charma Doon dance rental",
      location: "Fully furnished",
      amenities: ["Balcony"],
      rating: 4.5,
      reviews: 23,
      verified: true,
    },
    {
      id: 2,
      image: "/api/placeholder/300/200",
      price: "₹8000/month",
      title: "Make it Charma Doon dance rental",
      location: "Fully furnished",
      amenities: ["Balcony"],
      rating: 4.8,
      reviews: 45,
      verified: true,
    },
    {
      id: 3,
      image: "/api/placeholder/300/200",
      price: "₹7500/month",
      title: "Make it Charma Doon dance rental",
      location: "Fully furnished",
      amenities: ["Balcony"],
      rating: 4.2,
      reviews: 18,
      verified: true,
    },
    {
      id: 4,
      image: "/api/placeholder/300/200",
      price: "₹9000/month",
      title: "Make it Charma Doon dance rental",
      location: "Fully furnished",
      amenities: ["Balcony"],
      rating: 4.6,
      reviews: 32,
      verified: true,
    },
    {
      id: 5,
      image: "/api/placeholder/300/200",
      price: "₹5500/month",
      title: "Make it Charma Doon dance rental",
      location: "Fully furnished",
      amenities: ["Balcony"],
      rating: 4.3,
      reviews: 27,
      verified: true,
    },
    {
      id: 6,
      image: "/api/placeholder/300/200",
      price: "₹11000/month",
      title: "Make it Charma Doon dance rental",
      location: "Fully furnished",
      amenities: ["Balcony"],
      rating: 4.7,
      reviews: 56,
      verified: true,
    },
  ];

  const handleRoomTypeChange = (type: string) => {
    setRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleAmenityChange = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([2000, 12000]);
    setRoomTypes([]);
    setAmenities([]);
    setLocation("");
    setShowAvailability(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-4">
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Price Range</h3>
              <div className="relative">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <div className="relative">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{
                        marginLeft: `${(priceRange[0] - 2000) / 100}%`,
                        width: `${(priceRange[1] - priceRange[0]) / 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Min Price</span>
                  <span>Max Price</span>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-800">
                  <span>₹2,000</span>
                  <span>₹10,000</span>
                </div>
              </div>
            </div>

            {/* Room Type */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Room Type</h3>
              <div className="space-y-3">
                {["Single", "Double", "Triple"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={roomTypes.includes(type)}
                      onChange={() => handleRoomTypeChange(type)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Apartment Amenities */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Apartment Amenities
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Wi-Fi", icon: Wifi },
                  { name: "Parking", icon: Car },
                  { name: "Kitchen", icon: Utensils },
                  { name: "Gym", icon: Dumbbell },
                  { name: "Security", icon: Shield },
                  { name: "TV", icon: Tv },
                  { name: "Swimming Pool", icon: Waves },
                ].map(({ name, icon: Icon }) => (
                  <label key={name} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={amenities.includes(name)}
                      onChange={() => handleAmenityChange(name)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Icon className="w-4 h-4 ml-3 mr-2 text-gray-600" />
                    <span className="text-gray-700">{name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Location</h3>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Availability</h3>
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Show only availability</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showAvailability}
                    onChange={(e) => setShowAvailability(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    onClick={() => setShowAvailability(!showAvailability)}
                    className={`w-10 h-6 rounded-full cursor-pointer transition-colors ${
                      showAvailability ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                        showAvailability
                          ? "translate-x-5 ml-1"
                          : "translate-x-1"
                      }`}
                    ></div>
                  </div>
                </div>
              </label>
            </div>

            {/* Clear All Filter */}
            <button
              onClick={clearAllFilters}
              className="w-full py-2 text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              Clear All Filter
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                245 Rooms Found
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                    <option>Newest</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                      {room.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {room.title}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{room.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          Fully furnished
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          Balcony
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{room.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={currentPage === 5}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSearchLayout;
