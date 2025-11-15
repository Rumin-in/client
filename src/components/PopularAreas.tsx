import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopularAreas: React.FC = () => {
  // Dummy data for popular areas
  const areas = [
    {
      id: 1,
      name: "Lalghati",
      image: "/lalghati.jpg",
      isLarge: true
    },
    {
      id: 2,
      name: "Indrapuri",
      image: "/indrapuri.jpg",
      isLarge: false
    },
    {
      id: 3,
      name: "Minal",
      image: "/minal.jpg",
      isLarge: false
    },  
    {
      id: 4,
      name: "MP Nagar",
      image: "/mp-nagar.jpg",
      isLarge: false
    },
    {
      id: 5,
      name: "Kolar",
      image: "/kolar.jpg",
      isLarge: false
    }
  ];

  const navigate = useNavigate();
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className=" bg-[#0085FE1A] rounded-3xl p-8">
          {/* Top Section - Text and Large Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ">
            {/* Left Column - Text and Button */}
            <div className="flex flex-col justify-center">
              <h2 className="text-5xl font-bold mb-8">
                <span className="text-blue-500">Popular areas</span>{' '}
                <span className="text-black">in bhopal</span>
              </h2>
              
              <button onClick={()=>{navigate('/rooms')}} className="bg-blue-500 sm:mt-10 sm:ml-[30%] cursor-pointer hover:bg-blue-600 text-white px-10 py-3 rounded-full font-medium text-lg w-fit flex items-center gap-2 transition-colors">
                Find a room
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Right Column - Large Lalghati Image */}
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src={areas[0].image}
                alt={areas[0].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-white font-medium text-xl">{areas[0].name}</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - 4 Area Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {areas.slice(1).map((area) => (
              <div key={area.id} className="relative h-48 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white font-medium text-sm">{area.name}</span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularAreas;