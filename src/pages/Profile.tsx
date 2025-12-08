import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store";
import { setUser, logout as logoutAction } from "../store/authSlice";
import Header from "../components/Header";
import { updateProfile } from "../services/auth.services";
import { toast, Toaster } from "sonner";
import { Camera, LogOut } from "lucide-react";

interface ProfileData {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  email: string;
}

const DEFAULT_AVATAR = "https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg";

const ProfileSettingsPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    city: "Bhopal",
    country: "India",
    email: "",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      const nameParts = user.name?.split(" ") || [];
      setProfile({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        city: "Bhopal",
        country: "India",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Only JPG, JPEG, and PNG images are allowed");
        return;
      }
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!profile.firstName.trim()) {
      toast.error("First name is required");
      return;
    }

    const fullName = `${profile.firstName.trim()} ${profile.lastName.trim()}`.trim();

    setIsLoading(true);
    try {
      const response = await updateProfile({
        name: fullName,
        email: profile.email.trim(),
        profilePicture: profilePicture || undefined,
      });

      // Update Redux state with new user data
      if (response.data) {
        dispatch(setUser({
          userId: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          walletBalance: response.data.walletBalance,
          profilePicture: response.data.profilePicture,
        }));
      }

      // Clear local file state after successful upload
      setProfilePicture(null);

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Get the current profile picture URL
  const currentProfilePicture = previewUrl || user?.profilePicture || DEFAULT_AVATAR;

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
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
              <div className="relative">
                <img
                  src={currentProfilePicture}
                  alt={user?.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
                  title="Change profile picture"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {`${profile.firstName} ${profile.lastName}`.trim() || "User Name"}
                </h2>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`px-5 py-2 rounded-lg transition text-sm font-semibold ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* City (Locked to Bhopal) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value="Bhopal"
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-500 cursor-not-allowed"
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

          </div>

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfileSettingsPage;
