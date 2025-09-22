const Footer = () => {
  return (
    <footer className="bg-[#0B3463] text-white px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Rumin Brand Section */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Rumin</h2>
            <p className="text-gray-300 leading-relaxed tracking-tight max-w-md">
              We simplify the renting process by connecting renters with
              verified rooms and trusted landlords in just a few clicks. Our
              user-friendly platform lets you search by location, budget, and
              preferences, ensuring you find the perfect space quickly and
              effortlessly. No hassle, no endless searching—just a seamless
              journey to your next home.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              {[
                { src: "/facebook.png", alt: "Facebook" },
                { src: "/instagram.png", alt: "Instagram" },
                { src: "/twitter.png", alt: "Twitter" },
                { src: "/linkedin.png", alt: "LinkedIn" },
              ].map((icon, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-7 h-7 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Property Section */}
          <div className="sm:ml-8">
            <h3 className="text-lg font-semibold mb-4">Property</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  Room
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  Flat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  House
                </a>
              </li>
            </ul>
          </div>

          {/* Service & Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="#"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  Cancellation option
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  Privacy & Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 opacity-80 hover:opacity-100">+917024441045</li>
              <li>
                <a
                  href="mailto:support@rumin.in"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  support@rumin.in
                </a>
              </li>
              <li className="text-gray-300 opacity-80 hover:opacity-100">Bhopal (M.P)</li>
            </ul>
          </div>
        </div>

        {/* Bottom Border and Copyright */}
        <div className="border-t border-gray-600 mt-12 pt-6">
          <p className="text-center text-gray-400 text-sm">
            © 2024 | All Rights Reserved By RentBro.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
