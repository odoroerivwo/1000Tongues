import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PartnershipPage: React.FC = () => {
  // Interactive widget states
  const [step, setStep] = useState(1); // 1 = Choose amount, 2 = Personal details, 3 = Success
  const [givingType, setGivingType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(25); // Default GBP 25 selected
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Personal details states
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const presetAmounts = [10, 25, 50];

  const handlePresetSelect = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value);
      setSelectedPreset(null);
    }
  };

  const getFinalAmount = () => {
    if (selectedPreset !== null) return `GBP ${selectedPreset}`;
    if (customAmount) return `GBP ${customAmount}`;
    return 'GBP 0';
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Validate amount
      const amt = selectedPreset || parseFloat(customAmount);
      if (!amt || amt <= 0) {
        alert('Please select or enter a valid amount.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!personalDetails.name || !personalDetails.email) {
        alert('Please fill in your name and email address.');
        return;
      }

      setIsSubmitting(true);
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://1000t-admin.vercel.app/api';
        const finalAmt = selectedPreset || parseFloat(customAmount);

        const response = await fetch(`${API_URL}/payment/create-donation-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: personalDetails.name,
            email: personalDetails.email,
            phone: personalDetails.phone,
            amount: finalAmt,
            givingType: givingType,
            originUrl: window.location.origin,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error processing donation');
        }

        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('No checkout session URL returned.');
        }
      } catch (err: any) {
        console.error("Donation error:", err);
        alert(`Failed to initiate payment: ${err.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
    setGivingType('one-time');
    setSelectedPreset(25);
    setCustomAmount('');
    setPersonalDetails({ name: '', email: '', phone: '' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
            Let's join hands to make <span className="font-semibold text-[#0E1745]">1000 Tongues</span> happen
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Partner with 1000 Tongues
          </p>
        </div>

        {/* SECTION 1: SPLIT LAYOUT (Image left, widget right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">

          {/* LEFT COLUMN: Large Premium Image */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative h-full min-h-[350px] lg:min-h-[480px] rounded-3xl overflow-hidden border border-gray-100 shadow-lg group">
              <img
                src="/assets/diverse_hands_only_stack.png"
                alt="Partnership Movement"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <span className="text-xs font-semibold tracking-wider text-[#FFD100] uppercase mb-1">
                  Kingdom Collaboration
                </span>
                <h3 className="text-white text-xl sm:text-2xl font-medium mb-2">
                  Building Kingdom Partnerships
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-md">
                  Together, we can create something extraordinary that glorifies God and unites His people across denominations.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Donorbox-Style Partnership Form Widget */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between min-h-[480px]">

              {/* Widget Header */}
              <div className="bg-[#FFD100] px-6 py-4 flex items-center justify-between text-[#0E1745]">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-base">
                    {step === 1 && 'Choose amount'}
                    {step === 2 && 'Your details'}
                    {step === 3 && 'Success'}
                  </span>
                  <span className="text-sm opacity-80">
                    <svg className="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                  </span>
                </div>

                {/* Step indicator dots */}
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${step >= 1 ? 'bg-[#0E1745]' : 'bg-[#0E1745]/20'}`} />
                    <span className={`w-2.5 h-2.5 rounded-full ${step >= 2 ? 'bg-[#0E1745]' : 'bg-[#0E1745]/20'}`} />
                    <span className={`w-2.5 h-2.5 rounded-full ${step >= 3 ? 'bg-[#0E1745]' : 'bg-[#0E1745]/20'}`} />
                  </div>
                  {step > 1 && step < 3 && (
                    <button 
                      type="button" 
                      onClick={handleBack} 
                      disabled={isSubmitting} 
                      className="text-[#0E1745] hover:opacity-75 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ←
                    </button>
                  )}
                </div>
              </div>

              {/* Widget Body */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-center">
                <form onSubmit={handleNext} className="space-y-6">

                  {/* STEP 1: CHOOSE AMOUNT */}
                  {step === 1 && (
                    <div className="space-y-6">

                      {/* One-time vs Monthly Toggle */}
                      <div className="flex justify-center">
                        <div className="inline-flex rounded-lg border border-gray-300 p-0.5 bg-gray-50">
                          <button
                            type="button"
                            onClick={() => setGivingType('one-time')}
                            disabled={isSubmitting}
                            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${givingType === 'one-time'
                                ? 'bg-[#FFD100] text-[#0E1745] shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            One-time
                          </button>
                          <button
                            type="button"
                            onClick={() => setGivingType('monthly')}
                            disabled={isSubmitting}
                            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${givingType === 'monthly'
                                ? 'bg-[#FFD100] text-[#0E1745] shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            Monthly
                          </button>
                        </div>
                      </div>

                      {/* Preset amounts layout */}
                      <div className="grid grid-cols-3 gap-3">
                        {presetAmounts.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => handlePresetSelect(amt)}
                            disabled={isSubmitting}
                            className={`py-3.5 px-2 border rounded-xl text-center transition-all ${selectedPreset === amt
                                ? 'border-[#0E1745] bg-blue-50/30 text-[#0E1745] font-semibold'
                                : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <span className="block text-xxs text-gray-400 font-medium uppercase tracking-wider mb-0.5">GBP</span>
                            <span className="text-lg">{amt}</span>
                          </button>
                        ))}
                      </div>

                      {/* Custom Amount Field */}
                      <div className="relative rounded-xl border border-gray-200 focus-within:border-[#0E1745] transition-all bg-white overflow-hidden px-4 py-3 flex items-center">
                        <span className="text-gray-400 text-sm font-semibold tracking-wider mr-3">GBP</span>
                        <input
                          type="text"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          disabled={isSubmitting}
                          placeholder="Custom Amount"
                          className="w-full text-base text-gray-800 outline-none bg-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: PERSONAL DETAILS */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="text-center mb-2">
                        <p className="text-sm text-gray-500">
                          Confirming your partnership of <span className="font-semibold text-[#0E1745]">{getFinalAmount()} {givingType === 'monthly' ? '/ month' : ''}</span>
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={personalDetails.name}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                            disabled={isSubmitting}
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0E1745] text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={personalDetails.email}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                            disabled={isSubmitting}
                            placeholder="john@example.com"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0E1745] text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Phone Number (Optional)</label>
                          <input
                            type="tel"
                            value={personalDetails.phone}
                            onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                            disabled={isSubmitting}
                            placeholder="+44 7123 456789"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#0E1745] text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: SUCCESS */}
                  {step === 3 && (
                    <div className="text-center py-4 space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">Thank You!</h3>
                        <p className="text-sm text-gray-600">
                          Thank you for partnering with 1000 Tongues. Your mock pledge of{' '}
                          <span className="font-semibold text-[#0E1745]">
                            {getFinalAmount()} {givingType === 'monthly' ? '/ month' : ''}
                          </span>{' '}
                          has been logged.
                        </p>
                        <p className="text-xs text-gray-400">
                          Donor details: {personalDetails.name} ({personalDetails.email})
                        </p>
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-6 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                        >
                          Pledge Again
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Main Action Button */}
                  {step < 3 && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#FFD100] hover:bg-[#ecc200] text-[#0E1745] font-semibold rounded-xl text-sm transition-all duration-300 shadow-md hover:scale-[1.01] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0E1745]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>{step === 1 ? 'Next' : 'Complete Donation'}</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                  )}
                </form>
              </div>

              {/* Widget Footer */}
              <div className="border-t border-gray-100 py-3 bg-gray-50/50 text-center">
                <a
                  href="https://donorbox.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-gray-400 hover:text-[#0E1745] transition-colors"
                >
                  Powered by <span className="font-semibold text-yellow-600">Donorbox</span>
                </a>
              </div>

            </div>

            {/* Brand Placement Callout Box */}
            <div className="w-full max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-3xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-[#0E1745]">
                  Brand Placements & Custom Options
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Contact us for tailored brand placement, digital/print brochure ad placements, custom promotional campaigns, and VIP corporate partnership opportunities.
                </p>
              </div>
              <Link
                to="/partnership/apply"
                className="w-full px-6 py-3 bg-[#0E1745] hover:bg-[#1a255c] text-white text-xs font-medium rounded-xl text-center transition-all flex-shrink-0"
              >
                Contact Us
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PartnershipPage;
