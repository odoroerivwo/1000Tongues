

"use client";

import React, { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import Calendar, { type TileArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar.css"; // custom overrides

interface Activity {
  id: number;
  name: string;
  role: "Chorister" | "Volunteer" | "Choirmaster";
  date: string; // format: YYYY-MM-DD
}

const Dashboard: React.FC = () => {
  const [activities] = useState<Activity[]>([
    { id: 1, name: "John Doe", role: "Chorister", date: "2025-09-18" },
    { id: 2, name: "Mary Smith", role: "Volunteer", date: "2025-09-17" },
    { id: 3, name: "David Johnson", role: "Choirmaster", date: "2025-09-16" },
    { id: 4, name: "Sarah Lee", role: "Volunteer", date: "2025-09-15" },
    { id: 5, name: "Michael Brown", role: "Chorister", date: "2025-09-14" },
  ]);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const filteredActivities = useMemo(
    () =>
      activities.filter(
        (activity) =>
          activity.name.toLowerCase().includes(search.toLowerCase()) ||
          activity.role.toLowerCase().includes(search.toLowerCase())
      ),
    [search, activities]
  );

  const eventDates = activities.map((a) => a.date);

  const tileClassName = ({ date, view }: TileArgs): string | null => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      if (eventDates.includes(dateStr)) {
        return "event-date";
      }
    }
    return null;
  };

  const progress = 70;
  const radius = 50;
  const circumference = Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Choirmasters</h2>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Choristers</h2>
          <p className="text-3xl font-bold text-green-600">120</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Partnerships</h2>
          <p className="text-3xl font-bold text-green-600">15</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-semibold">Volunteers</h2>
          <p className="text-3xl font-bold text-green-600">45</p>
        </div>
      </div>

      {/* Middle Section: Recent Activity + Event Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 shadow rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <div className="relative w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0D1B2A] focus:outline-none shadow-sm"
              />
            </div>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium">
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b hover:bg-gray-50 text-sm"
                >
                  <td className="p-3">{activity.name}</td>
                  <td className="p-3">{activity.role}</td>
                  <td className="p-3">{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Event Schedule */}
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Event Schedule</h2>
          <Calendar
            onChange={(value) => setDate(value as Date)}
            value={date}
            tileClassName={tileClassName}
          />
        </div>
      </div>

      {/* Lower Section: Partners + Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Partners */}
        <div className="lg:col-span-2 bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Partners</h2>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>Faith Global</span>
              <span className="text-green-600">Active</span>
            </li>
            <li className="flex justify-between">
              <span>Hope Choir</span>
              <span className="text-green-600">Active</span>
            </li>
            <li className="flex justify-between">
              <span>Grace Ministry</span>
              <span className="text-gray-500">Pending</span>
            </li>
          </ul>
        </div>

        {/* Progress Bar (Half Circle) */}
        <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Activity Progress</h2>
          <svg width="120" height="70" viewBox="0 0 120 70">
            <path
              d="M 10 60 A 50 50 0 0 1 110 60"
              fill="transparent"
              stroke="#E5E7EB"
              strokeWidth="10"
            />
            <path
              d="M 10 60 A 50 50 0 0 1 110 60"
              fill="transparent"
              stroke="#16A34A"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
          <p className="text-sm mt-2 text-gray-500">{progress}% Completed</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
