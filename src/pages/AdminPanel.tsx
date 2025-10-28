import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { adminLogin } from '../services/admin.services';
import AdminSidebar from '../components/AdminSidebar';
import AdminDashboard from '../components/AdminDashboard';
import AdminListings from '../components/AdminListings';
import AdminAnalytics from '../components/AdminAnalytics';
import AdminUserManagement from '../components/AdminUserManagement';
import AdminEnquiries from '../components/AdminEnquiries';
import AdminIssues from '../components/AdminIssues';
import AdminInterests from '../components/AdminInterests';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Login form state
  const [email, setEmail] = useState('');
  const [passkey, setPasskey] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!passkey.trim()) {
      toast.error('Passkey is required');
      return;
    }

    try {
      setIsLoading(true);
      const response = await adminLogin({ email: email.trim(), passkey: passkey.trim() });
      
      // Store admin token
      const token = response.data.accessToken;
      localStorage.setItem('adminToken', token);
      localStorage.setItem('token', token); // Also store in main token for API calls
      
      toast.success('Admin login successful');
      setIsAuthenticated(true);
      
    } catch (error: any) {
      console.error('Admin Login Error:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 403) {
        toast.error('Access restricted to admin or manager only');
      } else if (error.response?.status === 401) {
        toast.error('Invalid passkey');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setEmail('');
    setPasskey('');
    toast.success('Logged out successfully');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'listings':
        return <AdminListings />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'users':
        return <AdminUserManagement />;
      case 'interests':
        return <AdminInterests />;
      case 'enquiries':
        return <AdminEnquiries />;
      case 'issues':
        return <AdminIssues />;
      default:
        return <AdminDashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              border: '1px solid #e5e7eb',
            },
          }}
        />

        <div className="min-h-screen flex">
          {/* Left Side - Sky Blue Background */}
          <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#89B4DB] to-[#0085FE] flex-col items-center justify-center text-white p-8">
            <div className="text-center">
              <div className="mb-8">
                <img
                  src="/rumin-logo.png"
                  alt="Rumin Logo"
                  className="w-48 h-auto mx-auto mb-8"
                />
                <div className="w-64 h-64 mx-auto bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">🔐</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Admin Panel
              </h1>
              <p className="text-base md:text-lg opacity-90">
                Manage your platform with powerful tools
              </p>
              <div className="flex justify-center space-x-2 mt-6">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="w-3 h-3 bg-white bg-opacity-50 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                  Admin Login
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                  Enter your credentials to access the admin panel
                </p>

                <div className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@rumin.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] focus:border-[#0085FE] outline-none transition-colors pr-10"
                        disabled={isLoading}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  {/* Passkey Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passkey
                    </label>
                    <div className="relative">
                      <input
                        type={showPasskey ? 'text' : 'password'}
                        value={passkey}
                        onChange={(e) => setPasskey(e.target.value)}
                        placeholder="Enter admin passkey"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] focus:border-[#0085FE] outline-none transition-colors pr-10"
                        disabled={isLoading}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasskey(!showPasskey)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isLoading}
                      >
                        {showPasskey ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-[#0085FE] focus:ring-offset-2 outline-none mt-6 ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-gradient-to-r from-[#89B4DB] to-[#0085FE] hover:from-[#7AA3CA] hover:to-[#0074DD] text-white'
                    }`}
                  >
                    {isLoading ? 'Logging in...' : 'Login to Admin Panel'}
                  </button>

                  {/* Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start">
                      <Lock className="w-5 h-5 text-[#0085FE] mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        This area is restricted to authorized administrators only. 
                        Unauthorized access attempts will be logged.
                      </p>
                    </div>
                  </div>

                  {/* Back to Home */}
                  <div className="text-center">
                    <button
                      onClick={() => navigate('/')}
                      className="text-[#0085FE] hover:text-[#0074DD] font-semibold text-sm"
                    >
                      ← Back to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #e5e7eb',
          },
        }}
      />

      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
        
        <div className="ml-80 flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
