// src/components/PartnershipCTA.tsx
import React from 'react';

const PartnershipCTA: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div
          className="py-10 sm:py-14 px-6 sm:px-10 rounded-3xl text-center relative overflow-hidden shadow-lg"
          style={{ backgroundColor: '#0E1745' }}
        >
          {/* Optional subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0E1745]/90 to-[#0E1745] rounded-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                <img
                  src="/assets/Card 2.png" // ✅ Updated path for public folder
                  alt="Partnership Deck Icon"
                  className="w-6 h-6 sm:w-8 sm:h-8 invert brightness-0 saturate-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 leading-snug">
              Detailed Partnership Information
            </h2>

            {/* Description */}
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Download our comprehensive partnership deck with detailed information about sponsorship benefits, 
              activation opportunities, and partnership terms.
            </p>

            {/* CTA Button */}
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 sm:py-4 px-8 sm:px-10 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105"
            >
              DOWNLOAD PARTNERSHIP DECK
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipCTA;
