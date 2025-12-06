"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Plus,
  Search,
  X,
  Trash2,
  Check,
  XCircle,
  Download,
} from "lucide-react";
import PartnershipForm, { PartnershipFormData } from "@/components/PartnershipForm";

// Updated Interface to handle potential variations in DB data
interface Partnership {
  _id: string;
  // New standardized fields
  organizationName?: string;
  contactName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  partnershipLevel?: string;
  organizationType?: string;
  // Legacy fields fallback
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  
  status: "Active" | "Pending" | "Inactive";
  createdAt: string;
}

export default function PartnershipsPage() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch partnerships
  const fetchPartnerships = async () => {
    try {
      const res = await fetch("/api/partnerships");
      const data = await res.json();
      setPartnerships(data.partnerships);
    } catch (error) {
      console.error("Error fetching partnerships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerships();
  }, []);

  // Handle form submission
  const handleSubmit = async (formData: PartnershipFormData) => {
    const res = await fetch("/api/partnerships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, isPublic: false }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    await fetchPartnerships();
    setShowModal(false);
  };

  // Update status
  const updateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/partnerships/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        await fetchPartnerships();
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

  // Delete partnership
  const deletePartnership = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partnership?")) return;

    setActionLoading(id);
    try {
      const res = await fetch(`/api/partnerships/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchPartnerships();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to delete partnership");
      }
    } catch (error) {
      console.error("Error deleting partnership:", error);
      alert("Failed to delete partnership");
    } finally {
      setActionLoading(null);
    }
  };

  // Helper to safely get display values (handles old vs new field names)
  const getContactName = (p: Partnership) => p.contactName || p.name || "N/A";
  const getEmail = (p: Partnership) => p.emailAddress || p.email || "N/A";
  const getOrgName = (p: Partnership) => p.organizationName || p.organization || "N/A";
  const getPhone = (p: Partnership) => p.phoneNumber || p.phone || "N/A";

  // Excel Export Logic (CSV)
  const handleExport = () => {
    const headers = ["Organization", "Type", "Contact Name", "Email", "Phone", "Level", "Status", "Date"];
    
    const rows = partnerships.map(p => [
      getOrgName(p),
      p.organizationType || "N/A",
      getContactName(p),
      getEmail(p),
      getPhone(p),
      p.partnershipLevel || "N/A",
      p.status,
      new Date(p.createdAt).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "partnerships_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter partnerships with Optional Chaining
  const filteredPartnerships = partnerships.filter((p) => {
    const searchLower = searchTerm.toLowerCase();
    
    const nameMatch = getContactName(p)?.toLowerCase().includes(searchLower);
    const emailMatch = getEmail(p)?.toLowerCase().includes(searchLower);
    const orgMatch = getOrgName(p)?.toLowerCase().includes(searchLower);

    return nameMatch || emailMatch || orgMatch;
  });

  const stats = {
    total: partnerships.length,
    active: partnerships.filter((p) => p.status === "Active").length,
    pending: partnerships.filter((p) => p.status === "Pending").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-[#B8860B]" />
              Partnerships
            </h1>
            <p className="text-gray-600 mt-2">
              Manage organizational partnerships and collaborations
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition shadow-md"
            >
              <Download className="w-5 h-5" />
              Export Excel
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9a7109] transition shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Partnership
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Partnerships</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Active</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.active}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B]"></div>
          </div>
        ) : filteredPartnerships.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No partnerships found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPartnerships.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {getOrgName(p)}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {p.organizationType || "Unknown Type"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getContactName(p)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{getEmail(p)}</div>
                      <div className="text-sm text-gray-500">{getPhone(p)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md">
                        {p.partnershipLevel === "presenting" ? "Presenting ($25k+)" : 
                         p.partnershipLevel === "principal-15k" ? "Principal ($15k)" :
                         p.partnershipLevel === "community" ? "Community ($5k)" :
                         p.partnershipLevel || "Standard"}
                       </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {actionLoading === p._id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#B8860B]"></div>
                        ) : (
                          <>
                            {p.status === "Pending" && (
                              <button
                                onClick={() => updateStatus(p._id, "Active")}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            {p.status === "Active" && (
                              <button
                                onClick={() => updateStatus(p._id, "Inactive")}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Deactivate"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                            {p.status === "Inactive" && (
                              <button
                                onClick={() => updateStatus(p._id, "Pending")}
                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                title="Set Pending"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deletePartnership(p._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {/* Add Partnership Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Partnership
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1 transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <PartnershipForm
                onSubmit={handleSubmit}
                submitButtonText="Add Partnership"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}