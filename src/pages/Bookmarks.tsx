import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { getBookmarks, deleteBookmark } from '../services/renter.services';
import { toast, Toaster } from 'sonner';
import { MapPin, Trash2, Heart } from 'lucide-react';
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
  };
  rent: number;
  images: string[];
  availabilityStatus: string;
}

const Bookmarks: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [bookmarkedRooms, setBookmarkedRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    fetchBookmarks();
  }, [user, navigate]);

  const fetchBookmarks = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await getBookmarks(user.userId);
      console.log('Bookmarks response:', response);
      setBookmarkedRooms(response.data || []);
    } catch (error: any) {
      console.error('Error fetching bookmarks:', error);
      if (!error.message.includes('404')) {
        toast.error('Failed to load bookmarks');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (roomId: string) => {
    if (!user) return;

    try {
      await deleteBookmark(roomId, user.userId);
      setBookmarkedRooms(bookmarkedRooms.filter(room => room._id !== roomId));
      toast.success('Removed from bookmarks');
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove bookmark');
    }
  };

  const handleViewRoom = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Header />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              My Bookmarks
            </h1>
            <p className="text-gray-600">
              Rooms you've saved for later ({bookmarkedRooms.length})
            </p>
          </div>

          {bookmarkedRooms.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start exploring rooms and bookmark your favorites!
              </p>
              <button
                onClick={() => navigate('/rooms')}
                className="px-6 py-3 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white rounded-lg font-semibold hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors"
              >
                Browse Rooms
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedRooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={room.images[0] || '/placeholder-room.jpg'}
                      alt={room.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveBookmark(room._id)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          room.availabilityStatus === 'available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {room.availabilityStatus}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {room.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {room.location.city}, {room.location.state}
                      </span>
                    </div>

                    <div className="mb-3">
                      <span className="text-sm text-gray-600">
                        {room.bhk}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600">
                        ₹{room.rent.toLocaleString()}<span className="text-sm text-gray-600">/month</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewRoom(room._id)}
                      className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white rounded-lg font-semibold hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Bookmarks;
