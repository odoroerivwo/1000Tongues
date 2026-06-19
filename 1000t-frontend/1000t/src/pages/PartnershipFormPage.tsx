import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const PartnershipFormPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    contactName: '',
    emailAddress: '',
    phoneNumber: '',
    partnershipLevel: '',
    specificInterests: '',
    message: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://1000t-backend.vercel.app/api';
      
      const response = await fetch(`${API_URL}/partnerships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('Your partnership form has been submitted successfully!', {
        duration: 4000,
        style: {
          background: '#0E1745',
          color: '#fff',
          fontSize: '15px',
          borderRadius: '8px',
          padding: '12px 16px',
        },
        iconTheme: {
          primary: '#FFD700',
          secondary: '#0E1745',
        },
      });

      setFormData({
        organizationName: '',
        organizationType: '',
        contactName: '',
        emailAddress: '',
        phoneNumber: '',
        partnershipLevel: '',
        specificInterests: '',
        message: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit form. Please check your connection.', {
        style: {
          background: '#ef4444',
          color: '#fff',
        }
      });
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white py-12 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4 leading-tight">
            Express Your Interest
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-2">
            Tell us about your organization and partnership interests.
          </p>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-md">
            <div className="text-center mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                This will take a few minutes
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Please complete all relevant sections.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Type
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Type</option>
                    <option value="corporation">Corporation</option>
                    <option value="foundation">Foundation</option>
                    <option value="church">Church</option>
                    <option value="nonprofit">Non-profit</option>
                    <option value="business">Local Business</option>
                    <option value="individual">Individual Supporter</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    required
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="+234 801 234 5678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* --- EXACT MATCH DROPDOWN --- */}
                <div>
                  <label htmlFor="partnershipLevel" className="block text-sm font-medium text-gray-700 mb-2">
                    Partnership Level / Giving *
                  </label>
                  <select
                    id="partnershipLevel"
                    name="partnershipLevel"
                    required
                    value={formData.partnershipLevel}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Option</option>
                    <option value="One-Time Giving">One-Time Giving</option>
                    <option value="Regular Giving">Regular Giving</option>
                    <option value="Custom (Brand Placement / Advertising)">Custom (Brand Placement / Advertising)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="specificInterests" className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Interests / Requirements
                  </label>
                  <textarea
                    id="specificInterests"
                    name="specificInterests"
                    value={formData.specificInterests}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell us what kind of partnership or brand placement you are interested in..."
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="text-center pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: '#0E1745' }}
                  className="w-full sm:w-auto px-10 py-4 text-lg text-white font-semibold rounded-lg hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center mx-auto"
                >
                   {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipFormPage;