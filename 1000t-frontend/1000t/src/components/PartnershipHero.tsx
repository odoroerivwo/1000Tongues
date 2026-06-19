// src/components/PartnershipHero.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const PartnershipHero: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT: text + big image with small overlapping image */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="mt-4 lg:mt-20">
              <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-light leading-snug md:leading-tight">
                Join us in making history. Partner with 1000 Tongues to support a movement of unity, worship, and community impact.
              </h1>
            </div>

            <div className="relative w-full flex justify-center">
              {/* Large image */}
              <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                <div className="w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[520px]">
                  <img
                    src="/assets/paternership-image1.png"
                    alt="City skyline view from below"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* overlapping small image */}
              <div className="absolute left-0 transform sm:left-[-6%] lg:left-[-4%] bottom-[-10%] sm:bottom-[-6%] md:bottom-[-3%] w-40 sm:w-52 md:w-60 lg:w-72 h-28 sm:h-36 md:h-44 lg:h-52 rounded-xl overflow-hidden border-4 border-gray-900 shadow-xl bg-gray-800">
                <img
                  src="/assets/pat-shake.jpg"
                  alt="Business meeting handshake"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: big prayer image + overlay small sitter + info card */}
          <div className="relative mt-6 lg:mt-0">
            {/* Large prayer image */}
            <div className="w-full rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[520px]">
                <img
                  src="/assets/pat-raise-hand.png"
                  alt="Prayer hands seeking spiritual guidance"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* small overlapping sitter image */}
            <div className="absolute left-3 sm:left-6 md:left-8 lg:left-10 bottom-16 sm:bottom-14 md:bottom-12 w-36 sm:w-44 md:w-52 h-24 sm:h-32 md:h-40 rounded-xl overflow-hidden border-4 border-gray-900 shadow-md bg-gray-800">
              <img
                src="/assets/pat-2-sitting.jpg"
                alt="Business meeting discussion"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Info card */}
            <div className="absolute left-0 right-0 -bottom-6 sm:-bottom-8 md:-bottom-10 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-md sm:max-w-lg lg:max-w-xl bg-gradient-to-t from-black/90 via-gray-900/80 to-transparent rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">Building Kingdom Partnerships</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  Together, we can create something extraordinary that glorifies God and unites His people.
                </p>
                <Link
                  to="/partnership/apply"
                  className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-5 sm:px-6 py-2.5 rounded-full font-medium hover:from-yellow-500 hover:to-orange-600 transition-transform transform hover:scale-105 text-sm sm:text-base"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipHero;
