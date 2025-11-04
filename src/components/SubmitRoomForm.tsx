import { useState } from 'react';
import { Home, MapPin, DollarSign, Calendar, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { submitRoom } from '../services/landlord.services';

interface SubmitRoomFormProps {
  onSuccess?: () => void;
}

const SubmitRoomForm = ({ onSuccess }: SubmitRoomFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [rent, setRent] = useState('');
  const [bhk, setBhk] = useState('');
  const [availabiltyDate, setAvailabiltyDate] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
    if (!latitude.trim() || isNaN(parseFloat(latitude))) {
      toast.error('Valid latitude is required');
      return;
    }
    if (!longitude.trim() || isNaN(parseFloat(longitude))) {
      toast.error('Valid longitude is required');
      return;
    }
    if (!rent.trim() || isNaN(parseFloat(rent)) || parseFloat(rent) <= 0) {
      toast.error('Valid rent amount is required');
      return;
    }
    if (images.length === 0) {
      toast.error('At least one image is required');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('address', address.trim());
      formData.append('city', city.trim());
      formData.append('state', state.trim());
      formData.append('latitude', latitude.trim());
      formData.append('longitude', longitude.trim());
      formData.append('rent', rent.trim());
      formData.append('bhk', bhk.trim());
      formData.append('availabiltyDate', availabiltyDate || new Date().toISOString());
      formData.append('amenities', JSON.stringify(amenities));

      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await submitRoom(formData);
      console.log("Submit Room Response:", response);

      toast.success('Room submitted successfully! It will be reviewed by admin.');

      // Reset form
      setTitle('');
      setDescription('');
      setAddress('');
      setCity('');
      setState('');
      setLatitude('');
      setLongitude('');
      setRent('');
      setBhk('');
      setAvailabiltyDate('');
      setAmenities([]);
      setImages([]);
      setImagePreviews([]);

      // Call callback if provided
      if (onSuccess) {
        onSuccess();
      }

    } catch (error: any) {
      console.error("Submit Room Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Failed to submit room. Please try again.');
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
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            disabled={isLoading}
            required
          />
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

      {/* Coordinates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-500 mb-2">
            Latitude *
          </label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="e.g., 28.7041"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-500 mb-2">
            Longitude *
          </label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="e.g., 77.1025"
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

        {images.length < 5 && (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, JPEG, WEBP (MAX. 5MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              disabled={isLoading}
            />
          </label>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isLoading ? 'Submitting Room...' : 'Submit Room for Review'}
      </button>

      {/* Info Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Your room listing will be reviewed by our admin team before being published. 
          You will be notified once it's approved.
        </p>
      </div>
    </div>
  );
};

export default SubmitRoomForm;
