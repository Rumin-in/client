import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  review: string;
  avatar: string;
}

const RotatingTestimonials: React.FC = () => {
  // Default avatar for users without profile picture
  const defaultAvatar = "https://ui-avatars.com/api/?background=e0e7ff&color=4f46e5&bold=true&size=128";

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rahul Sharma",
      review: "Found a great room through Rumin within just 3 days! The whole process was super easy and transparent. Direct contact with the landlord, no brokerage fees. Best platform for room hunting in Bhopal!",
      avatar: `${defaultAvatar}&name=Rahul+Sharma`
    },
    {
      id: 2,
      name: "Priya Verma",
      review: "I was new to Bhopal and finding a safe room felt impossible. Rumin helped me find a clean and secure 1BHK near my college in just 2 days. The filters for location and budget were really helpful!",
      avatar: `${defaultAvatar}&name=Priya+Verma`
    },
    {
      id: 3,
      name: "Amit Patel",
      review: "As a student, finding an affordable room is always tough. Rumin's budget filter helped me find the perfect room within my range. Genuine listings with real photos. Highly recommended for students!",
      avatar: `${defaultAvatar}&name=Amit+Patel`
    },
    {
      id: 4,
      name: "Neha Gupta",
      review: "What I loved about Rumin is that all the information is accurate and updated. The photos matched the actual room I visited. No fake promises, no hidden charges. Finally a trustworthy platform!",
      avatar: `${defaultAvatar}&name=Neha+Gupta`
    },
    {
      id: 5,
      name: "Vikas Yadav",
      review: "Needed a room close to my office in MP Nagar. Used Rumin's location search and shifted within a week. The team is very helpful and responsive. Will definitely recommend to my friends!",
      avatar: `${defaultAvatar}&name=Vikas+Yadav`
    }
  ];

  const positions = [
    "top-10 left-1/2 -translate-x-1/2",
    "top-1/3 sm:top-1/2 right-4 sm:right-20 -translate-y-1/2",
    "bottom-10 right-10 sm:right-32",
    "bottom-10 left-10 sm:left-32",
    "top-1/3 sm:top-1/2 left-4 sm:left-20 -translate-y-1/2"
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  // Autoplay logic
  useEffect(() => {
    if (!autoplayEnabled) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoplayEnabled, testimonials.length]);

  // Handle avatar click
  const handleAvatarClick = (index: number) => {
    setActiveIndex(index);
    setAutoplayEnabled(false);
    
    // Re-enable autoplay after 5 seconds
    setTimeout(() => {
      setAutoplayEnabled(true);
    }, 5000);
  };

  // Rotate arrays to keep active testimonial at index 0
  const rotatedTestimonials = [
    ...testimonials.slice(activeIndex),
    ...testimonials.slice(0, activeIndex)
  ];
  
  const rotatedPositions = [
    ...positions.slice(activeIndex),
    ...positions.slice(0, activeIndex)
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-16"
        >
          What People Say
        </motion.h2>

        {/* Central Testimonial Container */}
        <div className="relative flex items-center justify-center min-h-[500px] sm:min-h-[600px]">
          {/* Central Testimonial Content */}
          <div className="relative z-10 p-8 max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={rotatedTestimonials[0].id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h4 className="text-gray-900 text-3xl sm:text-4xl font-bold mb-4">
                  {rotatedTestimonials[0].name}
                </h4>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {rotatedTestimonials[0].review}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Surrounding Avatars */}
          {rotatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`absolute ${rotatedPositions[index]}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
            >
              <motion.div
                animate={{
                  scale: index === 0 ? 1.25 : 1,
                  opacity: index === 0 ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
                onClick={() => handleAvatarClick((activeIndex + index) % testimonials.length)}
                className="cursor-pointer relative"
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg transition-all duration-300 ${
                    index === 0 
                      ? 'ring-4 ring-blue-500 ring-offset-2' 
                      : 'ring-2 ring-gray-300 hover:ring-gray-400'
                  }`}
                />
                {index === 0 && (
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-blue-500 opacity-20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Autoplay Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-8 bg-blue-500' 
                  : 'w-2 bg-gray-300'
              }`}
              onClick={() => handleAvatarClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RotatingTestimonials;