const ComingSoon = () => {
  const categories = [
    { id: 1, title: "Student Furniture", image: "/cs1.jpg", bgColor: "bg-yellow-100" },
    { id: 2, title: "Hostel/PG", image: "/cs2.jpg", bgColor: "bg-gray-100" },
    { id: 3, title: "Commercial house", image: "/cs3.jpg", bgColor: "bg-purple-100" },
    { id: 4, title: "Farmhouse", image: "/cs4.jpg", bgColor: "bg-blue-100" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8 sm:mb-20">
          Coming Soon!!
        </h2>

        {/* Grid for laptop/desktop */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-80 sm:h-96 md:h-[420px]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute inset-0 ${category.bgColor} opacity-30`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <h3 className="text-white font-semibold text-base sm:text-lg drop-shadow-lg">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view - show all items */}
        <div className="sm:hidden grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-40 object-cover"
              />
              <div className={`absolute inset-0 ${category.bgColor} opacity-30`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold text-sm drop-shadow-lg">
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
