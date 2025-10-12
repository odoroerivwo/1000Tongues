import { create } from "zustand";

export interface EventItem {
  id: number;
  title: string;
  date: string;
}

interface EventStore {
  events: EventItem[];
  addEvent: (event: EventItem) => void;
  editEvent: (updatedEvent: EventItem) => void;
  deleteEvent: (id: number) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  // 🗓 Default demo events
  events: [
    { id: 1, title: "Choir Rehearsal", date: "2025-09-25" },
    { id: 2, title: "Fundraising Event", date: "2025-09-28" },
    { id: 3, title: "Volunteer Meeting", date: "2025-10-02" },
  ],

  // ➕ Add new event
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  // ✏️ Edit existing event
  editEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e
      ),
    })),

  // ❌ Delete event
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
}));
