import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-06-01T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-16 sm:py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/countdown-bg.jpg"
          alt="Countdown background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0E1745] opacity-80"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        {/* Main Heading */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-white mb-8 sm:mb-10 md:mb-12 tracking-wider uppercase">
          Event Begins In
        </h2>

        {/* Countdown Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Days */}
          <div className="text-center">
            <div className="text-white text-xs sm:text-sm md:text-base uppercase tracking-wide mb-2 md:mb-3">
              Days
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold" style={{ color: "#FFD700" }}>
              {String(timeLeft.days).padStart(2, '0')}
            </div>
          </div>

          {/* Hours */}
          <div className="text-center">
            <div className="text-white text-xs sm:text-sm md:text-base uppercase tracking-wide mb-2 md:mb-3">
              Hours
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold" style={{ color: "#FFD700" }}>
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
          </div>

          {/* Minutes */}
          <div className="text-center">
            <div className="text-white text-xs sm:text-sm md:text-base uppercase tracking-wide mb-2 md:mb-3">
              Minutes
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold" style={{ color: "#FFD700" }}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
          </div>

          {/* Seconds */}
          <div className="text-center">
            <div className="text-white text-xs sm:text-sm md:text-base uppercase tracking-wide mb-2 md:mb-3">
              Seconds
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold" style={{ color: "#FFD700" }}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
