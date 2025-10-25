import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <BarChart3 className="w-8 h-8" />
          Analytics
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Analytics dashboard coming soon...</p>
      </div>
    </div>
  );
}