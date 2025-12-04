import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  ChevronDown,
  MapPin,
  Star,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllRooms } from "../services/rooms.services";
import { toast } from "sonner";

type Room = {
  _id: string;
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
  createdAt: string;
};

const RoomSearchLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const locationQuery = searchParams.get("location") || "";

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBHK, setSelectedBHK] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showAvailability, setShowAvailability] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Recommended");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [minRent, setMinRent] = useState<string>("");
  const [maxRent, setMaxRent] = useState<string>("");
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await getAllRooms();
      console.log("Full API Response:", response); // Debug log
      
      // The backend returns: new ApiResponse(200, rooms, "Rooms fetched")
      // This means the rooms array is directly in response.data (not wrapped)
      const roomsData = response.data || [];
      console.log("Rooms fetched:", roomsData.length);
      console.log("Sample BHK values:", roomsData.slice(0, 3).map((r: Room) => r.bhk));
      setRooms(roomsData);
    } catch (error: any) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to fetch rooms");
      setRooms([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = useMemo(() => {
    let filtered = rooms;

    // Filter by availability status
    if (showAvailability) {
      filtered = filtered.filter((room) => room.availabilityStatus === "available");
    }

    // Filter by BHK
    if (selectedBHK) {
      console.log("Filtering by BHK:", selectedBHK);
      filtered = filtered.filter((room) => {
        // Make BHK comparison case-insensitive and flexible
        const roomBHK = room.bhk?.toLowerCase().replace(/\s+/g, '') || '';
        const filterBHK = selectedBHK.toLowerCase().replace(/\s+/g, '');
        console.log(`Comparing: room.bhk="${room.bhk}" (normalized: "${roomBHK}") with filter "${selectedBHK}" (normalized: "${filterBHK}")`);
        return roomBHK === filterBHK || roomBHK.includes(filterBHK.replace('bhk', ''));
      });
      console.log("After BHK filter:", filtered.length);
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((room) =>
        selectedAmenities.every((amenity) =>
          room.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }

    // Filter by price range
    if (minRent) {
      filtered = filtered.filter((room) => room.rent >= parseInt(minRent));
    }
    if (maxRent) {
      filtered = filtered.filter((room) => room.rent <= parseInt(maxRent));
    }

    // Filter by search query (location)
    if (searchQuery) {
      // Normalize search query (treat "Minal" and "Minal Residency" as same)
      const normalizedQuery = searchQuery.toLowerCase().replace(/\s*residency\s*/i, '').trim();
      
      filtered = filtered.filter((room) => {
        const city = room.location.city.toLowerCase();
        const address = room.location.address.toLowerCase();
        const state = room.location.state.toLowerCase();
        
        // Normalize room location data
        const normalizedCity = city.replace(/\s*residency\s*/i, '').trim();
        const normalizedAddress = address.replace(/\s*residency\s*/i, '').trim();
        
        return (
          city.includes(searchQuery.toLowerCase()) ||
          address.includes(searchQuery.toLowerCase()) ||
          state.includes(searchQuery.toLowerCase()) ||
          normalizedCity.includes(normalizedQuery) ||
          normalizedAddress.includes(normalizedQuery)
        );
      });
    }

    // Filter by specific location/area
    if (locationQuery) {
      // Normalize location query (treat "Minal" and "Minal Residency" as same)
      const normalizedQuery = locationQuery.toLowerCase().replace(/\s*residency\s*/i, '').trim();
      
      filtered = filtered.filter((room) => {
        const city = room.location.city.toLowerCase();
        const address = room.location.address.toLowerCase();
        const state = room.location.state.toLowerCase();
        
        // Normalize room location data
        const normalizedCity = city.replace(/\s*residency\s*/i, '').trim();
        const normalizedAddress = address.replace(/\s*residency\s*/i, '').trim();
        
        return (
          city.includes(locationQuery.toLowerCase()) ||
          address.includes(locationQuery.toLowerCase()) ||
          state.includes(locationQuery.toLowerCase()) ||
          normalizedCity.includes(normalizedQuery) ||
          normalizedAddress.includes(normalizedQuery)
        );
      });
    }

    // Sort
    if (sortBy === "Price: Low to High") {
      filtered = [...filtered].sort((a, b) => a.rent - b.rent);
    } else if (sortBy === "Price: High to Low") {
      filtered = [...filtered].sort((a, b) => b.rent - a.rent);
    } else if (sortBy === "Newest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return filtered;
  }, [rooms, showAvailability, selectedBHK, selectedAmenities, sortBy, minRent, maxRent, searchQuery, locationQuery]);

  // Infinite scroll - visible rooms
  const visibleRooms = filteredRooms.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRooms.length;

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedBHK, selectedAmenities, showAvailability, sortBy, minRent, maxRent, searchQuery, locationQuery]);

  // Load more function
  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 6, filteredRooms.length));
        setIsLoadingMore(false);
      }, 300);
    }
  }, [hasMore, isLoadingMore, filteredRooms.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoadingMore, loadMore]);

  const getRandomRating = (viewsCount: number) => {
    return (4.0 + (viewsCount % 10) / 10).toFixed(1);
  };

  const handleRoomClick = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const availableAmenities = [
    "Wifi",
    "Parking",
    "Security",
    "CCTV",
    "Lift",
    "Water Supply",
    "Power Backup",
    "Gym",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {filteredRooms.length} Rooms Found
          </h1>
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-1">
              Searching for: <span className="font-semibold">"{searchQuery}"</span>
              <button
                onClick={() => {
                  navigate('/rooms');
                  window.location.reload();
                }}
                className="ml-2 text-blue-600 hover:text-blue-800 underline"
              >
                Clear search
              </button>
            </p>
          )}
          {locationQuery && (
            <p className="text-sm text-gray-600 mt-1">
              Location: <span className="font-semibold">"{locationQuery}"</span>
              <button
                onClick={() => {
                  navigate('/rooms');
                  window.location.reload();
                }}
                className="ml-2 text-blue-600 hover:text-blue-800 underline"
              >
                Clear location
              </button>
            </p>
          )}
        </div>
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
          className={`px-4 py-2 rounded-lg border transition-colors ${
            showAvailability
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-[#0085FE] border-[#0085FE] hover:bg-blue-50"
          }`}
        >
          {showAvailability ? "Showing Available" : "Show Available Only"}
        </button>

        <div className="relative">
          <select
            value={selectedBHK}
            onChange={(e) => {
              console.log("BHK filter changed to:", e.target.value);
              setSelectedBHK(e.target.value);
            }}
            className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 text-sm sm:text-base text-[#0085FE] border-[#0085FE] hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <option value="">All BHK Types</option>
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="4BHK">4 BHK</option>
            <option value="Studio">Studio</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>

        <div className="relative group">
          <button className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 text-sm sm:text-base text-[#0085FE] border-[#0085FE] hover:bg-blue-50 transition-colors">
            Amenities {selectedAmenities.length > 0 && `(${selectedAmenities.length})`}
          </button>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          
          {/* Amenities Dropdown */}
          <div className="hidden group-hover:block absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-10">
            {availableAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          type="number"
          placeholder="Min Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          className="px-4 py-2 border border-[#0085FE] rounded-lg text-sm sm:text-base w-28 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="px-4 py-2 border border-[#0085FE] rounded-lg text-sm sm:text-base w-28 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={() => {
            setSelectedBHK("");
            setSelectedAmenities([]);
            setShowAvailability(false);
            setMinRent("");
            setMaxRent("");
          }}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
        {visibleRooms.map((room) => (
          <div
            key={room._id}
            onClick={() => handleRoomClick(room._id)}
            className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-gray-300 hover:shadow-xl hover:scale-105 transition-all duration-300 mx-5 cursor-pointer"
          >
            <div className="relative">
              <img
                src={room.images[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                alt={room.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                <Star className="w-3 h-3 fill-white text-white" />
                {getRandomRating(room.viewsCount)}
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
              <div className="mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {room.bhk}
                </span>
                <div className="mt-2 text-blue-600 font-semibold text-sm">
                  ₹{room.rent.toLocaleString()}/month
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
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
                    +{room.amenities.length - 3} more
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {room.viewsCount} views • Available from{" "}
                {new Date(room.availabiltyDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">No rooms found matching your criteria.</p>
          {searchQuery && (
            <p className="text-gray-600 mb-4">
              Your search for <span className="font-semibold">"{searchQuery}"</span> returned no results.
            </p>
          )}
          {locationQuery && (
            <p className="text-gray-600 mb-4">
              No rooms found in <span className="font-semibold">"{locationQuery}"</span>.
            </p>
          )}
          <div className="flex justify-center gap-3">
            {(searchQuery || locationQuery) && (
              <button
                onClick={() => {
                  navigate('/rooms');
                  window.location.reload();
                }}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Clear Search
              </button>
            )}
            <button
              onClick={() => {
                setSelectedBHK("");
                setSelectedAmenities([]);
                setShowAvailability(false);
                setMinRent("");
                setMaxRent("");
                if (searchQuery || locationQuery) {
                  navigate('/rooms');
                  window.location.reload();
                }
              }}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Infinite Scroll Loader */}
      <div ref={loadMoreRef} className="flex justify-center items-center py-8">
        {isLoadingMore && (
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading more rooms...</span>
          </div>
        )}
        {!hasMore && filteredRooms.length > 0 && (
          <p className="text-gray-500">You've seen all {filteredRooms.length} rooms</p>
        )}
      </div>
    </div>
  );
};

export default RoomSearchLayout;
