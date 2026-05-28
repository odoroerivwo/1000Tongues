import React from 'react';

const PartnershipLevels: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">Partnership Options</h2>
          <p className="text-lg font-medium text-gray-600 max-w-2xl mx-auto">
            Choose the giving mode that best aligns with your capacity to support the 1000 Tongues vision.
          </p>
        </div>

        {/* --- 3-Column Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Card 1: One-Time Giving */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 text-gray-900 relative flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-3">One-Time Giving</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Make a single, impactful contribution to support the immediate needs of the project.
              </p>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#0E1745] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700">Support immediate event logistics and staging</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#0E1745] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700">Receive a one-time tax-deductible receipt</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#0E1745] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700">Name recognition in our post-event communications</span>
              </div>
            </div>
          </div>

          {/* Card 2: Regular Giving (Highlighted Center) */}
          <div style={{ backgroundColor: '#0E1745' }} className="rounded-3xl p-8 text-white relative flex flex-col h-full shadow-xl md:-translate-y-4 transition-transform">
            {/* Optional "Recommended" Badge */}
            <div className="absolute top-0 right-8 transform -translate-y-1/2">
              <span className="bg-[#FFD100] text-[#0E1745] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Impactful
              </span>
            </div>

            <div className="mb-8 mt-2">
              <h3 className="text-2xl font-bold mb-3">Regular Giving</h3>
              <p className="text-sm text-blue-200 leading-relaxed">
                Partner with us on a recurring basis to sustain the movement and future initiatives.
              </p>
            </div>

            <div className="space-y-4 flex-grow">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#FFD100] rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#0E1745] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-white">Provide crucial ongoing support for the ministry</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#FFD100] rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#0E1745] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-white">Exclusive access to partner-only updates</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#FFD100] rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#0E1745] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-white">Consolidated annual giving statement</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#FFD100] rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#0E1745] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-white">Priority seating consideration for future events</span>
              </div>
            </div>
          </div>

          {/* Card 3: Custom / Advertising */}
          <div style={{ backgroundColor: '#FFD100' }} className="rounded-3xl p-8 text-[#0E1745] relative flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-3">Custom & Brand</h3>
              <p className="text-sm text-[#0E1745]/80 leading-relaxed">
                Tailored brand placement, advertising, and unique corporate sponsorship opportunities.
              </p>
            </div>

            <div className="space-y-4 flex-grow">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#FFD100] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-medium">Digital and print brochure ad placements</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#FFD100] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-medium">Brand alignment with positive community impact</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#FFD100] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-medium">Custom promotional campaigns</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-[#FFD100] text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-medium">VIP hospitality hosting opportunities</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnershipLevels;