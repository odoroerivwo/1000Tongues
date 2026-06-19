"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, X, MapPin, Clock, Trash2 } from "lucide-react";
import EventForm, { EventFormData } from "@/components/EventForm";

interface ScheduleEvent extends EventFormData {
  _id: string;
  status: string;
  createdAt: string;
}

export default function SchedulePage() {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch events from the database
  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/schedule");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Handle saving a new event
  const handleAddEvent = async (formData: EventFormData) => {
    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create event");
    }

    await fetchEvents();
    setShowModal(false);
  };

  // ✅ Handle deleting an event
  const deleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/schedule/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete event");
      }
      // Refresh the list after deleting
      await fetchEvents();
    } catch (error: any) {
      alert(error.message);
    }
  };

  // ✅ Calculate basic stats
  const stats = {
    total: events.length,
    rehearsals: events.filter((e) => e.eventType === "Rehearsal").length,
    performances: events.filter((e) => e.eventType === "Performance").length,
    other: events.filter((e) => e.eventType !== "Rehearsal" && e.eventType !== "Performance").length,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#B8860B]" />
            Schedule
          </h1>
          <p className="text-gray-600 mt-2">
            Manage events, rehearsals, and performances
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9a7109] transition shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {/* Calendar View Options */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setView("month")}
          className={`px-4 py-2 rounded-lg transition ${
            view === "month"
              ? "bg-[#B8860B] text-white shadow-sm"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          List View
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Events</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Rehearsals</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.rehearsals}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Performances</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.performances}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Other</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.other}</p>
        </div>
      </div>

      {/* Event List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B]" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No events scheduled</p>
              <p className="text-sm text-gray-400 mt-2">
                Click "Add Event" to create your first event
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event._id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                        {event.eventType}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </div>
                    <button 
                        onClick={() => deleteEvent(event._id)} // ✅ Wired up!
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete Event"
                      >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <Modal title="Add New Event" onClose={() => setShowModal(false)}>
          <EventForm
            onSubmit={handleAddEvent}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

// Reusable Modal Component
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}