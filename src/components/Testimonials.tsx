import React from 'react';

const Testimonials: React.FC = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Jane Cooper",
      avatar: "/api/placeholder/60/60",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor incididunt dolore magna aliqua.",
      position: { top: "20%", left: "15%" }
    }
  ];

  // Additional avatar positions for scattered layout
  const additionalAvatars = [
    { id: 2, avatar: "/api/placeholder/50/50", position: { top: "10%", left: "5%" } },
    { id: 3, avatar: "/api/placeholder/45/45", position: { top: "15%", right: "10%" } },
    { id: 4, avatar: "/api/placeholder/40/40", position: { bottom: "30%", left: "10%" } },
    { id: 5, avatar: "/api/placeholder/48/48", position: { bottom: "20%", right: "15%" } },
  ];

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden min-h-[500px]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-black text-center mb-16">
          What People Says
        </h2>

        {/* Main Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="absolute bg-white rounded-2xl p-6 shadow-lg max-w-sm z-10"
              style={testimonial.position}
            >
              {/* User Avatar */}
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    {testimonial.name}
                  </h4>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {testimonial.text}
              </p>

              {/* Speech bubble arrow */}
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white transform rotate-45 shadow-lg"></div>
            </div>
          ))}

          {/* Scattered Avatar Images */}
          {additionalAvatars.map((avatar) => (
            <div
              key={avatar.id}
              className="absolute"
              style={avatar.position}
            >
              <img
                src={avatar.avatar}
                alt="User"
                className="rounded-full object-cover shadow-md hover:scale-110 transition-transform cursor-pointer"
                style={{ width: '48px', height: '48px' }}
              />
            </div>
          ))}

          {/* Decorative Elements */}
          <div className="absolute top-10 right-20 w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute bottom-16 left-32 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
          <div className="absolute top-32 left-20 w-4 h-4 bg-yellow-400 rounded-full opacity-40"></div>
          <div className="absolute bottom-32 right-16 w-3 h-3 bg-green-400 rounded-full opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;