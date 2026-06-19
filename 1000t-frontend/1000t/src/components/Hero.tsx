import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      video.classList.add('opacity-100');
    };

    const handleError = () => {
      setVideoError(true);
      console.warn('Background video failed to load, falling back to static background');
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-16 md:py-20 lg:py-30 pt-20 md:pt-24" 
      style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}
    >
      {/* Background Video */}
      {!videoError && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-center opacity-0 transition-opacity duration-500"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/concert-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
      )}

      {/* Background overlay for fallback with subtle lighting effects */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ 
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
          `
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-20">
        {/* Location and Date */}
        <div className="inline-flex items-center gap-2 border border-gray-400 text-white py-2 px-4 md:py-3 md:px-6 rounded-full text-xs sm:text-sm mb-6 md:mb-8 font-light">
          <img src="/assets/Location.png" alt="Location" className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="whitespace-nowrap">London Summer 2026</span>
        </div>

        {/* Main Title - Responsive Font Sizes */}
        <h1 
          className="mb-4 md:mb-6 text-center font-newyork"
          style={{ 
            fontSize: 'clamp(3rem, 12vw, 9.375rem)', 
            lineHeight: 'clamp(2.5rem, 10vw, 5.8125rem)',
            fontWeight: '400', 
            color: '#ffd700',
            fontFamily: 'NewYork, serif'
          }}
        >
          <span className="block">1000</span>
          <span className="block">Tongues</span>
        </h1>

        {/* Subtitle/Quote */}
        <p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl italic mb-6 md:mb-8 max-w-2xl mx-auto px-4" 
          style={{ color: '#ffd700' }}
        >
          "Oh for a thousand tongues to sing my great Redeemer's praise"
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-white mb-8 md:mb-12 mx-auto leading-relaxed font-light max-w-3xl px-4">
          Join 1,000 choir voices and 3,000+ worshippers for a historic gathering of unified praise in the heart of London
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 md:gap-6 justify-center items-center px-4">
          <Link to="/join-choir">
            <button 
              className="w-full sm:w-auto py-3 sm:py-2 px-6 sm:px-8 rounded-2xl text-base sm:text-lg cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 hover:transform hover:-translate-y-1 shadow-lg font-light touch-target" 
              style={{ backgroundColor: '#ffd700', color: '#1a1a1a' }}
            >
              <img src="/assets/fi_music.png" alt="Music" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">Join Choir</span>
            </button>
          </Link>
          
          {/*
          <Link to="/tickets">
            <button 
              className="w-full sm:w-auto py-3 sm:py-2 px-6 sm:px-8 rounded-2xl text-base sm:text-lg cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 hover:transform hover:-translate-y-1 shadow-lg border font-light touch-target" 
              style={{ backgroundColor: '#0E1745', color: 'white', borderColor: 'white' }}
            >
              <img src="/assets/Ticket2.png" alt="Ticket" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">Get Tickets</span>
            </button>
          </Link>
          */}
          
          <button 
            className="w-full sm:w-auto py-3 sm:py-2 px-6 sm:px-8 rounded-2xl text-base sm:text-lg cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 border-2 border-transparent hover:border-gray-600 font-light touch-target" 
            style={{ backgroundColor: 'transparent', color: 'white' }}
          >
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">▶</span>
            <span className="whitespace-nowrap">Watch Teaser</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
