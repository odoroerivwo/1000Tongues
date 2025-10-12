"use client";
import React, { useState } from "react";
import { FiBell, FiSearch } from "react-icons/fi";

const Header: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3 sticky top-0 z-50">
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>
        <span className="hidden md:inline text-sm text-slate-500">Overview</span>
      </div>

      {/* Center: Search Bar (Desktop) */}
      <div className="relative hidden sm:block w-72">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0D1B2A] focus:outline-none shadow-sm"
        />
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center gap-4">
        {/* Search icon for small screens */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="sm:hidden p-2 rounded-full hover:bg-gray-100"
        >
          <FiSearch className="w-5 h-5 text-slate-700" />
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <FiBell className="w-5 h-5 text-slate-700" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-sm text-slate-600">Admin</span>
          <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center text-sm font-semibold text-slate-700">
            YP
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (toggle) */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 p-3 sm:hidden">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0D1B2A] focus:outline-none shadow-sm"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
