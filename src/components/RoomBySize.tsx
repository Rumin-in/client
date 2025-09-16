import React from 'react';

const RoomsBySize: React.FC = () => {
  // Room types data
  const roomTypes = [
    { id: 1, type: "1 RK", color: "text-blue-500" },
    { id: 2, type: "1 BHK", color: "text-blue-500" },
    { id: 3, type: "Single Room", color: "text-blue-500" },
    { id: 4, type: "1 BHK", color: "text-blue-500" },
    { id: 5, type: "1 RK", color: "text-gray-600" },
    { id: 6, type: "1 RK", color: "text-gray-600" }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Rooms according to size
        </h2>

        {/* Room Type Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {roomTypes.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer group"
            >
              {/* Left side - Icon and Text */}
              <div className="flex items-center space-x-4">
                {/* Home Icon */}
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-blue-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>

                {/* Room Type Text */}
                <span className={`text-xl font-semibold ${room.color}`}>
                  {room.type}
                </span>
              </div>

              {/* Right side - Arrow */}
              <div className="text-blue-400 group-hover:text-blue-600 transition-colors">
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsBySize;