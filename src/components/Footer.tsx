import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    {
      src: "/facebook.png",
      alt: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61578589734168",
    },
    {
      src: "/instagram.png",
      alt: "Instagram",
      url: "https://www.instagram.com/rumin.in/",
    },
    {
      src: "/linkedin.png",
      alt: "LinkedIn",
      url: "https://in.linkedin.com/company/rumin-",
    },
  ];

  return (
    <footer className="bg-[#0B3463] text-white px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                  title={social.alt}
                >
                  <img
                    src={social.src}
                    alt={social.alt}
                    className="w-7 h-7 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Service & Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  Privacy & Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 opacity-80">+91 7024441045</li>
              <li>
                <a
                  href="mailto:support@rumin.in"
                  className="text-gray-300 opacity-80 hover:opacity-100 hover:text-white transition-colors"
                >
                  support@rumin.in
                </a>
              </li>
              <li className="text-gray-300 opacity-80">
                Rolta Incubation Center Manit
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border and Copyright */}
        <div className="border-t border-gray-600 mt-12 pt-6">
          <p className="text-center text-gray-400 text-sm">
            © 2025 | All Rights Reserved By Rumin
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
