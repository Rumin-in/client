import React from "react";

const PopularListing: React.FC = () => {
  // Dummy data for listings
  const listings = [
    {
      id: 1,
      title: "1 BHK in Dwarka Dham colony Rh138",
      price: "₹7,000/mon",
      image: "/api/placeholder/280/200",
    },
    {
      id: 2,
      title: "1 BHK in Dwarka Dham colony Rh138",
      price: "₹7,000/mon",
      image: "/api/placeholder/280/200",
    },
    {
      id: 3,
      title: "1 BHK in Dwarka Dham colony Rh138",
      price: "₹7,000/mon",
      image: "/api/placeholder/280/200",
    },
    {
      id: 4,
      title: "1 BHK in Dwarka Dham colony Rh138",
      price: "₹7,000/mon",
      image: "/api/placeholder/280/200",
    },
    {
      id: 5,
      title: "1 BHK in Dwarka Dham colony Rh138",
      price: "₹7,000/mon",
      image: "/api/placeholder/280/200",
    },
    {
      id: 6,
      title: "1 BHK in Dwarka Dham colony Rh138",
      price: "₹7,000/mon",
      image: "/api/placeholder/280/200",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 mt-10">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-7xl font-bold text-black mb-4">
            Popular Listing
          </h2>
          <p className="text-4xl text-gray-700 font-semi-bold">
            We help you to make
            <br />
            better deals
          </p>
        </div>

        {/* Listings Grid */}
        <div className="bg-blue-50 rounded-3xl p-8 px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 bg-[#0085FE1A]">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Property Image */}
                <div className="relative">
                  <img
                    src={"/placeholder.png"}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 mb-3">
                    {listing.title}
                  </h3>

                  {/* Icons Row */}
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Bed Icon */}
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    {/* Bath Icon */}
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    {/* Area Icon */}
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    {/* Location Icon */}
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">
                      {listing.price}
                    </span>
                    <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
           <div className="flex justify-center"> 
        <button onClick={()=>{
          window.location.href="/rooms"
        }} className="px-8 py-3 mt-8  bg-blue-500 cursor-pointer text-white text-sm rounded-full hover:bg-blue-600 transition-colors">
          View All{" "}
        </button></div>
        </div>
      
      </div>
    </section>
  );
};

export default PopularListing;
