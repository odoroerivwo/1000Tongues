"use client";
import { FiSearch } from "react-icons/fi";
import { useMemo, useState } from "react";

interface Activity {
  id: number;
  name: string;
  role: string;
  date: string;
}

export default function ActivityTable({ activities }: { activities: Activity[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return activities.filter(
      (a) => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
    );
  }, [query, activities]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="pl-10 py-2 pr-3 rounded-lg border border-slate-200 w-full"
            placeholder="Search by name or role..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-100 text-slate-600">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((a) => (
            <tr key={a.id} className="border-b hover:bg-slate-50">
              <td className="p-3">{a.name}</td>
              <td className="p-3">{a.role}</td>
              <td className="p-3">{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
