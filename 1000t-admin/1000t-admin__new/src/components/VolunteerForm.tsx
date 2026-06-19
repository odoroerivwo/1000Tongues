"use client";

import { useState, useEffect } from "react";
import { Loader2, User, Mail, Phone, MapPin, Calendar, Briefcase, Heart } from "lucide-react";

export interface VolunteerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeChurch: string;
  preferredRoles: string;
  availability: string;
  previousExperience: string;
  specialSkills: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  agreeToTerms: boolean;
  agreeToRehearsals: boolean;
  agreeToUpdates: boolean;
}

interface VolunteerFormProps {
  initialData?: Partial<VolunteerFormData>;
  onSubmit: (data: VolunteerFormData) => Promise<void>;
  submitButtonText?: string;
  isPublic?: boolean;
}

export default function VolunteerForm({
  onSubmit,
  initialData,
  submitButtonText = "Submit Registration",
  isPublic = false,
}: VolunteerFormProps) {
  // Initialize with empty strings to avoid uncontrolled/controlled input warnings
  const initialState: VolunteerFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    homeChurch: "",
    preferredRoles: "",
    availability: "",
    previousExperience: "",
    specialSkills: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    agreeToTerms: false,
    agreeToRehearsals: false,
    agreeToUpdates: false,
  };

  const [formData, setFormData] = useState<VolunteerFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const roles = [
    "Event Setup & Logistics",
    "Guest Services & Ushering",
    "Technical Support",
    "Choir Support",
    "Registration & Check-in",
    "Photography & Media",
    "Hospitality & Catering",
    "Transportation & Parking",
    "Prayer Team",
  ];

  // Load initial data if provided (e.g. for editing)
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...initialState,
        ...initialData,
        // Ensure booleans are strictly true/false
        agreeToTerms: !!initialData.agreeToTerms,
        agreeToRehearsals: !!initialData.agreeToRehearsals,
        agreeToUpdates: !!initialData.agreeToUpdates,
      }));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    // Handle checkboxes vs text inputs
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    
    // Clear status messages on typing
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await onSubmit(formData);
      setSuccess("Volunteer registered successfully!");
      
      // Only reset the form if it's a public registration page
      if (isPublic) {
        setFormData(initialState);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Reusable Input Component for consistency
  const InputField = ({ 
    label, 
    name, 
    type = "text", 
    icon: Icon, 
    placeholder 
  }: { 
    label: string; 
    name: keyof VolunteerFormData; 
    type?: string; 
    icon?: any; 
    placeholder?: string 
  }) => (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={formData[name] as string}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 focus:border-[#B8860B] transition-all duration-200`}
        />
      </div>
    </div>
  );

  // Reusable Textarea Component
  const TextAreaField = ({ 
    label, 
    name, 
    rows = 3, 
    placeholder 
  }: { 
    label: string; 
    name: keyof VolunteerFormData; 
    rows?: number; 
    placeholder?: string 
  }) => (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <textarea
        name={name}
        value={formData[name] as string}
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 focus:border-[#B8860B] transition-all duration-200 resize-none"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      {/* Status Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <p className="text-sm font-medium">{success}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Personal Information Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <User className="w-5 h-5 text-[#B8860B]" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField label="First Name" name="firstName" placeholder="e.g. John" />
          <InputField label="Last Name" name="lastName" placeholder="e.g. Doe" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField label="Email Address" name="email" type="email" icon={Mail} placeholder="john@example.com" />
          <InputField label="Phone Number" name="phone" type="tel" icon={Phone} placeholder="+1234567890" />
        </div>
      </div>

      {/* Role & Church Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <Briefcase className="w-5 h-5 text-[#B8860B]" />
          Role & Experience
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField label="Home Church / Fellowship" name="homeChurch" icon={MapPin} placeholder="e.g. City Church" />
          
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Preferred Volunteer Role
            </label>
            <div className="relative">
              <select
                name="preferredRoles"
                value={formData.preferredRoles}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 focus:border-[#B8860B] transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">Select a Role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextAreaField 
            label="Availability" 
            name="availability" 
            rows={2}
            placeholder="e.g. Weekends, Evenings" 
          />
          <TextAreaField 
            label="Previous Volunteer Experience" 
            name="previousExperience" 
            rows={2}
            placeholder="Briefly describe past roles..."
          />
        </div>

        <TextAreaField 
          label="Special Skills or Qualifications" 
          name="specialSkills" 
          rows={2}
          placeholder="e.g. First Aid, Sound Engineering, Photography..."
        />
      </div>

      {/* Emergency Contact Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <Heart className="w-5 h-5 text-[#B8860B]" />
          Emergency Contact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField label="Contact Name" name="emergencyContactName" placeholder="Full Name" />
          <InputField label="Contact Phone" name="emergencyContactPhone" type="tel" icon={Phone} placeholder="Phone Number" />
        </div>
      </div>

      {/* Agreements Section */}
      <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
        {[
          { name: "agreeToTerms", label: "I agree to the terms and conditions & code of conduct." },
          { name: "agreeToRehearsals", label: "I commit to attending all required rehearsals." },
          { name: "agreeToUpdates", label: "I agree to receive updates about 1000 Tongues." },
        ].map((item) => (
          <label key={item.name} className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center pt-0.5">
              <input
                type="checkbox"
                name={item.name}
                checked={formData[item.name as keyof VolunteerFormData] as boolean}
                onChange={handleChange}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-[#B8860B] checked:bg-[#B8860B]"
              />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              {item.label}
            </span>
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#9a7109] text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#B8860B]/20 hover:shadow-[#B8860B]/30"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting Application...</span>
          </>
        ) : (
          <span>{submitButtonText}</span>
        )}
      </button>
    </form>
  );
}