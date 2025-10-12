export default function OverviewCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="p-6 bg-white shadow-custom rounded-xl">
      <h3 className="text-sm text-slate-500">{title}</h3>
      <div className="text-3xl font-bold text-emerald-600 mt-2">{value}</div>
    </div>
  );
}
