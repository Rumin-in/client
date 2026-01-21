import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Privacy Policy Heading */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#0B3463] mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last Updated: 3-3-25</p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <p className="text-gray-700 leading-relaxed mb-4">
              Rumin – Rental & Accommodation Platform
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Effective Date:</strong> 3-3-25
              <br />
              <strong>Last Updated:</strong> 3-3-25
            </p>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy describes how Rumin ("we", "our", "us")
              collects, uses, stores, and protects information when users
              access or use the Rumin website, mobile application, and related
              services (collectively, the "Platform").
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              By using the Platform, the user agrees to the collection and use
              of information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              1. About Rumin
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Rumin is a property technology (PropTech) platform that enables
              users to discover, list, and manage individual rental rooms and
              accommodations. The Platform serves students, working
              professionals, and property owners by providing digital tools for
              rental discovery and communication.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Rumin is a technology service provider, not a real estate broker,
              agent, or property owner.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We collect only information required for Platform functionality,
              security, and legal compliance.
            </p>

            <div className="space-y-6">
              {/* 2.1 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  2.1 Personal Information
                </h3>
                <p className="text-gray-700 mb-3">
                  Collected when users register or interact with the Platform:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Profile information voluntarily provided</li>
                </ul>
              </div>

              {/* 2.2 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  2.2 Authentication Information
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Login credentials processed via secure authentication systems</li>
                  <li>Encrypted authentication tokens</li>
                  <li>Passwords are never stored in readable form.</li>
                </ul>
              </div>

              {/* 2.3 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  2.3 Property & Listing Information
                </h3>
                <p className="text-gray-700 mb-3">
                  For users who list accommodations:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Property location and address details</li>
                  <li>Rent, availability, and room details</li>
                  <li>Images and descriptions uploaded by the user</li>
                  <li>Preferred contact methods</li>
                </ul>
              </div>

              {/* 2.4 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  2.4 Device, Log & Usage Information
                </h3>
                <p className="text-gray-700 mb-3">
                  Automatically collected when accessing the Platform:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Device type, browser, or operating system</li>
                  <li>App or website version</li>
                  <li>IP address</li>
                  <li>Log files, crash reports, and performance data</li>
                  <li>Interaction data such as pages visited and actions taken</li>
                </ul>
              </div>

              {/* 2.5 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  2.5 Communication Data
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Messages, inquiries, and requests sent through the Platform</li>
                  <li>Customer support communications</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              3. How We Use Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Collected information is used strictly for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Creating and managing user accounts</li>
              <li>Authenticating users and securing access</li>
              <li>Displaying listings and user profiles</li>
              <li>Enabling communication between users</li>
              <li>Improving Platform performance and reliability</li>
              <li>Providing customer support</li>
              <li>Preventing fraud, misuse, and unauthorized access</li>
              <li>Complying with legal and regulatory obligations</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold">
              Rumin does not sell or rent personal data.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              4. Data Sharing & Disclosure
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              User information is shared only when necessary and lawful.
            </p>

            <div className="space-y-6">
              {/* 4.1 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  4.1 With Other Users
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Certain information (such as listing details or limited
                  profile data) is visible to other users to enable rental
                  interactions. Contact details are shared only based on user
                  actions or consent.
                </p>
              </div>

              {/* 4.2 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  4.2 With Service Providers
                </h3>
                <p className="text-gray-700 mb-3">
                  We may share data with trusted third-party service providers
                  for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-3">
                  <li>Cloud hosting and database management</li>
                  <li>Authentication and security services</li>
                  <li>Analytics and crash monitoring</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  These providers are bound by confidentiality and data
                  protection obligations.
                </p>
              </div>

              {/* 4.3 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  4.3 Legal Disclosure
                </h3>
                <p className="text-gray-700 mb-3">
                  Information may be disclosed if required by:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Applicable laws or regulations</li>
                  <li>Court orders or government authorities</li>
                  <li>Law enforcement requests</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              5. Data Storage & Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement reasonable technical and organizational measures to
              protect user data, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Encrypted storage and transmission</li>
              <li>Secure cloud infrastructure</li>
              <li>Access controls and monitoring</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              No digital system is completely secure. Users acknowledge and
              accept this inherent risk.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              6. Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Information is retained only as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Provide Platform services</li>
              <li>Meet legal, regulatory, or accounting requirements</li>
              <li>Resolve disputes and enforce policies</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Users may request account deletion. Upon deletion, personal data
              will be removed or anonymized unless retention is legally
              required.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              7. User Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Access their personal information</li>
              <li>Update or correct inaccurate data</li>
              <li>Request account deletion</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Requests can be submitted through the Platform or via official
              support channels.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Platform is not intended for individuals under 18 years of
              age.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We do not knowingly collect data from minors. If such data is
              identified, it will be deleted.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              9. Third-Party Links & Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Platform may contain links to third-party websites or
              services. Rumin is not responsible for the privacy practices or
              content of external platforms.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              10. Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy may be updated periodically. Updates will be
              reflected by changing the "Last Updated" date. Continued use of
              the Platform constitutes acceptance of the revised policy.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              11. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For privacy-related questions, concerns, or requests:
            </p>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-800 font-semibold">Rumin Support</p>
              <p className="text-gray-700">Email: support@rumin.in</p>
              <p className="text-gray-700">Country: India</p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3463] mb-4">
              12. Consent
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using the Rumin website or mobile application, the
              user acknowledges that they have read, understood, and agreed to
              this Privacy Policy.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
