"use client";

import { useState, useEffect } from "react";
import { Loader2, Building2, User, Mail, Phone, Briefcase } from "lucide-react";

export interface PartnershipFormData {
  organizationName: string;
  organizationType: string;
  contactName: string;
  emailAddress: string;
  phoneNumber: string;
  partnershipLevel: string;
  specificInterests: string;
  message: string;
}

interface PartnershipFormProps {
  initialData?: Partial<PartnershipFormData>;
  onSubmit: (data: PartnershipFormData) => Promise<void>;
  submitButtonText?: string;
  isPublic?: boolean;
}

export default function PartnershipForm({
  onSubmit,
  initialData,
  submitButtonText = "Submit Partnership",
  isPublic = false,
}: PartnershipFormProps) {
  const initialState: PartnershipFormData = {
    organizationName: "",
    organizationType: "",
    contactName: "",
    emailAddress: "",
    phoneNumber: "",
    partnershipLevel: "",
    specificInterests: "",
    message: "",
  };

  const [formData, setFormData] = useState<PartnershipFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Pass the form data exactly as is
      await onSubmit(formData);
      
      setSuccess("Partnership registered successfully!");
      if (isPublic) {
        setFormData(initialState);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const textInput = (label: string, name: keyof PartnershipFormData, type = "text", icon: any = null) => (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          // Removed 'required' attribute
          value={formData[name]}
          onChange={handleChange}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 focus:border-[#B8860B] transition-all duration-200`}
        />
      </div>
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

      {/* Organization Info */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <Building2 className="w-5 h-5 text-[#B8860B]" />
          Organization Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {textInput("Organization Name", "organizationName", "text", <Building2 className="w-5 h-5" />)}
          
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Organization Type
            </label>
            <div className="relative">
              <select
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 focus:border-[#B8860B] transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">Select Type</option>
                <option value="corporation">Corporation</option>
                <option value="foundation">Foundation</option>
                <option value="church">Church</option>
                <option value="nonprofit">Non-profit</option>
                <option value="business">Local Business</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Person */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <User className="w-5 h-5 text-[#B8860B]" />
          Contact Person
        </h3>

        {textInput("Full Name", "contactName", "text", <User className="w-5 h-5" />)}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {textInput("Email Address", "emailAddress", "email", <Mail className="w-5 h-5" />)}
          {textInput("Phone Number", "phoneNumber", "tel", <Phone className="w-5 h-5" />)}
        </div>
      </div>

      {/* Partnership Details */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <Briefcase className="w-5 h-5 text-[#B8860B]" />
          Partnership Info
        </h3>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Partnership Level
          </label>
          <select
            name="partnershipLevel"
            value={formData.partnershipLevel}
            onChange={handleChange}
            className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 focus:border-[#B8860B] transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">Select Level</option>
            <option value="presenting">Presenting Partner ($25,000+)</option>
            <option value="principal-15k">Principal Partner ($15,000)</option>
            <option value="principal-10k">Principal Partner ($10,000)</option>
            <option value="community">Community Partner ($5,000)</option>
            <option value="custom">Custom Partnership</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Specific Interests
          </label>
          <textarea
            name="specificInterests"
            value={formData.specificInterests}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 focus:border-[#B8860B] transition-all duration-200 resize-none"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/50 focus:border-[#B8860B] transition-all duration-200 resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#9a7109] text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#B8860B]/20 hover:shadow-[#B8860B]/30"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting Partnership...</span>
          </>
        ) : (
          <span>{submitButtonText}</span>
        )}
      </button>
    </form>
  );
}