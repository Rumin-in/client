import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Calendar, User, Mail, Phone, Home } from 'lucide-react';
import { getAllInterests } from '../services/admin.services';
import { toast } from 'sonner';

interface Interest {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    mobileNo: string;
  };
  roomId: {
    _id: string;
    title: string;
    location: {
      address: string;
      city: string;
      state: string;
    };
    rent: number;
    bhk: string;
    images: string[];
    availabilityStatus: string;
  };
  type: 'visit' | 'book';
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const AdminInterests: React.FC = () => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    try {
      setLoading(true);
      const response = await getAllInterests();
      console.log("Interests response:", response);
      setInterests(response.data.interests || []);
    } catch (error: any) {
      console.error("Error fetching interests:", error);
      if (!error.message.includes("404")) {
        toast.error("Failed to load interests");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredInterests = interests.filter((interest) => {
    const statusMatch = statusFilter === 'all' || interest.status === statusFilter;
    return statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Interests</h1>
        <p className="text-gray-600">
          Manage and track user interests for room visits and bookings
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Interests
            </label>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white rounded-lg font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5" />
                {interests.length} Interests
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interests List */}
      {filteredInterests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No interests found</h3>
          <p className="text-gray-600">
            No user interests have been recorded yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInterests
            .filter(interest => interest.userId && interest.roomId)
            .map((interest) => {
            return (
              <div
                key={interest._id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Room Information */}
                  <div className="lg:col-span-1">
                    <div className="flex items-start gap-4">
                      <img
                        src={interest.roomId.images[0] || '/placeholder-room.jpg'}
                        alt={interest.roomId.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">
                          {interest.roomId.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {interest.roomId.location.city}, {interest.roomId.location.state}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Home className="w-4 h-4" />
                          <span>{interest.roomId.bhk}</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ₹{interest.roomId.rent.toLocaleString()}/month
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Information */}
                  <div className="lg:col-span-1">
                    <h4 className="font-semibold text-gray-900 mb-3">User Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{interest.userId.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a
                          href={`mailto:${interest.userId.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {interest.userId.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a
                          href={`tel:${interest.userId.mobileNo}`}
                          className="text-blue-600 hover:underline"
                        >
                          {interest.userId.mobileNo}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Interest Details */}
                  <div className="lg:col-span-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Interest Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white"
                        >
                          <Heart className="w-3 h-3" />
                          Interested
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            interest.status
                          )}`}
                        >
                          {interest.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(interest.createdAt).toLocaleDateString()}</span>
                      </div>
                      {interest.notes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                          <strong>Notes:</strong> {interest.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminInterests;
