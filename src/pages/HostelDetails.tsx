import React, { useState, useEffect } from 'react';
import {
  Wifi,
  ChevronLeft,
  MapPin,
  Calendar,
  Eye,
  Share2,
  Bookmark,
  Star,
  Shield,
  Car,
  Building,
  ChevronRight,
  CheckCircle,
  Users,
  Home,
  Utensils
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHostelById } from '../services/hostels.services';
import { interestRoom } from '../services/renter.services';
import { bookmarkRoom, deleteBookmark } from '../services/renter.services';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Hostel {
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
    coordinates: {
      type: string;
      coordinates: number[];
    };
  };
  rentPerBed: number;
  amenities: string[];
  images: string[];
  availabilityStatus: string;
  adminId: {
    _id: string;
    name: string;
    email: string;
  };
  viewsCount: number;
  availabilityDate: string;
  bookmarks: string[];
  feedbacks: Array<{
    userId: {
      _id: string;
      name: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
  showReviews?: boolean;
  adminRating?: number | null;
  facilities?: {
    food?: boolean;
    laundry?: boolean;
    cleaning?: boolean;
  };
}

const HostelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasExpressedInterest, setHasExpressedInterest] = useState(false);
  const [showInterestPopup, setShowInterestPopup] = useState(false);

  useEffect(() => {
    if (id) {
      fetchHostelDetails();
    }
  }, [id]);

  const fetchHostelDetails = async () => {
    try {
      setLoading(true);
      const response = await getHostelById(id!);
      const hostelData = response.data.hostel || response.data;
      setHostel(hostelData);

      if (user && hostelData.bookmarks) {
        setIsBookmarked(hostelData.bookmarks.includes(user.userId));
      }
    } catch (error: any) {
      console.error("Error fetching hostel:", error);
      toast.error("Failed to load hostel details");
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please login to bookmark hostels");
      navigate("/signin");
      return;
    }

    try {
      if (isBookmarked) {
        await deleteBookmark(id!, user.userId);
        setIsBookmarked(false);
        toast.success("Removed from bookmarks");
      } else {
        await bookmarkRoom(id!, user.userId);
        setIsBookmarked(true);
        toast.success("Added to bookmarks");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update bookmark");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hostel?.title,
        text: `Check out this hostel: ${hostel?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleExpressInterest = async () => {
    if (!user) {
      toast.error("Please login to express interest");
      navigate("/signin");
      return;
    }

    try {
      await interestRoom(id!, 'visit', user.userId, undefined, 'hostel');
      setHasExpressedInterest(true);
      setShowInterestPopup(true);
    } catch (error: any) {
      if (error.message.includes("already recorded")) {
        setHasExpressedInterest(true);
        toast.info("You have already expressed interest in this hostel");
      } else {
        toast.error(error.message || "Failed to record interest");
      }
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return Wifi;
    if (lower.includes('parking')) return Car;
    if (lower.includes('security') || lower.includes('cctv')) return Shield;
    if (lower.includes('food')) return Utensils;
    return Building;
  };

  const calculateAverageRating = () => {
    if (!hostel?.feedbacks || hostel.feedbacks.length === 0) return 0;
    const sum = hostel.feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return (sum / hostel.feedbacks.length).toFixed(1);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  if (!hostel) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hostel not found</h2>
          <button
            onClick={() => navigate('/hostels')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Hostels
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Image Gallery */}
          <div className="relative bg-black">
            <img
              src={hostel.images[currentImage] || 'https://via.placeholder.com/800x600?text=No+Image'}
              alt={hostel.title}
              className="w-full h-96 md:h-[500px] object-cover"
            />

            {hostel.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage(prev => prev === 0 ? hostel.images.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={() => setCurrentImage(prev => prev === hostel.images.length - 1 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentImage + 1} / {hostel.images.length}
            </div>

            <button
              onClick={() => navigate('/hostels')}
              className="absolute top-4 left-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Main Content */}
          <div className="px-4 md:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title and Actions */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{hostel.title}</h1>
                      <div className="flex items-center text-gray-600 gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{hostel.location.address}, {hostel.location.city}, {hostel.location.state}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleShare}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleBookmark}
                        className={`p-2 rounded-full border ${isBookmarked ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Hostel Type Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                      <Users className="w-4 h-4" />
                      {hostel.hostelType} Hostel
                    </span>
                    {hostel.showReviews && hostel.adminRating && (
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{hostel.adminRating}</span>
                      </div>
                    )}
                  </div>

                  {/* Beds Info */}
                  <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Total Beds</p>
                        <p className="text-lg font-semibold">{hostel.totalBeds}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Available Beds</p>
                        <p className="text-lg font-semibold text-green-600">{hostel.availableBeds}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">About this Hostel</h2>
                  <p className="text-gray-700 leading-relaxed">{hostel.description}</p>
                </div>

                {/* Amenities */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hostel.amenities.map((amenity, index) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Facilities */}
                {hostel.facilities && (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">Facilities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hostel.facilities.food && (
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <Utensils className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">Food Included</span>
                        </div>
                      )}
                      {hostel.facilities.laundry && (
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">Laundry Service</span>
                        </div>
                      )}
                      {hostel.facilities.cleaning && (
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">Cleaning Service</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Additional Info</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Eye className="w-5 h-5" />
                      <span>{hostel.viewsCount} views</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span>Available from {new Date(hostel.availabilityDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Card */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      ₹{hostel.rentPerBed.toLocaleString()}
                    </div>
                    <div className="text-gray-600">per bed / month</div>
                  </div>

                  <button
                    onClick={handleExpressInterest}
                    disabled={hasExpressedInterest}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors mb-4 ${
                      hasExpressedInterest
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {hasExpressedInterest ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Interest Recorded
                      </span>
                    ) : (
                      'Express Interest'
                    )}
                  </button>

                  <div className="border-t pt-4 space-y-3 text-sm text-gray-600">
                    <p>✓ Verified hostel listing</p>
                    <p>✓ Safe and secure accommodation</p>
                    <p>✓ Easy booking process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interest Success Popup */}
      {showInterestPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowInterestPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Interest Recorded!</h3>
              <p className="text-gray-600 mb-6">
                The hostel admin has been notified of your interest. They will contact you soon.
              </p>
              <button
                onClick={() => setShowInterestPopup(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default HostelDetails;
