import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Mail } from 'lucide-react';

interface ProfileData {
  fullName: string;
  nickName: string;
  gender: string;
  country: string;
  language: string;
  email: string;
}

const ProfileSettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '',
    nickName: '',
    gender: '',
    country: '',
    language: '',
    email: 'xyz@gmail.com'
  });

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sm:ml-[15vmax]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-7xl gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Welcome, Shristi</h1>
            <p className="text-xs sm:text-sm text-gray-400">Tue, 07 June 2022</p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-300">
              <Bell className="w-5 h-5" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto border-2 border-gray-300 rounded-xl mt-6 mb-12 bg-white">
        {/* Blue Banner */}
        <div
          className="rounded-xl h-16 sm:h-24 mb-8"
          style={{ background: 'linear-gradient(to right, #0085FE, #0B3463)' }}
        ></div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
                alt="Shristi Tamrakar"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Shristi Tamrakar</h2>
                <p className="text-sm text-gray-500">xyz@gmail.com</p>
              </div>
            </div>
            <button className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
              Edit
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your First Name"
                value={profile.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Nick Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nick Name
              </label>
              <input
                type="text"
                placeholder="Your First Name"
                value={profile.nickName}
                onChange={(e) => handleInputChange('nickName', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="relative">
                <select
                  value={profile.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-gray-400"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <div className="relative">
                <select
                  value={profile.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-gray-400"
                >
                  <option value="">Select Country</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                  <option value="in">India</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <div className="relative">
                <select
                  value={profile.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-gray-400"
                >
                  <option value="">Select Language</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="hi">Hindi</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">My Email Address</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{profile.email}</p>
                <p className="text-xs text-gray-400">1 month ago</p>
              </div>
            </div>
            <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
              + Add Email Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
