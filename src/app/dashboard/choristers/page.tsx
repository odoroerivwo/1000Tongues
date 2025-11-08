"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Search,
  X,
  Trash2,
  Check,
  XCircle,
  RotateCcw,
  FileSpreadsheet,
} from "lucide-react";
import ChoirmasterForm from "@/components/ChoirmasterForm";

interface Choirmaster {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
  createdAt: string;
}

export default function ChoirmasterPage() {
  const [choirmasters, setChoirmasters] = useState<Choirmaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState<Choirmaster | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // ✅ Fetch choirmasters
  const fetchChoirmasters = async () => {
    try {
      const res = await fetch("/api/choirmaster");
      if (!res.ok) throw new Error("Failed to fetch choirmasters");
      const data = await res.json();
      setChoirmasters(data.choirmasters || []);
    } catch (err) {
      console.error("Error fetching choirmasters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChoirmasters();
  }, []);

  // ✅ Handle form submission
  const handleSubmit = async (formData: any, id?: string) => {
    const url = id ? `/api/choirmaster/${id}` : "/api/choirmaster";
    const method = id ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      alert(data.message || "Success");
      await fetchChoirmasters();
      setShowModal(false);
      setEditModal(null);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  // ✅ Update status
  const updateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/choirmaster/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update status");
      }
      await fetchChoirmasters();
    } catch (err: any) {
      alert(err.message || "Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  // ✅ Delete choirmaster
  const deleteChoirmaster = async (id: string) => {
    if (!confirm("Are you sure you want to delete this choirmaster?")) return;

    setActionLoading(id);
    try {
      const res = await fetch(`/api/choirmaster/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete choirmaster");
      }
      await fetchChoirmasters();
    } catch (err: any) {
      alert(err.message || "Failed to delete choirmaster");
    } finally {
      setActionLoading(null);
    }
  };

  // ✅ Filter search
  const filteredChoirmasters = choirmasters.filter((cm) =>
    [cm.fullname, cm.email, cm.phone, cm.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ✅ Stats
  const stats = {
    total: choirmasters.length,
    active: choirmasters.filter((cm) => cm.status === "Active").length,
    inactive: choirmasters.filter((cm) => cm.status === "Inactive").length,
    pending: choirmasters.filter((cm) => cm.status === "Pending").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  // ✅ Export to Excel
  const exportToExcel = async () => {
    const XLSX = (await import("sheetjs-style")).default;
    const worksheet = XLSX.utils.json_to_sheet(
      choirmasters.map((cm) => ({
        Name: cm.fullname ?? "-",
        Email: cm.email ?? "-",
        Phone: cm.phone ?? "-",
        Role: cm.role ?? "-",
        Status: cm.status,
        Registered: new Date(cm.createdAt).toLocaleDateString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Choirmasters");
    XLSX.writeFile(workbook, "choirmasters.xlsx");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-[#B8860B]" />
            Choirmasters
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and oversee all choirmasters in the system
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9a7109] transition shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Choirmaster
          </button>

          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" /> Export to Excel
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search choirmasters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Choirmasters", value: stats.total, color: "text-gray-900" },
          { label: "Accepted", value: stats.active, color: "text-green-600" },
          { label: "Pending", value: stats.pending, color: "text-yellow-600" },
          { label: "Rejected", value: stats.inactive, color: "text-gray-400" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-sm font-medium text-gray-600">{item.label}</h3>
            <p className={`text-3xl font-bold mt-2 ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Choirmasters Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B]" />
          </div>
        ) : filteredChoirmasters.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No choirmasters found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {[
                    "Full Name",
                    "Email",
                    "Phone",
                    "Role",
                    "Status",
                    "Registered",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChoirmasters.map((cm) => (
                  <tr key={cm._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {cm.fullname ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cm.email ?? "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cm.phone ?? "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cm.role ?? "-"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          cm.status
                        )}`}
                      >
                        {cm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(cm.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {actionLoading === cm._id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#B8860B]" />
                        ) : (
                          <>
                            {cm.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => updateStatus(cm._id, "Active")}
                                  className="p-2 text-green-600 hover:bg-green-600 hover:text-white rounded-lg border border-green-200 hover:border-green-600"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => updateStatus(cm._id, "Inactive")}
                                  className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg border border-red-200 hover:border-red-600"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {cm.status !== "Pending" && (
                              <button
                                onClick={() => setEditModal(cm)}
                                className="p-2 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-lg border border-yellow-200 hover:border-yellow-600"
                                title="Edit"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteChoirmaster(cm._id)}
                              className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg border border-red-200 hover:border-red-600"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <Modal title="Add New Choirmaster" onClose={() => setShowModal(false)}>
          <ChoirmasterForm
            onSubmit={handleSubmit}
            submitButtonText="Add Choirmaster"
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editModal && (
        <Modal title="Edit Choirmaster" onClose={() => setEditModal(null)}>
          <ChoirmasterForm
            initialData={editModal}
            onSubmit={(data) => handleSubmit(data, editModal._id)}
            submitButtonText="Update Choirmaster"
          />
        </Modal>
      )}
    </div>
  );
}

// ✅ Reusable Modal Component
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
