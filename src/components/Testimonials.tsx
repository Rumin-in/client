import React from "react";

const Testimonials: React.FC = () => {
  const avatars = [
    { id: 1, avatar: "/p1.png", position: "top-0 left-1/2 -translate-x-1/2" },
    { id: 2, avatar: "/p2.png", position: "right-0 top-1/2 -translate-y-1/2" },
    { id: 3, avatar: "/p3.png", position: "bottom-0 left-1/2 -translate-x-1/2" },
    { id: 4, avatar: "/p4.png", position: "left-0 top-1/2 -translate-y-1/2" },
    { id: 5, avatar: "/p5.png", position: "top-10 right-10" },
  ];

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-black text-center mb-16">
          What People Says
        </h2>

        {/* Central Testimonial */}
        <div className="relative flex items-center justify-center min-h-[400px]">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center z-10">
            <h4 className="font-semibold text-gray-800 text-lg mb-2">
              Jane Cooper
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod
              tempor incididunt dolore magna aliqua.
            </p>
          </div>

          {/* Surrounding Avatars */}
          {avatars.map((avatar) => (
            <div key={avatar.id} className={`absolute ${avatar.position}`}>
              <img
                src={avatar.avatar}
                alt="User"
                className="w-16 h-16 rounded-full object-cover shadow-md hover:scale-110 transition-transform cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
