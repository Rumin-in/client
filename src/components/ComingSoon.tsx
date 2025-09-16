
import React from 'react';

const ComingSoon: React.FC = () => {
  // Coming soon categories data
  const categories = [
    {
      id: 1,
      title: "Student Furniture",
      image: "/cs1.jpg",
      bgColor: "bg-yellow-100"
    },
    {
      id: 2,
      title: "Hostel/PG",
      image: "/cs2.jpg",
      bgColor: "bg-gray-100"
    },
    {
      id: 3,
      title: "Commercial house",
      image: "/cs3.jpg",
      bgColor: "bg-purple-100"
    },
    {
      id: 4,
      title: "Farmhouse",
      image: "/cs4.jpg",
      bgColor: "bg-blue-100"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-black mb-12">
          Coming Soon!!
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-80"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Colored Background Overlay */}
              <div className={`absolute inset-0 ${category.bgColor} opacity-30`}></div>
              
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Category Title - positioned at bottom */}
              <div className="absolute bottom-6 left-4 right-4">
                <h3 className="text-white font-semibold text-lg">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default ComingSoon;