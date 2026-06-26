import React from 'react';
// Layout is handled in App.tsx to match existing architecture

const PolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 mt-20">

      {/* Header Section */}
      <div className="bg-white py-12 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4 leading-tight">
            Privacy Policy & Copyright
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-2">
            Our commitment to transparency and protecting your rights.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-12 px-4 sm:px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-md">

            {/* Copyright Section */}
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Copyright Notice
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>
                  &copy; {new Date().getFullYear()} 1000 Tongues. All rights reserved.
                </p>
                <p>
                  All content on this website, including but not limited to text, graphics, logos, images, audio clips, video footage, and software, is the property of 1000 Tongues or its content suppliers and is protected by international copyright laws.
                </p>
                <p>
                  Unauthorized use, reproduction, or distribution of any content without express written permission is strictly prohibited.
                </p>
              </div>
            </div>

            {/* Privacy Policy Section */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Privacy Policy
              </h2>
              <div className="text-gray-600 space-y-8 leading-relaxed">

                <div>
                  <h3 className="text-lg font-medium text-[#0E1745] mb-2">1. Information We Collect</h3>
                  <p>
                    We collect information you provide directly to us, such as when you sign up for our newsletter, register for the choir, apply for partnership, or purchase tickets. This may include your name, email address, phone number, and payment information.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#0E1745] mb-2">2. How We Use Your Information</h3>
                  <p>
                    We use the information we collect to operate our website, communicate with you about events and news, process transactions, and improve our services. We do not sell your personal information to third parties.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-[#0E1745] mb-2">3. Media & Photography</h3>
                  <p>
                    Please note that photographs and video footage may be taken during our events for promotional purposes on our website and social media channels. By attending our events, you consent to the use of your image in our marketing materials.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mt-8">
              <h3 className="text-lg font-semibold text-[#0E1745] mb-2">
                Have Questions?
              </h3>
              <p className="text-gray-600">
                If you have any questions about these terms or our privacy practices, please contact us at{' '}
                <a
                  href="mailto:info@1000tongues.co.uk"
                  className="font-semibold text-[#0E1745] hover:underline"
                >
                  info@1000tongues.co.uk
                </a>
                .
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;