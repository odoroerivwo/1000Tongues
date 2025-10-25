import { getAuthAdmin } from '@/lib/auth';
import { Calendar, Plus } from 'lucide-react';

export default async function SchedulePage() {
  const admin = await getAuthAdmin();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-[#B8860B]" />
              Schedule
            </h1>
            <p className="text-gray-600 mt-2">
              Manage events, rehearsals, and performances
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9a7109] transition">
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar View Options */}
      <div className="mb-6 flex gap-4">
        <button className="px-4 py-2 bg-[#B8860B] text-white rounded-lg hover:bg-[#9a7109] transition">
          Month View
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
          Week View
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
          Day View
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Events</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">This Week</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">This Month</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Upcoming</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
        </div>
      </div>

      {/* Calendar/Event List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No events scheduled</p>
            <p className="text-sm text-gray-400 mt-2">
              Click "Add Event" to create your first event
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}