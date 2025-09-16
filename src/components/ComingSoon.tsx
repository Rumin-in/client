
import React from 'react';

const ComingSoon: React.FC = () => {
  // Coming soon categories data
  const categories = [
    {
      id: 1,
      title: "Student Furniture",
      image: "/api/placeholder/200/250",
      bgColor: "bg-yellow-100"
    },
    {
      id: 2,
      title: "Hostel/PG",
      image: "/api/placeholder/200/250",
      bgColor: "bg-gray-100"
    },
    {
      id: 3,
      title: "Commercial house",
      image: "/api/placeholder/200/250",
      bgColor: "bg-purple-100"
    },
    {
      id: 4,
      title: "Farmhouse",
      image: "/api/placeholder/200/250",
      bgColor: "bg-blue-100"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-black text-center mb-12">
          Coming Soon!!
        </h2>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center items-end gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group ${
                index === 0 ? 'w-48 h-64' : 
                index === 1 ? 'w-52 h-72' : 
                index === 2 ? 'w-44 h-80' : 
                'w-48 h-68'
              }`}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Category Title */}
              <div className="absolute bottom-6 left-4 right-4">
                <h3 className="text-white font-semibold text-lg text-center">
                  {category.title}
                </h3>
              </div>

              {/* Colored Background for variety */}
              <div className={`absolute inset-0 ${category.bgColor} opacity-20 mix-blend-overlay`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;