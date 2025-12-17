import { useState } from 'react';
import { Building, MapPin, DollarSign, Calendar, Upload, X, Users } from 'lucide-react';
import { toast } from 'sonner';
import { createHostel } from '../services/hostels.services';

interface SubmitHostelFormProps {
  onSuccess?: () => void;
}

const SubmitHostelForm = ({ onSuccess }: SubmitHostelFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hostelType, setHostelType] = useState('Boys');
  const [totalBeds, setTotalBeds] = useState('');
  const [availableBeds, setAvailableBeds] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bhopal');
  const [state, setState] = useState('');
  const [rentPerBed, setRentPerBed] = useState('');
  const [availabilityDate, setAvailabilityDate] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [facilities, setFacilities] = useState({
    food: false,
    laundry: false,
    cleaning: false,
  });
  const [adminRating, setAdminRating] = useState('');

  const availableAmenities = [
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

  const hostelTypes = ['Boys', 'Girls', 'Co-ed'];

  const handleAmenityToggle = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    if (images.length + fileArray.length > 5) {
      toast.error('You can upload a maximum of 5 images');
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      toast.error('Only JPEG, JPG, PNG, and WEBP images are allowed');
      return;
    }

    const oversizedFiles = fileArray.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('Each image must be less than 5MB');
      return;
    }

    setImages([...images, ...fileArray]);
    const newPreviews = fileArray.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    URL.revokeObjectURL(imagePreviews[index]);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!totalBeds.trim() || isNaN(parseInt(totalBeds)) || parseInt(totalBeds) <= 0) {
      toast.error('Valid total beds count is required');
      return;
    }
    if (!availableBeds.trim() || isNaN(parseInt(availableBeds)) || parseInt(availableBeds) < 0) {
      toast.error('Valid available beds count is required');
      return;
    }
    if (parseInt(availableBeds) > parseInt(totalBeds)) {
      toast.error('Available beds cannot exceed total beds');
      return;
    }
    if (!address.trim()) {
      toast.error('Address is required');
      return;
    }
    if (!city.trim()) {
      toast.error('City is required');
      return;
    }
    if (!state.trim()) {
      toast.error('State is required');
      return;
    }
    if (!rentPerBed.trim() || isNaN(parseFloat(rentPerBed)) || parseFloat(rentPerBed) <= 0) {
      toast.error('Valid rent per bed is required');
      return;
    }
    if (!availabilityDate.trim()) {
      toast.error('Availability date is required');
      return;
    }
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    try {
      setIsLoading(true);

      // Create FormData for multipart upload with images
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('hostelType', hostelType);
      formData.append('totalBeds', totalBeds);
      formData.append('availableBeds', availableBeds);
      formData.append('address', address.trim());
      formData.append('city', city.trim());
      formData.append('state', state.trim());
      formData.append('rentPerBed', rentPerBed);
      formData.append('availabilityDate', new Date(availabilityDate).toISOString());
      formData.append('amenities', JSON.stringify(amenities));
      formData.append('facilities', JSON.stringify(facilities));
      // Default Bhopal coordinates
      formData.append('latitude', '23.2599');
      formData.append('longitude', '77.4126');

      if (adminRating) {
        formData.append('adminRating', adminRating);
      }

      // Append image files for upload to Cloudinary
      images.forEach((image) => {
        formData.append('images', image);
      });

      await createHostel(formData);

      toast.success('Hostel submitted successfully!');

      // Reset form
      setTitle('');
      setDescription('');
      setHostelType('Boys');
      setTotalBeds('');
      setAvailableBeds('');
      setAddress('');
      setCity('Bhopal');
      setState('');
      setRentPerBed('');
      setAvailabilityDate('');
      setAmenities([]);
      setImages([]);
      setImagePreviews([]);
      setFacilities({ food: false, laundry: false, cleaning: false });
      setAdminRating('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error submitting hostel:', error);
      toast.error(error.message || 'Failed to submit hostel');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Add New Hostel</h2>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building className="inline w-4 h-4 mr-1" />
            Hostel Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Premium Boys Hostel near MP Nagar"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the hostel..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Hostel Type and Beds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              Hostel Type *
            </label>
            <select
              value={hostelType}
              onChange={(e) => setHostelType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {hostelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Beds *</label>
            <input
              type="number"
              value={totalBeds}
              onChange={(e) => setTotalBeds(e.target.value)}
              placeholder="e.g., 50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Beds *</label>
            <input
              type="number"
              value={availableBeds}
              onChange={(e) => setAvailableBeds(e.target.value)}
              placeholder="e.g., 10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Address *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., Near Railway Station, Zone-1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Bhopal"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g., Madhya Pradesh"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="inline w-4 h-4 mr-1" />
              Rent per Bed *
            </label>
            <input
              type="number"
              value={rentPerBed}
              onChange={(e) => setRentPerBed(e.target.value)}
              placeholder="e.g., 5000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Availability Date *
            </label>
            <input
              type="date"
              value={availabilityDate}
              onChange={(e) => setAvailabilityDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Admin Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Admin Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={adminRating}
            onChange={(e) => setAdminRating(e.target.value)}
            placeholder="e.g., 4.5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={facilities.food}
                onChange={(e) => setFacilities({ ...facilities, food: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Food Included</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={facilities.laundry}
                onChange={(e) => setFacilities({ ...facilities, laundry: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Laundry Service</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={facilities.cleaning}
                onChange={(e) => setFacilities({ ...facilities, cleaning: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Cleaning Service</span>
            </label>
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Upload className="inline w-4 h-4 mr-1" />
            Upload Images * (Max 5, up to 5MB each)
          </label>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400"
        >
          {isLoading ? 'Submitting...' : 'Submit Hostel'}
        </button>
      </div>
    </div>
  );
};

export default SubmitHostelForm;
