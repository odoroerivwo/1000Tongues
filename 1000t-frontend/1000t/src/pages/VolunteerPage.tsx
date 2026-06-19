import React from 'react';
import { useNavigate } from 'react-router-dom';

const volunteerBg = '/assets/volunteer-bg.png';
const vector1 = '/assets/Vector 1.png';
const image1 = '/assets/image1.jpg';
const image2 = '/assets/image2.jpg';
const image3 = '/assets/image3.jpg';

import FAQ from '../components/FAQ';

const VolunteerPage: React.FC = () => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/volunteer/register');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative py-16 sm:py-20 lg:py-24 bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(14, 23, 69, 0.95), rgba(14, 23, 69, 0.8), rgba(0, 0, 0, 0.4)), url(${volunteerBg})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Copy & Call to Action */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <span className="inline-block px-3 py-1 bg-[#FFD100]/25 text-[#FFD100] border border-[#FFD100]/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                Serve With Us
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight font-serif">
                Be part of the team that makes <span className="font-semibold text-[#FFD100]">1000 Tongues</span> possible
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Serve behind the scenes and help create an unforgettable experience of worship and unity in London. Choose a role that matches your unique gifts, skills, and availability.
              </p>
              <div>
                <button 
                  onClick={handleApplyNow}
                  className="px-8 py-4 bg-[#FFD100] text-[#0E1745] hover:bg-[#ecc200] font-semibold rounded-full text-sm transition-all duration-300 shadow-lg hover:scale-105"
                >
                  Apply to Volunteer →
                </button>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <img 
                  src={vector1}
                  alt="1000 Tongues Worship Event Crowd" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1745]/60 via-transparent to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Volunteer Roles Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-light text-[#0E1745]">
              Choose Your Volunteer Role
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
              Select one of our active team areas where you can commit your skills, heart, and time. Click any card to apply.
            </p>
          </div>

          {/* Grid of Volunteer Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Registration & Check-in */}
            <div 
              onClick={handleApplyNow}
              className="bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 mb-6 bg-[#0E1745]/5 rounded-2xl flex items-center justify-center text-[#0E1745] group-hover:bg-[#0E1745] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1745] mb-3">Registration & Check-in</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Manage attendee check-in, distribute event programs or badges, and coordinate information tables.
                </p>
                <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                  <p className="text-xs text-gray-500"><strong className="text-gray-700">Commitment:</strong> Brief orientation + event check-in hours</p>
                  <p className="text-xs text-gray-500"><strong className="text-gray-700">Skills:</strong> Friendly demeanor, basic computer/tablet confidence</p>
                </div>
              </div>
              <div className="text-[#0E1745] font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                Click to volunteer <span className="ml-2">→</span>
              </div>
            </div>

            {/* Guest Services & Ushering */}
            <div 
              onClick={handleApplyNow}
              className="bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 mb-6 bg-[#0E1745]/5 rounded-2xl flex items-center justify-center text-[#0E1745] group-hover:bg-[#0E1745] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1745] mb-3">Guest Services & Ushering</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Welcome attendees, provide directions, assist with seating, and ensure smooth entry and exit throughout the event.
                </p>
                <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                  <p className="text-xs text-gray-500"><strong className="text-gray-700">Commitment:</strong> Event days + brief training session</p>
                  <p className="text-xs text-gray-500"><strong className="text-gray-700">Skills:</strong> Warm hospitality, attention to detail, teamwork</p>
                </div>
              </div>
              <div className="text-[#0E1745] font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                Click to volunteer <span className="ml-2">→</span>
              </div>
            </div>

            {/* Choir Support */}
            <div 
              onClick={handleApplyNow}
              className="bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 mb-6 bg-[#0E1745]/5 rounded-2xl flex items-center justify-center text-[#0E1745] group-hover:bg-[#0E1745] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1745] mb-3">Choir Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Help with choir check-in, distribute music materials, and assist choir directors during rehearsals and the main event.
                </p>
                <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                  <p className="text-xs text-gray-500"><strong className="text-gray-700">Commitment:</strong> Rehearsals + main event weekend</p>
                  <p className="text-xs text-gray-500"><strong className="text-gray-700">Skills:</strong> Organized communication, patience, teamwork</p>
                </div>
              </div>
              <div className="text-[#0E1745] font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                Click to volunteer <span className="ml-2">→</span>
              </div>
            </div>

            {/* Prayer Support */}
            <div 
              onClick={handleApplyNow}
              className="bg-gray-50 border border-gray-200 rounded-3xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 mb-6 bg-[#0E1745]/5 rounded-2xl flex items-center justify-center text-[#0E1745] group-hover:bg-[#0E1745] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0E1745] mb-3">Prayer Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Provide prayer support during the gathering, pray with attendees, and offer spiritual encouragement.
                </p>
                <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                  <p className="text-xs text-gray-500"><strong className="text-gray-700">Commitment:</strong> Scheduled event shifts</p>
                  <p className="text-xs text-gray-500"><strong className="text-gray-700">Skills:</strong> Empathy, active listening, spiritual maturity</p>
                </div>
              </div>
              <div className="text-[#0E1745] font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                Click to volunteer <span className="ml-2">→</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Make Connections Section */}
      <div className="bg-gray-50 py-16 sm:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-light text-[#0E1745]">
              Make Meaningful Connections
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
              Volunteering isn't just about tasks—it's about community. Connect with fellow believers, build relationships, and serve together as one body.
            </p>
          </div>

          {/* Clean 3-Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="h-64 rounded-3xl overflow-hidden shadow-md border border-gray-150 group">
              <img 
                src={image1} 
                alt="Volunteers connecting" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="h-64 rounded-3xl overflow-hidden shadow-md border border-gray-150 group">
              <img 
                src={image2} 
                alt="Community gathering" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="h-64 rounded-3xl overflow-hidden shadow-md border border-gray-150 group">
              <img 
                src={image3} 
                alt="Behind the scenes" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default VolunteerPage;
