import React from 'react';

const PartnershipLevels: React.FC = () => {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-medium text-gray-900 mb-4">Partnership Levels</h2>
          <p className=" text-lg font-bold">
            Choose the partnership level that aligns with your <br /> organization's goals and capacity.
          </p>
        </div>

        {/* Partnership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Presenting Partner - Yellow */}
           <div style={{ backgroundColor: '#FFD100' }} className="rounded p-6 text-black relative">
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Presenting Partner</h3>
              <p className="text-sm mb-4">
                Major corporations, foundations, or organizations
              </p>
              <div className="text-4xl font-bold mb-6">$25,000+</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-yellow-400 text-xs">✓</span>
                </div>
                <span className="text-sm">Event naming rights (1000 Tongues presented by [Company])</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-yellow-400 text-xs">✓</span>
                </div>
                <span className="text-sm">Logo prominently featured on all marketing materials</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-yellow-400 text-xs">✓</span>
                </div>
                <span className="text-sm">VIP hospitality hosting opportunity</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-yellow-400 text-xs">✓</span>
                </div>
                <span className="text-sm">50 VIP tickets included</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-yellow-400 text-xs">✓</span>
                </div>
                <span className="text-sm">Backstage access and meet & greet</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-yellow-400 text-xs">✓</span>
                </div>
                <span className="text-sm">Custom partnership activation opportunities</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-yellow-400 text-xs">✓</span>
                </div>
                <span className="text-sm">Year-long promotional partnership</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-yellow-400 text-xs">✓</span>
                </div>
                <span className="text-sm">Professional video testimonial opportunity</span>
              </div>
            </div>
          </div>

           {/* Principal Partner - Dark Blue */}
           <div style={{ backgroundColor: '#0E1745' }} className="rounded p-6 text-white relative">
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Principal Partner</h3>
              <p className="text-sm mb-4">
                Regional businesses, large churches, organizations
              </p>
              <div className="text-4xl font-bold mb-6">$15,000</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-900 text-xs">✓</span>
                </div>
                <span className="text-sm">Prime logo placement on event materials</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-900 text-xs">✓</span>
                </div>
                <span className="text-sm">25 premium tickets included</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-900 text-xs">✓</span>
                </div>
                <span className="text-sm">Branded merchandise inclusion</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-900 text-xs">✓</span>
                </div>
                <span className="text-sm">Social media partnership feature</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-900 text-xs">✓</span>
                </div>
                <span className="text-sm">Private reception invitation</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-900 text-xs">✓</span>
                </div>
                <span className="text-sm">Choir warm-up session access</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-900 text-xs">✓</span>
                </div>
                <span className="text-sm">Digital content collaboration</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-900 text-xs">✓</span>
                </div>
                <span className="text-sm">Post-event highlights package</span>
              </div>
            </div>
          </div>

           {/* Principal Partner - Black */}
           <div style={{ backgroundColor: '#000000' }} className="rounded p-6 text-white relative">
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Principal Partner</h3>
              <p className="text-sm mb-4">
                Local businesses, mid-size churches, community groups
              </p>
              <div className="text-4xl font-bold mb-6">$10,000</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Prime logo placement on event materials</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">20 premium tickets included</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Branded merchandise inclusion</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Social media partnership feature</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Digital programme ad placement</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Access to partnership updates</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Tax-deductible receipt provided</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Thank you feature in post-event communications</span>
              </div>
            </div>
          </div>

           {/* Community Partner - White */}
           <div style={{ backgroundColor: '#FFFFFF' }} className="rounded p-6 text-gray-900 relative border border-gray-200">
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Community Partner</h3>
              <p className="text-sm mb-4">
                Small businesses, churches, individual supporters
              </p>
              <div className="text-4xl font-bold mb-6">$5,000</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Name recognition in event materials</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">4 general admission tickets included</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Social media thank you post</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Access to partner-only updates</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Digital certificate of partnership</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Invitation to partner appreciation event</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-black text-xs">✓</span>
                </div>
                <span className="text-sm">Opportunity for volunteer team involvement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipLevels;
