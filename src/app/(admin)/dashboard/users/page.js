"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/components/providers/AuthProvider";
import {
  Plus,
  Search,
  Users,
  Building2,
  Trash2,
  Mail,
  ShieldCheck,
  Edit,
} from "lucide-react";

export default function UsersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    if (user && user.role !== "superadmin") {
      router.push("/dashboard");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) {
          setUsersList(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role === "superadmin") {
      fetchUsers();
    }
  }, [user, router]);

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`/api/users/${itemToDelete}`, { method: "DELETE" });
      if (res.ok) {
        setUsersList((prev) => prev.filter((u) => u._id !== itemToDelete));
        setItemToDelete(null);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user", err);
      alert("An error occurred while deleting the user");
    }
  };

  const filteredUsers = usersList.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!user || user.role !== "superadmin") return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="p-8 lg:p-10">
        {/* Header Section */}
        <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-10 bg-gradient-to-b from-[#D6A646] to-[#082B63] rounded-full"></div>
              <p className="text-sm font-semibold text-[#D6A646] uppercase tracking-wider">
                User Management
              </p>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-2 tracking-tight bg-gradient-to-r from-[#082B63] to-[#1E4AA8] bg-clip-text text-transparent">
              Platform Users
            </h1>
          </div>
          <button
            onClick={() => router.push("/dashboard/users/add")}
            className="bg-[#082B63] hover:bg-[#0B3578] transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl flex items-center gap-3 transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Add New User
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
          <div className="relative max-w-md">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#082B63] focus:ring-2 focus:ring-[#082B63]/20 transition-all bg-slate-50/50"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/30">
            <Users size={22} className="text-[#082B63]" />
            <h2 className="text-xl font-bold text-slate-900">All Users</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Assigned Ministry
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-500">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u._id}
                      className="border-t border-slate-100 hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#1a3264] flex items-center justify-center text-white font-semibold uppercase">
                            {u.firstName.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-900 uppercase text-md">
                            {u.firstName} {u.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail size={16} /> {u.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            u.role === "superadmin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          <ShieldCheck size={14} />
                          {u.role === "superadmin" ? "Super Admin" : "Admin"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {u.ministryId ? (
                          <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <Building2 size={16} className="text-slate-400" />
                            {u.ministryId.name}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => router.push(`/dashboard/users/add?edit=true&id=${u._id}`)}
                            className="text-[#082B63] hover:text-[#0B3578] transition-colors p-2 rounded-lg hover:bg-slate-100"
                            title="Edit User"
                          >
                            <Edit size={18} />
                          </button>
                          {user._id !== u._id && (
                            <button
                              onClick={() => handleDelete(u._id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                              title="Delete User"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-colors"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
