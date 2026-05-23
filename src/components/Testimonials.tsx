import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-200">
      <div className="max-w-6xl mx-auto py-20 px-8">
        {/* Main Quote Text */}
        <blockquote className="text-3xl lg:text-4xl font-sans text-gray-800 leading-relaxed mb-8 max-w-4xl">
          "1000 Tongues is more than an event, it's a prophetic sound of unity, thousands of voices rising as one to exalt Jesus in the heart of London."
        </blockquote>
        
        {/* Bottom Row: Author Info (Left) and Navigation (Right) */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Author Information - Left Side */}
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <h4 className="text-lg font-bold text-gray-800">Temi Tayo</h4>
              <p className="text-gray-600">CEO of 1000 Tongues</p>
            </div>
          </div>
          
          {/* Navigation Controls - Right Side */}
          <div className="flex items-center">
            {/* Previous Button */}
            <button className="w-20 h-12 border border-gray-300 bg-white rounded-3xl flex items-center justify-center mr-4 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Pagination */}
            <span className="text-gray-500 text-sm font-medium mx-4">01/05</span>
            
            {/* Next Button */}
            <button className="w-20 h-12 bg-gray-800 rounded-3xl flex items-center justify-center hover:bg-gray-900 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
