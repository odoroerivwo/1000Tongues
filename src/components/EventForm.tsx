"use client";

import React, { useState } from "react";

export interface EventFormData {
  title: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
}

interface EventFormProps {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => Promise<void>;
  onCancel: () => void;
  submitButtonText?: string;
}

export default function EventForm({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText = "Save Event",
}: EventFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: initialData?.title || "",
    eventType: initialData?.eventType || "Rehearsal",
    date: initialData?.date || "",
    startTime: initialData?.startTime || "",
    endTime: initialData?.endTime || "",
    location: initialData?.location || "",
    description: initialData?.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Title *
        </label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none"
          placeholder="e.g. Sunday Service Rehearsal"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Type *
          </label>
          <select
            name="eventType"
            required
            value={formData.eventType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none"
          >
            <option value="Rehearsal">Rehearsal</option>
            <option value="Performance">Performance</option>
            <option value="Meeting">Meeting</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none"
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time *
          </label>
          <input
            type="time"
            name="startTime"
            required
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time *
          </label>
          <input
            type="time"
            name="endTime"
            required
            value={formData.endTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none"
          placeholder="e.g. Main Auditorium"
        />
      </div>

      {/* Description / Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none resize-none"
          placeholder="Any specific instructions or requirements..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#9a7109] transition flex items-center justify-center min-w-[120px]"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
}