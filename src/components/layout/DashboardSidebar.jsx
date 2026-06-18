// components/DashboardSidebar.jsx
"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    Church,
    Calendar,
    Users,
    Folder,
    BookOpen,
    UserCog,
    Settings,
    HelpCircle,
    LogOut,
    ChevronDown,
    ChevronRight,
    FolderLock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    {
        icon: Church,
        label: "Ministries",
        href: "/dashboard/ministries",
        subItems: [
            { label: "All Ministries", href: "/dashboard/ministries" },
            { label: "Add Ministry", href: "/dashboard/ministries/add" },
        ]
    },
    {
        icon: Calendar,
        label: "Events",
        href: "/dashboard/events",
        subItems: [
            { label: "All Events", href: "/dashboard/events" },
            { label: "Add Event", href: "/dashboard/events/add" },
        ]
    },
    { icon: Folder, label: "Public Resources", href: "/dashboard/resources" },
    { icon: FolderLock, label: "Resource Center",
         href: "/dashboard/internal-resources",
                subItems: [
            { label: "Leader Directory", href: "/dashboard/internal-resources/leader-directory" },
            { label: "Shared Resources", href: "/dashboard/internal-resources/shared-resources" },
            { label: "Internal Communications", href: "/dashboard/internal-resources/internal-communications" },
            { label: "Spiritual Library", href: "/dashboard/internal-resources/spiritual-library" },
        ] },
    { icon: Users, label: "Contacts", href: "/dashboard/contacts" },
    { icon: BookOpen, label: "Blog", href: "/dashboard/blog" },
];

// const bottomNavItems = [
//     { icon: UserCog, label: "Users" },
//     { icon: Settings, label: "Settings" },
//     { icon: HelpCircle, label: "Help & Support" },
// ];

export default function DashboardSidebar() {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState({});

    return (
        <aside
            className="flex flex-col h-screen w-[260px] flex-shrink-0 fixed left-0 top-0 bottom-0 z-20"
            style={{ backgroundColor: "#0d1b38" }}
        >
            {/* Logo */}
            <div className="flex flex-col items-center pb-2 px-3">
                <Image
                    src="/images/cross_logo.png"
                    alt="Logo"
                    width={200}
                    height={100}
                    priority
                    style={{
                        width: "170px",
                        height: "auto",
                    }}
                />
                <div className="mt-2 text-center">
                    <p
                        style={{
                            color: "#a8b8d4",
                            fontSize: "17px",
                            letterSpacing: "0.12em",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                        }}
                    >
                        THE UPPER ROOM
                    </p>
                    <p
                        style={{
                            color: "#f6f6f6ff",
                            fontSize: "12px",
                            letterSpacing: "0.08em",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                        }}
                    >
                        MINISTRY HUB
                    </p>
                </div>
            </div>

            {/* Main nav */}
            <nav className="flex-1 overflow-y-auto flex flex-col gap-2.5 px-2 pt-1 mt-8 pb-4" style={{ scrollbarWidth: "none" }}>
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href);

                    const isOpen = openMenus[item.label] !== undefined
                        ? openMenus[item.label]
                        : isActive;

                    const activeStyle = {
                        backgroundColor: "rgba(238, 250, 255, 0.12)",
                        color: "white",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "17px",
                        fontWeight: 700,
                    };

                    const defaultStyle = {
                        backgroundColor: "transparent",
                        color: "white",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "17px",
                        fontWeight: 700,
                    };

                    return (
                        <div key={item.label} className="flex flex-col">
                            {item.subItems ? (
                                <button
                                    onClick={() => setOpenMenus(prev => ({ ...prev, [item.label]: !isOpen }))}
                                    className={`flex items-center gap-3.5 px-3 py-3.5 w-full text-left transition-all relative ${isActive ? "rounded-r-full" : ""
                                        }`}
                                    style={isActive ? activeStyle : defaultStyle}
                                >
                                    {isActive && (
                                        <span
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full"
                                            style={{ backgroundColor: "#c9a553" }}
                                        />
                                    )}
                                    <item.icon size={18} style={{ flexShrink: 0 }} />
                                    <span className="flex-1">{item.label}</span>
                                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3.5 px-3 py-3.5 w-full text-left transition-all relative ${isActive ? "rounded-r-full" : ""
                                        }`}
                                    style={isActive ? activeStyle : defaultStyle}
                                >
                                    {isActive && (
                                        <span
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full"
                                            style={{ backgroundColor: "#c9a553" }}
                                        />
                                    )}
                                    <item.icon size={18} style={{ flexShrink: 0 }} />
                                    <span>{item.label}</span>
                                </Link>
                            )}

                            {/* Sub Items */}
{/* Sub Items */}
{item.subItems && isOpen && (
  <div className="relative ml-6 mt-2 mb-2">

    {/* Vertical Line */}
    <div
      className="absolute left-[6px] top-0 bottom-4 w-px"
      style={{
        background: "rgba(168,184,212,0.35)",
      }}
    />

    <div className="flex flex-col gap-1">
      {item.subItems.map((subItem) => {
        const isSubActive = pathname === subItem.href;

        return (
          <Link
            key={subItem.label}
            href={subItem.href}
            className="relative flex items-center pl-7 pr-3 py-2.5"
            style={{
              color: isSubActive ? "#ffffff" : "#a8b8d4",
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: isSubActive ? 600 : 500,
            }}
          >
            {/* Connection Dot */}
            <span
              className="absolute left-0 w-3 h-3 rounded-full"
              style={{
                backgroundColor: isSubActive
                  ? "#c9a553"
                  : "#8AA1C8",
                border: "2px solid #0d1b38",
              }}
            />

            {subItem.label}
          </Link>
        );
      })}
    </div>
  </div>
)}
                        </div>
                    );
                })}

                {/* Spacer */}
                <div className="flex-1" />

                {/* Lower nav - commented out as in original */}
                {/* {bottomNavItems.map((item) => (
                    <button
                        key={item.label}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-md w-full text-left transition-all"
                        style={{
                            backgroundColor: "transparent",
                            color: "#a8b8d4",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "14px",
                            fontWeight: 700,
                        }}
                    >
                        <item.icon size={15} style={{ flexShrink: 0 }} />
                        <span>{item.label}</span>
                    </button>
                ))} */}
            </nav>

            {/* Bottom user area */}
            <div
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    padding: "12px 12px 8px",
                }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-semibold flex-shrink-0"
                        style={{ backgroundColor: "#1a3264" }}
                    >
                        U
                    </div>
                    <div className="min-w-0">
                        <p
                            style={{
                                color: "#ffffff",
                                fontSize: "16px",
                                fontWeight: 700,
                                fontFamily: "'Inter', sans-serif",
                                lineHeight: "1.3",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            Upper Room Team
                        </p>
                        <p
                            style={{
                                color: "#6b89b8",
                                fontSize: "12px",
                                fontFamily: "'Inter', sans-serif",
                                lineHeight: "1.3",
                            }}
                        >
                            Super Admin
                        </p>
                    </div>
                </div>

            </div>
        </aside>
    );
}