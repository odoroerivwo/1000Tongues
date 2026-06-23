import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ChoirRegistrationForm from "../components/ChoirRegistrationForm";
import MerchandiseOrderForm from "../components/MerchandiseOrderForm";

const JoinChoirPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'choir' | 'merch'>(
    tabParam === 'merch' ? 'merch' : 'choir'
  );

  const handleTabChange = (tab: 'choir' | 'merch') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Segment switcher */}
      <div className="max-w-4xl mx-auto px-6 pt-8 flex justify-center bg-white">
        <div className="inline-flex rounded-2xl border border-gray-200 p-1 bg-gray-50 shadow-inner">
          <button
            onClick={() => handleTabChange('choir')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'choir'
                ? 'bg-[#0E1745] text-white shadow-md'
                : 'text-gray-500 hover:text-gray-900 bg-transparent'
            }`}
          >
            Choir Registration
          </button>
          <button
            onClick={() => handleTabChange('merch')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'merch'
                ? 'bg-[#0E1745] text-white shadow-md'
                : 'text-gray-500 hover:text-gray-900 bg-transparent'
            }`}
          >
            Order T-Shirt/Polo
          </button>
        </div>
      </div>

      {/* Forms switcher */}
      {activeTab === 'choir' ? (
        <ChoirRegistrationForm />
      ) : (
        <MerchandiseOrderForm />
      )}
    </div>
  );
};

export default JoinChoirPage;