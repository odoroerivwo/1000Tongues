import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';

// --- TYPES ---
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  churchName: string;
  previousChoristerExperience: string;
  voiceRange: string;
  musicalExperience: string;
  preferredHub: string;
  termsAccepted: boolean;
  communicationConsent: boolean;
  privacyPolicyAccepted: boolean;
  gdprConsent: boolean; 
  [key: string]: string | boolean | string[]; 
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
}

// --- INTERNAL COMPONENT: Success Modal ---
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

// --- EXTERNAL COMPONENT: Input Field (MOVED OUTSIDE) ---
const InputField: React.FC<InputFieldProps> = ({ label, type = "text", value, onChange, placeholder = "" }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none transition-all"
    />
  </div>
);

// --- EXTERNAL COMPONENT: Select Field (MOVED OUTSIDE) ---
const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
        <ChevronRight className="w-4 h-4 rotate-90" />
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
const ChoirRegistrationForm: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    churchName: '',
    previousChoristerExperience: '',
    voiceRange: '',
    musicalExperience: '',
    preferredHub: '',
    termsAccepted: false,
    communicationConsent: false,
    privacyPolicyAccepted: false,
    gdprConsent: false, 
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://1000t-admin.vercel.app/api';
      console.log("📤 Sending form data to API:", formData);

      const response = await fetch(`${API_URL}/chorister`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      let result: any = {};
      try {
        result = JSON.parse(text);
      } catch {
        console.warn("⚠️ Could not parse JSON response.");
      }

      if (!response.ok) {
        const errorMessage = result?.message || `Server returned ${response.status}`;
        alert(`Submission failed — ${errorMessage}`);
        return;
      }

      if (result.success) {
        setShowSuccessModal(true);
        setFormData(initialFormData);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      } else {
        alert(result.message || "Failed to save registration.");
      }
    } catch (error: any) {
      console.error("🔥 Unexpected error:", error);
      alert(`Something went wrong: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonalInformation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <InputField 
          label="First Name" 
          value={formData.firstName} 
          onChange={(e) => handleInputChange('firstName', e.target.value)} 
        />
        <InputField 
          label="Last Name" 
          value={formData.lastName} 
          onChange={(e) => handleInputChange('lastName', e.target.value)} 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <InputField 
          label="Email Address" 
          type="email"
          value={formData.email} 
          onChange={(e) => handleInputChange('email', e.target.value)} 
        />
        <InputField 
          label="Phone Number" 
          type="tel"
          value={formData.phoneNumber} 
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)} 
        />
      </div>
    </div>
  );

  const renderChurchMusicalBackground = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <InputField 
          label="Home Church/Fellowship" 
          value={formData.churchName} 
          onChange={(e) => handleInputChange('churchName', e.target.value)} 
        />
        <SelectField 
          label="Choir Experience"
          value={formData.previousChoristerExperience}
          onChange={(e) => handleInputChange('previousChoristerExperience', e.target.value)}
          options={[
            { value: "", label: "Select your experience level" },
            { value: "none", label: "No experience" },
            { value: "beginner", label: "Beginner (1-2 years)" },
            { value: "intermediate", label: "Intermediate (3-5 years)" },
            { value: "advanced", label: "Advanced (5+ years)" },
            { value: "professional", label: "Professional" },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <SelectField 
          label="Voice Part"
          value={formData.voiceRange}
          onChange={(e) => handleInputChange('voiceRange', e.target.value)}
          options={[
            { value: "", label: "Select your voice part" },
            { value: "soprano", label: "Soprano" },
            { value: "alto", label: "Alto" },
            { value: "tenor", label: "Tenor" },
            { value: "bass", label: "Bass" },
            { value: "unsure", label: "Not sure" },
          ]}
        />
        <SelectField 
          label="Preferred Hub"
          value={formData.preferredHub}
          onChange={(e) => handleInputChange('preferredHub', e.target.value)}
          options={[
            { value: "", label: "Select preferred hub" },
            { value: "North London", label: "North London" },
            { value: "West London", label: "West London" },
            { value: "South London", label: "South London" },
            { value: "East London", label: "East London" },
          ]}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">Musical Background</label>
        <textarea
          value={formData.musicalExperience}
          onChange={(e) => handleInputChange('musicalExperience', e.target.value)}
          rows={3}
          className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0E1745] focus:border-transparent outline-none resize-none"
          placeholder="Tell us about your musical background..."
        />
      </div>
    </div>
  );

  const renderAgreements = () => (
    <div className="space-y-6">
      <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 space-y-4">
        <label className="flex items-start cursor-pointer group">
          <div className="relative flex items-center mt-1">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-[#0E1745] checked:bg-[#0E1745]"
            />
            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={14} />
          </div>
          <span className="ml-3 text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
            I agree to the terms and conditions, code of conduct, and understand this is a commitment requiring attendance at rehearsals and the event.
          </span>
        </label>

        <label className="flex items-start cursor-pointer group">
          <div className="relative flex items-center mt-1">
            <input
              type="checkbox"
              checked={formData.communicationConsent}
              onChange={(e) => handleInputChange('communicationConsent', e.target.checked)}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-[#0E1745] checked:bg-[#0E1745]"
            />
            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={14} />
          </div>
          <span className="ml-3 text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
            I commit to attending all required rehearsals (approximately 6-8 sessions leading up to the event).
          </span>
        </label>

        <label className="flex items-start cursor-pointer group">
          <div className="relative flex items-center mt-1">
            <input
              type="checkbox"
              checked={formData.privacyPolicyAccepted}
              onChange={(e) => handleInputChange('privacyPolicyAccepted', e.target.checked)}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-[#0E1745] checked:bg-[#0E1745]"
            />
            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={14} />
          </div>
          <span className="ml-3 text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
            I agree to receive updates about 1000 Tongues and future events (you can unsubscribe at any time).
          </span>
        </label>

        {/* --- NEW GDPR CHECKBOX --- */}
        <label className="flex items-start cursor-pointer group pt-2 border-t border-blue-100/50">
          <div className="relative flex items-center mt-1">
            <input
              type="checkbox"
              checked={formData.gdprConsent}
              onChange={(e) => handleInputChange('gdprConsent', e.target.checked)}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-[#0E1745] checked:bg-[#0E1745]"
            />
            <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={14} />
          </div>
          <span className="ml-3 text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
            <strong className="text-[#0E1745]">GDPR Consent:</strong> I consent to 1000 Tongues collecting and securely storing my personal data for the sole purpose of organizing this event and related communications, in accordance with the General Data Protection Regulation.
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-[#0E1745] mb-4 leading-tight">
            Raise Your Voice
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Be part of 1,000 tongues united in worship
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Choir Registration</h2>
            <div className="text-sm text-gray-500 mt-2 space-y-1.5 leading-relaxed">
              <p>Fill in the details below to register to be part of the 1000 tongues choir.</p>
              <p>There is no commitment at this point to participate in a specific event.</p>
              <p>We will contact you to commit to be part of each upcoming event.</p>
              <p>Also please feel free to order your 1000 Tongues T-Shirt (optional)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-12 space-y-12">
              
              {/* SECTION 1 */}
              <div>
                <h3 className="text-lg md:text-xl font-serif text-[#0E1745] mb-6 border-b border-gray-100 pb-2">
                  1. Personal Information
                </h3>
                {renderPersonalInformation()}
              </div>

              {/* SECTION 2 */}
              <div>
                <h3 className="text-lg md:text-xl font-serif text-[#0E1745] mb-6 border-b border-gray-100 pb-2">
                  2. Church & Musical Background
                </h3>
                {renderChurchMusicalBackground()}
              </div>

              {/* SECTION 3 (Agreements) */}
              <div>
                <h3 className="text-lg md:text-xl font-serif text-[#0E1745] mb-6 border-b border-gray-100 pb-2">
                  3. Agreements & Consent
                </h3>
                {renderAgreements()}
              </div>

              {/* Submit Button */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-12 py-4 rounded-xl font-medium text-base text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2
                    ${isSubmitting ? 'bg-gray-400 cursor-wait' : 'bg-[#0E1745] hover:bg-[#1a2666] hover:shadow-lg'}`}
                >
                  {isSubmitting ? 'Submitting Registration...' : 'Complete Registration'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Registration Successful!"
        message="Welcome to the choir! A confirmation email has been sent to you with further details."
      />
    </div>
  );
};

export default ChoirRegistrationForm;