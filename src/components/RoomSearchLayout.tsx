import { useState, useMemo, useEffect } from "react";
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
  Filter,
  X,
} from "lucide-react";
import {getAllRooms} from "../services/rooms.services"

// Define types
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
  const [priceRange, setPriceRange] = useState<[number, number]>([2000, 20000]);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("");
  const [showAvailability, setShowAvailability] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Recommended");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  // const [rooms, setRooms] = useState<Room[]>([]);

  //  const fetchRooms = async()=>{
  //   try {
  //     const response = await getAllRooms();
  //     console.log("response:", response.data);
  //     console.log("is array:", Array.isArray(response.data));
  //         if (response && Array.isArray(response.data)) {
  //     setRooms(response.data); 
  //   }
  //   } catch (error) {
  //     console.error("Error fetching rooms:", error);
  //   }
  //  }
  //  useEffect(()=>{
  //   fetchRooms();
  //  })


  const rooms: Room[] = [
    {
      "title": "1 BHK in Minal",
      "description": "Spacious 1 BHK ideal for students.",
      "bhk": "1 BHK",
      "location": {
        "address": "Minal",
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "coordinates": { "type": "Point", "coordinates": [77.4461, 23.2332] }
      },
      "rent": 7000,
      "amenities": ["Wifi", "Parking", "Water Supply"],
      "images": ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"],
      "availabilityStatus": "available",
      "landlordId": "650f21aa12de5b2d34a9f001",
      "viewsCount": 12,
      "availabiltyDate": "2025-09-25T00:00:00.000Z"
    },
    {
      "title": "2 BHK in Karond",
      "description": "Newly built 2 BHK flat near market.",
      "bhk": "2 BHK",
      "location": {
        "address": "Karond",
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "coordinates": { "type": "Point", "coordinates": [77.4031, 23.2984] }
      },
      "rent": 9500,
      "amenities": ["CCTV", "Lift", "Parking"],
      "images": ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"],
      "availabilityStatus": "pending",
      "landlordId": "650f21aa12de5b2d34a9f002",
      "viewsCount": 5,
      "availabiltyDate": "2025-09-22T00:00:00.000Z"
    },
    {
      "title": "3 BHK in Arera Colony",
      "description": "Premium 3 BHK with modular kitchen.",
      "bhk": "3 BHK",
      "location": {
        "address": "Arera Colony",
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "coordinates": { "type": "Point", "coordinates": [77.4255, 23.2005] }
      },
      "rent": 22000,
      "amenities": ["AC", "Gym", "Security"],
      "images": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
      "availabilityStatus": "available",
      "landlordId": "650f21aa12de5b2d34a9f003",
      "viewsCount": 18,
      "availabiltyDate": "2025-10-01T00:00:00.000Z"
    },
    {
      "title": "Room in MP Nagar",
      "description": "Single room PG near DB Mall.",
      "bhk": "1 RK",
      "location": {
        "address": "MP Nagar",
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "coordinates": { "type": "Point", "coordinates": [77.4332, 23.2381] }
      },
      "rent": 6000,
      "amenities": ["Wifi", "Bed", "Mess Facility"],
      "images": ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"],
      "availabilityStatus": "available",
      "landlordId": "650f21aa12de5b2d34a9f004",
      "viewsCount": 9,
      "availabiltyDate": "2025-09-28T00:00:00.000Z"
    },
    {
      "title": "2 BHK in Kolar",
      "description": "Semi-furnished flat at Kolar Road.",
      "bhk": "2 BHK",
      "location": {
        "address": "Kolar",
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "coordinates": { "type": "Point", "coordinates": [77.4562, 23.1692] }
      },
      "rent": 11000,
      "amenities": ["Water Supply", "Parking"],
      "images": ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400"],
      "availabilityStatus": "available",
      "landlordId": "650f21aa12de5b2d34a9f005",
      "viewsCount": 15,
      "availabiltyDate": "2025-09-30T00:00:00.000Z"
    },
    {
      "title": "1 RK in Shahpura",
      "description": "Affordable room for bachelors.",
      "bhk": "1 RK",
      "location": {
        "address": "Shahpura",
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "coordinates": { "type": "Point", "coordinates": [77.4278, 23.1995] }
      },
      "rent": 5500,
      "amenities": ["Wifi", "Water Supply"],
      "images": ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400"],
      "availabilityStatus": "available",
      "landlordId": "650f21aa12de5b2d34a9f006",
      "viewsCount": 4,
      "availabiltyDate": "2025-09-21T00:00:00.000Z"
    },
    {
      "title": "1 BHK in Ayodhya Bypass",
      "description": "Budget flat on Ayodhya Bypass Road.",
      "bhk": "1 BHK",
      "location": {
        "address": "Ayodhya Bypass",
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "coordinates": { "type": "Point", "coordinates": [77.4505, 23.2652] }
      },
      "rent": 6500,
      "amenities": ["Parking", "CCTV"],
      "images": ["https://images.unsplash.com/photo-1515263487990-61b07816b5a6?w=400"],
      "availabilityStatus": "booked",
      "landlordId": "650f21aa12de5b2d34a9f007",
      "viewsCount": 21,
      "availabiltyDate": "2025-10-05T00:00:00.000Z"
    },
    {
      "title": "2 BHK in Lalghati",
      "description": "Well-ventilated 2 BHK near airport.",
      "bhk": "2 BHK",
      "location": {
        "address": "Lalghati",
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "coordinates": { "type": "Point", "coordinates": [77.3951, 23.2850] }
      },
      "rent": 10000,
      "amenities": ["Lift", "Parking"],
      "images": ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"],
      "availabilityStatus": "available",
      "landlordId": "650f21aa12de5b2d34a9f008",
      "viewsCount": 13,
      "availabiltyDate": "2025-09-26T00:00:00.000Z"
    },
    {
      "title": "3 BHK in Idgah Hills",
      "description": "Spacious 3 BHK with open view.",
      "bhk": "3 BHK",
      "location": {
        "address": "Idgah Hills",
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "coordinates": { "type": "Point", "coordinates": [77.4021, 23.2675] }
      },
      "rent": 18000,
      "amenities": ["AC", "Parking", "Security"],
      "images": ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"],
      "availabilityStatus": "pending",
      "landlordId": "650f21aa12de5b2d34a9f009",
      "viewsCount": 7,
      "availabiltyDate": "2025-09-24T00:00:00.000Z"
    },
    {
      "title": "1 BHK in Bairagarh",
      "description": "Simple 1 BHK near Bairagarh Station.",
      "bhk": "1 BHK",
      "location": {
        "address": "Bairagarh",
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "coordinates": { "type": "Point", "coordinates": [77.3405, 23.2735] }
      },
      "rent": 8000,
      "amenities": ["Water Supply", "Parking"],
      "images": ["https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400"],
      "availabilityStatus": "available",
      "landlordId": "650f21aa12de5b2d34a9f010",
      "viewsCount": 10,
      "availabiltyDate": "2025-10-02T00:00:00.000Z"
    }
  ];

  // Get unique room types from data
  const availableRoomTypes = useMemo(() => {
    console.log("Type of rooms:", typeof rooms);
    const types = [...new Set(rooms.map(room => room.bhk))];
    return types;
  }, [rooms]);

  // Get unique amenities from data
  const availableAmenities = useMemo(() => {
    const allAmenities = rooms.flatMap(room => room.amenities);
    return [...new Set(allAmenities)];
  }, [rooms]);

  // Get price range from data
  const priceRangeFromData = useMemo(() => {
    const prices = rooms.map(room => room.rent);
    return [Math.min(...prices), Math.max(...prices)];
  }, [rooms]);

  // Filter rooms based on all criteria
  const filteredRooms = useMemo(() => {
    let filtered = rooms.filter(room => {
      // Price filter
      const priceMatch = room.rent >= priceRange[0] && room.rent <= priceRange[1];
      
      // Room type filter
      const roomTypeMatch = roomTypes.length === 0 || roomTypes.includes(room.bhk);
      
      // Amenities filter
      const amenitiesMatch = amenities.length === 0 || 
        amenities.every(amenity => 
          room.amenities.some(roomAmenity => 
            roomAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        );
      
      // Location filter
      const locationMatch = !location || 
        room.location.address.toLowerCase().includes(location.toLowerCase()) ||
        room.location.city.toLowerCase().includes(location.toLowerCase()) ||
        room.title.toLowerCase().includes(location.toLowerCase());
      
      // Availability filter
      const availabilityMatch = !showAvailability || room.availabilityStatus === 'available';
      
      return priceMatch && roomTypeMatch && amenitiesMatch && locationMatch && availabilityMatch;
    });

    // Apply sorting
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.rent - b.rent);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.rent - a.rent);
        break;
      case "Rating":
        filtered.sort((a, b) => b.viewsCount - a.viewsCount);
        break;
      case "Newest":
        filtered.sort((a, b) => new Date(b.availabiltyDate).getTime() - new Date(a.availabiltyDate).getTime());
        break;
      default:
        // Keep original order for "Recommended"
        break;
    }

    return filtered;
  }, [rooms, priceRange, roomTypes, amenities, location, showAvailability, sortBy]);

  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRooms = filteredRooms.slice(startIndex, startIndex + itemsPerPage);

  const handleRoomTypeChange = (type: string) => {
    setRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleAmenityChange = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setPriceRange([priceRangeFromData[0], priceRangeFromData[1]]);
    setRoomTypes([]);
    setAmenities([]);
    setLocation("");
    setShowAvailability(false);
    setCurrentPage(1);
  };

  // Generate random rating for display
  const getRandomRating = (viewsCount:any) => {
    return (4.0 + (viewsCount % 10) / 10).toFixed(1);
  };

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi')) return Wifi;
    if (lowerAmenity.includes('parking')) return Car;
    if (lowerAmenity.includes('kitchen') || lowerAmenity.includes('mess')) return Utensils;
    if (lowerAmenity.includes('gym')) return Dumbbell;
    if (lowerAmenity.includes('security') || lowerAmenity.includes('cctv')) return Shield;
    if (lowerAmenity.includes('tv')) return Tv;
    if (lowerAmenity.includes('pool') || lowerAmenity.includes('swimming')) return Waves;
    return Shield;
  };

  // Price Range Slider Component
  const PriceRangeSlider = () => {
    const [isDraggingMin, setIsDraggingMin] = useState(false);
    const [isDraggingMax, setIsDraggingMax] = useState(false);
    
    const minPrice = 2000;  
    const maxPrice = 20000;
    const range = maxPrice - minPrice;
    
    const minPercent = ((priceRange[0] - minPrice) / range) * 100;
    const maxPercent = ((priceRange[1] - minPrice) / range) * 100;

    const updateValueFromPosition = (clientX: number, rect: DOMRect) => {
      const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const value = Math.round(minPrice + (percent / 100) * range);
      
      // Determine which handle is closer
      const currentMinPercent = ((priceRange[0] - minPrice) / range) * 100;
      const currentMaxPercent = ((priceRange[1] - minPrice) / range) * 100;
      const distanceToMin = Math.abs(percent - currentMinPercent);
      const distanceToMax = Math.abs(percent - currentMaxPercent);
      
      if (!isDraggingMin && !isDraggingMax) {
        // Click to position - move the closest handle
        if (distanceToMin < distanceToMax) {
          const newMin = Math.min(value, priceRange[1] - 1000);
          handlePriceRangeChange(Math.max(minPrice, newMin), priceRange[1]);
        } else {
          const newMax = Math.max(value, priceRange[0] + 1000);
          handlePriceRangeChange(priceRange[0], Math.min(maxPrice, newMax));
        }
      } else if (isDraggingMin) {
        const newMin = Math.min(value, priceRange[1] - 1000);
        handlePriceRangeChange(Math.max(minPrice, newMin), priceRange[1]);
      } else if (isDraggingMax) {
        const newMax = Math.max(value, priceRange[0] + 1000);
        handlePriceRangeChange(priceRange[0], Math.min(maxPrice, newMax));
      }
    };

    const handleTrackClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('slider-track-bg')) {
        const rect = e.currentTarget.getBoundingClientRect();
        updateValueFromPosition(e.clientX, rect);
      }
    };

    const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (type === 'min') setIsDraggingMin(true);
      else setIsDraggingMax(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingMin && !isDraggingMax) return;
      
      const track = document.querySelector('.slider-track') as HTMLElement;
      if (!track) return;
      
      const rect = track.getBoundingClientRect();
      updateValueFromPosition(e.clientX, rect);
    };

    const handleMouseUp = () => {
      setIsDraggingMin(false);
      setIsDraggingMax(false);
    };

    const handleTouchStart = (type: 'min' | 'max') => (e: React.TouchEvent) => {
      e.preventDefault();
      if (type === 'min') setIsDraggingMin(true);
      else setIsDraggingMax(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingMin && !isDraggingMax || !e.touches.length) return;
      
      const track = document.querySelector('.slider-track') as HTMLElement;
      if (!track) return;
      
      const rect = track.getBoundingClientRect();
      updateValueFromPosition(e.touches[0].clientX, rect);
    };

    const handleTouchEnd = () => {
      setIsDraggingMin(false);
      setIsDraggingMax(false);
    };

    // Add event listeners
    useEffect(() => {
      if (isDraggingMin || isDraggingMax) {
        const handleEnd = () => {
          handleMouseUp();
          handleTouchEnd();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
        
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleEnd);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleEnd);
        };
      }
    }, [isDraggingMin, isDraggingMax, priceRange]);
    console.log("Rooms :",rooms);
    return (
      <div className="space-y-4">
        <div className="px-2">
          <div 
            className="relative h-8 slider-track cursor-pointer select-none"
            onClick={handleTrackClick}
          >
            {/* Track background */}
            <div className="absolute top-1/2 w-full h-2 bg-gray-200 rounded-full transform -translate-y-1/2 slider-track-bg"></div>
            
            {/* Active range */}
            <div 
              className="absolute top-1/2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2 pointer-events-none"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`
              }}
            ></div>
            
            {/* Min handle */}
            <div 
              className={`absolute top-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-grab shadow-lg transition-all duration-150 z-10 ${
                isDraggingMin ? 'scale-110 cursor-grabbing shadow-xl' : 'hover:scale-105 hover:shadow-xl'
              }`}
              style={{ left: `${minPercent}%` }}
              onMouseDown={handleMouseDown('min')}
              onTouchStart={handleTouchStart('min')}
            ></div>
            
            {/* Max handle */}
            <div 
              className={`absolute top-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-grab shadow-lg transition-all duration-150 z-10 ${
                isDraggingMax ? 'scale-110 cursor-grabbing shadow-xl' : 'hover:scale-105 hover:shadow-xl'
              }`}
              style={{ left: `${maxPercent}%` }}
              onMouseDown={handleMouseDown('max')}
              onTouchStart={handleTouchStart('max')}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    );
  };

  // Filter Sidebar Content Component
  const FilterContent = () => (
    <>
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Price Range</h3>
        <PriceRangeSlider />
      </div>

      {/* Room Type */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Room Type</h3>
        <div className="space-y-3">
          {availableRoomTypes.map((type) => (
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
          {availableAmenities.map((amenity) => {
            const IconComponent = getAmenityIcon(amenity);
            return (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <IconComponent className="w-4 h-4 ml-3 mr-2 text-gray-600" />
                <span className="text-gray-700">{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Location</h3>
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Enter location (e.g., Minal)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Availability</h3>
        <label className="flex items-center justify-between">
          <span className="text-gray-700">Show only available</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={showAvailability}
              onChange={(e) => {
                setShowAvailability(e.target.checked);
                setCurrentPage(1);
              }}
              className="sr-only"
            />
            <div
              onClick={() => {
                setShowAvailability(!showAvailability);
                setCurrentPage(1);
              }}
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
        className="w-full text-gray-700 py-2 border-2 border-gray-400 rounded-2xl font-medium transition-colors hover:bg-gray-50"
      >
        Clear All Filter
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 mb-10">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-4">
            <FilterContent />
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden fixed bottom-4 right-4 z-40 bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </button>

          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <FilterContent />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 w-full min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {filteredRooms.length} Rooms Found
              </h1>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-gray-600 text-sm sm:text-base">Sort by:</span>
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base w-full"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {paginatedRooms.map((room, index) => (
                <div
                  key={`${room.landlordId}-${index}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
                      ₹{room.rent.toLocaleString()}/month
                    </div>
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${
                      room.availabilityStatus === 'available' ? 'bg-green-500 text-white' :
                      room.availabilityStatus === 'pending' ? 'bg-yellow-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {room.availabilityStatus}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm sm:text-base">
                      {room.title}
                    </h3>
                    <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{room.location.address}, {room.location.city}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {room.bhk}
                        </span>
                        {room.amenities.slice(0, 2).map((amenity) => (
                          <span key={amenity} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{getRandomRating(room.viewsCount)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {room.viewsCount} views • Available from {new Date(room.availabiltyDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-1 sm:space-x-2">
                {/* Previous button */}
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>

                {/* Page numbers - show fewer on mobile */}
                {Array.from({ length: Math.min(window.innerWidth < 640 ? 3 : 5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - (window.innerWidth < 640 ? 2 : 4), currentPage - (window.innerWidth < 640 ? 1 : 2))) + i;
                  if (pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border transition-colors text-sm sm:text-base ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next button */}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>
            )}

            {/* No results message */}
            {filteredRooms.length === 0 && (
              <div className="text-center py-12 px-4">
                <div className="text-gray-500 text-base sm:text-lg mb-2">No rooms found</div>
                <div className="text-gray-400 text-sm sm:text-base">Try adjusting your filters to see more results</div>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSearchLayout;