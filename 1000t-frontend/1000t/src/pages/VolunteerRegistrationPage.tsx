import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Check } from 'lucide-react';

// --- INTERNAL COMPONENT: Success Modal ---
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-serif font-medium text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {message}
          </p>
          <button
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-3 bg-[#0E1745] text-base font-medium text-white hover:bg-[#1a2666] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const VolunteerRegistrationPage: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    homeChurch: '',
    preferredRoles: '',
    availability: '',
    previousExperience: '',
    specialSkills: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    agreeToTerms: false,
    agreeToRehearsals: false,
    agreeToUpdates: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // FIX: Using VITE_API_BASE_URL to match your .env file
      // Falls back to localhost if the variable is missing
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://1000t-admin.vercel.app/api';
      
      // FIX: Endpoint is /volunteer (singular) matching your backend route
      const response = await fetch(`${API_URL}/volunteer`, {
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

      // Success: Show Modal
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        homeChurch: '',
        preferredRoles: '',
        availability: '',
        previousExperience: '',
        specialSkills: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        agreeToTerms: false,
        agreeToRehearsals: false,
        agreeToUpdates: false
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit application. Please check your connection.', {
        style: {
          background: '#ef4444',
          color: '#fff',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <Toaster position="top-center" />
      
      {/* Header Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4">
            Volunteer Registration
          </h1>
          <p className="text-gray-600 text-lg">
            Join our amazing team of volunteers
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-gray-800 mb-2">
                This will take a few minutes
              </h2>
              <p className="text-gray-600 text-sm">
                Please fill out the form below
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Church and Roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="homeChurch" className="block text-sm font-medium text-gray-700 mb-2">
                    Home Church/Fellowship
                  </label>
                  <input
                    type="text"
                    id="homeChurch"
                    name="homeChurch"
                    value={formData.homeChurch}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="preferredRoles" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Volunteer Roles
                  </label>
                  <select
                    id="preferredRoles"
                    name="preferredRoles"
                    value={formData.preferredRoles}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white disabled:bg-gray-100"
                  >
                    <option value="">Select Role</option>
                    <option value="event-setup">Event Setup & Logistics</option>
                    <option value="guest-services">Guest Services & Ushering</option>
                    <option value="technical">Technical Support</option>
                    <option value="choir-support">Choir Support</option>
                    <option value="registration">Registration & Check-in</option>
                    <option value="photography">Photography & Media</option>
                    <option value="hospitality">Hospitality & Catering</option>
                    <option value="transportation">Transportation & Parking</option>
                    <option value="prayer">Prayer Team</option>
                  </select>
                </div>
              </div>

              {/* Availability and Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <textarea
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    rows={1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="previousExperience" className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Volunteer Experience
                  </label>
                  <textarea
                    id="previousExperience"
                    name="previousExperience"
                    value={formData.previousExperience}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    rows={1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none disabled:bg-gray-100"
                  />
                </div>
              </div>

               {/* Skills and Emergency Contact Name */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label htmlFor="specialSkills" className="block text-sm font-medium text-gray-700 mb-2">
                     Special Skills or Qualification
                   </label>
                   <textarea
                     id="specialSkills"
                     name="specialSkills"
                     value={formData.specialSkills}
                     onChange={handleInputChange}
                     disabled={isSubmitting}
                     rows={1}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none disabled:bg-gray-100"
                   />
                 </div>
                 <div>
                   <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 mb-2">
                     Emergency Contact Name
                   </label>
                   <input
                     type="text"
                     id="emergencyContactName"
                     name="emergencyContactName"
                     value={formData.emergencyContactName}
                     onChange={handleInputChange}
                     disabled={isSubmitting}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
                   />
                 </div>
               </div>

               {/* Emergency Contact Phone */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                     Emergency Contact Phone
                   </label>
                   <input
                     type="tel"
                     id="emergencyContactPhone"
                     name="emergencyContactPhone"
                     value={formData.emergencyContactPhone}
                     onChange={handleInputChange}
                     disabled={isSubmitting}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors disabled:bg-gray-100"
                   />
                 </div>
                 <div>
                   {/* Empty div to maintain grid structure */}
                 </div>
               </div>

              {/* Checkboxes */}
              <div className="space-y-4 pt-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
                    I agree to the terms and conditions, code of conduct, and understand this is a commitment requiring attendance at rehearsals and the full event weekend.
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToRehearsals"
                    name="agreeToRehearsals"
                    checked={formData.agreeToRehearsals}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="agreeToRehearsals" className="ml-3 text-sm text-gray-700">
                    I commit to attending all required rehearsals (approximately 6-8 sessions leading up to the event).
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToUpdates"
                    name="agreeToUpdates"
                    checked={formData.agreeToUpdates}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="agreeToUpdates" className="ml-3 text-sm text-gray-700">
                    I agree to receive updates about 1000 Tongues and future events (you can unsubscribe at any time)
                  </label>
                </div>
              </div>

               {/* Submit Button */}
               <div className="pt-8 flex justify-center">
                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="w-100 px-12 py-4 rounded-lg font-medium text-lg text-white transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-wait flex items-center gap-2"
                   style={{ backgroundColor: '#0E1745' }}
                   onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#0A1235')}
                   onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#0E1745')}
                 >
                   {isSubmitting ? (
                     <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                     </>
                   ) : 'Submit'}
                 </button>
               </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title="Your Application Was Successful"
        message="A mail has been sent to you for further steps"
      />
    </div>
  );
};

export default VolunteerRegistrationPage;