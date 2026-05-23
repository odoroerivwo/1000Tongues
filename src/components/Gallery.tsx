import React, { useState, useEffect } from 'react';

interface DriveImage {
  id: string;
  name: string;
  url: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<DriveImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery`);
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const chunkArray = (arr: DriveImage[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const imageChunks = chunkArray(images, 6);
  const maxIndex = Math.max(0, imageChunks.length - 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (isLoading) {
    return <div className="py-20 bg-black text-white text-center">Loading Gallery...</div>;
  }

  if (images.length === 0) {
    return <div className="py-20 bg-black text-white text-center">No images found in Drive.</div>;
  }

  return (
    <section className="py-12 md:py-16 bg-black overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imageChunks.map((chunk, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
                
                {/* Image 1 */}
                <div className="sm:col-span-1 lg:col-span-4">
                  {chunk[0] && (
                    <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden bg-gray-900">
                      <img src={chunk[0].url} alt={chunk[0].name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
                
                {/* Images 2 & 3 */}
                <div className="sm:col-span-1 lg:col-span-4 flex flex-col gap-4">
                  {chunk[1] && (
                    <div className="w-full h-32 sm:h-36 lg:h-44 rounded-lg overflow-hidden bg-gray-900">
                      <img src={chunk[1].url} alt={chunk[1].name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  {chunk[2] && (
                    <div className="w-full h-32 sm:h-36 lg:h-44 rounded-lg overflow-hidden bg-gray-900">
                      <img src={chunk[2].url} alt={chunk[2].name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
                
                {/* Image 4 */}
                <div className="sm:col-span-2 lg:col-span-4">
                  {chunk[3] && (
                    <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden bg-gray-900">
                      <img src={chunk[3].url} alt={chunk[3].name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Image 5 */}
                {chunk[4] && (
                  <div className="w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-900">
                    <img src={chunk[4].url} alt={chunk[4].name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" referrerPolicy="no-referrer" />
                  </div>
                )}
                {/* Image 6 */}
                {chunk[5] && (
                  <div className="w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-900">
                    <img src={chunk[5].url} alt={chunk[5].name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" referrerPolicy="no-referrer" />
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
        
        {/* Navigation Controls */}
        {imageChunks.length > 1 && (
          <div className="flex justify-center items-center gap-4 md:gap-6 mt-12">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors touch-target z-10"
              aria-label="Previous images"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex gap-2">
              {imageChunks.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
                ></span>
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors touch-target z-10"
              aria-label="Next images"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Gallery;