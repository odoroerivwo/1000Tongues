"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ChoristerRegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  churchName: string;
  churchLocation: string;
  pastorName: string;
  musicalExperience: string;
  voiceRange: string;
  previousChoristerExperience: string;
  availableRehearsalDays: string;
  timeCommitment: string;
  dietaryRequirements: string;
  accessibilityNeeds: string;
  travelArrangements: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  emergencyContactEmail: string;
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  communicationConsent: boolean;
  photographyConsent: boolean;
}

interface ChoristerRegistrationFormProps {
  onSubmit: (data: ChoristerRegistrationFormData) => Promise<void>;
  submitButtonText?: string;
}

export default function ChoristerForm({
  onSubmit,
  submitButtonText = "Submit Registration",
}: ChoristerRegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<ChoristerRegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    churchName: "",
    churchLocation: "",
    pastorName: "",
    musicalExperience: "",
    voiceRange: "",
    previousChoristerExperience: "",
    availableRehearsalDays: "",
    timeCommitment: "",
    dietaryRequirements: "",
    accessibilityNeeds: "",
    travelArrangements: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    emergencyContactEmail: "",
    termsAccepted: false,
    privacyPolicyAccepted: false,
    communicationConsent: false,
    photographyConsent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await onSubmit(formData);
      setSuccess("🎶 Registration successful! We'll be in touch soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        churchName: "",
        churchLocation: "",
        pastorName: "",
        musicalExperience: "",
        voiceRange: "",
        previousChoristerExperience: "",
        availableRehearsalDays: "",
        timeCommitment: "",
        dietaryRequirements: "",
        accessibilityNeeds: "",
        travelArrangements: "",
        emergencyContactName: "",
        emergencyContactRelationship: "",
        emergencyContactPhone: "",
        emergencyContactEmail: "",
        termsAccepted: false,
        privacyPolicyAccepted: false,
        communicationConsent: false,
        photographyConsent: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const textInput = (
    label: string,
    name: keyof ChoristerRegistrationFormData,
    required = false,
    type = "text"
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name] as string}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 text-green-800 border border-green-200 p-3 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-800 border border-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {textInput("First Name", "firstName")}
        {textInput("Last Name", "lastName")}
        {textInput("Email", "email", false, "email")}
        {textInput("Phone Number", "phoneNumber", false, "tel")}
        {textInput("Church Name", "churchName")}
        {textInput("Church Location", "churchLocation")}
        {textInput("Pastor Name", "pastorName")}
        {textInput("Voice Range", "voiceRange")}
        {textInput("Previous Chorister Experience", "previousChoristerExperience")}
        {textInput("Available Rehearsal Days", "availableRehearsalDays")}
        {textInput("Time Commitment", "timeCommitment")}
        {textInput("Emergency Contact Name", "emergencyContactName")}
        {textInput("Emergency Contact Relationship", "emergencyContactRelationship")}
        {textInput("Emergency Contact Phone", "emergencyContactPhone")}
        {textInput("Emergency Contact Email", "emergencyContactEmail", false, "email")}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Musical Experience
        </label>
        <textarea
          name="musicalExperience"
          value={formData.musicalExperience}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B]"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dietary Requirements
        </label>
        <textarea
          name="dietaryRequirements"
          value={formData.dietaryRequirements}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B]"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {textInput("Accessibility Needs", "accessibilityNeeds")}
        {textInput("Travel Arrangements", "travelArrangements")}
      </div>

      {/* Consent Checkboxes */}
      <div className="space-y-3">
        {[
          { name: "termsAccepted", label: "I agree to the Terms and Conditions." },
          { name: "privacyPolicyAccepted", label: "I have read and accept the Privacy Policy." },
          {
            name: "communicationConsent",
            label: "I consent to receive communications regarding choir updates.",
          },
          {
            name: "photographyConsent",
            label: "I consent to be photographed or recorded during choir activities.",
          },
        ].map((item) => (
          <label key={item.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={item.name}
              checked={formData[item.name as keyof ChoristerRegistrationFormData] as boolean}
              onChange={handleChange}
              className="w-4 h-4 text-[#B8860B] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">{item.label}</span>
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#B8860B] text-white py-3 rounded-lg hover:bg-[#9a7109] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <span>{submitButtonText}</span>
        )}
      </button>
    </form>
  );
}
