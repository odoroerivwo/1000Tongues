import React from 'react';

const BePartOfMovement: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Be Part of the Movement
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you're called to sing, serve, sponsor, or simply attend, there's a place for you in this historic gathering.
          </p>
        </div>

        {/* Middle Section - Grid of 4 Images with Staggered Layout */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          {/* Image 1: Higher */}
          <div className="flex flex-col">
            <div className="w-full sm:w-48 h-75 rounded-lg overflow-hidden">
              <img
                src="/assets/Image 5.png"
                alt="Three young women with saxophones in yellow dresses"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Image 2: Lower (offset with mt) */}
          <div className="flex flex-col sm:mt-10">
            <div className="w-full sm:w-48 h-75 rounded-lg overflow-hidden">
              <img
                src="/assets/Image 6.png"
                alt="Two hands reaching towards each other"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Image 3: Higher */}
          <div className="flex flex-col">
            <div className="w-full sm:w-48 h-75 rounded-lg overflow-hidden">
              <img
                src="/assets/Image 7.png"
                alt="Architectural interior with dramatic lighting and tickets sign"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Image 4: Lower (offset with mt) */}
          <div className="flex flex-col sm:mt-10">
            <div className="w-full sm:w-48 h-75 rounded-lg overflow-hidden">
              <img
                src="/assets/Image 4.png"
                alt="Four people with arms around shoulders silhouetted against sunset"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section - Two Cards */}
        <div className="flex gap-4 justify-center">
          {/* Left Card: 920+ Monthly Listeners - takes 1.5 image widths */}
          {/* <div className="w-80 h-48 bg-black rounded-2xl p-6 flex flex-col justify-between">
            <div className="text-left">
              <div className="flex items-baseline">
                <span className="text-6xl font-bold text-white">920</span>
                <span className="text-4xl font-bold text-green-500 ml-1">+</span>
              </div>
              <p className="text-white text-lg mt-2">Monthly Listeners</p>
            </div>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-gray-400 rounded-full border-2 border-black"></div>
                <div className="w-10 h-10 bg-gray-500 rounded-full border-2 border-black"></div>
                <div className="w-10 h-10 bg-gray-600 rounded-full border-2 border-black"></div>
                <div className="w-10 h-10 bg-gray-700 rounded-full border-2 border-black"></div>
              </div>
              <div className="w-10 h-10 bg-white rounded-full border-2 border-black flex items-center justify-center ml-3">
                <span className="text-black text-xl font-bold">+</span>
              </div>
            </div>
          </div> */}

          {/* Right Card: HOW WE WORK - takes 2.5 image widths */}

          
          {/* <div className="w-140 h-48 bg-gray-900 rounded-2xl relative overflow-hidden">
            <img
              src="/assets/Rectangle 23813.png"
              alt="Background image for How We Work card"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-white tracking-wider">
                HOW WE WORK
              </h3>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default BePartOfMovement;
