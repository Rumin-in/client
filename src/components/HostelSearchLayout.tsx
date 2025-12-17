import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  ChevronDown,
  MapPin,
  Star,
  Wifi,
  Shield,
  Car,
  Building,
  Home,
  Users,
  Utensils,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllHostels } from "../services/hostels.services";
import { toast } from "sonner";

type Hostel = {
  _id: string;
  title: string;
  description: string;
  hostelType: string;
  totalBeds: number;
  availableBeds: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: { type: string; coordinates: number[] };
  };
  rentPerBed: number;
  amenities: string[];
  images: string[];
  availabilityStatus: string;
  adminId: string;
  viewsCount: number;
  availabilityDate: string;
  createdAt: string;
  showReviews?: boolean;
  adminRating?: number | null;
  facilities?: {
    food?: boolean;
    laundry?: boolean;
    cleaning?: boolean;
  };
};

const HostelSearchLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const typeQuery = searchParams.get("type") || "";
  const maxRentQuery = searchParams.get("maxRent") || "";

  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>(typeQuery);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showAvailability, setShowAvailability] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Recommended");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [maxRent, setMaxRent] = useState<string>(maxRentQuery);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchHostels();
  }, []);

  useEffect(() => {
    if (typeQuery) setSelectedType(typeQuery);
    if (maxRentQuery) setMaxRent(maxRentQuery);
  }, [typeQuery, maxRentQuery]);

  const fetchHostels = async () => {
    try {
      setLoading(true);
      const response = await getAllHostels();
      const hostelsData = response.data || [];
      setHostels(hostelsData);
    } catch (error: any) {
      console.error("Error fetching hostels:", error);
      toast.error("Failed to fetch hostels");
      setHostels([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredHostels = useMemo(() => {
    let filtered = hostels;

    // Filter by availability status
    if (showAvailability) {
      filtered = filtered.filter((hostel) => hostel.availabilityStatus === "available");
    }

    // Filter by hostel type
    if (selectedType) {
      filtered = filtered.filter((hostel) => hostel.hostelType === selectedType);
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((hostel) =>
        selectedAmenities.every((amenity) =>
          hostel.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }

    // Filter by max rent
    if (maxRent) {
      filtered = filtered.filter((hostel) => hostel.rentPerBed <= parseInt(maxRent));
    }

    // Filter by search query (location)
    if (searchQuery) {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((hostel) => {
        const city = hostel.location.city.toLowerCase();
        const address = hostel.location.address.toLowerCase();
        const state = hostel.location.state.toLowerCase();

        return (
          city.includes(normalizedQuery) ||
          address.includes(normalizedQuery) ||
          state.includes(normalizedQuery)
        );
      });
    }

    // Sort
    if (sortBy === "Price: Low to High") {
      filtered = [...filtered].sort((a, b) => a.rentPerBed - b.rentPerBed);
    } else if (sortBy === "Price: High to Low") {
      filtered = [...filtered].sort((a, b) => b.rentPerBed - a.rentPerBed);
    } else if (sortBy === "Newest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return filtered;
  }, [hostels, showAvailability, selectedType, selectedAmenities, sortBy, maxRent, searchQuery]);

  const visibleHostels = useMemo(() => {
    return filteredHostels.slice(0, visibleCount);
  }, [filteredHostels, visibleCount]);

  const loadMore = useCallback(() => {
    if (visibleCount >= filteredHostels.length || isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 6, filteredHostels.length));
      setIsLoadingMore(false);
    }, 300);
  }, [visibleCount, filteredHostels.length, isLoadingMore]);

  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && visibleCount < filteredHostels.length) {
            loadMore();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(loadMoreRef.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, visibleCount, filteredHostels.length]);

  const amenitiesList = [
    { name: "Wifi", icon: Wifi },
    { name: "Parking", icon: Car },
    { name: "Security", icon: Shield },
    { name: "Food", icon: Utensils },
  ];

  const hostelTypes = ["Boys", "Girls", "Co-ed"];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSelectedType("");
    setSelectedAmenities([]);
    setShowAvailability(false);
    setSortBy("Recommended");
    setMaxRent("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Hostel Type Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Hostel Type
                </h4>
                <div className="space-y-2">
                  {hostelTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(selectedType === type ? "" : type)}
                      className={`w-full text-left px-4 py-2 rounded-lg border transition-colors ${
                        selectedType === type
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Max Rent per Bed</h4>
                <input
                  type="number"
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                  placeholder="Max rent"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Amenities</h4>
                <div className="space-y-2">
                  {amenitiesList.map((amenity) => (
                    <button
                      key={amenity.name}
                      onClick={() => toggleAmenity(amenity.name)}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        selectedAmenities.includes(amenity.name)
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <amenity.icon className="w-4 h-4" />
                      {amenity.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAvailability}
                    onChange={(e) => setShowAvailability(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Show Only Available</span>
                </label>
              </div>
            </div>
          </div>

          {/* Hostel Listings */}
          <div className="lg:w-3/4">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">{filteredHostels.length}</span>{" "}
                hostels found
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Hostel Grid */}
            {visibleHostels.length === 0 ? (
              <div className="text-center py-16">
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No hostels found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visibleHostels.map((hostel) => (
                    <div
                      key={hostel._id}
                      onClick={() => navigate(`/hostels/${hostel._id}`)}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative h-48">
                        <img
                          src={hostel.images[0] || "/placeholder-hostel.jpg"}
                          alt={hostel.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                          {hostel.hostelType}
                        </div>
                        {hostel.adminRating && hostel.showReviews && (
                          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{hostel.adminRating}</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-1">{hostel.title}</h3>
                        <div className="flex items-center text-gray-600 mb-3 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="line-clamp-1">{hostel.location.city}, {hostel.location.state}</span>
                        </div>

                        {/* Beds Info */}
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Home className="w-4 h-4" />
                            <span>Total: {hostel.totalBeds}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-green-600 font-semibold">
                              Available: {hostel.availableBeds}
                            </span>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {hostel.amenities.slice(0, 3).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {amenity}
                            </span>
                          ))}
                          {hostel.amenities.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              +{hostel.amenities.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Price */}
                        <div className="flex justify-between items-center pt-3 border-t">
                          <div>
                            <span className="text-2xl font-bold text-blue-600">
                              ₹{hostel.rentPerBed.toLocaleString()}
                            </span>
                            <span className="text-gray-500 text-sm">/bed/month</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Trigger */}
                {visibleCount < filteredHostels.length && (
                  <div ref={loadMoreRef} className="py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelSearchLayout;
