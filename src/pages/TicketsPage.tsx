import { Check } from 'lucide-react';

const StarIcon = '/assets/star.png';
const CalendarIcon = '/assets/Calendar-Add.png';
const CalendarCrossIcon = '/assets/Calendar-Cross.png';
const UsersIcon = '/assets/Users-1.png';
const DurationIcon = '/assets/Clock-1.png';
const LocationIcon = '/assets/Location2.png';
const ShieldIcon = '/assets/fi_shield.png';
const CreditCardIcon = '/assets/fi_credit-card.png';
const Shield1Icon = '/assets/fi_shield_1.png';
const CreditCard1Icon = '/assets/fi_credit-card_1.png';
const ExternalLinkIcon = '/assets/fi_external-link.png';

const TicketsPage: React.FC = () => {


  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-100 from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Matching Screenshot */}
        <div className="text-center mb-20">
          {/* Secure Your Seat Badge */}
          <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-xl px-4 py-2" style={{ backgroundColor: '#F7EDD7' }}>
            <img src={StarIcon} alt="Star" className="w-4 h-4" />
            <span className="text-sm " style={{ color: '#B8860C' }}>Secure Your Seat</span>
          </div>
        </div>
          
          {/* Main Title */}
          <h1 className="text-5xl lg:text-6xl font-serif font-light text-gray-800 mb-6 tracking-wide">
            Get Your Tickets
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-16">
            Join 3,000+ worshippers for this historic gathering. Early bird pricing available until March 2026.
          </p>
          
            {/* Statistic Cards */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
           {/* Card 1: date */}
           <div className="bg-gray-200 rounded-lg p-6 shadow-sm">
             <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
               <img src={CalendarIcon} alt="Music" className="w-6 h-6" />
             </div>
             <div className="text-2xl font-bold text-black mb-2 text-left">Date</div>
             <div className="text-sm mt-10 text-gray-500 text-left">Summer 2026 (Exact date TBA)</div>
           </div>
 
           {/* Card 2: Duration */}
           <div className="bg-gray-200 rounded-lg p-6 shadow-sm">
             <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
               <img src={DurationIcon} alt="Users" className="w-6 h-6" />
             </div>
             <div className="text-2xl font-bold text-black mb-2 text-left">Duration</div>
             <div className="text-sm mt-10 text-gray-500 text-left">Two full days of Worship</div>
           </div>
 
           {/* Card 3: Location */}
           <div className="bg-gray-200 rounded-lg p-6 shadow-sm">
             <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
               <img src={LocationIcon} alt="Heart" className="w-6 h-6" />
             </div>
             <div className="text-2xl font-bold text-black mb-2 text-left">Location</div>
             <div className="text-sm mt-10 text-gray-500 text-left">Central London (Venue TBA)</div>
           </div>
 
           {/* Card 4: Capacity*/}
           <div className="bg-gray-200 rounded-lg p-6 shadow-sm">
             <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
               <img src={UsersIcon} alt="Calendar" className="w-6 h-6" />
             </div>
             <div className="text-2xl font-bold text-black mb-2 text-left">Capacity</div>
             <div className="text-sm mt-10 text-gray-500 text-left">3,000+ Attendees Expected</div>
           </div>
         </div>
        </div>

        {/* Ticket Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Early Bird Admission */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Early Bird Admission</h3>
              <p className="text-sm text-gray-500">Limited time - Until March 2026</p>
        </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-blue-900 mb-4">$35</div>
              <button 
                className="w-full bg-white border border-blue-900 text-blue-900 py-2 px-4 rounded font-medium hover:bg-blue-50 transition-colors"
              >
                Get This Ticket
            </button>
          </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Access to both event days</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Digital programme download</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Event merchandise discount</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Priority venue entry</span>
              </div>
            </div>
          </div>

          {/* Standard General */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Standard General</h3>
              <p className="text-sm text-gray-500">Available from April 2026</p>
            </div>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-blue-900 mb-4">$45</div>
              <button 
                className="w-full text-white py-2 px-4 rounded font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#0E1745' }}
              >
                Get This Ticket
            </button>
          </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Access to both event days</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Digital programme download</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Upload custom icons and fonts</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Event merchandise discount</span>
              </div>
          </div>
        </div>

          {/* Premium Seating */}
          <div className="text-white rounded-lg p-6" style={{ backgroundColor: '#0E1745' }}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Premium Seating</h3>
              <p className="text-sm text-white">Limited quantity available</p>
            </div>
            
            <div className="mb-6">
              <div className="text-4xl font-bold mb-4">$75</div>
              <button 
                className="w-full bg-white text-blue-900 py-2 px-4 rounded font-medium hover:bg-gray-100 transition-colors"
              >
                Get This Ticket
            </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm">Reserved premium seating</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm">Access to both event days</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm">Physical & digital programme</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm">Exclusive merchandise package</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm">Priority venue entry</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm">Meet & greet opportunity</span>
              </div>
            </div>
          </div>

          {/* VIP Experience */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">VIP Experience</h3>
              <p className="text-sm text-gray-500">Very limited - 100 tickets only</p>
            </div>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-blue-900 mb-4">$150</div>
              <button 
                className="w-full bg-white border border-blue-900 text-blue-900 py-2 px-4 rounded font-medium hover:bg-blue-50 transition-colors"
              >
                Get This Ticket
            </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Front section reserved seating</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Access to both event days</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">VIP reception before each session</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Complete merchandise collection</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Backstage tour opportunity</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Private meet & greet</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Exclusive digital content</span>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <span className="text-sm text-gray-700">Priority customer support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Options Section */}
      </div>
      <div className="bg-white w-full py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Purchase via Ticket Tailor */}
          <div className="bg-yellow-400 rounded-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl text-black mb-2">Purchase via Ticket Tailor</h3>
              <p className="text-black">Our primary ticketing partner</p>
            </div>
            
            {/* Widget Placeholder */}
            <div className="bg-black rounded-lg p-6 text-center mb-6">
              <div className="mb-4">
                <img src={CalendarCrossIcon} alt="Calendar Cross" className="w-12 h-12 mx-auto mb-3" />
                <h4 className="text-white text-sm mb-2">Ticket Tailor Widget</h4>
                <p className="text-gray-300 text-sm mb-4">Interactive ticket selection and purchase widget will be embedded here</p>
                <p className="text-white font-semibold text-xs">Widget ID: [TICKET_TAILOR_WIDGET_ID]</p>
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3">
                  <img src={ShieldIcon} alt="Shield" className="w-3 h-3" />
                </div>
                <span className="text-black">Secure payment processing</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3">
                  <img src={CreditCardIcon} alt="Credit Card" className="w-3 h-3" />
                </div>
                <span className="text-black">Multiple payment options</span>
              </div>
            </div>
          </div>

          {/* Alternative: Eventbrite */}
          <div className="rounded-lg p-8" style={{ backgroundColor: '#0E1745' }}>
            <div className="text-center mb-6">
              <h3 className="text-2xl text-white mb-2">Alternative: Eventbrite</h3>
              <p className="text-white">Also Available on Eventbrite</p>
            </div>
            
            {/* Eventbrite Option */}
            <div className="bg-yellow-400 rounded-lg p-6 text-center mb-6">
              <h4 className="text-black font-semibold mb-2">Also Available on Eventbrite</h4>
              <p className="text-black text-sm mb-4">If you prefer to use Eventbrite, you can also purchase your tickets there with the same pricing and options.</p>
              
              <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center mx-auto">
                <img src={ExternalLinkIcon} alt="External Link" className="w-4 h-4 mr-2" />
                View on Eventbrite
            </button>
            </div>
            
            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3">
                  <img src={Shield1Icon} alt="Shield" className="w-3 h-3" />
                </div>
                <span className="text-white">Secure payment processing</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3">
                  <img src={CreditCard1Icon} alt="Credit Card" className="w-3 h-3" />
            </div>
                <span className="text-white">Multiple payment options</span>
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">

        {/* Need Help Section */}
        <div className="rounded-lg p-12  text-center mb-16" style={{ backgroundColor: '#0E1745' }}>
          <h2 className="text-3xl font-light text-white mb-4">Need Help with Your Booking?</h2>
          <p className="text-white mb-8 max-w-2xl mx-auto">
            Our dedicated support team is here to help with any questions about tickets, accessibility, or special requirements.
          </p>
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
            CONTACT SUPPORT
          </button>
        </div>

      </div>
    </div>
  );
};

export default TicketsPage;
