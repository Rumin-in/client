import React, { useState } from 'react';

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "Can I personalise my room?",
      answer: "Yes, you can personalize your room according to your preferences. We offer various customization options to make your space feel like home."
    },
    {
      id: 2,
      question: "Where can I find payment?",
      answer: "Payment options are available through multiple channels including online banking, UPI, credit/debit cards, and cash payments at our office."
    },
    {
      id: 3,
      question: "What steps to rent a room?",
      answer: "To rent a room, simply browse our listings, select your preferred property, schedule a visit, complete the documentation, and make the payment to secure your booking."
    }
  ];

  // Property images data
  const propertyImages = [
    {
      id: 1,
      src: "/cs2.jpg",
      alt: "Commercial building"
    },
    {
      id: 2,
      src: "/cs4.jpg",
      alt: "Modern house"
    },
    {
      id: 3,
      src: "/cs3.jpg",
      alt: "Outdoor terrace"
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 h-full text-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[600px]">
          {/* Left Column - Two smaller images stacked (hidden on mobile) */}
          <div className="hidden lg:flex flex-col gap-4 h-full">
            <div className="flex-1">
              <img
                src={propertyImages[0].src}
                alt={propertyImages[0].alt}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="flex-1">
              <img
                src={propertyImages[2].src}
                alt={propertyImages[2].alt}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Middle Column - Full height vertical image */}
          <div className="h-full">
            <img
              src={propertyImages[1].src}
              alt={propertyImages[1].alt}
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Right Column - FAQ Content */}
          <div className="flex flex-col justify-start">
            <h2 className="text-4xl font-bold text-black mb-4">
              Everything about Rumin
            </h2>
            <p className="text-black mb-8 text-lg leading-relaxed">
              We know that buying, selling in rooms can be overwhelming. Here are some frequently asked questions to help guide you through the process.
            </p>

            {/* FAQ Items */}
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-200 transition-colors"
                  >
                    <span className="font-medium text-gray-800">
                      {faq.id}. {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;