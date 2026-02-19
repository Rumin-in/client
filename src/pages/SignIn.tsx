import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "sonner";
import { login, googleAuth } from "../services/auth.services";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import type { AppDispatch } from "../store/store";
import { useGoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Google Login Handler
  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        setIsLoading(true);
        const response = await googleAuth(codeResponse.access_token);
        console.log("Google Auth Response:", response);

        const token = response.data.accessToken;
        localStorage.setItem("token", token);

        toast.success("Welcome! Google sign-in successful");

        const {
          _id,
          name,
          email: userEmail,
          role,
          walletBalance,
          profilePicture,
        } = response.data.user;
        dispatch(
          setUser({
            userId: _id,
            name,
            email: userEmail,
            role,
            walletBalance,
            profilePicture,
          }),
        );

        window.location.href = "/";
      } catch (error: any) {
        console.error("Google Sign-In Error:", error);
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Google sign-in failed. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Google sign-in failed. Please try again.");
    },
    flow: "implicit",
  });

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
        _id,
        name,
        email: userEmail,
        role,
        walletBalance,
        profilePicture,
      } = response.data.user;
      dispatch(
        setUser({
          userId: _id,
          name,
          email: userEmail,
          role,
          walletBalance,
          profilePicture,
        }),
      );

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
                src="/home.png"
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
            <button className="mt-12 ml-5  bg-white rounded-[20px] px-30 py-5 flex items-center justify-center gap-2 text-gray-800 font-semibold shadow-md hover:bg-gray-100 transition-colors">
              Sign In
            </button>
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
                <div className="flex items-center gap-3">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="text-gray-500 text-sm">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Google Sign In Button */}
                <button
                  onClick={() => handleGoogleSignIn()}
                  disabled={isLoading}
                  className="w-full py-3 rounded-lg font-semibold border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>

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
