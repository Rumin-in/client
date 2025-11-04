import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { getLandlordRooms } from '../services/landlord.services';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Plus, Home, MapPin, DollarSign, Calendar, LogOut, Loader } from 'lucide-react';

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

const LandlordDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my-rooms' | 'submit-room'>('my-rooms');

  // Check if user is landlord
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || user?.role !== 'landlord') {
      toast.error('Unauthorized access. Please login as landlord.');
      navigate('/signin');
      return;
    }

    fetchRooms();
  }, [navigate, user?.role]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await getLandlordRooms();
      setRooms(response.data.rooms || []);
    } catch (error: any) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    navigate('/');
    toast.success('Logged out successfully');
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
        {/* Header with Rumin Logo */}
        <div className="bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/rumin-logo.png"
                alt="Rumin Logo"
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold">Landlord Dashboard</h1>
                <p className="text-blue-100 text-sm">Manage your room listings</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{user?.name || 'Landlord'}</p>
                <p className="text-blue-100 text-sm">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('my-rooms')}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'my-rooms'
                    ? 'border-[#0085FE] text-[#0085FE]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  My Rooms ({rooms.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('submit-room')}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'submit-room'
                    ? 'border-[#0085FE] text-[#0085FE]'
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

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'my-rooms' ? (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Rooms</h2>
                <p className="text-gray-600">
                  Manage and track the status of your submitted room listings
                </p>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="flex flex-col items-center gap-4">
                    <Loader className="w-12 h-12 text-[#0085FE] animate-spin" />
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
                    onClick={() => setActiveTab('submit-room')}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white px-6 py-3 rounded-lg hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors font-semibold"
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

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-[#0085FE]" />
                            <span className="line-clamp-1">
                              {room.location.city}, {room.location.state}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-gray-900">
                              ₹{room.rent.toLocaleString()}/month
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Home className="w-4 h-4 text-[#0085FE]" />
                            <span>{room.bhk || 'N/A'}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-[#0085FE]" />
                            <span>
                              {new Date(room.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {room.amenities && room.amenities.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-700 mb-2">
                              Amenities:
                            </p>
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

                        <button
                          onClick={() => navigate(`/room/${room._id}`)}
                          className="w-full bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white py-2 rounded-lg hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors font-semibold"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit New Room</h2>
                <p className="text-gray-600">
                  Add a new property to your listings
                </p>
              </div>

              {/* Iframe or redirect to submit room form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center py-12">
                  <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Submit a New Room
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Click the button below to fill out the room submission form with all details and images.
                  </p>
                  <button
                    onClick={() => navigate('/submit-room')}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white px-8 py-3 rounded-lg hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors font-semibold"
                  >
                    <Plus className="w-5 h-5" />
                    Go to Submit Room Form
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LandlordDashboard;
