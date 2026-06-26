"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/src/components/providers/AuthProvider";

// ─── Top Header ────────────────────────────────────────────────────────────────
export default function Header() {
    const { user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header
            className="flex items-center justify-between px-6 py-6 sticky top-0 z-10"
            style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8edf5" }}
        >
            <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                <Menu size={20} style={{ color: "#1e3a8a" }} />
            </button>

            <div className="flex items-center gap-4">
                {/* Bell */}
                <button className="relative p-1.5 rounded hover:bg-gray-100 transition-colors">
                    <Bell size={20} style={{ color: "#1e3a8a" }} />
                    <span
                        className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: "#ffb700ff", fontSize: "12px", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}
                    >
                        3
                    </span>
                </button>

                {/* User */}
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="flex items-center gap-2.5 cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div
                            className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
                            style={{ border: "2px solid #e8edf5" }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=72&h=72&fit=crop&auto=format"
                                alt="George"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p style={{ color: "#1e3a8a", fontSize: "17px", fontWeight: 700, fontFamily: "'Inter', sans-serif", lineHeight: "1.3" }}>{user?.firstName || "User"}</p>
                            <p style={{ color: "#6b7a99", fontSize: "12px", fontFamily: "'Inter', sans-serif", lineHeight: "1.3", textTransform: "capitalize" }}>{user?.role === "superadmin" ? "Super Admin" : "Admin"}</p>
                        </div>
                        <ChevronDown size={14} style={{ color: "#6b7a99" }} />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 py-1.5 z-50 overflow-hidden">
                            <Link
                                href="/"
                                className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={16} />
                                <span>Sign Out</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}