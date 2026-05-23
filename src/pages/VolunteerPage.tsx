import React from 'react';
import { useNavigate } from 'react-router-dom';

const volunteerBg = '/assets/volunteer-bg.png';
const vector1 = '/assets/Vector 1.png';
const card2 = '/assets/card 2.png';
const rectangle2 = '/assets/Rectangle 2.png';
const rectangle5 = '/assets/Rectangle 5.png';
const ideaIcon = '/assets/icons8_idea.png';
const image1 = '/assets/image1.jpg';
const image2 = '/assets/image2.jpg';
const image3 = '/assets/image3.jpg';
const image4 = '/assets/image4.jpg';
const image5 = '/assets/image5.jpg';
const image6 = '/assets/image6.jpg';
const image7 = '/assets/Image7.jpg';
const image8 = '/assets/image8.jpg';

import FAQ from '../components/FAQ';

const VolunteerPage: React.FC = () => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/volunteer/register');
  };

  return (
    <div className="min-h-screen">
      {/* Main Hero Section with Concert Background */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat pt-24"
        style={{
          backgroundImage: `url(${volunteerBg})`
        }}
      >
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Top Section - Main Text */}
          <div className="text-left mb-12">
            <h1 className="text-3xl lg:text-4xl font-normal text-white leading-tight mb-8">
              Be part of the team that makes 1000 Tongues possible.<br />
            </h1>
          <div className="absolute top-28 left-[2.5%] right-[25%] h-0.5 bg-white"></div>
            <h1 className="text-3xl lg:text-4xl font-normal text-white leading-tight mb-8">
              Serve behind the scenes and help create an unforgettable <br /> experience of worship and unity.
          </h1>
          </div>

          {/* Image Mosaic Section */}
          <div className="relative h-96 lg:h-[500px] mb-16">
            
            {/* Apply Now Button - Beside Main Concert Image */}
             <div className="absolute -top-16 left-0 w-1/4 h-3/5 flex flex-col items-start justify-start pt-8">
               <button 
                 onClick={handleApplyNow}
                 className="bg-transparent border border-white text-white w-24 h-24 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
               >
                 Apply Now
               </button>
             </div>
            
            {/* White line spanning across - under apply now button */}
            <div className="absolute top-20 left-0 right-[25%] h-0.5 bg-white"></div>
            
            {/* Main Large Concert Image */}
            <div className="absolute top-0 right-0 w-3/4 h-3/5 rounded-lg overflow-hidden">
              <img 
                src={vector1}
                alt="Concert crowd with golden stage lights" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Orange Equipment Image - Top Right */}
            <div className="absolute top-0 right-0 w-1/5 h-1/3 bg-orange-400 rounded-lg overflow-hidden z-10">
              <img 
                src={card2} 
                alt="Sound equipment and mixing console" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Portrait Image - Bottom Left */}
            <div className="absolute bottom-[-5%] left-0 w-[23%] h-[60%] rounded-lg overflow-hidden">
              <img 
                src={rectangle2} 
                alt="Smiling Black woman in blue top" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Overlay Box - Beside Small Concert Image */}
            <div className="absolute top-2/3 right-[6%] w-1/3 h-2/5 p-4 flex items-center justify-start">
              <p className="text-gray-300 text-xl text-right leading-relaxed font-normal">
                Choose the roles<br />
                that match your<br />
                gifts, skills, and<br />
                availability.
          </p>
        </div>

            {/* Small Concert Image - Bottom Right */}
            <div className="absolute top-2/3 right-0 w-1/4 h-2/5 rounded-lg overflow-hidden">
              <img 
                src={rectangle5} 
                alt="Concert crowd from behind" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Horizontal Line and VOLUNTEER Text */}
          <div className="relative h-16">
            {/* VOLUNTEER Text - Only upper half visible */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="flex items-end justify-center h-32 -mt-4">
                <h2 className="text-8xl lg:text-9xl font-light text-white tracking-widest">
                  VOLUNTEER
                </h2>
              </div>
            </div>
            
            {/* Horizontal Line - At the bottom */}
            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-white z-10"></div>
          </div>
        </div>
      </div>

      {/* Volunteer Roles Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid of Volunteer Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Event Setup & Logistics */}

            {/* <div className="bg-black rounded-lg p-6 text-white">
              <div className="w-12 h-12 mb-4">
                <img src={ideaIcon} alt="Idea" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Event Setup & Logistics</h3>
              <p className="text-gray-300 text-sm mb-4">
                Help with venue setup, equipment arrangement, and general logistics coordination.
              </p>
              <div className="mb-4">
                <p className="text-white text-sm"><strong>Commitment:</strong> 2-3 days before event + event days</p>
                <p className="text-white text-sm"><strong>Skills:</strong> Physical ability, attention to detail, teamwork</p>
              </div>
               <button 
                 onClick={handleApplyNow}
                 className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
               >
                 Apply Now
                 <span className="ml-2">→</span>
               </button>
            </div> */}

            {/* Guest Services & Ushering */}
            <div className="bg-black rounded-lg p-6 text-white">
              <div className="w-12 h-12 mb-4">
                <img src={ideaIcon} alt="Idea" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Guest Services & Ushering</h3>
              <p className="text-gray-300 text-sm mb-4">
                Welcome attendees, provide directions, assist with seating and ensure smooth entry/exit.
              </p>
              <div className="mb-4">
                <p className="text-white text-sm"><strong>Commitment:</strong> 2-3 days before event + event days</p>
                <p className="text-white text-sm"><strong>Skills:</strong> Physical ability, attention to detail, teamwork</p>
              </div>
               <button 
                 onClick={handleApplyNow}
                 className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
               >
                 Apply Now
                 <span className="ml-2">→</span>
               </button>
            </div>

            {/* Technical Support */}
            {/* <div className="bg-black rounded-lg p-6 text-white">
              <div className="w-12 h-12 mb-4">
                <img src={ideaIcon} alt="Idea" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Technical Support</h3>
              <p className="text-gray-300 text-sm mb-4">
                Assist with sound, lighting, recording equipment, and live streaming support.
              </p>
              <div className="mb-4">
                <p className="text-white text-sm"><strong>Commitment:</strong> 2-3 days before event + event days</p>
                <p className="text-white text-sm"><strong>Skills:</strong> Physical ability, attention to detail, teamwork</p>
              </div>
               <button 
                 onClick={handleApplyNow}
                 className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
               >
                 Apply Now
                 <span className="ml-2">→</span>
               </button>
            </div> */}

            {/* Choir Support */}
            <div className="bg-black rounded-lg p-6 text-white">
              <div className="w-12 h-12 mb-4">
                <img src={ideaIcon} alt="Idea" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Choir Support</h3>
              <p className="text-gray-300 text-sm mb-4">
                Help with choir check-in, distribute materials, assist choir directors during rehearsals.
              </p>
              <div className="mb-4">
                <p className="text-white text-sm"><strong>Commitment:</strong> 2-3 days before event + event days</p>
                <p className="text-white text-sm"><strong>Skills:</strong> Physical ability, attention to detail, teamwork</p>
              </div>
               <button 
                 onClick={handleApplyNow}
                 className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
               >
                 Apply Now
                 <span className="ml-2">→</span>
               </button>
            </div>

            {/* Registration & Check-in */}
            <div className="bg-black rounded-lg p-6 text-white">
              <div className="w-12 h-12 mb-4">
                <img src={ideaIcon} alt="Idea" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Registration & Check-in</h3>
              <p className="text-gray-300 text-sm mb-4">
                Manage attendee registration, distribute programs, handle Will Call tickets.
              </p>
              <div className="mb-4">
                <p className="text-white text-sm"><strong>Commitment:</strong> 2-3 days before event + event days</p>
                <p className="text-white text-sm"><strong>Skills:</strong> Physical ability, attention to detail, teamwork</p>
              </div>
               <button 
                 onClick={handleApplyNow}
                 className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
               >
                 Apply Now
                 <span className="ml-2">→</span>
               </button>
            </div>

            {/* Photography & Media */}
            {/* <div className="bg-black rounded-lg p-6 text-white">
              <div className="w-12 h-12 mb-4">
                <img src={ideaIcon} alt="Idea" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Photography & Media</h3>
              <p className="text-gray-300 text-sm mb-4">
                Capture event moments, assist with social media content, document the experience.
              </p>
              <div className="mb-4">
                <p className="text-white text-sm"><strong>Commitment:</strong> 2-3 days before event + event days</p>
                <p className="text-white text-sm"><strong>Skills:</strong> Physical ability, attention to detail, teamwork</p>
              </div>
               <button 
                 onClick={handleApplyNow}
                 className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
               >
                 Apply Now
                 <span className="ml-2">→</span>
               </button>
            </div> */}

            {/* Hospitality & Catering */}
            {/* <div className="bg-black rounded-lg p-6 text-white">
              <div className="w-12 h-12 mb-4">
                <img src={ideaIcon} alt="Idea" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hospitality & Catering</h3>
              <p className="text-gray-300 text-sm mb-4">
                Assist with refreshments, manage catering logistics, ensure volunteer needs.
              </p>
              <div className="mb-4">
                <p className="text-white text-sm"><strong>Commitment:</strong> 2-3 days before event + event days</p>
                <p className="text-white text-sm"><strong>Skills:</strong> Physical ability, attention to detail, teamwork</p>
              </div>
               <button 
                 onClick={handleApplyNow}
                 className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
               >
                 Apply Now
                 <span className="ml-2">→</span>
               </button>
            </div> */}

            {/* Transportation & Parking */}
            {/* <div className="bg-black rounded-lg p-6 text-white">
              <div className="w-12 h-12 mb-4">
                <img src={ideaIcon} alt="Idea" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transportation & Parking</h3>
              <p className="text-gray-300 text-sm mb-4">
                Help coordinate parking, assist with accessibility needs, manage traffic flow.
              </p>
              <div className="mb-4">
                <p className="text-white text-sm"><strong>Commitment:</strong> 2-3 days before event + event days</p>
                <p className="text-white text-sm"><strong>Skills:</strong> Physical ability, attention to detail, teamwork</p>
              </div>
               <button 
                 onClick={handleApplyNow}
                 className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
               >
                 Apply Now
                 <span className="ml-2">→</span>
               </button>
            </div> */}

            {/* Prayer Team */}
            <div className="bg-black rounded-lg p-6 text-white">
              <div className="w-12 h-12 mb-4">
                <img src={ideaIcon} alt="Idea" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3">Prayer Team</h3>
              <p className="text-gray-300 text-sm mb-4">
                Provide prayer support during the event, pray with attendees, spiritual encouragement.
              </p>
              <div className="mb-4">
                <p className="text-white text-sm"><strong>Commitment:</strong> 2-3 days before event + event days</p>
                <p className="text-white text-sm"><strong>Skills:</strong> Physical ability, attention to detail, teamwork</p>
              </div>
               <button 
                 onClick={handleApplyNow}
                 className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
               >
                 Apply Now
                 <span className="ml-2">→</span>
               </button>
            </div>

          </div>
        </div>
      </div>

      {/* Make Connections Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                Make long lasting and meaningful Connections.
              </h2>
            </div>
            <div className="flex items-center">
              <p className="text-gray-700 text-lg">
                Be part of the team that makes 1000 Tongues possible. 
                Serve behind the scenes and help create an unforgettable 
                experience of worship and unity.
              </p>
            </div>
          </div>

          {/* Scrollable Image Gallery */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-4" style={{ width: 'max-content' }}>
                
                 {/* Row 1 - Top 4 Images */}
                 <div className="flex flex-col space-y-4">
                   <div className="w-96 h-48 bg-gray-300 rounded-lg overflow-hidden">
                     <img 
                       src={image1} 
                       alt="Volunteers connecting" 
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <div className="w-96 h-48 bg-gray-300 rounded-lg overflow-hidden">
                     <img 
                       src={image5} 
                       alt="Team collaboration" 
                       className="w-full h-full object-cover"
                     />
                   </div>
          </div>

                 <div className="flex flex-col space-y-4">
                   <div className="w-96 h-48 bg-gray-300 rounded-lg overflow-hidden">
                     <img 
                       src={image2} 
                       alt="Community gathering" 
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <div className="w-96 h-48 bg-gray-300 rounded-lg overflow-hidden">
                     <img 
                       src={image6} 
                       alt="Volunteer training" 
                       className="w-full h-full object-cover"
                     />
                   </div>
          </div>

                 <div className="flex flex-col space-y-4">
                   <div className="w-96 h-48 bg-gray-300 rounded-lg overflow-hidden">
                     <img 
                       src={image3} 
                       alt="Behind the scenes" 
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <div className="w-96 h-48 bg-gray-300 rounded-lg overflow-hidden">
                     <img 
                       src={image7} 
                       alt="Event preparation" 
                       className="w-full h-full object-cover"
                     />
                   </div>
          </div>

                 <div className="flex flex-col space-y-4">
                   <div className="w-96 h-48 bg-gray-300 rounded-lg overflow-hidden">
                     <img 
                       src={image4} 
                       alt="Meaningful connections" 
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <div className="w-96 h-48 bg-gray-300 rounded-lg overflow-hidden">
                     <img 
                       src={image8} 
                       alt="Volunteer fellowship" 
                       className="w-full h-full object-cover"
                     />
                   </div>
          </div>

          </div>
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
