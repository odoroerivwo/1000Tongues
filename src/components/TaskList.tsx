export default function TaskList() {
  const tasks = [
    { id: 1, text: "Create new forms for choir application", status: "done" },
    { id: 2, text: "Review volunteer signups", status: "pending" },
    { id: 3, text: "Confirm partnership with Faith Global", status: "in-progress" },
    { id: 4, text: "Prepare next Sunday schedule", status: "pending" },
  ];

  const statusClass = (s: string) =>
    s === "done" ? "bg-emerald-100 text-emerald-700" : s === "in-progress" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-600";

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Today tasks</h3>
      <ul className="space-y-3">
        {tasks.map((t) => (
          <li key={t.id} className="flex justify-between items-center">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-slate-300" />
              <div className="text-sm">{t.text}</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs ${statusClass(t.status)}`}>{t.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
