import React, { useState } from 'react';
import { Wifi, Home, ChevronLeft, Bed, Utensils } from 'lucide-react';

interface PropertyData {
  title: string;
  location: string;
  images: string[];
  amenities: Array<{
    icon: any;
    label: string;
    value: string;
  }>;
  features: Array<{
    icon: any;
    label: string;
    value: string;
  }>;
  details: {
    bedrooms: string;
    rentalValue: string;
    securityDeposit: string;
    location: string;
  };
}

const propertyData: PropertyData = {
  title: 'Minal Residency',
  location: 'Minal, Bhopal',
  images: [
    'https://images.unsplash.com/photo-1502672260066-6bc19f9a0a9e?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
  ],
  amenities: [
    { icon: Wifi, label: 'WiFi available', value: 'WiFi available' },
    { icon: Home, label: 'Covered Area', value: '150 sqft covered Area' },
    { icon: Home, label: 'Floor', value: '1st Floor' }
  ],
  features: [
    { icon: Home, label: 'Rent', value: 'Rent' },
    { icon: Bed, label: 'Bedroom', value: '1 Bedroom' },
    { icon: Utensils, label: 'Kitchen', value: '1 Kitchen' }
  ],
  details: {
    bedrooms: '1 BHK',
    rentalValue: '₹10,000',
    securityDeposit: '₹2,000',
    location: 'Minal, Bhopal'
  }
};

const PropertyListing: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
        <div className=" w-full flex items-center py-4 px-4 shadow-sm bg-white">
          <img src="/rumin-logo.png" alt="Rumin Logo" className="h-30 w-auto" />
        </div>
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Image Gallery */}
      <div className="relative">
        <img 
          src={propertyData.images[currentImage]} 
          alt="Property" 
          className="w-full h-80 object-cover"
        />
        
        {/* Back Button */}
        <button className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Thumbnail Gallery */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
          {propertyData.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden ${
                currentImage === idx ? 'ring-2 ring-white' : ''
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              {idx === 2 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">See more</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Property Info */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Minal Residency</h1>
        <p className="text-gray-500 text-sm mb-6">Minal, Bhopal</p>

        {/* Amenities Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {propertyData.amenities.map((amenity, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-2">
                <amenity.icon className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-xs text-gray-600 leading-tight">{amenity.value}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {propertyData.features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-2">
                <feature.icon className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-xs text-gray-600 leading-tight">{feature.value}</p>
            </div>
          ))}
        </div>

        {/* Additional Details */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Additional Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Bedrooms</span>
              <span className="font-medium text-gray-900">{propertyData.details.bedrooms}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Rental Value</span>
              <span className="font-medium text-gray-900">{propertyData.details.rentalValue}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Security Deposite</span>
              <span className="font-medium text-gray-900">{propertyData.details.securityDeposit}</span>
            </div>
            
            <div className="flex justify-between py-3">
              <span className="text-gray-600">Locations</span>
              <span className="font-medium text-gray-900">{propertyData.details.location}</span>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg transition-colors">
          Book Now
        </button>
      </div>
    </div>
    </>
  );
};

export default PropertyListing;