import { useState } from 'react';
import { Mail, Eye, EyeOff, User, Phone } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { registerAsLandlord } from '../services/landlord.services';
import { login } from '../services/auth.services';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import type { AppDispatch } from '../store/store';

const LandlordRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // Validation checks
    if (!firstName.trim()) {
      toast.error('First name is required');
      return;
    }

    if (!lastName.trim()) {
      toast.error('Last name is required');
      return;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!mobileNo.trim()) {
      toast.error('Mobile number is required');
      return;
    }

    if (!isValidMobile(mobileNo)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (!hasUppercase) {
      toast.error('Password must contain at least one uppercase letter');
      return;
    }

    if (!hasSpecialChar) {
      toast.error('Password must contain at least one special character');
      return;
    }

    if (!hasNumber) {
      toast.error('Password must contain at least one number');
      return;
    }

    if (!passwordsMatch) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const name = `${firstName.trim()} ${lastName.trim()}`;

      // Register the landlord
      const response = await registerAsLandlord({
        name,
        email: email.trim(),
        password,
        mobileNo: mobileNo.trim(),
      });

      console.log("Landlord Registration Response:", response);

      toast.success('Landlord account created successfully!');

      // Automatically log in the user after registration
      try {
        const loginResponse = await login({ 
          email: email.trim(), 
          password 
        });

        console.log("Auto Login Response:", loginResponse);

        // Store the token
        const token = loginResponse.data.accessToken;
        localStorage.setItem("token", token);

        // Update Redux state
        const {
          name: userName,
          email: userEmail,
          role,
          walletBalance,
        } = loginResponse.data.user;
        dispatch(setUser({ name: userName, email: userEmail, role, walletBalance }));

        toast.success('Logged in successfully! Redirecting to submit room...');

        // Redirect to submit room page
        setTimeout(() => {
          navigate('/submit-room');
        }, 1500);

      } catch (loginError: any) {
        console.error("Auto Login Error:", loginError);
        toast.info('Registration successful! Please sign in to continue.');
        
        // Redirect to sign in page if auto-login fails
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }

    } catch (error: any) {
      console.error("Landlord Registration Error:", error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Email validation helper
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Mobile validation helper
  const isValidMobile = (mobile: string) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  // Password validation checks
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 8;
  const passwordsMatch = password === confirmPassword && password.length > 0;

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
        {/* Left Side - Blue Background */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-500 to-blue-600 flex-col items-center justify-center text-white p-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-64 h-64 mx-auto bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-6xl">🏠</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Become a Landlord
            </h1>
            <p className="text-base md:text-lg opacity-90">
              Register and start listing your properties today
            </p>
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white bg-opacity-50 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Landlord Registration</h2>
              <p className="text-center text-gray-500 text-sm mb-6">Fill in your details to register as a landlord</p>

              <div className="space-y-4">
                {/* Name Fields Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-500 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
                        disabled={isLoading}
                        required
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-500 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
                        disabled={isLoading}
                        required
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-blue-500 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
                      disabled={isLoading}
                      required
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Mobile Number Field */}
                <div>
                  <label className="block text-sm font-medium text-blue-500 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
                      disabled={isLoading}
                      required
                      maxLength={10}
                    />
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Password Fields Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-500 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
                        disabled={isLoading}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-500 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      hasMinLength ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                    }`}>
                      {hasMinLength && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <span className={hasMinLength ? 'text-blue-600' : 'text-gray-500'}>
                      At least 8 characters long
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      hasUppercase ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                    }`}>
                      {hasUppercase && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <span className={hasUppercase ? 'text-blue-600' : 'text-gray-500'}>
                      Contains at least one uppercase letter
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      hasSpecialChar ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                    }`}>
                      {hasSpecialChar && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <span className={hasSpecialChar ? 'text-blue-600' : 'text-gray-500'}>
                      Contains at least one special character
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      hasNumber ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                    }`}>
                      {hasNumber && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <span className={hasNumber ? 'text-blue-600' : 'text-gray-500'}>
                      Contains at least one number
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      passwordsMatch ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                    }`}>
                      {passwordsMatch && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <span className={passwordsMatch ? 'text-blue-600' : 'text-gray-500'}>
                      Passwords are matching
                    </span>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={isLoading}
                  className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none mt-6 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isLoading ? 'Creating Account...' : 'Register as Landlord'}
                </button>

                {/* Sign In Link */}
                <div className="text-center">
                  <span className="text-gray-600">Already have an account? </span>
                  <a href="/signin" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandlordRegistration;
