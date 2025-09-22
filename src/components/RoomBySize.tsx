import React from "react";

const RoomsBySize: React.FC = () => {
  const roomTypes = [
    { id: 1, type: "1 RK", color: "text-blue-500" },
    { id: 2, type: "1 BHK", color: "text-blue-500" },
    { id: 3, type: "Single Room", color: "text-blue-500" },
    { id: 4, type: "1 BHK", color: "text-blue-500" },
    { id: 5, type: "1 RK", color: "text-gray-600" },
    { id: 6, type: "1 RK", color: "text-gray-600" },
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Rooms according to size
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {roomTypes.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <img src="/Vector.png" alt="room-icon" className="w-6 h-6" />
                </div>
                <span className={`text-xl font-semibold ${room.color}`}>
                  {room.type}
                </span>
              </div>

              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center group-hover:bg-blue-300 transition-colors">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7-7l7 7-7 7"
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
