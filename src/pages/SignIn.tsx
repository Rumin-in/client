import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "sonner";
import { login } from "../services/auth.services";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import type { AppDispatch } from "../store/store";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Email validation helper
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    // Validation checks
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({
        email: email.trim(),
        password,
      });

      console.log("Login Response:", response);
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      toast.success("Welcome back! Login successful");
      const {
        name,
        email: userEmail,
        role,
        walletBalance,
      } = response.data.user;
      console.log("User Data:", { name, userEmail, role, walletBalance });

      // Store in Redux
      dispatch(setUser({ name, email: userEmail, role, walletBalance }));

      window.location.href = "/";
    } catch (error: any) {
      console.error("Login Error:", error);

      // Handle different types of errors
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response && error.response.status === 404) {
        toast.error("Account not found. Please check your email or sign up.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      toast.info("Please enter your email address first");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // This would typically call a forgot password API
    toast.success("Password reset link sent to your email!");
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#333",
            border: "1px solid #e5e7eb",
          },
        }}
      />

      <div className="min-h-screen flex">
        {/* Left Side - Blue Background with House */}
        <div className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 flex flex-col items-center justify-center text-white p-8">
          <div className="text-center">
            {/* House Image */}
            <div className="mb-8">
              <img
                src="/house.png"
                alt="Welcome House"
                className="w-80 h-80 object-contain mx-auto"
              />
            </div>

            {/* Welcome Text */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
              <p className="text-lg opacity-90">
                Just a couple of clicks and we start
              </p>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white bg-opacity-50 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
                Sign In
              </h2>

              <div className="space-y-6">
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
                      onKeyPress={handleKeyPress}
                      placeholder="johndoe@gmail.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-12"
                      disabled={isLoading}
                      required
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                      disabled={isLoading}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-12"
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    onClick={() => toast.info("Facebook login coming soon!")}
                    disabled={isLoading}
                  >
                    <span className="text-blue-600 font-bold text-lg">f</span>
                  </button>
                  <button
                    type="button"
                    className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    onClick={() => toast.info("Google login coming soon!")}
                    disabled={isLoading}
                  >
                    <span className="text-red-500 font-bold text-lg">G+</span>
                  </button>
                  <button
                    type="button"
                    className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    onClick={() => toast.info("LinkedIn login coming soon!")}
                    disabled={isLoading}
                  >
                    <span className="text-blue-700 font-bold text-lg">in</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <span className="text-gray-600">Don't have an account? </span>
                  <a
                    href="/signup"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Sign Up
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

export default SignIn;
