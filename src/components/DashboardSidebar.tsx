"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Users, Settings, BarChart3, LogOut} from "lucide-react";
import type { JWTPayload } from "@/lib/auth";
import Image from 'next/image';

// Define a type that includes the expected username field
type AdminPayload = JWTPayload & { username?: string };

export default function DashboardSidebar({ admin }: { admin?: JWTPayload }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/choristers", label: "Choristers", icon: Users },
    { href: "/dashboard/choirmasters", label: "Choirmasters", icon: Users },
    { href: "/dashboard/volunteers", label: "Volunteers", icon: Users },
    { href: "/dashboard/partnerships", label: "Partnerships", icon: BarChart3 },
    { href: "/dashboard/schedule", label: "Schedule", icon: LayoutDashboard },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/logout", { method: "POST" });

      if (res.ok) {
        router.push("/login");
        router.refresh();
      } else {
        console.error("Logout failed:", await res.text());
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-64 bg-[#0D1B2A] text-gray-300 flex flex-col min-h-screen shadow-lg fixed left-0 top-0 h-full z-10 overflow-y-auto">
      {/* Logo Section */}
      <div className="p-6 text-center border-b border-gray-700">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white to-gray-400 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
          <Image
            src="/1000 tonguessss 1.png"
            alt="Admin Logo"
            width={64}
            height={64}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="text-xs text-gray-400 uppercase tracking-wide">
          Logged in as
        </div>
        <div className="text-sm font-medium text-white truncate mt-1">
          {/* FIX: Cast admin to specific type to satisfy linter and TS */}
          {(admin as AdminPayload)?.username || "Super Admin"}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-[#B8860B] text-white shadow-md"
                  : "hover:bg-[#F8F9FA]/10 hover:text-[#B8860B]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-4 h-4" />
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}