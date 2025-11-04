import React from "react";
import { User, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const LandlordRegistration: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  
  const handleClick = () => {
    // If user is logged in and is a landlord, go to dashboard submit room tab
    if (user && user.role === 'landlord') {
      navigate('/dashboard?tab=submit-room');
    } else {
      // Otherwise, go to landlord registration page
      navigate('/landlord');
    }
  };

  const isLandlord = user && user.role === 'landlord';

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[rgba(0,133,254,0.12)] p-6 rounded-xl shadow-sm gap-6 md:gap-0">
      {/* Left Side Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/landlord.png"
          alt="Landlord illustration"
          className="max-w-sm w-full h-auto"
        />
      </div>

      {/* Right Side Button */}
      <div className="w-full md:w-1/2 flex justify-center">
        <button 
          onClick={handleClick}
          className="flex items-center gap-2 bg-[#0085FE] hover:bg-blue-600 text-white font-bold tracking-wider cursor-pointer px-8 py-4 md:px-28 md:py-7 rounded-2xl shadow-md transition"
        >
          {isLandlord ? (
            <>
              <Home size={20} />
              Submit a Room
            </>
          ) : (
            <>
              <User size={20} />
              Registration as a landlord
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LandlordRegistration;
