import React from 'react';
// import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      {/* Dark Header Section */}

      {/* <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl mx-8 mb-16">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-0">
              Ready to worship with us ?
            </h2>
            <Link to="/tickets"><button className="bg-blue-950 text-white px-6 py-2 rounded-full  border border-white hover:bg-blue-900 transition-colors">
              Get Tickets
            </button></Link>
          </div>
        </div>
      </div> */}

      {/* Blog Cards Section */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Card 1 */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              {/* Read Time and Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-sm text-gray-500">5 min read</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Why 1,000 Voices Matter in Worship
              </h3>
              
              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                When believers lift their voices together, something extraordinary happens.
              </p>
              
              {/* Read More Link */}
              <div className="flex items-center justify-between">
                <button className="w-15 h-10 bg-black border border-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </article>

          {/* Blog Card 2 */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              {/* Read Time and Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span className="text-sm text-gray-500">5 min read</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Behind the Vision: From Scripture to Sound
              </h3>
              
              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                The heartbeat of 1000 Tongues comes from the lyrics, "Oh for a thousand tongues to..."
              </p>
              
              {/* Read More Link */}
              <div className="flex items-center justify-between">
                <button className="w-15 h-10 bg-white border border-black rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </article>

          {/* Blog Card 3 */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              {/* Read Time and Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span className="text-sm text-gray-500">5 min read</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Preparing the Choir: A Journey of Faith and Song
              </h3>
              
              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Every singer who signs up is part of something historic. From rehearsals to the final night.
              </p>
              
              {/* Read More Link */}
              <div className="flex items-center justify-between">
                <button className="w-15 h-10 bg-white border border-black rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Blog;
