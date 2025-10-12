"use client";

import { useState } from "react";
import Calendar, { type TileArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar.css";

const events = ["2025-09-18", "2025-09-20", "2025-09-25"];

export default function EventSchedule() {
  const [value, setValue] = useState<Date>(new Date());

  const tileClassName = ({ date, view }: TileArgs) => {
    if (view === "month") {
      const ds = date.toISOString().split("T")[0];
      return events.includes(ds) ? "event-date" : null;
    }
    return null;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Event Schedule</h3>
      <Calendar onChange={(v) => setValue(v as Date)} value={value} tileClassName={tileClassName} />
    </div>
  );
}
