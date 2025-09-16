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
      src: "/api/placeholder/150/120",
      alt: "Commercial building"
    },
    {
      id: 2,
      src: "/api/placeholder/150/120",
      alt: "Modern house"
    },
    {
      id: 3,
      src: "/api/placeholder/150/120",
      alt: "Outdoor terrace"
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Property Images */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Large image */}
              <div className="col-span-2">
                <img
                  src={propertyImages[0].src}
                  alt={propertyImages[0].alt}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Two smaller images */}
              <img
                src={propertyImages[1].src}
                alt={propertyImages[1].alt}
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
              <img
                src={propertyImages[2].src}
                alt={propertyImages[2].alt}
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Right Column - FAQ Content */}
          <div>
            <h2 className="text-4xl font-bold text-black mb-4">
              Everything about Rumin
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We know you're probably curious about lots of things. Here we've put together some of the most frequently asked questions to help guide you through the process.
            </p>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
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
                  {openFAQ === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
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