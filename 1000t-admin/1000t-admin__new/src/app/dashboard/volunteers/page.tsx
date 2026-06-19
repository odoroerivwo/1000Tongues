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
  FileSpreadsheet,
  Loader2
} from "lucide-react";
// FIX: Relative path to your component
import VolunteerForm, { VolunteerFormData } from "../../../components/VolunteerForm";

interface Volunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  homeChurch: string;
  status: "Active" | "Inactive" | "Pending";
  createdAt: string;
}

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // ✅ Fetch volunteers with robust mapping
  const fetchVolunteers = async () => {
    try {
      const res = await fetch("/api/volunteers", { cache: "no-store" });
      const data = await res.json();
      
      const rawList = Array.isArray(data) ? data : (data.volunteers || []);

      const mappedVolunteers = rawList.map((v: any) => {
        // Handle name combination
        const fullName = `${v.firstName || ''} ${v.lastName || ''}`.trim();
        
        // Handle roles (could be array or string)
        let rolesDisplay = 'Unassigned';
        if (Array.isArray(v.preferredRoles) && v.preferredRoles.length > 0) {
          rolesDisplay = v.preferredRoles.join(", ");
        } else if (typeof v.preferredRoles === 'string') {
          rolesDisplay = v.preferredRoles;
        } else if (v.department) {
          rolesDisplay = v.department;
        }

        return {
          _id: v._id,
          name: fullName || v.name || 'Unnamed', 
          email: v.email || '-',
          phone: v.phone || '-',
          department: rolesDisplay,
          homeChurch: v.homeChurch || '-',
          status: v.status || 'Pending',
          createdAt: v.submittedAt || v.createdAt || new Date().toISOString()
        };
      });

      setVolunteers(mappedVolunteers);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  // ✅ Handle form submission
  const handleSubmit = async (formData: VolunteerFormData) => {
    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      await fetchVolunteers();
      setShowModal(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to create volunteer");
    }
  };

  // ✅ Update status (Approve/Reject)
  const updateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/volunteers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        await fetchVolunteers();
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

  // ✅ Delete volunteer
  const deleteVolunteer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this volunteer?")) return;

    setActionLoading(id);
    try {
      const res = await fetch(`/api/volunteers/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchVolunteers();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to delete volunteer");
      }
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      alert("Failed to delete volunteer");
    } finally {
      setActionLoading(null);
    }
  };

  // ✅ Export to Excel (Matching Choirmaster logic)
  const exportToExcel = async () => {
    try {
      const XLSX = (await import("sheetjs-style")).default;
      const worksheet = XLSX.utils.json_to_sheet(
        volunteers.map((vol) => ({
          Name: vol.name,
          Email: vol.email,
          Phone: vol.phone,
          Role: vol.department,
          Church: vol.homeChurch,
          Status: vol.status,
          Registered: new Date(vol.createdAt).toLocaleDateString(),
        }))
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Volunteers");
      XLSX.writeFile(workbook, "Volunteers_List.xlsx");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export. Ensure 'sheetjs-style' is installed.");
    }
  };

  const filteredVolunteers = volunteers.filter(
    (vol) =>
      (vol.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (vol.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (vol.department?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: volunteers.length,
    active: volunteers.filter((vol) => vol.status === "Active").length,
    pending: volunteers.filter((vol) => vol.status === "Pending").length,
    inactive: volunteers.filter((vol) => vol.status === "Inactive").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-[#B8860B]" />
            Volunteers
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and coordinate volunteer activities
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-lg hover:bg-[#9a7109] transition shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Volunteer
          </button>
          
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" /> Export to Excel
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search volunteers by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Volunteers</h3>
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Inactive</h3>
          <p className="text-3xl font-bold text-gray-400 mt-2">{stats.inactive}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin h-12 w-12 text-[#B8860B]" />
          </div>
        ) : filteredVolunteers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No volunteers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVolunteers.map((vol) => (
                  <tr key={vol._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{vol.name}</div>
                      <div className="text-xs text-gray-500">{vol.homeChurch}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vol.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vol.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={vol.department}>
                      {vol.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(vol.status)}`}>
                        {vol.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(vol.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {actionLoading === vol._id ? (
                          <Loader2 className="animate-spin h-5 w-5 text-[#B8860B]" />
                        ) : (
                          <>
                            {vol.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => updateStatus(vol._id, "Active")}
                                  className="p-2 text-green-600 hover:bg-green-600 hover:text-white rounded-lg border border-green-200 hover:border-green-600 transition-colors"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => updateStatus(vol._id, "Inactive")}
                                  className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg border border-red-200 hover:border-red-600 transition-colors"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            
                            {vol.status === "Inactive" && (
                              <button
                                onClick={() => updateStatus(vol._id, "Active")}
                                className="p-2 text-green-600 hover:bg-green-600 hover:text-white rounded-lg border border-green-200 hover:border-green-600 transition-colors"
                                title="Reactivate"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}

                            {vol.status === "Active" && (
                              <button
                                onClick={() => updateStatus(vol._id, "Inactive")}
                                className="p-2 text-gray-600 hover:bg-gray-600 hover:text-white rounded-lg border border-gray-200 hover:border-gray-600 transition-colors"
                                title="Deactivate"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              onClick={() => deleteVolunteer(vol._id)}
                              className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg border border-red-200 hover:border-red-600 transition-colors"
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

      {/* Add Volunteer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Volunteer
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
              <VolunteerForm
                onSubmit={handleSubmit}
                submitButtonText="Add Volunteer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}