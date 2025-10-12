"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Toaster, toast } from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useEventStore } from "@/store/eventStore";

// ✅ Define event type
interface EventItem {
  id: number;
  title: string;
  date: string;
}

const Schedule: React.FC = () => {
  const { events, addEvent, editEvent, deleteEvent } = useEventStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<EventItem>({
    id: 0,
    title: "",
    date: "",
  });

  // ✅ Highlight dates with events
  const eventDates = events.map((e: EventItem) => e.date);

  const handleDayClick = (value: Date) => {
    setSelectedDate(value);
    setFormData({
      ...formData,
      date: value.toISOString().slice(0, 10),
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.date) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editing) {
      editEvent(formData);
      toast.success("Event updated!");
    } else {
      addEvent({ ...formData, id: Date.now() });
      toast.success("Event added!");
    }

    setModalOpen(false);
    setEditing(false);
    setFormData({ id: 0, title: "", date: "" });
  };

  const handleEdit = (event: EventItem) => {
    setFormData(event);
    setEditing(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteEvent(id);
    toast.success("Event deleted!");
  };

  return (
    <div className="bg-white p-6 shadow rounded-xl min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Event Schedule</h1>

      {/* 🗓 FULL-WIDTH CALENDAR */}
      <div className="mb-8">
        <Calendar
          onClickDay={handleDayClick}
          value={selectedDate}
          className="rounded-xl border border-gray-200 p-4 shadow-sm w-full"
          tileClassName={({ date }) => {
            const dateString = date.toISOString().slice(0, 10);
            if (eventDates.includes(dateString)) {
              return "bg-blue-600 text-white rounded-full hover:bg-blue-700";
            }
            return "";
          }}
        />
        <button
          onClick={() => {
            setModalOpen(true);
            setEditing(false);
            setFormData({ id: 0, title: "", date: "" });
          }}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Create Event
        </button>
      </div>

      {/* 📋 FULL-WIDTH EVENT TABLE */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-4 text-gray-500 italic"
                >
                  No events available.
                </td>
              </tr>
            ) : (
              events.map((event: EventItem) => (
                <tr key={event.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{event.title}</td>
                  <td className="p-3">{event.date}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      <Pencil className="inline w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Trash2 className="inline w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🪟 MODAL POPUP */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Edit Event" : "Create New Event"}
            </h2>

            <label className="block text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter event title"
            />

            <label className="block text-gray-700 mb-2">Event Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded mb-4"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editing ? "Save Changes" : "Add Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
