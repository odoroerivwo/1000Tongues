"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Trash2,
  Check,
  XCircle,
  FileSpreadsheet,
  Loader2,
  Tag
} from "lucide-react";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  churchName?: string;
  productName: string;
  productType: 'tshirt' | 'polo' | 'hoodie';
  size: string;
  color: string;
  gender?: 'male' | 'female';
  quantity: number;
  price: number;
  totalAmount: number;
  pickupPreference: string;
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryPostcode?: string;
  status: "Pending" | "Completed" | "Cancelled";
  submittedAt: string;
  donationAmount?: number;
}

export default function MerchandiseOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/merchandise", { cache: "no-store" });
      const data = await res.json();
      
      const rawList = Array.isArray(data) ? data : [];
      setOrders(rawList);
    } catch (error) {
      console.error("Error fetching merchandise orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/merchandise/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        await fetchOrders();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this merchandise order?")) return;

    setActionLoading(id);
    try {
      const res = await fetch(`/api/merchandise/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchOrders();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    } finally {
      setActionLoading(null);
    }
  };

  const exportToExcel = async () => {
    try {
      const XLSX = (await import("sheetjs-style")).default;
      const worksheet = XLSX.utils.json_to_sheet(
        orders.map((order) => ({
          Name: `${order.firstName || ''} ${order.lastName || ''}`.trim(),
          Email: order.email,
          Phone: order.phone,
          Item: order.productName,
          Size: order.size,
          Color: order.color,
          Fit: order.gender ? (order.gender === 'male' ? 'Male' : 'Female') : '-',
          Quantity: order.quantity,
          "Donation (GBP)": order.donationAmount || 0,
          "Total Price (GBP)": order.totalAmount,
          Pickup: order.pickupPreference === 'rehearsal' ? 'Choir Rehearsal' : 'Deliver to Address',
          "Delivery Address": order.pickupPreference === 'delivery' ? `${order.deliveryAddress || ''}, ${order.deliveryCity || ''}, ${order.deliveryPostcode || ''}` : '-',
          Status: order.status,
          OrderDate: new Date(order.submittedAt).toLocaleDateString(),
        }))
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Apparel Orders");
      XLSX.writeFile(workbook, "Apparel_Orders_List.xlsx");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export. Ensure 'sheetjs-style' is installed.");
    }
  };

  // Filters
  const filteredOrders = orders.filter((order) => {
    const fullName = `${order.firstName || ''} ${order.lastName || ''}`.toLowerCase();
    const searchMatch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      (order.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.productName || "").toLowerCase().includes(searchTerm.toLowerCase());
      
    const statusMatch = statusFilter === "All" || order.status === statusFilter;
    const productMatch = productFilter === "All" || order.productType === productFilter;
    
    return searchMatch && statusMatch && productMatch;
  });

  // Calculate statistics
  const stats = {
    totalOrders: orders.length,
    completed: orders.filter((o) => o.status === "Completed").length,
    pending: orders.filter((o) => o.status === "Pending").length,
    totalRevenue: orders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
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
            <ShoppingBag className="w-8 h-8 text-[#B8860B]" />
            Apparel Orders
          </h1>
          <p className="text-gray-600 mt-2">
            Track and manage T-Shirt and Polo Shirt orders for choristers and volunteers
          </p>
        </div>
        <div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition shadow-sm font-medium"
          >
            <FileSpreadsheet className="w-4 h-4" /> Export to Excel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Total T-shirt/Polo Orders</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Pending Pickup</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Completed Pickups</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600">Est. Sales Volume</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">GBP {stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search */}
        <div className="relative md:col-span-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search orders by name, email, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent outline-none"
          />
        </div>

        {/* Product Filter */}
        <div className="md:col-span-3">
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#B8860B]"
          >
            <option value="All">All Products</option>
            <option value="tshirt">T-Shirt Only</option>
            <option value="polo">Polo Shirt Only</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#B8860B]"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin h-12 w-12 text-[#B8860B]" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apparel Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total (GBP)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.firstName} {order.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{order.email}</div>
                      <div className="text-xs text-gray-500">{order.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{order.productName}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        {order.productType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div>Size: <span className="font-semibold">{order.size}</span></div>
                      <div>Color: <span className="font-semibold">{order.color}</span></div>
                      {order.gender && (
                        <div>Fit: <span className="font-semibold capitalize">{order.gender}</span></div>
                      )}
                      <div>Qty: <span className="font-semibold">{order.quantity}</span></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#0E1745]">
                      <div>GBP {order.totalAmount.toFixed(2)}</div>
                      {order.donationAmount && order.donationAmount > 0 ? (
                        <div className="text-xs text-green-600 font-medium mt-0.5">
                          Incl. GBP {order.donationAmount.toFixed(2)} donation
                        </div>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                      {order.pickupPreference === 'rehearsal' ? (
                        <span className="font-semibold text-blue-600">Choir Rehearsal</span>
                      ) : (
                        <div>
                          <span className="font-semibold text-purple-600">Deliver to Address</span>
                          <div className="text-[10px] text-gray-500 mt-1 max-w-[180px] break-words">
                            {order.deliveryAddress || '-'}<br />
                            {order.deliveryCity || '-'}, {order.deliveryPostcode || '-'}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {actionLoading === order._id ? (
                          <Loader2 className="animate-spin h-5 w-5 text-[#B8860B]" />
                        ) : (
                          <>
                            {order.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => updateStatus(order._id, "Completed")}
                                  className="p-2 text-green-600 hover:bg-green-600 hover:text-white rounded-lg border border-green-200 hover:border-green-600 transition-colors"
                                  title="Mark Completed / Picked Up"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => updateStatus(order._id, "Cancelled")}
                                  className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg border border-red-200 hover:border-red-600 transition-colors"
                                  title="Cancel Order"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}

                            {order.status === "Cancelled" && (
                              <button
                                onClick={() => updateStatus(order._id, "Pending")}
                                className="p-2 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-lg border border-yellow-200 hover:border-yellow-600 transition-colors"
                                title="Restore to Pending"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}

                            {order.status === "Completed" && (
                              <button
                                onClick={() => updateStatus(order._id, "Pending")}
                                className="p-2 text-gray-600 hover:bg-gray-600 hover:text-white rounded-lg border border-gray-200 hover:border-gray-600 transition-colors"
                                title="Revert to Pending"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              onClick={() => deleteOrder(order._id)}
                              className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg border border-red-200 hover:border-red-600 transition-colors"
                              title="Delete Order Record"
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
    </div>
  );
}
