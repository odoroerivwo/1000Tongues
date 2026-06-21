import React, { useState, useEffect } from "react";

const Statistics: React.FC = () => {
  // 1. Setup State to hold the dynamic numbers
  const [stats, setStats] = useState({
    choirVoices: 432,
    ChoirTarget: 1000,
    registered: 600 // For the choir progress bar
  });

  // 2. Setup real-time fetching
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/statistics`);

        if (response.ok) {
          const data = await response.json();
          setStats({
            choirVoices: data.choirVoices || stats.choirVoices,
            ChoirTarget: data.ChoirTarget || stats.ChoirTarget,
            registered: data.registered || stats.registered
          });
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    // Fetch immediately on load
    fetchStatistics();

    // Set up a timer to fetch new data every 10 seconds
    const intervalId = setInterval(fetchStatistics, 10000);

    return () => clearInterval(intervalId);
  }, []);

  // --- PROGRESS BAR TARGETS ---
  const CHOIR_TARGET = 1000;
  //  const ATTENDEES_TARGET = 2000; // Change this to your actual attendee goal!

  // Calculate the percentages
  const choirProgressPercentage = Math.min((stats.registered / CHOIR_TARGET) * 100, 100);
  // const attendeesProgressPercentage = Math.min((stats.expectedAttendees / ATTENDEES_TARGET) * 100, 100);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        {/* Live Registration Updates Tag */}
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2"
            style={{ backgroundColor: "#F7EDD7" }}
          >
            <img src="assets/Image[w-20]2.png" alt="Star" className="w-4 h-4" />
            <span className="text-sm" style={{ color: "#B8860C" }}>
              Live Registration Updates
            </span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-4">
          <h2
            className="text-4xl font-serif font-bold text-gray-900 mb-4"
            style={{ fontFamily: "NewYork, serif" }}
          >
            The Movement Grows
          </h2>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Watch as God builds this historic gathering, one voice at a time
          </p>
        </div>

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-2xl mx-auto">
          {/* Card 1 */}
          <div className="bg-gray-100 rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
              <img src="/assets/fi_music.png" alt="Music" className="w-6 h-6" />
            </div>
            <div className="text-4xl font-bold text-black mb-2">{stats.choirVoices}</div>
            <div className="text-sm text-gray-500">Current Choir Registrations</div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-100 rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
              <img src="/assets/Users-1.png" alt="Users" className="w-6 h-6" />
            </div>
            <div className="text-4xl font-bold text-black mb-2">{stats.ChoirTarget}</div>
            <div className="text-sm text-gray-500">Target Choir Registrations</div>
          </div>
        </div>

        {/* --- PROGRESS BARS SECTION --- */}
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

          {/* Choir Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">
                Choir Registration Progress
              </span>
              <span className="text-sm font-medium text-gray-700">{stats.registered}/{CHOIR_TARGET}</span>
            </div>
            <div className="w-full bg-pink-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-yellow-400 h-full rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${choirProgressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Expected Attendees Progress Bar */}
          {/*<div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">
                Expected Attendees Progress
              </span>
              <span className="text-sm font-medium text-gray-700">{stats.expectedAttendees}/{ATTENDEES_TARGET}</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${attendeesProgressPercentage}%` }}
              ></div>
            </div>
          </div>*/}

        </div>
      </div>
    </section>
  );
};

export default Statistics;