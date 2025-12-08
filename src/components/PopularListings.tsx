import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRooms } from "../services/rooms.services";
import { MapPin, Star, Wifi, Zap, Droplets, Shield, Car, Dumbbell, Building, Waves, Shirt, Sofa, Trees, Home } from "lucide-react";

type Room = {
  _id: string;
  title: string;
  bhk: string;
  location: {
    address: string;
    city: string;
    state: string;
  };
  rent: number;
  amenities: string[];
  images: string[];
  availabilityStatus: string;
  viewsCount: number;
  availabiltyDate: string;
  showReviews?: boolean;
};

// Skeleton Card Component
const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-300 rounded w-24"></div>
        <div className="h-8 bg-gray-300 rounded-full w-28"></div>
      </div>
    </div>
  </div>
);

const PopularListing: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await getAllRooms();
      const roomsData = response.data || [];
      // Get only first 6 rooms for popular listing
      setRooms(roomsData.slice(0, 6));
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  const handleViewAll = () => {
    navigate("/rooms");
  };

  const getRandomRating = (viewsCount: number) => {
    return (4.0 + (viewsCount % 10) / 10).toFixed(1);
  };

  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi') || lower.includes('wi-fi')) return Wifi;
    if (lower.includes('power') || lower.includes('backup') || lower.includes('electricity')) return Zap;
    if (lower.includes('water')) return Droplets;
    if (lower.includes('security') || lower.includes('cctv') || lower.includes('guard')) return Shield;
    if (lower.includes('parking') || lower.includes('car')) return Car;
    if (lower.includes('gym') || lower.includes('fitness')) return Dumbbell;
    if (lower.includes('lift') || lower.includes('elevator')) return Building;
    if (lower.includes('pool') || lower.includes('swimming')) return Waves;
    if (lower.includes('laundry') || lower.includes('washing')) return Shirt;
    if (lower.includes('furnished') || lower.includes('sofa') || lower.includes('furniture')) return Sofa;
    if (lower.includes('garden') || lower.includes('balcony')) return Trees;
    return Home;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 mt-10">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-7xl font-bold text-black mb-4">
            Popular Listing
          </h2>
          <p className="text-4xl text-gray-700 font-semi-bold">
            We help you to make
            <br />
            better deals
          </p>
        </div>

        {/* Listings Grid */}
        <div className="bg-blue-50 rounded-3xl p-8 px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 bg-[#0085FE1A]">
            {loading ? (
              // Skeleton Loading
              <>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </>
            ) : rooms.length > 0 ? (
              rooms.map((room) => (
                <div
                  key={room._id}
                  onClick={() => handleViewDetails(room._id)}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-gray-300 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  {/* Property Image */}
                  <div className="relative">
                    <img
                      src={room.images[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                      alt={room.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    {room.showReviews !== false && (
                      <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white text-white" />
                        {getRandomRating(room.viewsCount || 0)}
                      </div>
                    )}
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

                  {/* Property Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                      {room.title}
                    </h3>

                    {/* Location Row */}
                    <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {room.location.address}, {room.location.city}
                    </div>

                    {/* BHK Badge and Price */}
                    <div className="mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {room.bhk}
                      </span>
                      <div className="mt-2 text-blue-600 font-semibold text-sm">
                        ₹{room.rent.toLocaleString()}/month
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {room.amenities.slice(0, 4).map((amenity, idx) => {
                        const Icon = getAmenityIcon(amenity);
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full"
                            title={amenity}
                          >
                            <Icon className="w-4 h-4 text-black" />
                          </div>
                        );
                      })}
                      {room.amenities.length > 4 && (
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-xs text-black font-medium">
                          +{room.amenities.length - 4}
                        </div>
                      )}
                    </div>

                    {/* Views and Availability Date */}
                    <div className="text-xs text-gray-500">
                      {room.viewsCount || 0} views • Available from{" "}
                      {room.availabiltyDate ? new Date(room.availabiltyDate).toLocaleDateString() : "Now"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 text-gray-500">
                No rooms available at the moment.
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleViewAll}
              className="px-5 py-2 sm:px-12 sm:py-5 mt-8 bg-blue-500 cursor-pointer text-white text-sm rounded-full hover:bg-blue-600 transition-colors"
            >
              View All
            </button>
          </div>
        </div>
      
      </div>
    </section>
  );
};

export default PopularListing;
