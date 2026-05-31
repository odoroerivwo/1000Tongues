import React, { useState } from 'react';

// Define the structure of a single testimonial
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  image?: string; 
}

// Array of testimonial data
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote: "1000 Tongues is more than an event, it's a prophetic sound of unity, thousands of voices rising as one to exalt Jesus in the heart of London.",
    name: "Temi Tayo",
    title: "CEO of 1000 Tongues",
  },
  {
    id: 2,
    quote: "Being part of this movement has fundamentally shifted how we view worship. It is a breathtaking experience of pure community and faith.",
    name: "Sarah Jenkins",
    title: "Worship Director",
  },
  {
    id: 3,
    quote: "The atmosphere was electric. You could feel the presence of unity as people from all different backgrounds brought their unique voices together.",
    name: "David Olatunji",
    title: "Lead Pastor",
  },
  {
    id: 4,
    quote: "This is exactly what our city needs right now. A beautiful, unified front of believers declaring hope over our generation.",
    name: "Grace Williams",
    title: "Community Coordinator",
  },
  {
    id: 5,
    quote: "An absolute masterpiece of organization and spiritual leadership. The scale of the choir and the quality of the sound is unmatched.",
    name: "Marcus Thorne",
    title: "Music Producer",
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Handle navigating to the next testimonial
  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle navigating to the previous testimonial
  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const activeTestimonial = testimonialsData[currentIndex];

  // Format numbers to always have a leading zero (e.g., "01/05")
  const currentNumber = String(currentIndex + 1).padStart(2, '0');
  const totalNumber = String(testimonialsData.length).padStart(2, '0');

  return (
    <section className="py-16 bg-[#EAECEE] overflow-hidden">
      
      {/* 
        Custom CSS for the slide animations. 
        Injected here so you don't have to edit index.css or tailwind.config.js 
      */}
      <style>{`
        @keyframes slideInNext {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInPrev {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-next {
          animation: slideInNext 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-slide-prev {
          animation: slideInPrev 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      <div className="max-w-6xl mx-auto py-12 md:py-20 px-6 sm:px-8">
        
        {/* ANIMATED WRAPPER: The 'key' prop forces React to replay the animation when the index changes */}
        <div 
          key={currentIndex} 
          className={direction === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}
        >
          {/* Main Quote Text */}
          <div className="min-h-[180px] sm:min-h-[140px] flex items-center mb-8">
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-sans text-gray-800 leading-relaxed max-w-4xl">
              "{activeTestimonial.quote}"
            </blockquote>
          </div>
        </div>
        
        {/* Bottom Row: Author Info (Left) and Navigation (Right) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0">
          
          {/* Author Information - Animated with the quote */}
          <div 
            key={`author-${currentIndex}`} 
            className={`flex items-center ${direction === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-300 rounded-full mr-4 flex-shrink-0 overflow-hidden">
              {activeTestimonial.image && (
                <img 
                  src={activeTestimonial.image} 
                  alt={activeTestimonial.name} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-800">
                {activeTestimonial.name}
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                {activeTestimonial.title}
              </p>
            </div>
          </div>
          
          {/* STATIC: Navigation Controls (These do NOT animate, so the buttons don't jump around) */}
          <div className="flex items-center self-end sm:self-auto">
            {/* Previous Button */}
            <button 
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-16 h-10 sm:w-20 sm:h-12 border border-gray-300 bg-white rounded-3xl flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0E1745]"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Pagination Indicator */}
            <span className="text-gray-500 text-xs sm:text-sm font-medium mx-3 sm:mx-4 w-12 text-center">
              {currentNumber}/{totalNumber}
            </span>
            
            {/* Next Button */}
            <button 
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-16 h-10 sm:w-20 sm:h-12 bg-[#0E1745] rounded-3xl flex items-center justify-center hover:bg-[#1a2666] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0E1745]"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Testimonials;