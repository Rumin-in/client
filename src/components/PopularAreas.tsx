import React from 'react';

const PopularAreas: React.FC = () => {
  // Dummy data for popular areas
  const areas = [
    {
      id: 1,
      name: "Lalghati",
      image: "/api/placeholder/400/250",
      isLarge: true
    },
    {
      id: 2,
      name: "Indrapuri",
      image: "/api/placeholder/250/200",
      isLarge: false
    },
    {
      id: 3,
      name: "Minal",
      image: "/api/placeholder/250/200",
      isLarge: false
    },
    {
      id: 4,
      name: "MP Nagar",
      image: "/api/placeholder/250/200",
      isLarge: false
    },
    {
      id: 5,
      name: "Kolar",
      image: "/api/placeholder/250/200",
      isLarge: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-blue-50 rounded-3xl p-8 min-h-[600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left Column - Text and Button */}
            <div className="flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8">
                <span className="text-blue-500">Popular areas</span>{' '}
                <span className="text-black">in bhopal</span>
              </h2>
              
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium text-lg w-fit flex items-center gap-2 transition-colors">
                Find a room
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Right Column - Areas Grid */}
            <div className="relative h-full">
              {/* Large Card - Lalghati */}
              <div className="absolute top-0 right-0 w-3/4 h-3/5 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img
                  src={areas[0].image}
                  alt={areas[0].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white font-medium text-lg">{areas[0].name}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Row - 4 smaller cards */}
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 gap-3 h-2/5">
                {areas.slice(1).map((area) => (
                  <div key={area.id} className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                    <img
                      src={area.image}
                      alt={area.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-2 left-2">
                      <span className="text-white font-medium text-sm">{area.name}</span>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularAreas;