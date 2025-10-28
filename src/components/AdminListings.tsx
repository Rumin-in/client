import { useEffect, useState } from 'react';
import { getAllListings, approveListing, rejectListing, markAsBooked, unmarkAsBooked } from '../services/admin.services';
import { CheckCircle, XCircle, Lock, Unlock, Eye } from 'lucide-react';
import { toast } from 'sonner';

const AdminListings = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await getAllListings();
      setListings(response.data.listings || []);
    } catch (error: any) {
      toast.error('Failed to fetch listings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveListing(id);
      toast.success('Listing approved successfully');
      fetchListings();
    } catch (error: any) {
      toast.error('Failed to approve listing');
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectListing(id);
      toast.success('Listing rejected');
      fetchListings();
    } catch (error: any) {
      toast.error('Failed to reject listing');
      console.error(error);
    }
  };

  const handleMarkBooked = async (id: string) => {
    try {
      await markAsBooked(id);
      toast.success('Listing marked as booked');
      fetchListings();
    } catch (error: any) {
      toast.error('Failed to mark as booked');
      console.error(error);
    }
  };

  const handleUnmarkBooked = async (id: string) => {
    try {
      await unmarkAsBooked(id);
      toast.success('Listing unmarked as booked');
      fetchListings();
    } catch (error: any) {
      toast.error('Failed to unmark as booked');
      console.error(error);
    }
  };

  const filteredListings = listings.filter((listing) => {
    if (filter === 'all') return true;
    return listing.availabilityStatus === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'booked':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Room Listings</h2>
          <p className="text-gray-600 mt-1">Manage all property listings</p>
        </div>
        <button
          onClick={fetchListings}
          className="px-4 py-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white rounded-lg hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {['all', 'pending', 'available', 'rejected', 'booked'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              filter === status
                ? 'bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Landlord
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredListings.map((listing) => (
                <tr key={listing._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {listing.images && listing.images[0] && (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-12 h-12 rounded object-cover mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                        <div className="text-sm text-gray-500">{listing.bhk || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{listing.landlordId?.name || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{listing.landlordId?.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{listing.location?.city || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{listing.location?.state || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ₹{listing.rent?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        listing.availabilityStatus
                      )}`}
                    >
                      {listing.availabilityStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {listing.viewsCount || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {listing.availabilityStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(listing._id)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(listing._id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      {listing.availabilityStatus === 'available' && (
                        <button
                          onClick={() => handleMarkBooked(listing._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          title="Mark as Booked"
                        >
                          <Lock className="w-4 h-4" />
                          Mark as Booked
                        </button>
                      )}
                      {listing.availabilityStatus === 'booked' && (
                        <button
                          onClick={() => handleUnmarkBooked(listing._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                          title="Unmark as Booked"
                        >
                          <Unlock className="w-4 h-4" />
                          Unmark Booked
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No listings found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminListings;
