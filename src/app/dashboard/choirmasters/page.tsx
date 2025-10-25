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

export default function ChoirmastersPage() {
  const [choirmasters, setChoirmasters] = useState<Choirmaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch choirmasters
  const fetchChoirmasters = async () => {
    try {
      const res = await fetch("/api/choirmasters");
      const data = await res.json();
      setChoirmasters(data.choirmasters);
    } catch (error) {
      console.error("Error fetching choirmasters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChoirmasters();
  }, []);

  // Handle form submission
  const handleSubmit = async (formData: any) => {
    const res = await fetch("/api/choirmasters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    await fetchChoirmasters();
    setShowModal(false);
  };

  // Update status
  const updateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/choirmasters/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        await fetchChoirmasters();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  // Delete choirmaster
  const deleteChoirmaster = async (id: string) => {
    if (!confirm("Are you sure you want to delete this choirmaster?")) return;

    setActionLoading(id);
    try {
      const res = await fetch(`/api/choirmasters/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchChoirmasters();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to delete choirmaster");
      }
    } catch (error) {
      console.error("Error deleting choirmaster:", error);
      alert("Failed to delete choirmaster");
    } finally {
      setActionLoading(null);
    }
  };

  // Filter choirmasters
  const filteredChoirmasters = choirmasters.filter(
    (cm) =>
      cm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cm.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cm.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Search Bar */}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">
            Total Choirmasters
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Accepted</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.accepted}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {stats.pending}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Rejected</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {stats.rejected}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B]"></div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChoirmasters.map((cm) => (
                  <tr
                    key={cm._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {cm.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{cm.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{cm.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{cm.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          cm.status
                        )}`}
                      >
                        {cm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(cm.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {actionLoading === cm._id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#B8860B]"></div>
                        ) : (
                          <>
                            {cm.status === "Pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(cm._id, "Accepted")
                                  }
                                  className="group relative p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-200 border border-green-200 hover:border-green-600 hover:shadow-md"
                                  title="Accept"
                                >
                                  <Check className="w-4 h-4" />
                                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Accept
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus(cm._id, "Rejected")
                                  }
                                  className="group relative p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-600 hover:shadow-md"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Reject
                                  </span>
                                </button>
                              </>
                            )}
                            {cm.status !== "Pending" && (
                              <button
                                onClick={() => updateStatus(cm._id, "Pending")}
                                className="group relative p-2 text-yellow-600 hover:text-white hover:bg-yellow-600 rounded-lg transition-all duration-200 border border-yellow-200 hover:border-yellow-600 hover:shadow-md"
                                title="Reset to Pending"
                              >
                                <RotateCcw className="w-4 h-4" />
                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                  Reset to Pending
                                </span>
                              </button>
                            )}
                            <button
                              onClick={() => deleteChoirmaster(cm._id)}
                              className="group relative p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-600 hover:shadow-md"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                Delete
                              </span>
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

      {/* Add Choirmaster Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Choirmaster
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1 transition-all duration-200"
                aria-label="Close modal"
                title="Close"
              >
                <X className="w-6 h-6" aria-hidden="true" />
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
