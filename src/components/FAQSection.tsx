import React, { useState } from "react";

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I book a room on Rumin?",
      answer:
        "Browse available rooms, check details such as rent, amenities, and location, then submit a booking request. Once the owner confirms, complete the payment to secure your stay.",
    },
    {
      id: 2,
      question: "What payments are required before moving in?",
      answer:
        "You need to pay the first month's rent along with a refundable security deposit. The exact amount is mentioned clearly in each listing.",
    },
    {
      id: 3,
      question: "Is the security deposit refundable?",
      answer:
        "Yes. The deposit is refunded at the end of your stay after deducting any damages or pending dues, as per the rental agreement.",
    },
    {
      id: 4,
      question: "Are utility bills included in the rent?",
      answer:
        "It depends on the property. Some listings include electricity and water in the rent, while others charge separately based on usage. Always check the listing details before booking.",
    },
  ];

  // Property images data
  const propertyImages = [
    {
      id: 1,
      src: "/cs2.jpg",
      alt: "Commercial building",
    },
    {
      id: 2,
      src: "/cs4.jpg",
      alt: "Modern house",
    },
    {
      id: 3,
      src: "/cs3.jpg",
      alt: "Outdoor terrace",
    },
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
            <p className="text-black mb-8 text-[0.8em] leading-relaxed">
              Rumin simplifies the process of finding and listing rental spaces by connecting tenants directly with verified property owners. Whether you are looking for a single room, flat, hostel stay, or short-term accommodation, Rumin provides clear details, transparent pricing, and real support to help you make confident decisions. From discovery to booking and follow-up assistance, everything is designed to make renting faster, safer, and more reliable.
            </p>

            {/* FAQ Items */}
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gray-100 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-200 transition-colors"
                  >
                    <span className="font-medium text-gray-800">
                      {faq.id}. {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openFAQ === faq.id ? "rotate-180" : ""
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
                      openFAQ === faq.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
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
