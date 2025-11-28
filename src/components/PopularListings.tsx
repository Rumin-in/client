import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRooms } from "../services/rooms.services";
import { MapPin } from "lucide-react";

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
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Property Image */}
                  <div className="relative">
                    <img
                      src={room.images[0] || "/placeholder.png"}
                      alt={room.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {room.bhk}
                    </div>
                    <div
                      className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${
                        room.availabilityStatus === "available"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {room.availabilityStatus}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3 line-clamp-1">
                      {room.title}
                    </h3>

                    {/* Location Row */}
                    <div className="flex items-center text-gray-600 text-xs mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="line-clamp-1">
                        {room.location.address}, {room.location.city}
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{room.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-800">
                        ₹{room.rent.toLocaleString()}/mon
                      </span>
                      <button
                        onClick={() => handleViewDetails(room._id)}
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors"
                      >
                        View Details
                      </button>
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
