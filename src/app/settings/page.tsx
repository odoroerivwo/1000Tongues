
"use client";
import AuthGuard from "@/components/AuthGuard";


import React from "react";

const Settings: React.FC = () => {
  return (
    <AuthGuard>
      <div className="bg-white p-6 shadow-custom rounded-xl max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-slate-600 mb-1">Site Title</label>
            <input className="w-full p-2 border rounded" defaultValue="1000 Tongues Admin" />
          </div>

          <div>
            <label className="block text-slate-600 mb-1">Primary Color</label>
            <input className="w-full p-2 border rounded" defaultValue="#071235" />
          </div>

          <div>
            <button className="px-4 py-2 bg-[var(--sidebar-bg)] text-white rounded">Save Settings</button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Settings;
