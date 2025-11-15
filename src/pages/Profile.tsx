import React, { useEffect, useState } from "react";
import { ChevronDown, Mail } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Header from "../components/Header";

interface ProfileData {
  fullName: string;
  nickName: string;
  country: string;
  language: string;
  email: string;
}

const ProfileSettingsPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [profile, setProfile] = useState<ProfileData>({
    fullName: "",
    nickName: "",
    country: "India",
    language: "English",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.name || "",
        nickName: user.name?.split(" ")[0] || "",
        country: "India",
        language: "English",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Updated Profile:", profile);
    // Later: Add API call to update user profile
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Global Header */}
      <Header />

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto border-2 border-gray-200 rounded-xl mt-8 mb-12 bg-white shadow-sm">
        {/* Blue Banner */}
        <div
          className="rounded-t-xl h-20 sm:h-28"
          style={{ background: "linear-gradient(to right, #0085FE, #0B3463)" }}
        ></div>

        {/* Profile Section */}
        <div className="p-6 sm:p-10 -mt-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <img
                src={
                  
                  "https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg"
                }
                alt={user?.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {profile.fullName || "User Name"}
                </h2>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-semibold"
            >
              Save Changes
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Nickname */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nick Name
              </label>
              <input
                type="text"
                value={profile.nickName}
                onChange={(e) => handleInputChange("nickName", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your nickname"
              />
            </div>

            {/* Country (Locked to India) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                value="India"
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <div className="relative">
                <select
                  value={profile.language}
                  onChange={(e) =>
                    handleInputChange("language", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 text-gray-600"
                >
                  <option value="">Select Language</option>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              My Email Address
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {profile.email || "example@email.com"}
                </p>
                <p className="text-xs text-gray-400">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
