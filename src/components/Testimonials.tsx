import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  review: string;
  avatar: string;
}

const RotatingTestimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Jane Cooper",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      avatar: "/p1.png"
    },
    {
      id: 2,
      name: "Robert Fox",
      review: "Exceptional service and outstanding results. The attention to detail exceeded all my expectations. Highly recommended!",
      avatar: "/p2.png"
    },
    {
      id: 3,
      name: "Emily Watson",
      review: "A truly transformative experience. Professional, efficient, and remarkably effective. I couldn't be happier with the outcome.",
      avatar: "/p3.png"
    },
    {
      id: 4,
      name: "Michael Chen",
      review: "Outstanding quality and incredible support throughout the entire process. This is exactly what I was looking for!",
      avatar: "/p4.png"
    },
    {
      id: 5,
      name: "Sarah Johnson",
      review: "Innovative solutions with a personal touch. The team went above and beyond to ensure complete satisfaction.",
      avatar: "/p5.png"
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