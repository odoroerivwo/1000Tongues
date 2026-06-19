import React, { useState } from "react";

export interface Activity {
  id: number;
  name: string;
  role: string;
  date: string;
}

interface Props {
  title: string;
  activities: Activity[];
}

const RecentActivityTable: React.FC<Props> = ({ title, activities }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filtered = activities.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or role..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="border rounded-md px-3 py-2 w-64 mb-4"
      />

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((a) => (
            <tr key={a.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{a.name}</td>
              <td className="p-3">{a.role}</td>
              <td className="p-3">{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentActivityTable;
