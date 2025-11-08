"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Search,
  X,
  Trash2,
  Check,
  XCircle,
  RotateCcw,
} from "lucide-react";
import ChoirmasterForm from "@/components/ChoirmasterForm";

interface Choirmaster {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "Pending" | "Accepted" | "Rejected";
  createdAt: string;
}

// ✅ Simplified and fixed JSON handling
async function apiRequest(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // Parse safely without double-reading the body
  let data: any;
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { message: await res.text() };
  }

  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export default function ChoirmastersPage() {
  const [choirmasters, setChoirmasters] = useState<Choirmaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // ✅ Fetch all choirmasters
  const fetchChoirmasters = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/api/choirmaster");
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

  // ✅ Add new choirmaster
  const handleSubmit = async (formData: any) => {
    try {
      const data = await apiRequest("/api/choirmaster", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      alert(data.message || "Choirmaster saved successfully!");
      await fetchChoirmasters();
      setShowModal(false);
    } catch (error: any) {
      alert(error.message || "Failed to save choirmaster");
    }
  };

  // ✅ Update status
  const updateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const data = await apiRequest(`/api/choirmaster/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      alert(data.message || "Status updated successfully");
      await fetchChoirmasters();
    } catch (error: any) {
      alert(error.message || "Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  // ✅ Delete choirmaster
  const deleteChoirmaster = async (id: string) => {
    if (!confirm("Are you sure you want to delete this choirmaster?")) return;
    setActionLoading(id);
    try {
      const data = await apiRequest(`/api/choirmaster/${id}`, { method: "DELETE" });
      alert(data.message || "Choirmaster deleted successfully");
      await fetchChoirmasters();
    } catch (error: any) {
      alert(error.message || "Failed to delete choirmaster");
    } finally {
      setActionLoading(null);
    }
  };

  // ✅ Filter search results
  const filteredChoirmasters = choirmasters.filter(
    (cm) =>
      cm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cm.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cm.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Quick stats
  const stats = {
    total: choirmasters.length,
    accepted: choirmasters.filter((cm) => cm.status === "Accepted").length,
    pending: choirmasters.filter((cm) => cm.status === "Pending").length,
    rejected: choirmasters.filter((cm) => cm.status === "Rejected").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#B8860B]" />
              Choirmasters
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and oversee all choirmasters in the system
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9a7109] transition shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Choirmaster
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search choirmasters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B]"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Choirmasters", value: stats.total, color: "text-gray-900"},
          { label: "Accepted", value: stats.accepted, color: "text-green-600" },
          { label: "Pending", value: stats.pending, color: "text-yellow-600" },
          { label: "Rejected", value: stats.rejected, color: "text-red-600" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-sm font-medium text-gray-600">{card.label}</h3>
            <p className={`text-3xl font-bold mt-2 ${card.color || ""}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
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
                  {["Name", "Email", "Phone", "Role", "Status", "Registered", "Actions"].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200  text-gray-900 ">
                {filteredChoirmasters.map((cm) => (
                  <tr key={cm._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{cm.name}</td>
                    <td className="px-6 py-4">{cm.email}</td>
                    <td className="px-6 py-4">{cm.phone}</td>
                    <td className="px-6 py-4">{cm.role}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(
                          cm.status
                        )}`}
                      >
                        {cm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(cm.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {actionLoading === cm._id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#B8860B]" />
                        ) : (
                          <>
                            {cm.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => updateStatus(cm._id, "Accepted")}
                                  className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg"
                                  title="Accept"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => updateStatus(cm._id, "Rejected")}
                                  className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {cm.status !== "Pending" && (
                              <button
                                onClick={() => updateStatus(cm._id, "Pending")}
                                className="p-2 text-yellow-600 hover:text-white hover:bg-yellow-600 rounded-lg"
                                title="Reset to Pending"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteChoirmaster(cm._id)}
                              className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-bold">Add New Choirmaster</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <ChoirmasterForm
                onSubmit={handleSubmit}
                submitButtonText="Add Choirmaster"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
