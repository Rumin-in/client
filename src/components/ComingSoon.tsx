
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
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div
            className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-80 sm:h-96 md:h-[420px]"
            style={{
              clipPath:
                'path("M 0,30 Q 0,0 30,0 L 290,0 Q 320,0 320,30 L 320,150 Q 320,170 300,170 L 230,170 Q 210,170 210,190 L 210,390 Q 210,420 180,420 L 30,420 Q 0,420 0,390 Z")',
              borderRadius: "28px",
            }}
          >
            <img
              src={categories[0].image}
              alt={categories[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className={`absolute inset-0 ${categories[0].bgColor} opacity-30`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <h3 className="text-white font-semibold text-base sm:text-lg drop-shadow-lg">
                {categories[0].title}
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-80 sm:h-96 md:h-[420px] lg:ml-[-3vmax] lg:mt-2"
            style={{
              clipPath:
                'path("M 0,190 Q 0,170 20,170 L 90,170 Q 110,170 110,150 L 110,30 Q 110,0 140,0 L 290,0 Q 320,0 320,30 L 320,390 Q 320,420 290,420 L 30,420 Q 0,420 0,390 Z")',
              borderRadius: "28px",
            }}
          >
            <img
              src={categories[1].image}
              alt={categories[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className={`absolute inset-0 ${categories[1].bgColor} opacity-30`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <h3 className="text-white font-semibold text-base sm:text-lg drop-shadow-lg">
                {categories[1].title}
              </h3>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-80 sm:h-96 md:h-[420px]"
            style={{
              clipPath:
                'path("M 0,30 Q 0,0 30,0 L 290,0 Q 320,0 320,30 L 320,150 Q 320,170 300,170 L 230,170 Q 210,170 210,190 L 210,390 Q 210,420 180,420 L 30,420 Q 0,420 0,390 Z")',
              borderRadius: "28px",
            }}
          >
            <img
              src={categories[2].image}
              alt={categories[2].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className={`absolute inset-0 ${categories[2].bgColor} opacity-30`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <h3 className="text-white font-semibold text-base sm:text-lg drop-shadow-lg">
                {categories[2].title}
              </h3>
            </div>
          </div>

          {/* Card 4 */}
          <div
            className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-80 sm:h-96 md:h-[420px] lg:ml-[-3vmax] lg:mt-2"
            style={{
              clipPath:
                'path("M 0,190 Q 0,170 20,170 L 90,170 Q 110,170 110,150 L 110,30 Q 110,0 140,0 L 290,0 Q 320,0 320,30 L 320,390 Q 320,420 290,420 L 30,420 Q 0,420 0,390 Z")',
              borderRadius: "28px",
            }}
          >
            <img
              src={categories[3].image}
              alt={categories[3].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className={`absolute inset-0 ${categories[3].bgColor} opacity-30`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <h3 className="text-white font-semibold text-base sm:text-lg drop-shadow-lg">
                {categories[3].title}
              </h3>
            </div>
          </div>
        </div>

        {/* Mobile view - stacked full images */}
        <div className="sm:hidden flex flex-col gap-4">
          {categories.map((category) => (
            <div key={category.id} className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className={`absolute inset-0 ${category.bgColor} opacity-30`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-lg drop-shadow-lg">
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
