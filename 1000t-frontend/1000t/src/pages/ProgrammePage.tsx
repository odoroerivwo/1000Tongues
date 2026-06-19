import React, { useState } from 'react';

const StarIcon = '/assets/Star.png';
const Card1Icon = '/assets/Image [w-20].png';
const Card2Icon = '/assets/Image[w-20]2.png';
const Card3Icon = '/assets/Image[w-20]3.png';
const Card4Icon = '/assets/Image[w-20]4.png';
const TimerIcon = '/assets/Timer.png';
const TimerIcon2 = '/assets/Timer2.png';
const Star2Icon = '/assets/Star2.png';

const ProgrammePage: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Event Schedule Badge */}
          <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-xl px-4 py-2" style={{ backgroundColor: '#F7EDD7' }}>
            <img src={StarIcon} alt="Star" className="w-4 h-4" />
            <span className="text-sm " style={{ color: '#B8860C' }}>Event Schedule</span>
          </div>
        </div>
          
          <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6">
            Programme
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Two days of worship, unity, and celebration. Join us for this carefully crafted 
            programme designed to honor God and unite His people.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Four Worship Sessions */}
          <div className="bg-yellow-400 rounded-lg p-8 text-black">
            <div className="mb-6">
              <img src={Card1Icon} alt="Four Worship Sessions" className="w-20 h-20 mb-4" />
              <h3 className="text-xl font-bold mb-3">Four Worship Sessions</h3>
              <p className="text-sm leading-relaxed">
                Experience the power of 1000 voices in unified worship across both days
              </p>
            </div>
          </div>

          {/* Denominational Unity */}
          <div className="bg-yellow-400 rounded-lg p-8 text-black">
            <div className="mb-6">
              <img src={Card2Icon} alt="Denominational Unity" className="w-20 h-20 mb-4" />
              <h3 className="text-xl font-bold mb-3">Denominational Unity</h3>
              <p className="text-sm leading-relaxed">
                Representatives from 50+ churches and denominations participating
              </p>
            </div>
          </div>

          {/* Historic Venue */}
          <div className="bg-yellow-400 rounded-lg p-8 text-black">
            <div className="mb-6">
              <img src={Card3Icon} alt="Historic Venue" className="w-20 h-20 mb-4" />
              <h3 className="text-xl font-bold mb-3">Historic Venue</h3>
              <p className="text-sm leading-relaxed">
                Premium London location to be announced - capacity for 3000+ attendees
              </p>
            </div>
          </div>

          {/* Professional Recording */}
          <div className="bg-yellow-400 rounded-lg p-8 text-black">
            <div className="mb-6">
              <img src={Card4Icon} alt="Professional Recording" className="w-20 h-20 mb-4" />
              <h3 className="text-xl font-bold mb-3">Professional Recording</h3>
              <p className="text-sm leading-relaxed">
                Event will be professionally recorded for future release and sharing
              </p>
            </div>
          </div>
        </div>

        {/* Download Programme Section */}
        <div className="rounded-2xl p-12 text-center text-white mb-16" style={{ backgroundColor: '#0E1745' }}>
          {/* Download Icon */}
          <div className="mb-6">
            <svg className="w-12 h-12 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <h2 className="text-4xl font-serif mb-4">
            Download Full Programme
          </h2>
          
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Get the complete programme guide with detailed timings, venue maps, parking information, and everything 
            you need for the weekend!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors text-sm uppercase tracking-wide">
              DOWNLOAD PROGRAMME
            </button>
            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm uppercase tracking-wide">
              ADD TO CALENDAR
            </button>
          </div>
        </div>

      </div>

      {/* Detailed Schedule Section */}
      <div className="bg-black py-16">
        <div className="max-w-6xl mx-auto px-8">
          {/* Day Toggle Buttons */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-gray-200 p-1">
              <button 
                onClick={() => setActiveDay(1)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
                  activeDay === 1 
                    ? 'bg-yellow-400 text-black' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Day 1
              </button>
              <button 
                onClick={() => setActiveDay(2)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
                  activeDay === 2 
                    ? 'bg-yellow-400 text-black' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Day 2
              </button>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">
                  Day {activeDay} - {activeDay === 1 ? 'Saturday' : 'Sunday'}
                </h3>
              </div>
              <p className="text-gray-600 mt-1">Summer 2026 (Date TBA)</p>
            </div>

            {/* Schedule Items */}
            <div>
              {activeDay === 1 ? (
                <>
                  {/* Day 1 Schedule */}
                  {/* Horizontal Divider */}
                  <div className="h-1.5 bg-black"></div>
                  
                  {/* Registration & Welcome */}
                  <div className="flex">
                    <div className="bg-yellow-400 w-32 flex items-center justify-center text-black font-medium text-sm">
                      <img src={TimerIcon} alt="Timer" className="w-4 h-4 mr-2" />
                      09:00 - 10:00
                    </div>
                    <div className="w-1.5 bg-black"></div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start gap-3">
                        <img src={Star2Icon} alt="Star" className="w-5 h-5 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Registration & Welcome</h4>
                          <p className="text-gray-600 text-sm">Attendee check-in, programme collection, fellowship time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Horizontal Divider */}
                  <div className="h-1.5 bg-black"></div>

                  {/* Opening Ceremony */}
                  <div className="flex">
                    <div className="w-32 flex items-center justify-center text-white font-medium text-sm" style={{ backgroundColor: '#0E1745' }}>
                      <img src={TimerIcon2} alt="Timer" className="w-4 h-4 mr-2" />
                      10:00 - 10:30
                    </div>
                    <div className="w-1.5 bg-black"></div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start gap-3">
                        <img src={Star2Icon} alt="Star" className="w-5 h-5 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Opening Ceremony</h4>
                          <p className="text-gray-600 text-sm">Welcome address, vision casting, and opening prayer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Horizontal Divider */}
                  <div className="h-1.5 bg-black"></div>

                  {/* Morning Worship Session */}
                  <div className="flex">
                    <div className="bg-gray-600 w-32 flex items-center justify-center text-white font-medium text-sm">
                      <img src={TimerIcon2} alt="Timer" className="w-4 h-4 mr-2" />
                      10:30 - 12:00
                    </div>
                    <div className="w-1.5 bg-black"></div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start gap-3">
                        <img src={Star2Icon} alt="Star" className="w-5 h-5 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Morning Worship Session</h4>
                          <p className="text-gray-600 text-sm">Unified worship with 1000 voices - Traditional hymns and contemporary praise</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Horizontal Divider */}
                  <div className="h-1.5 bg-black"></div>

                  {/* Lunch & Fellowship */}
                  <div className="flex">
                    <div className="bg-green-500 w-32 flex items-center justify-center text-white font-medium text-sm">
                      <img src={TimerIcon} alt="Timer" className="w-4 h-4 mr-2" />
                      13:30 - 15:00
                    </div>
                    <div className="w-1.5 bg-black"></div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start gap-3">
                        <img src={Star2Icon} alt="Star" className="w-5 h-5 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Lunch & Fellowship</h4>
                          <p className="text-gray-600 text-sm">Refreshments and community building time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Day 2 Schedule */}
                  {/* Horizontal Divider */}
                  <div className="h-1.5 bg-black"></div>
                  
                  {/* Morning Preparation */}
                  <div className="flex">
                    <div className="bg-yellow-400 w-32 flex items-center justify-center text-black font-medium text-sm">
                      <img src={TimerIcon} alt="Timer" className="w-4 h-4 mr-2" />
                      08:00 - 09:00
                    </div>
                    <div className="w-1.5 bg-black"></div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start gap-3">
                        <img src={Star2Icon} alt="Star" className="w-5 h-5 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Morning Preparation</h4>
                          <p className="text-gray-600 text-sm">Final rehearsal and sound check for the historic performance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Horizontal Divider */}
                  <div className="h-1.5 bg-black"></div>

                  {/* Opening Worship */}
                  <div className="flex">
                    <div className="w-32 flex items-center justify-center text-white font-medium text-sm" style={{ backgroundColor: '#0E1745' }}>
                      <img src={TimerIcon2} alt="Timer" className="w-4 h-4 mr-2" />
                      09:00 - 10:00
                    </div>
                    <div className="w-1.5 bg-black"></div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start gap-3">
                        <img src={Star2Icon} alt="Star" className="w-5 h-5 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Opening Worship</h4>
                          <p className="text-gray-600 text-sm">Preparing hearts for the historic 1000 voices performance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Horizontal Divider */}
                  <div className="h-1.5 bg-black"></div>

                  {/* The Historic Performance */}
                  <div className="flex">
                    <div className="bg-gray-600 w-32 flex items-center justify-center text-white font-medium text-sm">
                      <img src={TimerIcon2} alt="Timer" className="w-4 h-4 mr-2" />
                      10:00 - 12:00
                    </div>
                    <div className="w-1.5 bg-black"></div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start gap-3">
                        <img src={Star2Icon} alt="Star" className="w-5 h-5 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">The Historic Performance</h4>
                          <p className="text-gray-600 text-sm">1000 voices unite in an unprecedented celebration of worship</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Horizontal Divider */}
                  <div className="h-1.5 bg-black"></div>

                  {/* Closing Celebration */}
                  <div className="flex">
                    <div className="bg-green-500 w-32 flex items-center justify-center text-white font-medium text-sm">
                      <img src={TimerIcon} alt="Timer" className="w-4 h-4 mr-2" />
                      12:00 - 13:00
                    </div>
                    <div className="w-1.5 bg-black"></div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start gap-3">
                        <img src={Star2Icon} alt="Star" className="w-5 h-5 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Closing Celebration</h4>
                          <p className="text-gray-600 text-sm">Thanksgiving and commissioning for continued unity</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="bg-yellow-400 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-serif text-black mb-4">
            Have Questions About the Programme?
          </h2>
          
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
            Our team is here to help with any questions about timings, accessibility, or special requirements.
          </p>

          <button className="text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm uppercase tracking-wide" style={{ backgroundColor: '#0E1745' }}>
            CONTACT SUPPORT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgrammePage;
