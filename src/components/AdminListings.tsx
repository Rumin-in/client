import { useEffect, useState } from 'react';
import {
  getAllListings,
  approveListing,
  rejectListing,
  markAsBooked,
  unmarkAsBooked,
  updateListing,
  updateListingImages,
  createRoom,
  deleteListing
} from '../services/admin.services';
import { CheckCircle, XCircle, Lock, Unlock, Eye, Plus, Edit2, Trash2, X, Upload, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface Room {
  _id: string;
  title: string;
  description?: string;
  bhk?: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates?: {
      type: string;
      coordinates: number[];
    };
  };
  rent: number;
  amenities: string[];
  images: string[];
  availabilityStatus: 'available' | 'booked' | 'pending' | 'rejected';
  landlordId?: {
    _id: string;
    name: string;
    email: string;
  };
  viewsCount: number;
  availabiltyDate?: string;
}

const AMENITIES_OPTIONS = [
  'WiFi',
  'AC',
  'Parking',
  'Gym',
  'Pool',
  'Laundry',
  'Security',
  'Power Backup',
  'Water Supply',
  'Furnished',
  'Semi-Furnished',
  'Balcony',
  'Lift',
  'Garden',
];

const AdminListings = () => {
  const [listings, setListings] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bhk, setBhk] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [rent, setRent] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [availabilityStatus, setAvailabilityStatus] = useState<string>('available');
  const [availabiltyDate, setAvailabiltyDate] = useState('');

  // Image handling
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

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

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setBhk('');
    setAddress('');
    setCity('');
    setState('');
    setLatitude('');
    setLongitude('');
    setRent('');
    setAmenities([]);
    setAvailabilityStatus('available');
    setAvailabiltyDate('');
    setExistingImages([]);
    setNewImages([]);
    setImagesToDelete([]);
    setEditingRoom(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (room: Room) => {
    setEditingRoom(room);
    setTitle(room.title);
    setDescription(room.description || '');
    setBhk(room.bhk || '');
    setAddress(room.location.address);
    setCity(room.location.city);
    setState(room.location.state);
    if (room.location.coordinates?.coordinates) {
      setLongitude(room.location.coordinates.coordinates[0]?.toString() || '');
      setLatitude(room.location.coordinates.coordinates[1]?.toString() || '');
    }
    setRent(room.rent.toString());
    setAmenities(room.amenities || []);
    setAvailabilityStatus(room.availabilityStatus);
    setAvailabiltyDate(room.availabiltyDate ? room.availabiltyDate.split('T')[0] : '');
    setExistingImages(room.images || []);
    setNewImages([]);
    setImagesToDelete([]);
    setShowModal(true);
  };

  const handleAmenityToggle = (amenity: string) => {
    setAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const totalImages = existingImages.length - imagesToDelete.length + newImages.length + files.length;

      if (totalImages > 5) {
        toast.error('Maximum 5 images allowed');
        return;
      }

      // Validate file types and sizes
      const validFiles = files.filter(file => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          toast.error(`Invalid file type: ${file.name}`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`File too large: ${file.name} (max 5MB)`);
          return false;
        }
        return true;
      });

      setNewImages(prev => [...prev, ...validFiles]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const markImageForDeletion = (imageUrl: string) => {
    setImagesToDelete(prev => [...prev, imageUrl]);
    setExistingImages(prev => prev.filter(img => img !== imageUrl));
  };

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!address.trim() || !city.trim() || !state.trim()) {
      toast.error('Complete location is required');
      return;
    }
    if (!latitude || !longitude || isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
      toast.error('Valid coordinates are required');
      return;
    }
    if (!rent || isNaN(parseFloat(rent)) || parseFloat(rent) <= 0) {
      toast.error('Valid rent amount is required');
      return;
    }

    try {
      setFormLoading(true);

      if (editingRoom) {
        // Update existing room
        const updateData = {
          title: title.trim(),
          description: description.trim(),
          bhk: bhk.trim(),
          location: {
            address: address.trim(),
            city: city.trim(),
            state: state.trim(),
            coordinates: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)]
            }
          },
          rent: parseFloat(rent),
          amenities,
          availabilityStatus,
          availabiltyDate: availabiltyDate || undefined,
        };

        await updateListing(editingRoom._id, updateData);

        // Handle image deletions
        for (const imageUrl of imagesToDelete) {
          try {
            const formData = new FormData();
            formData.append('action', 'delete');
            formData.append('imageToDelete', imageUrl);
            await updateListingImages(editingRoom._id, formData);
          } catch (err) {
            console.error('Error deleting image:', err);
          }
        }

        // Handle new image uploads
        if (newImages.length > 0) {
          const formData = new FormData();
          formData.append('action', 'add');
          newImages.forEach(file => {
            formData.append('images', file);
          });
          await updateListingImages(editingRoom._id, formData);
        }

        toast.success('Room updated successfully');
      } else {
        // Create new room
        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('description', description.trim());
        formData.append('bhk', bhk.trim());
        formData.append('address', address.trim());
        formData.append('city', city.trim());
        formData.append('state', state.trim());
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('rent', rent);
        formData.append('amenities', JSON.stringify(amenities));
        formData.append('availabilityStatus', availabilityStatus);
        if (availabiltyDate) {
          formData.append('availabiltyDate', availabiltyDate);
        }

        newImages.forEach(file => {
          formData.append('images', file);
        });

        await createRoom(formData);
        toast.success('Room created successfully');
      }

      setShowModal(false);
      resetForm();
      fetchListings();
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to save room');
    } finally {
      setFormLoading(false);
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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteListing(id);
      toast.success('Listing deleted successfully');
      fetchListings();
    } catch (error: any) {
      toast.error('Failed to delete listing');
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
        <div className="flex gap-3">
          <button
            onClick={fetchListings}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white rounded-lg hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Room
          </button>
        </div>
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
                    <div className="flex flex-wrap gap-2">
                      {/* Edit button - always visible */}
                      <button
                        onClick={() => openEditModal(listing)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      {/* Delete button - always visible */}
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

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
                            className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      {listing.availabilityStatus === 'available' && (
                        <button
                          onClick={() => handleMarkBooked(listing._id)}
                          className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium"
                          title="Mark as Booked"
                        >
                          <Lock className="w-3 h-3" />
                          Book
                        </button>
                      )}
                      {listing.availabilityStatus === 'booked' && (
                        <button
                          onClick={() => handleUnmarkBooked(listing._id)}
                          className="flex items-center gap-1 px-2 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors text-xs font-medium"
                          title="Unmark as Booked"
                        >
                          <Unlock className="w-3 h-3" />
                          Unbook
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {editingRoom ? 'Edit Room' : 'Add New Room'}
              </h3>
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
                      placeholder="e.g., Spacious 2BHK Apartment"
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
                      placeholder="Describe the property..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none resize-none"
                      disabled={formLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      BHK Type
                    </label>
                    <select
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                    >
                      <option value="">Select BHK</option>
                      <option value="1 RK">1 RK</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                      <option value="4+ BHK">4+ BHK</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rent (₹/month) *
                    </label>
                    <input
                      type="number"
                      value={rent}
                      onChange={(e) => setRent(e.target.value)}
                      placeholder="e.g., 15000"
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
                      <option value="booked">Booked</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available From
                    </label>
                    <input
                      type="date"
                      value={availabiltyDate}
                      onChange={(e) => setAvailabiltyDate(e.target.value)}
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
                      placeholder="Street address"
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
                      placeholder="e.g., Mumbai"
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
                      placeholder="e.g., Maharashtra"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Latitude *
                    </label>
                    <input
                      type="text"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      placeholder="e.g., 19.0760"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                      disabled={formLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Longitude *
                    </label>
                    <input
                      type="text"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      placeholder="e.g., 72.8777"
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

              {/* Images */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Images (Max 5)
                </h4>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Current Images:</p>
                    <div className="flex flex-wrap gap-3">
                      {existingImages.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img}
                            alt={`Room ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => markImageForDeletion(img)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            disabled={formLoading}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Preview */}
                {newImages.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">New Images:</p>
                    <div className="flex flex-wrap gap-3">
                      {newImages.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`New ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border border-green-300"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            disabled={formLoading}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <div>
                  <label className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0085FE] transition-colors ${formLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Click to upload images</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={formLoading}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported: JPEG, PNG, WEBP (Max 5MB each)
                  </p>
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
                {formLoading ? 'Saving...' : (editingRoom ? 'Update Room' : 'Create Room')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListings;
