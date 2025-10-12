"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/1000 tongue.png"; 

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/choirmasters", label: "Choirmasters" },
    { href: "/choristers", label: "Choristers" },
    { href: "/volunteers", label: "Volunteers" },
    { href: "/partnerships", label: "Partnerships" },
    { href: "/schedule", label: "Schedule" },
    { href: "/settings", label: "Settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-[#0D1B2A] text-gray-300 flex flex-col min-h-screen shadow-lg">
      {/* Logo Section */}
      <div className="p-6 text-center border-b border-gray-700">
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto"
          priority
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-[#B8860B] text-white"
                  : "hover:bg-[#F8F9FA]/10 hover:text-[#B8860B]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
