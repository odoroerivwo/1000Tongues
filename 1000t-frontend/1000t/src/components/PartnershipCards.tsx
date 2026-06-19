import React from 'react';

const PartnershipCards: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* LEFT SIDE — occupies 3/4 width on large screens */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-6">
            
            {/* --- Community Connection Card --- */}
            <div
              style={{ backgroundColor: '#FFD100' }}
              className="rounded-3xl p-6 sm:p-8 text-black relative overflow-hidden shadow-md flex-1"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                  Community Connection
                </h3>
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <img
                    src="/assets/fi_arrow-up-right.png"
                    alt="Arrow up right"
                    className="w-8 h-8"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="text-sm sm:text-base leading-relaxed">
                Connect with thousands of faith-filled individuals and organizations across London and the UK.
              </p>
            </div>

            {/* --- Bottom Row: Two Cards --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              {/* Kingdom Impact Card */}
              <div
                style={{ backgroundColor: '#0E1745' }}
                className="text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                    Kingdom Impact
                  </h3>
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <img
                      src="/assets/fi_arrow-up-right.png"
                      alt="Arrow up right"
                      className="w-8 h-8 filter invert"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-sm sm:text-base leading-relaxed flex-grow">
                  Support a movement that transcends denominational boundaries and demonstrates Christian unity in London and beyond.
                </p>
              </div>

              {/* Brand Alignment Card */}
              <div
                style={{ backgroundColor: '#F7EDD7' }}
                className="rounded-3xl p-6 sm:p-8 text-gray-900 relative overflow-hidden shadow-md flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                    Brand Alignment
                  </h3>
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <img
                      src="/assets/fi_arrow-up-right.png"
                      alt="Arrow up right"
                      className="w-8 h-8"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-sm sm:text-base leading-relaxed flex-grow">
                  Align your organization with values of unity, excellence, and positive community impact.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — 1/4 width on large screens */}
          <div className="lg:col-span-1 h-full">
            {/* Historic Significance Card */}
            <div
              style={{ backgroundColor: '#000000' }}
              className="text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden h-full flex flex-col shadow-md"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                  Historic <br /> Significance
                </h3>
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <img
                    src="/assets/fi_arrow-up-right.png"
                    alt="Arrow up right"
                    className="w-8 h-8 filter invert"
                    loading="lazy"
                  />
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed mb-6">
                Be part of a landmark event that will be remembered for years to come in London's faith community.
              </p>

              {/* Concert Image */}
              <div className="flex-grow mt-auto pt-6">
                <div className="w-full h-40 sm:h-48 md:h-full min-h-[160px] rounded-2xl overflow-hidden">
                  <img
                    src="/assets/Rectangle 23818.png"
                    alt="Concert stage with blue lighting"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnershipCards;