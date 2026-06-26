"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/src/components/providers/AuthProvider";
import { ArrowLeft, UserPlus, X, CheckCircle, ShieldCheck, Eye, EyeOff, Plus, Edit } from "lucide-react";

function AddUserContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const isEditing = searchParams.get("edit") === "true";
  const editId = searchParams.get("id");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    ministryId: "",
    profession: "",
  });

  const [ministries, setMinistries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Only superadmin can access this
    if (user && user.role !== "superadmin") {
      router.push("/dashboard");
      return;
    }

    // Fetch all ministries for the dropdown
    const fetchMinistries = async () => {
      try {
        const res = await fetch("/api/ministries");
        const data = await res.json();
        if (data.success) {
          setMinistries(data.ministries);
        }
      } catch (err) {
        console.error("Failed to fetch ministries", err);
      }
    };

    if (user?.role === "superadmin") {
      fetchMinistries();

      if (isEditing && editId) {
        const fetchUser = async () => {
          try {
            const res = await fetch(`/api/users/${editId}`);
            const data = await res.json();
            if (data.success) {
              const u = data.user;
              setFormData({
                firstName: u.firstName || "",
                lastName: u.lastName || "",
                email: u.email || "",
                password: "",
                confirmPassword: "",
                ministryId: u.ministryId ? u.ministryId : "",
                profession: u.profession || "",
              });
            }
          } catch (err) {
            console.error("Failed to fetch user data", err);
          }
        };
        fetchUser();
      }
    }
  }, [user, router, isEditing, editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setErrors({});

    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    } else {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(formData.firstName)) {
        newErrors.firstName = "First name must contain only letters.";
      }
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    } else {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(formData.lastName)) {
        newErrors.lastName = "Last name must contain only letters.";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please provide a valid email address.";
      }
    }

    if (!isEditing || formData.password) {
      if (!formData.password) {
        newErrors.password = "Password is required.";
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
          newErrors.password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
        }
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required.";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    if (!formData.ministryId) {
      newErrors.ministryId = "Please select a ministry for this admin.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const url = isEditing ? `/api/users/${editId}` : "/api/users";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: "admin", // Hardcoded to admin based on user request
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/users");
        }, 1500);
      } else {
        setError(data.message || `Failed to ${isEditing ? "update" : "create"} user.`);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || user.role !== "superadmin") return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 lg:p-10">
      <div className="w-full mx-auto relative overflow-hidden rounded-3xl mb-8 bg-[#f5f6f9ff] border border-[#e8edf5] max-w-5xl">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(8,43,99,0.08),transparent_65%)]" />

          {/* Dotted Pattern */}
          <div className="absolute right-18 top-6 grid grid-cols-8 gap-2 opacity-30">
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-[#D6A646]"
              />
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-between px-20 py-4 ">
          {/* Left Content */}
          <div>
            <button
              onClick={() => router.push("/dashboard/users")}
              className="mb-5 flex items-center gap-2 text-[#082B63]/80 hover:text-[#0B3578] text-sm font-semibold transition"
            >
              <ArrowLeft size={16} />
              Back to Users
            </button>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              {isEditing ? "Edit Admin" : "Add New Admin"}
            </h1>

            <p className="mt-3 text-md text-slate-600 max-w-lg">
              {isEditing
                ? "Update the administrator details and their assigned ministry."
                : "Create a new administrator and assign them to a ministry with appropriate access permissions."}
            </p>
          </div>

          {/* Right Illustration */}
          <div className="relative hidden lg:flex items-center justify-center w-44 h-44">

            {/* Decorative Leaves */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="absolute w-20 h-12 bg-[#7ea8ff] rounded-full blur-sm rotate-45 -left-2" />
              <div className="absolute w-20 h-12 bg-[#7ea8ff] rounded-full blur-sm -rotate-45 left-5" />

              <div className="absolute w-20 h-12 bg-[#7ea8ff] rounded-full blur-sm rotate-45 right-5" />
              <div className="absolute w-20 h-12 bg-[#7ea8ff] rounded-full blur-sm -rotate-45 right-0" />
            </div>

            {/* Main Circle */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#082B63] to-[#103f8c] shadow-2xl flex items-center justify-center">
              {isEditing ? <Edit size={38} className="text-white" /> : <UserPlus size={38} className="text-white" />}

              {/* Floating Add Badge */}
              <div className="absolute -right-2 bottom-1 w-10 h-10 rounded-full bg-[#D6A646] shadow-lg flex items-center justify-center border-4 border-white">
                {isEditing ? <Edit size={18} className="text-white" /> : <Plus size={18} className="text-white" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          {/* <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-14 h-14 bg-[#082B63]/10 text-[#082B63] rounded-2xl flex items-center justify-center">
              <UserPlus size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Add New Admin</h1>
              <p className="text-slate-500">Create a new admin and assign them to a ministry.</p>
            </div>
          </div> */}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3 border border-red-100">
              <X size={20} className="mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-start gap-3 border border-emerald-100">
              <CheckCircle size={20} className="mt-0.5 flex-shrink-0" />
              <p>User {isEditing ? "updated" : "created"} successfully! Redirecting...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"

                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full border ${errors.firstName ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-[#082B63] focus:ring-2 focus:ring-[#082B63]/20 transition-all bg-slate-50`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"

                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full border ${errors.lastName ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-[#082B63] focus:ring-2 focus:ring-[#082B63]/20 transition-all bg-slate-50`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Role
                </label>

                <div className="w-full h-[50px] px-4 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-between select-none pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center">
                      <ShieldCheck size={14} className="text-slate-500" />
                    </div>

                    <span className="text-slate-700 text-sm font-semibold  tracking-wide">
                      Admin
                    </span>
                  </div>

                  <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2.5 py-1 rounded-full">
                    Fixed
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"

                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-[#082B63] focus:ring-2 focus:ring-[#082B63]/20 transition-all bg-slate-50`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"

                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border ${errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200'} rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#082B63] focus:ring-2 focus:ring-[#082B63]/20 transition-all bg-slate-50`}
                    placeholder={isEditing ? "Leave blank to keep current" : "Minimum 6 characters"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"

                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full border ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200'} rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#082B63] focus:ring-2 focus:ring-[#082B63]/20 transition-all bg-slate-50`}
                    placeholder={isEditing ? "Leave blank to keep current" : "Confirm password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Assign Ministry</label>
              <select
                name="ministryId"

                value={formData.ministryId}
                onChange={handleChange}
                className={`w-full border ${errors.ministryId ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200'} rounded-xl px-4 py-3 focus:outline-none focus:border-[#082B63] focus:ring-2 focus:ring-[#082B63]/20 transition-all bg-slate-50`}
              >
                <option value="">Select a ministry...</option>
                {ministries.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name} ({m.category})
                  </option>
                ))}
              </select>
              {errors.ministryId ? (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.ministryId}</p>
              ) : (
                <p className="mt-2 text-xs text-slate-500">This admin will only have access to manage the selected ministry.</p>
              )}
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => router.push("/dashboard/users")}
                className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#082B63] text-white font-semibold rounded-xl hover:bg-[#0B3578] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Admin" : "Create Admin")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AddUserPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-500">Loading...</p></div>}>
      <AddUserContent />
    </Suspense>
  );
}
