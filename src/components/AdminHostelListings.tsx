import { useEffect, useState } from 'react';
import {
  getAllHostelsForAdmin,
  updateHostel,
  deleteHostel,
} from '../services/hostels.services';
import { CheckCircle, XCircle, Eye, Plus, Edit2, Trash2, X, MapPin, Star, Users, Home } from 'lucide-react';
import { toast } from 'sonner';

interface Hostel {
  _id: string;
  title: string;
  description?: string;
  hostelType: string;
  totalBeds: number;
  availableBeds: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates?: {
      type: string;
      coordinates: number[];
    };
  };
  rentPerBed: number;
  amenities: string[];
  images: string[];
  availabilityStatus: 'available' | 'pending' | 'rejected';
  adminId?: {
    _id: string;
    name: string;
    email: string;
  };
  viewsCount: number;
  availabilityDate?: string;
  showReviews?: boolean;
  adminRating?: number | null;
  facilities?: {
    food?: boolean;
    laundry?: boolean;
    cleaning?: boolean;
  };
}

const AMENITIES_OPTIONS = [
  'WiFi',
  'AC',
  'Parking',
  'Security',
  'CCTV',
  'Water Supply',
  'Power Backup',
  'Common Room',
  'Study Room',
  'Locker',
];

const AdminHostelListings = ({ onAddHostel }: { onAddHostel: () => void }) => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingHostel, setEditingHostel] = useState<Hostel | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hostelType, setHostelType] = useState('Boys');
  const [totalBeds, setTotalBeds] = useState('');
  const [availableBeds, setAvailableBeds] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [rentPerBed, setRentPerBed] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [availabilityStatus, setAvailabilityStatus] = useState<string>('available');
  const [availabilityDate, setAvailabilityDate] = useState('');
  const [facilities, setFacilities] = useState({
    food: false,
    laundry: false,
    cleaning: false,
  });

  // Rating modal states
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingHostel, setRatingHostel] = useState<Hostel | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [ratingLoading, setRatingLoading] = useState(false);

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      setLoading(true);
      const response = await getAllHostelsForAdmin();
      setHostels(response.data || []);
    } catch (error: any) {
      toast.error('Failed to fetch hostels');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setHostelType('Boys');
    setTotalBeds('');
    setAvailableBeds('');
    setAddress('');
    setCity('');
    setState('');
    setRentPerBed('');
    setAmenities([]);
    setAvailabilityStatus('available');
    setAvailabilityDate('');
    setFacilities({ food: false, laundry: false, cleaning: false });
    setEditingHostel(null);
  };

  const openEditModal = (hostel: Hostel) => {
    setEditingHostel(hostel);
    setTitle(hostel.title);
    setDescription(hostel.description || '');
    setHostelType(hostel.hostelType);
    setTotalBeds(hostel.totalBeds.toString());
    setAvailableBeds(hostel.availableBeds.toString());
    setAddress(hostel.location.address);
    setCity(hostel.location.city);
    setState(hostel.location.state);
    setRentPerBed(hostel.rentPerBed.toString());
    setAmenities(hostel.amenities || []);
    setAvailabilityStatus(hostel.availabilityStatus);
    setAvailabilityDate(hostel.availabilityDate ? hostel.availabilityDate.split('T')[0] : '');
    setFacilities({
      food: hostel.facilities?.food ?? false,
      laundry: hostel.facilities?.laundry ?? false,
      cleaning: hostel.facilities?.cleaning ?? false,
    });
    setShowModal(true);
  };

  const handleAmenityToggle = (amenity: string) => {
    setAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!address.trim() || !city.trim() || !state.trim()) {
      toast.error('Complete location is required');
      return;
    }
    if (!rentPerBed || isNaN(parseFloat(rentPerBed)) || parseFloat(rentPerBed) <= 0) {
      toast.error('Valid rent amount is required');
      return;
    }

    try {
      setFormLoading(true);

      if (editingHostel) {
        const updateData = {
          title: title.trim(),
          description: description.trim(),
          hostelType,
          totalBeds: parseInt(totalBeds),
          availableBeds: parseInt(availableBeds),
          location: {
            address: address.trim(),
            city: city.trim(),
            state: state.trim(),
            coordinates: editingHostel.location.coordinates
          },
          rentPerBed: parseFloat(rentPerBed),
          amenities,
          availabilityStatus,
          availabilityDate: availabilityDate || undefined,
          facilities,
        };

        await updateHostel(editingHostel._id, updateData);
        toast.success('Hostel updated successfully');
      }

      setShowModal(false);
      resetForm();
      fetchHostels();
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to save hostel');
    } finally {
      setFormLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await updateHostel(id, { availabilityStatus: 'available' });
      toast.success('Hostel approved successfully');
      fetchHostels();
    } catch (error: any) {
      toast.error('Failed to approve hostel');
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateHostel(id, { availabilityStatus: 'rejected' });
      toast.success('Hostel rejected');
      fetchHostels();
    } catch (error: any) {
      toast.error('Failed to reject hostel');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this hostel? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteHostel(id);
      toast.success('Hostel deleted successfully');
      fetchHostels();
    } catch (error: any) {
      toast.error('Failed to delete hostel');
      console.error(error);
    }
  };

  const openRatingModal = (hostel: Hostel) => {
    setRatingHostel(hostel);
    setSelectedRating(hostel.adminRating || 5);
    setShowRatingModal(true);
  };

  const handleSetRatingAndShow = async () => {
    if (!ratingHostel) return;

    try {
      setRatingLoading(true);
      await updateHostel(ratingHostel._id, {
        adminRating: selectedRating,
        showReviews: true
      });
      toast.success(`Rating set to ${selectedRating} stars and made visible`);
      setShowRatingModal(false);
      setRatingHostel(null);
      fetchHostels();
    } catch (error: any) {
      toast.error('Failed to update rating');
      console.error(error);
    } finally {
      setRatingLoading(false);
    }
  };

  const handleHideRating = async (id: string) => {
    try {
      await updateHostel(id, { showReviews: false });
      toast.success('Rating hidden');
      fetchHostels();
    } catch (error: any) {
      toast.error('Failed to hide rating');
      console.error(error);
    }
  };

  const filteredHostels = hostels.filter((hostel) => {
    if (filter === 'all') return true;
    return hostel.availabilityStatus === filter;
  });

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
          <h2 className="text-2xl font-bold text-gray-800">Hostel Listings</h2>
          <p className="text-gray-600 mt-1">Manage all hostel listings</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchHostels}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={onAddHostel}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white rounded-lg hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Hostel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {['all', 'pending', 'available', 'rejected'].map((status) => (
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

      {/* Hostels Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hostel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beds
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rent/Bed
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
              {filteredHostels.map((hostel) => (
                <tr key={hostel._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {hostel.images && hostel.images[0] ? (
                        <img
                          src={hostel.images[0]}
                          alt={hostel.title}
                          className="w-12 h-12 rounded object-cover mr-3"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-hostel.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-200 mr-3 flex items-center justify-center">
                          <Home className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{hostel.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {hostel.hostelType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{hostel.location?.city || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{hostel.location?.state || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{hostel.availableBeds}/{hostel.totalBeds}</div>
                    <div className="text-xs text-gray-500">available</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ₹{hostel.rentPerBed?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        hostel.availabilityStatus
                      )}`}
                    >
                      {hostel.availabilityStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {hostel.viewsCount || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openEditModal(hostel)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => handleDelete(hostel._id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      {hostel.showReviews ? (
                        <button
                          onClick={() => handleHideRating(hostel._id)}
                          className="p-1 rounded flex items-center gap-1 text-xs font-medium text-green-600 hover:bg-green-50"
                          title="Click to Hide Rating"
                        >
                          <Eye className="w-4 h-4" />
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{hostel.adminRating || '-'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => openRatingModal(hostel)}
                          className="p-1 rounded flex items-center gap-1 text-xs font-medium text-gray-500 hover:bg-gray-50"
                          title="Click to Set Rating & Show"
                        >
                          <Star className="w-4 h-4" />
                          <span>Set Rating</span>
                        </button>
                      )}

                      {hostel.availabilityStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(hostel._id)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(hostel._id)}
                            className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHostels.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hostels found
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && editingHostel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Edit Hostel</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2">Basic Information</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none resize-none"
                      disabled={formLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hostel Type
                    </label>
                    <select
                      value={hostelType}
                      onChange={(e) => setHostelType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                    >
                      <option value="Boys">Boys</option>
                      <option value="Girls">Girls</option>
                      <option value="Co-ed">Co-ed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rent per Bed (₹/month) *
                    </label>
                    <input
                      type="number"
                      value={rentPerBed}
                      onChange={(e) => setRentPerBed(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Beds
                    </label>
                    <input
                      type="number"
                      value={totalBeds}
                      onChange={(e) => setTotalBeds(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Beds
                    </label>
                    <input
                      type="number"
                      value={availableBeds}
                      onChange={(e) => setAvailableBeds(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={availabilityStatus}
                      onChange={(e) => setAvailabilityStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                    >
                      <option value="available">Available</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available From
                    </label>
                    <input
                      type="date"
                      value={availabilityDate}
                      onChange={(e) => setAvailabilityDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES_OPTIONS.map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => handleAmenityToggle(amenity)}
                      disabled={formLoading}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        amenities.includes(amenity)
                          ? 'bg-[#0085FE] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2">Facilities</h4>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={facilities.food}
                      onChange={(e) => setFacilities({ ...facilities, food: e.target.checked })}
                      className="w-4 h-4 text-blue-600"
                      disabled={formLoading}
                    />
                    <span>Food Included</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={facilities.laundry}
                      onChange={(e) => setFacilities({ ...facilities, laundry: e.target.checked })}
                      className="w-4 h-4 text-blue-600"
                      disabled={formLoading}
                    />
                    <span>Laundry Service</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={facilities.cleaning}
                      onChange={(e) => setFacilities({ ...facilities, cleaning: e.target.checked })}
                      className="w-4 h-4 text-blue-600"
                      disabled={formLoading}
                    />
                    <span>Cleaning Service</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                disabled={formLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={formLoading}
                className={`flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-colors ${
                  formLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#89B4DB] to-[#0085FE] hover:from-[#7AA3CA] hover:to-[#0074DD]'
                }`}
              >
                {formLoading ? 'Saving...' : 'Update Hostel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && ratingHostel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Set Rating</h3>
              <button
                onClick={() => {
                  setShowRatingModal(false);
                  setRatingHostel(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              Set rating for <span className="font-semibold">{ratingHostel.title}</span>
            </p>

            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                  disabled={ratingLoading}
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= selectedRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="text-center text-gray-700 mb-6">
              Selected: <span className="font-bold text-lg">{selectedRating}</span> star{selectedRating > 1 ? 's' : ''}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRatingModal(false);
                  setRatingHostel(null);
                }}
                disabled={ratingLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSetRatingAndShow}
                disabled={ratingLoading}
                className={`flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-colors ${
                  ratingLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#89B4DB] to-[#0085FE] hover:from-[#7AA3CA] hover:to-[#0074DD]'
                }`}
              >
                {ratingLoading ? 'Saving...' : 'Set & Make Visible'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHostelListings;
