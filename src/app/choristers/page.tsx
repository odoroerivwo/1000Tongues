"use client";
import AuthGuard from "@/components/AuthGuard";
import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { FiEdit, FiCheckCircle, FiTrash2, FiX } from "react-icons/fi";

type Status = "Pending" | "Accepted";

interface Chorister {
  id: number;
  name: string;
  email: string;
  phone: string;
  voicePart: string;
  status: Status;
}

const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 bg-[#0D1B2A] text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
      <FiCheckCircle className="text-[#B8860B]" />
      <div>{message}</div>
    </div>
  );
};

export default function ChoristersPage() {
  const [choristers, setChoristers] = useState<Chorister[]>([
    { id: 1, name: "Angela White", email: "angela@example.com", phone: "08011112222", voicePart: "Soprano", status: "Pending" },
    { id: 2, name: "Samuel Green", email: "samuel@example.com", phone: "08033334444", voicePart: "Alto", status: "Accepted" },
    { id: 3, name: "Grace Blue", email: "grace@example.com", phone: "08055556666", voicePart: "Tenor", status: "Pending" },
  ]);

  const [selected, setSelected] = useState<Chorister | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openEdit = (c: Chorister) => { setSelected(c); setModalOpen(true); };
  const saveEdit = () => {
    if (!selected) return;
    setChoristers(prev => prev.map(p => (p.id === selected.id ? selected : p)));
    setModalOpen(false);
    setToastMessage("Chorister updated successfully!");
  };
  const accept = (id: number) => {
    setChoristers(prev => prev.map(p => (p.id === id ? { ...p, status: "Accepted" } : p)));
    setToastMessage("Chorister accepted!");
  };
  const remove = (id: number) => {
    setChoristers(prev => prev.filter(p => p.id !== id));
    setToastMessage("Chorister deleted!");
  };

  return (
    <AuthGuard>
      <div className="bg-white p-6 shadow rounded-xl relative">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">Choristers</h1>
        <p className="text-gray-600 mb-6">Manage chorister registrations. (Mock data — connect to MongoDB when ready.)</p>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-[#0D1B2A] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Voice Part</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {choristers.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-slate-800">{c.name}</td>
                  <td className="px-6 py-3 text-sm text-slate-700">{c.email}</td>
                  <td className="px-6 py-3 text-sm text-slate-700">{c.phone}</td>
                  <td className="px-6 py-3 text-sm text-slate-700">{c.voicePart}</td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.status === "Accepted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{c.status}</span>
                  </td>
                  <td className="px-6 py-3 text-center flex justify-center gap-3">
                    <button onClick={() => openEdit(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full" title="Edit"><FiEdit /></button>
                    <button onClick={() => accept(c.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-full" title="Accept"><FiCheckCircle /></button>
                    <button onClick={() => remove(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full" title="Delete"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalOpen && selected && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><FiX /></button>
              <h2 className="text-lg font-semibold mb-4">Edit Chorister</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Name</label>
                  <input value={selected.name} onChange={(e) => setSelected(prev => prev ? { ...prev, name: e.target.value } : prev)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]" />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <input type="email" value={selected.email} onChange={(e) => setSelected(prev => prev ? { ...prev, email: e.target.value } : prev)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]" />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone</label>
                  <input value={selected.phone} onChange={(e) => setSelected(prev => prev ? { ...prev, phone: e.target.value } : prev)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]" />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Voice Part</label>
                  <input value={selected.voicePart} onChange={(e) => setSelected(prev => prev ? { ...prev, voicePart: e.target.value } : prev)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]" />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Status</label>
                  <select value={selected.status} onChange={(e) => setSelected(prev => prev ? { ...prev, status: e.target.value as Status } : prev)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]">
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </div>

                <div className="flex justify-end mt-6">
                  <button onClick={() => setModalOpen(false)} className="px-4 py-2 mr-3 text-gray-600 border rounded-md hover:bg-gray-100">Cancel</button>
                  <button onClick={saveEdit} className="px-4 py-2 bg-[#0D1B2A] text-white rounded-md hover:bg-[#142c44]">Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      </div>
    </AuthGuard>
  );
}
