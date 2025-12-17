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
  Droplet,
  Zap,
  Car,
  Package,
  Building,
  ChevronRight,
  Heart,
  X,
  CheckCircle
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomById } from '../services/rooms.services';
import { interestRoom } from '../services/renter.services';
import { bookmarkRoom, deleteBookmark } from '../services/renter.services';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Room {
  _id: string;
  title: string;
  description: string;
  bhk: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      type: string;
      coordinates: number[];
    };
  };
  rent: number;
  amenities: string[];
  images: string[];
  availabilityStatus: string;
  landlordId: {
    _id: string;
    name: string;
    email: string;
    mobileNo: string;
  };
  viewsCount: number;
  availabiltyDate: string;
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
}

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasExpressedInterest, setHasExpressedInterest] = useState(false);
  const [showInterestPopup, setShowInterestPopup] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRoomDetails();
    }
  }, [id]);

  const fetchRoomDetails = async () => {
    try {
      setLoading(true);
      const response = await getRoomById(id!);
      console.log("Room details:", response);
      const roomData = response.data.room || response.data;
      setRoom(roomData);
      
      // Check if user has bookmarked this room
      if (user && roomData.bookmarks) {
        setIsBookmarked(roomData.bookmarks.includes(user.userId));
      }
    } catch (error: any) {
      console.error("Error fetching room:", error);
      toast.error("Failed to load room details");
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please login to bookmark rooms");
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
        title: room?.title,
        text: `Check out this room: ${room?.title}`,
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
      await interestRoom(id!, 'visit', user.userId, undefined, 'room');
      setHasExpressedInterest(true);
      setShowInterestPopup(true);
    } catch (error: any) {
      if (error.message.includes("already recorded")) {
        setHasExpressedInterest(true);
        toast.info("You have already expressed interest in this room");
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
    if (lower.includes('water')) return Droplet;
    if (lower.includes('power') || lower.includes('backup')) return Zap;
    if (lower.includes('lift')) return Building;
    return Package;
  };

  const calculateAverageRating = () => {
    if (!room?.feedbacks || room.feedbacks.length === 0) return 0;
    const sum = room.feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return (sum / room.feedbacks.length).toFixed(1);
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

  if (!room) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Room not found</h2>
          <button
            onClick={() => navigate('/rooms')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Rooms
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
              src={room.images[currentImage] || 'https://via.placeholder.com/800x600?text=No+Image'} 
              alt={room.title} 
              className="w-full h-96 md:h-[500px] object-cover"
            />
            
            {/* Navigation Arrows */}
            {room.images.length > 1 && (
              <>
                <button 
                  onClick={() => setCurrentImage(prev => prev === 0 ? room.images.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button 
                  onClick={() => setCurrentImage(prev => prev === room.images.length - 1 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentImage + 1} / {room.images.length}
            </div>

            {/* Thumbnail Gallery */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
              {room.images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative w-16 h-16 md:w-20 md:h-16 rounded-lg overflow-hidden transition-all ${
                    currentImage === idx ? 'ring-2 ring-white scale-110' : 'opacity-70'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
              {room.images.length > 5 && (
                <div className="w-16 h-16 md:w-20 md:h-16 bg-black/50 rounded-lg flex items-center justify-center text-white text-xs">
                  +{room.images.length - 5}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6">
            {/* Left Column - Room Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Basic Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{room.title}</h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{room.location.address}, {room.location.city}, {room.location.state}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {room.viewsCount} views
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Available from {new Date(room.availabiltyDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      title="Share"
                    >
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={handleBookmark}
                      className={`p-2 border rounded-lg ${
                        isBookmarked ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-600'}`} />
                    </button>
                  </div>
                </div>

                {/* Status and BHK */}
                <div className="flex gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    room.availabilityStatus === 'available' ? 'bg-green-100 text-green-800' :
                    room.availabilityStatus === 'booked' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {room.availabilityStatus.charAt(0).toUpperCase() + room.availabilityStatus.slice(1)}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {room.bhk}
                  </span>
                </div>
              </div>

              {/* Description */}
              {room.description && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{room.description}</p>
                </div>
              )}

              {/* Amenities */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities.map((amenity, idx) => {
                    const Icon = getAmenityIcon(amenity);
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="bg-blue-100 rounded-full p-2">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Admin Rating */}
              {room.showReviews && room.adminRating && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Rating</h2>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < room.adminRating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xl font-bold ml-2">{room.adminRating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* User Reviews (only if showReviews is true and there are feedbacks) */}
              {room.showReviews && room.feedbacks && room.feedbacks.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">User Reviews</h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold">{calculateAverageRating()}</span>
                      <span className="text-gray-500">({room.feedbacks.length} reviews)</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {room.feedbacks.map((feedback, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {feedback.userId.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-900">{feedback.userId.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {feedback.comment && (
                          <p className="text-gray-700 text-sm">{feedback.comment}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Pricing and Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                {/* Pricing Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 text-sm mb-1">Monthly Rent</p>
                    <p className="text-4xl font-bold text-blue-600">₹{room.rent.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">per month</p>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Room Type</span>
                      <span className="font-medium text-gray-900">{room.bhk}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Status</span>
                      <span className={`font-medium ${
                        room.availabilityStatus === 'available' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {room.availabilityStatus.charAt(0).toUpperCase() + room.availabilityStatus.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Listed On</span>
                      <span className="font-medium text-gray-900">
                        {new Date(room.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Interested Button */}
                  <button
                    onClick={handleExpressInterest}
                    disabled={room.availabilityStatus !== 'available' || hasExpressedInterest}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                      hasExpressedInterest
                        ? 'bg-green-600 text-white cursor-default'
                        : room.availabilityStatus === 'available'
                        ? 'bg-gradient-to-r from-[#89B4DB] to-[#0085FE] hover:from-[#7AA3CA] hover:to-[#0074DD] text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${hasExpressedInterest ? 'fill-white' : ''}`} />
                    {hasExpressedInterest 
                      ? 'Interest Recorded' 
                      : room.availabilityStatus === 'available' 
                      ? 'Interested' 
                      : 'Not Available'}
                  </button>
                </div>

                {/* Landlord Info - Hidden as per user request */}
                {/* <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Landlord Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{room.landlordId.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a href={`mailto:${room.landlordId.email}`} className="text-blue-600 hover:underline">
                        {room.landlordId.email}
                      </a>
                    </div>
                    {room.landlordId.mobileNo && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <a href={`tel:${room.landlordId.mobileNo}`} className="text-blue-600 hover:underline">
                          {room.landlordId.mobileNo}
                        </a>
                      </div>
                    )}
                  </div>
                </div> */}

                {/* Location Map Placeholder */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">{room.location.city}, {room.location.state}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interest Recorded Popup */}
      {showInterestPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowInterestPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">Interest Recorded!</h3>

              <p className="text-gray-600 mb-4">
                Your interest has been recorded for <span className="font-semibold text-gray-800">{room?.title}</span>.
              </p>

              <p className="text-gray-500 text-sm mb-6">
                Our team will contact you soon with more details about this property.
              </p>

              <button
                onClick={() => setShowInterestPopup(false)}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default RoomDetails;