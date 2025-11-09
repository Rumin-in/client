import { useState, useEffect } from 'react';
import { Plus, Home } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import DashboardMain from "../components/DashboardMain";
import SubmitRoomForm from "../components/SubmitRoomForm";
import { getLandlordRooms } from '../services/landlord.services';
import { scrollToTop } from '../utils/scrollToTop';

interface Room {
  _id: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
  };
  rent: number;
  bhk: string;
  images: string[];
  availabilityStatus: string;
  availabiltyDate: string;
  amenities: string[];
  createdAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useSelector((state: RootState) => state.auth.user);
  
  // Get tab from URL query param, default to 'my-rooms'
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'my-rooms' | 'submit-room'>(
    (tabParam as 'my-rooms' | 'submit-room') || 'my-rooms'
  );
  
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch landlord rooms if user is landlord
  useEffect(() => {
    if (user?.role === 'landlord') {
      fetchRooms();
    } else {
      // For renters - show original dashboard
    }
  }, [user?.role]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await getLandlordRooms();
      setRooms(response.data.rooms || []);
    } catch (error: any) {
      console.error('Error fetching rooms:', error);
      if (error.response?.status !== 404) {
        toast.error('Failed to load rooms');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSubmitSuccess = () => {
    fetchRooms();
    setActiveTab('my-rooms');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // For renter users - show original dashboard
  if (user?.role !== 'landlord') {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <ProfileHeader />
          <DashboardMain />
        </div>
      </div>
    );
  }

  // For landlord users - show only my rooms and submit room
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #e5e7eb',
          },
        }}
      />

      <div className="min-h-screen bg-gray-50">
        <ProfileHeader />
        
        {/* Landlord Dashboard Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('my-rooms')}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'my-rooms'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  My Rooms ({rooms.length})
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab('submit-room');
                  scrollToTop();
                }}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'submit-room'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Submit New Room
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <main className="p-6 flex-1 bg-gray-50 overflow-auto">
          {activeTab === 'my-rooms' && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Rooms</h2>
                <p className="text-gray-600">
                  Manage and track the status of your submitted room listings
                </p>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your rooms...</p>
                  </div>
                </div>
              ) : rooms.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No rooms submitted yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start by submitting your first room listing
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('submit-room');
                      scrollToTop();
                    }}
                    className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                  >
                    <Plus className="w-5 h-5" />
                    Submit Your First Room
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rooms.map((room) => (
                    <div
                      key={room._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Room Image */}
                      <div className="relative h-48 bg-gray-200 overflow-hidden">
                        {room.images && room.images.length > 0 ? (
                          <img
                            src={room.images[0]}
                            alt={room.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300">
                            <Home className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              room.availabilityStatus
                            )}`}
                          >
                            {room.availabilityStatus.charAt(0).toUpperCase() +
                              room.availabilityStatus.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Room Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {room.title}
                        </h3>

                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                          <p className="line-clamp-1">
                            📍 {room.location.city}, {room.location.state}
                          </p>
                          <p className="font-semibold text-green-600">
                            ₹{room.rent.toLocaleString()}/month
                          </p>
                          <p>🏠 {room.bhk || 'N/A'}</p>
                          <p>📅 {new Date(room.createdAt).toLocaleDateString()}</p>
                        </div>

                        {room.amenities && room.amenities.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.slice(0, 3).map((amenity, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                                >
                                  {amenity}
                                </span>
                              ))}
                              {room.amenities.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  +{room.amenities.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/room/${room._id}`)}
                            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              // TODO: Open edit modal
                              toast.error('Edit feature coming soon');
                            }}
                            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'submit-room' && (
            <div className="w-full">
              <div className="mb-6 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit New Room</h2>
                <p className="text-gray-600">
                  Add a new property to your listings
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto">
                <SubmitRoomForm onSuccess={handleRoomSubmitSuccess} />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
