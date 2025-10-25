import { getAuthAdmin } from '@/lib/auth';
import { Settings, Save, User, Lock, Bell, Globe } from 'lucide-react';

export default async function SettingsPage() {
  const admin = await getAuthAdmin();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Settings className="w-8 h-8 text-[#B8860B]" />
          Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your account and application settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Menu */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#B8860B] text-white">
                <User className="w-5 h-5" />
                Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <Lock className="w-5 h-5" />
                Security
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <Bell className="w-5 h-5" />
                Notifications
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <Globe className="w-5 h-5" />
                Preferences
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Profile Settings
            </h2>

            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={admin?.email || ''}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              {/* Admin ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin ID
                </label>
                <input
                  type="text"
                  value={admin?.adminId || ''}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 font-mono text-sm"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value="Administrator"
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9a7109] transition">
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 mt-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Danger Zone
            </h2>
            <p className="text-gray-600 mb-4">
              Irreversible and destructive actions
            </p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}