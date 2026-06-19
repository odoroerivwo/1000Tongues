"use client";

import { useState } from "react";
import { Settings, Save, User, Lock, Bell, Globe, AlertTriangle } from "lucide-react";

// ✅ 1. Update the interface to accept the new database fields
interface AdminData {
  email?: string;
  adminId?: string;
  notifications?: { emailAlerts: boolean; weeklyDigest: boolean };
  preferences?: { language: string; timezone: string };
}

export default function SettingsTabs({ admin }: { admin: AdminData | null }) {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "preferences">("profile");
  const [loading, setLoading] = useState(false);

  // Form States
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  
  // ✅ 2. Initialize state using the database values we passed down!
  const [notifications, setNotifications] = useState(
    admin?.notifications || { emailAlerts: true, weeklyDigest: true }
  );
  
  const [preferences, setPreferences] = useState(
    admin?.preferences || { language: "English (US)", timezone: "West Africa Time (WAT)" }
  );

  // ✅ Handle Password Update
  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      return alert("New passwords do not match!");
    }
    
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updatePassword", ...passwords }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Failed to update password");
      
      alert("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" }); // Clear form
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Settings Update (Notifications & Preferences)
  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "updateSettings", 
          notifications, 
          preferences 
        }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Failed to save settings");
      
      alert("Settings saved successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

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
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "profile" ? "bg-[#B8860B] text-white shadow-sm" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <User className="w-5 h-5" /> Profile
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "security" ? "bg-[#B8860B] text-white shadow-sm" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Lock className="w-5 h-5" /> Security
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "notifications" ? "bg-[#B8860B] text-white shadow-sm" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Bell className="w-5 h-5" /> Notifications
              </button>
              <button
                onClick={() => setActiveTab("preferences")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "preferences" ? "bg-[#B8860B] text-white shadow-sm" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Globe className="w-5 h-5" /> Preferences
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PROFILE TAB (Read Only for security) */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert("Profile fields are strictly managed by Super Admin."); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" value={admin?.email || ""} disabled className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed directly.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin ID</label>
                  <input type="text" value={admin?.adminId || ""} disabled className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 font-mono text-sm cursor-not-allowed" />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <button type="submit" disabled className="flex items-center gap-2 bg-gray-300 text-white px-6 py-3 rounded-lg cursor-not-allowed">
                    <Save className="w-5 h-5" /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Security & Password</h2>
              <form onSubmit={handleSecuritySubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input type="password" required value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] outline-none" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input type="password" required value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] outline-none" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input type="password" required value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] outline-none" placeholder="••••••••" />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9a7109] transition">
                    {loading ? <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div> : <Save className="w-5 h-5" />}
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
              <form onSubmit={handleSettingsSubmit} className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Alerts</h3>
                    <p className="text-sm text-gray-500">Receive emails for new registrations</p>
                  </div>
                  <input type="checkbox" checked={notifications.emailAlerts} onChange={(e) => setNotifications({...notifications, emailAlerts: e.target.checked})} className="w-5 h-5 accent-[#B8860B] cursor-pointer" />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Weekly Digest</h3>
                    <p className="text-sm text-gray-500">Receive a weekly summary of dashboard activity</p>
                  </div>
                  <input type="checkbox" checked={notifications.weeklyDigest} onChange={(e) => setNotifications({...notifications, weeklyDigest: e.target.checked})} className="w-5 h-5 accent-[#B8860B] cursor-pointer" />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9a7109] transition">
                    {loading ? <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div> : <Save className="w-5 h-5" />}
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === "preferences" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">System Preferences</h2>
              <form onSubmit={handleSettingsSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select value={preferences.language} onChange={(e) => setPreferences({...preferences, language: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] outline-none">
                    <option value="English (US)">English (US)</option>
                    <option value="English (UK)">English (UK)</option>
                    <option value="French">French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select value={preferences.timezone} onChange={(e) => setPreferences({...preferences, timezone: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] outline-none">
                    <option value="West Africa Time (WAT)">West Africa Time (WAT)</option>
                    <option value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT)</option>
                    <option value="Eastern Standard Time (EST)">Eastern Standard Time (EST)</option>
                  </select>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9a7109] transition">
                    {loading ? <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div> : <Save className="w-5 h-5" />}
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 mt-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Danger Zone
            </h2>
            <p className="text-gray-600 mb-4">
              Irreversible and destructive actions. This will permanently delete your admin account.
            </p>
            <button 
              onClick={() => confirm("Contact a Super Administrator to perform this action.")}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}