import React from 'react';
import { useNavigate } from 'react-router-dom';

const UniquePreferences: React.FC = () => {
  const navigate = useNavigate();

  // Actual location data
  const locations = [
    { id: 1, name: "Minal Residency" },
    { id: 2, name: "Lalghati" },
    { id: 3, name: "Indrapuri" },
    { id: 4, name: "Karond" },
    { id: 5, name: "Anand Nagar" },
    { id: 6, name: "Ashoka Garden" },
  ];

  const handleLocationClick = (locationName: string) => {
    navigate(`/rooms?location=${encodeURIComponent(locationName)}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6">
            Find your home with{' '}
            <span className="text-blue-500">unique preferences</span>
          </h2>
          <p className="text-lg px-5 max-w-4xl mx-auto font-bold leading-relaxed">
            Explore a curated selection of homes designed to match your unique preferences, making it 
            effortless to find the ideal property that perfectly fits your lifestyle and needs.
          </p>
        </div>

        {/* Location Pills */}
        <div className="bg-blue-100 rounded-[10px] sm:rounded-full p-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {locations.map((location) =>

                // === Normal location pill ===
                <div
                  key={location.id}
                  onClick={() => handleLocationClick(location.name)}
                  className="flex items-center bg-white rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-blue-500 font-medium">
                    {location.name}
                  </span>
                </div>
              
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniquePreferences;
