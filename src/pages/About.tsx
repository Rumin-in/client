import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Rumin
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Your trusted partner in finding the perfect rental accommodation
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Rumin, we believe that finding a place to call home should be simple,
                transparent, and stress-free. Our platform connects renters with verified
                rooms and trusted landlords, making the rental process seamless and efficient.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We're committed to providing a user-friendly experience that lets you search
                by location, budget, and preferences, ensuring you find the perfect space
                quickly and effortlessly.
              </p>
            </div>
            <div className="bg-blue-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">1+</div>
                  <div className="text-gray-600">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">300+</div>
                  <div className="text-gray-600">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                  <div className="text-gray-600">Verified Landlords</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Trust & Safety</h3>
                <p className="text-gray-600">
                  All our listings are verified, and landlords go through a thorough
                  verification process to ensure your safety.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Speed & Efficiency</h3>
                <p className="text-gray-600">
                  Find your perfect room in minutes with our smart search and filter
                  options designed for quick results.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Community First</h3>
                <p className="text-gray-600">
                  We build connections between renters and landlords, creating a
                  community based on mutual trust and respect.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA Section */}
        <div className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Room?</h2>
            <p className="text-white/90 mb-8">
              Join thousands of happy renters who found their ideal accommodation through Rumin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/rooms"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Browse Rooms
              </a>
              <a
                href="/landlord"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors"
              >
                List Your Property
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
