import { useState, useMemo } from "react";
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

type Room = {
  title: string;
  description: string;
  bhk: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: { type: string; coordinates: number[] };
  };
  rent: number;
  amenities: string[];
  images: string[];
  availabilityStatus: string;
  landlordId: string;
  viewsCount: number;
  availabiltyDate: string;
};

const RoomSearchLayout = () => {
  // const [roomTypes, setRoomTypes] = useState<string[]>([]);
  // const [amenities, setAmenities] = useState<string[]>([]);
  const [showAvailability, setShowAvailability] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Recommended");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Dummy data
  const rooms: Room[] = [
    {
      title: "1 BHK in Minal",
      description: "Spacious 1 BHK ideal for students.",
      bhk: "1 BHK",
      location: {
        address: "Minal",
        city: "Bhopal",
        state: "MP",
        coordinates: { type: "Point", coordinates: [77.4461, 23.2332] },
      },
      rent: 7000,
      amenities: ["Wifi", "Parking", "Water Supply"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      ],
      availabilityStatus: "available",
      landlordId: "1",
      viewsCount: 12,
      availabiltyDate: "2025-09-25T00:00:00.000Z",
    },
    {
      title: "2 BHK in Karond",
      description: "Newly built 2 BHK flat near market.",
      bhk: "2 BHK",
      location: {
        address: "Karond",
        city: "Bhopal",
        state: "MP",
        coordinates: { type: "Point", coordinates: [77.4031, 23.2984] },
      },
      rent: 9500,
      amenities: ["CCTV", "Lift", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      ],
      availabilityStatus: "pending",
      landlordId: "2",
      viewsCount: 5,
      availabiltyDate: "2025-09-22T00:00:00.000Z",
    },
  ];

  const filteredRooms = useMemo(() => {
    let filtered = rooms.filter((room) =>
      showAvailability ? room.availabilityStatus === "available" : true
    );

    if (sortBy === "Price: Low to High")
      filtered.sort((a, b) => a.rent - b.rent);
    else if (sortBy === "Price: High to Low")
      filtered.sort((a, b) => b.rent - a.rent);

    return filtered;
  }, [rooms, showAvailability, sortBy]);

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRooms = filteredRooms.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getRandomRating = (viewsCount: number) => {
    return (4.0 + (viewsCount % 10) / 10).toFixed(1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          {filteredRooms.length} Rooms Found
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm sm:text-base">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setShowAvailability(!showAvailability)}
          className={`px-4 py-2 rounded-lg border ${
            showAvailability
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-[#0085FE] border-[#0085FE]"
          }`}
        >
          Check Available
        </button>

        <div className="relative">
          <select className="appearance-none bg-white border  rounded-lg px-4 py-2 pr-8 text-sm sm:text-base text-[#0085FE] border-[#0085FE]">
            <option>Person 1</option>
            <option>Person 2</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <div className="relative">
          <select className="appearance-none bg-white border text-[#0085FE] border-[#0085FE]  rounded-lg px-4 py-2 pr-8 text-sm sm:text-base">
            <option>Room Type</option>
            <option>1 BHK</option>
            <option>2 BHK</option>
            <option>3 BHK</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <div className="relative">
          <select className="appearance-none bg-white border  text-[#0085FE] border-[#0085FE] rounded-lg px-4 py-2 pr-8 text-sm sm:text-base">
            <option>Apartment Amenities</option>
            <option>Wifi</option>
            <option>Parking</option>
            <option>Security</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Search
        </button>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
        {paginatedRooms.map((room, idx) => (
          <div
            key={`${room.landlordId}-${idx}`}
            className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-gray-300 hover:shadow-md transition-shadow mx-5"
          >
            <div className="relative">
              <img
                src={room.images[0]}
                alt={room.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                ₹{room.rent.toLocaleString()}/month
              </div>
              <div
                className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${
                  room.availabilityStatus === "available"
                    ? "bg-green-500 text-white"
                    : room.availabilityStatus === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {room.availabilityStatus}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                {room.title}
              </h3>
              <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {room.location.address}, {room.location.city}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {room.bhk}
                </span>
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {getRandomRating(room.viewsCount)}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {room.viewsCount} views • Available from{" "}
                {new Date(room.availabiltyDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
    </div>
  );
};

export default RoomSearchLayout;
