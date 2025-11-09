import { useState } from 'react';
import { Home, MapPin, DollarSign, Calendar, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { submitRoom, updateRoom } from '../services/landlord.services';

interface EditRoomFormProps {
  roomId?: string;
  initialData?: {
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    rent: number;
    bhk: string;
    availabiltyDate: string;
    amenities: string[];
    images: string[];
  };
  onSuccess?: () => void;
  isEditing?: boolean;
}

const EditRoomForm = ({ roomId, initialData, onSuccess, isEditing = false }: EditRoomFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [city, setCity] = useState(initialData?.city || 'Bhopal');
  const [state, setState] = useState(initialData?.state || '');
  const [rent, setRent] = useState(initialData?.rent?.toString() || '');
  const [bhk, setBhk] = useState(initialData?.bhk || '');
  const [availabiltyDate, setAvailabiltyDate] = useState(initialData?.availabiltyDate || '');
  const [amenities, setAmenities] = useState<string[]>(initialData?.amenities || []);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialData?.images || []);

  const availableAmenities = [
    'WiFi',
    'AC',
    'Parking',
    'Power Backup',
    'Lift',
    'Security',
    'Water Supply',
    'Gym',
    'Garden',
    'Play Area',
  ];

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
    
    if (images.length + imagePreviews.length + fileArray.length > 5) {
      toast.error('You can upload a maximum of 5 images total');
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
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    if (imagePreviews[index].startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviews[index]);
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    }
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
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
    if (!rent.trim() || isNaN(parseFloat(rent)) || parseFloat(rent) <= 0) {
      toast.error('Valid rent amount is required');
      return;
    }
    if (!isEditing && imagePreviews.length === 0) {
      toast.error('At least one image is required');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('address', address.trim());
      formData.append('city', 'Bhopal');
      formData.append('state', state.trim());
      formData.append('latitude', '23.1815');
      formData.append('longitude', '79.9864');
      formData.append('rent', rent.trim());
      formData.append('bhk', bhk.trim());
      formData.append('availabiltyDate', availabiltyDate || new Date().toISOString());
      formData.append('amenities', JSON.stringify(amenities));

      images.forEach((image) => {
        formData.append('images', image);
      });

      let response;
      if (isEditing && roomId) {
        response = await updateRoom(roomId, formData);
        toast.success('Room updated successfully!');
      } else {
        response = await submitRoom(formData);
        toast.success('Room submitted successfully! It will be reviewed by admin.');
      }

      console.log("Response:", response);

      // Call callback if provided
      if (onSuccess) {
        onSuccess();
      }

    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Failed to save room. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-blue-500 mb-2">
          Room Title *
        </label>
        <div className="relative">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Spacious 2BHK in Central Location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
            disabled={isLoading}
            required
          />
          <Home className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-blue-500 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your room/property..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          disabled={isLoading}
        />
      </div>

      {/* BHK and Rent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-500 mb-2">
            BHK Type
          </label>
          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            disabled={isLoading}
          >
            <option value="">Select BHK</option>
            <option value="1RK">1RK</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="4BHK">4BHK</option>
            <option value="5BHK+">5BHK+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-500 mb-2">
            Monthly Rent (₹) *
          </label>
          <div className="relative">
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              placeholder="Enter rent amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
              disabled={isLoading}
              required
              min="0"
            />
            <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div>
        <label className="block text-sm font-medium text-blue-500 mb-2">
          Full Address *
        </label>
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter complete address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
            disabled={isLoading}
            required
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-500 mb-2">
            City *
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
            disabled={true}
            required
          >
            <option value="Bhopal">Bhopal</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Currently available only in Bhopal</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-500 mb-2">
            State *
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter state"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      {/* Availability Date */}
      <div>
        <label className="block text-sm font-medium text-blue-500 mb-2">
          Available From
        </label>
        <div className="relative">
          <input
            type="date"
            value={availabiltyDate}
            onChange={(e) => setAvailabiltyDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
            disabled={isLoading}
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-blue-500 mb-2">
          Amenities
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableAmenities.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Images Upload */}
      <div>
        <label className="block text-sm font-medium text-blue-500 mb-2">
          Property Images * (Max 5)
        </label>
        
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          className={`flex items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            imagePreviews.length >= 5
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-50'
              : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isLoading || imagePreviews.length >= 5}
          />
          <div className="text-center">
            <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">
              Drag and drop images here or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ({imagePreviews.length}/5) - PNG, JPG, JPEG or WEBP up to 5MB each
            </p>
          </div>
        </label>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Saving...' : isEditing ? 'Update Room' : 'Submit Room'}
      </button>
    </div>
  );
};

export default EditRoomForm;
