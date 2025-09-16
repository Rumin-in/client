import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#89B4DB] to-[#0085FE] min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Find your Perfect Rental Room With Ease.
          </h1>
          
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Roomin redefines renting with a seamless, personalized platform to find rentals offering competitive features that set us above from the rest.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-full p-2 flex items-center shadow-lg mb-12">
            <input
              type="text"
              placeholder="Search location..."
              className="flex-1 px-4 py-3 text-gray-700 bg-transparent outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors">
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="flex space-x-12">
            <div>
              <div className="text-3xl font-bold text-white">15K+</div>
              <div className="text-sm text-white/80">Property Ready</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">35+</div>
              <div className="text-sm text-white/80">Happy Customer</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">20K+</div>
              <div className="text-sm text-white/80">Award Winning</div>
            </div>
          </div>
        </div>

        {/* Right Content - House Image */}
        <div className="flex-1 relative">
          <div className="relative z-10">
            <img
              src="/hero.png"
              alt="Modern house"
              className="w-full h-auto max-w-2xl ml-auto"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-4 h-4 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-6 h-6 bg-white/15 rounded-full"></div>
          <div className="absolute top-40 right-40 w-3 h-3 bg-white/25 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;