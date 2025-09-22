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
      const response = await login({ email: email.trim(), password });
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
      dispatch(setUser({ name, email: userEmail, role, walletBalance }));

      window.location.href = "/";
    } catch (error: any) {
      console.error("Login Error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status === 404) {
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
    toast.success("Password reset link sent to your email!");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSignIn();
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:hidden w-full flex items-center py-4 px-4 shadow-sm bg-white">
          <img src="/rumin-logo.png" alt="Rumin Logo" className="h-14 w-auto" />
        </div>

        {/* Left Side */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-500 to-blue-600 flex-col items-center justify-center text-white p-8">
          <div className="text-center">
            <div className="mb-8">
              <img
                src="/house.png"
                alt="Welcome House"
                className="w-64 md:w-80 h-auto mx-auto"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome Back
            </h1>
            <p className="text-base md:text-lg opacity-90">
              Just a couple of clicks and we start
            </p>
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white bg-opacity-50 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">
                Sign In
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="johndoe@gmail.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                      disabled={isLoading}
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-blue-600 hover:text-blue-700"
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
                      placeholder="•••••••••••"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                {/* Divider */}
                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-2 text-sm text-gray-500">
                    or continue with
                  </span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Socials */}
                <div className="flex justify-center space-x-4">
                  <button
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center"
                    onClick={() => toast.info("Facebook login coming soon!")}
                  >
                    <span className="text-blue-600 font-bold">f</span>
                  </button>
                  <button
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center"
                    onClick={() => toast.info("Google login coming soon!")}
                  >
                    <span className="text-red-500 font-bold">G+</span>
                  </button>
                  <button
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center"
                    onClick={() => toast.info("LinkedIn login coming soon!")}
                  >
                    <span className="text-blue-700 font-bold">in</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center text-sm">
                  <span className="text-gray-600">Don’t have an account? </span>
                  <a
                    href="/signup"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
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
