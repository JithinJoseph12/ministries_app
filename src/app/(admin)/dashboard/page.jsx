// app/page.js
"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    Church,
    Calendar,
    Users,
    Folder,
    BookOpen,
    User,
    Settings,
    HelpCircle,
    LogOut,
    Menu,
    Bell,
    ChevronDown,
    ArrowRight,
    CalendarPlus,
    Upload,
    FolderOpen,
    UsersRound,
    CalendarDays,
    MoreHorizontal,
    BookMarked,
    UserCog,
    Plus
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/src/components/providers/AuthProvider";




// ─── Footer Cross ──────────────────────────────────────────────────────────────
function FooterCross() {
    return (
        <svg width="12" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8.5" y="3" width="3" height="18" rx="0.5" fill="#1e3a8a" />
            <rect x="3" y="8" width="14" height="3" rx="0.5" fill="#1e3a8a" />
        </svg>
    );
}



// ─── Category Badge ────────────────────────────────────────────────────────────
function CategoryBadge({ label }) {
    const styles = {
        "Pro-Life": { bg: "#FEF3C7", text: "#92400E" },
        "Family & Life": { bg: "#EDE9FE", text: "#5B21B6" },
        "Evangelization": { bg: "#DBEAFE", text: "#1E40AF" },
        "Outreach": { bg: "#CCFBF1", text: "#065F46" },
    };
    const s = styles[label] || { bg: "#f3f4f6", text: "#374151" };
    return (
        <span
            className="px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap"
            style={{ backgroundColor: s.bg, color: s.text }}
        >
            {label}
        </span>
    );
}

function QuickActionCard({
    icon: Icon,
    iconBg,
    iconColor,
    title,
    description,
    onClick,
}) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center text-center px-5 py-6 rounded-xl cursor-pointer group transition-shadow shadow-lg shadow-indigo-100 hover:shadow-md"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf5" }}
        >
            <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: iconBg }}
            >
                <Icon size={24} style={{ color: iconColor }} />
            </div>
            <div
                style={{
                    position: "relative",
                    padding: "4px 0",
                    backgroundColor: "#f5f6f9ff",
                    width: "100%",
                    boxShadow: "0 0 45px 18px rgba(99, 102, 241, 0.08)",
                    borderRadius: "20px",
                }}
            >
                <h4
                    style={{
                        color: "#1e3a8a",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "18px",
                        fontWeight: 700,
                        marginBottom: "6px",
                    }}
                >
                    {title}
                </h4>

                <p
                    style={{
                        color: "#6b7a99",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "16px",
                        lineHeight: "1.5",
                    }}
                >
                    {description}
                </p>
            </div>
            <div
                className="w-7 h-7 rounded-full flex items-center justify-center group-hover:opacity-80 transition-opacity"
                style={{ border: "1px solid #e8edf5" }}
            >
                <ArrowRight size={14} style={{ color: "#1e3a8a" }} />
            </div>
        </div>
    );
}

// ─── Upcoming Events ───────────────────────────────────────────────────────────
const events = [
    { month: "MAY", day: "24", name: "Eucharistic Miracles Exhibit", date: "May 24 – Jun 15, 2026", ministry: "MRH – St. Carlo Shrine" },
    { month: "MAY", day: "30", name: "Men Through Mary Retreat", date: "May 30, 2026 · 8:00 AM", ministry: "Mid-Atlantic Knights" },
    { month: "JUN", day: "03", name: "Family Prayer Evening", date: "June 3, 2026 · 7:00 PM", ministry: "Militia of Immaculata Village" },
    { month: "JUN", day: "07", name: "Pro-Life Prayer Vigil", date: "June 7, 2026 · 9:00 AM", ministry: "Life Runners" },
    { month: "JUN", day: "12", name: "Evangelization Formation Night", date: "June 12, 2026 · 7:00 PM", ministry: "House of God's Light" },
];

// ─── Recent Activity ───────────────────────────────────────────────────────────
const activities = [
    {
        iconBg: "#e0f2f4",
        iconColor: "#0e7490",
        icon: UsersRound,
        title: "New Ministry Joined",
        desc: <>A Baby's Breath <span style={{ color: "#61656eff", fontWeight: 700 }}>has joined the directory.</span></>,
        time: "2 days ago",
    },
    {
        iconBg: "#dbeafe",
        iconColor: "#1d4ed8",
        icon: CalendarDays,
        title: "Event Added",
        desc: <>"Family Prayer Evening"<span style={{ color: "#61656eff", fontWeight: 700 }}> was added by Militia of Immaculata Village.</span></>,
        time: "3 days ago",
    },
    {
        iconBg: "#fef3c7",
        iconColor: "#d97706",
        icon: Church,
        title: "Profile Updated",
        desc: <>House of God's Light <span style={{ color: "#61656eff", fontWeight: 700 }}>updated their ministry profile information.</span></>,
        time: "5 days ago",
    },
    {
        iconBg: "#ede9fe",
        iconColor: "#7c3aed",
        icon: BookMarked,
        title: "Resource Uploaded",
        desc: <><span style={{ color: "#61656eff", fontWeight: 700 }}>New resource "Event Planning Guide" was uploaded.</span></>,
        time: "1 week ago",
    },
];

// ─── Quick Links ───────────────────────────────────────────────────────────────
const quickLinks = [
    { icon: Users, label: "Ministry Directory", sub: "View all ministries" },
    { icon: CalendarDays, label: "Event Calendar", sub: "View calendar" },
    { icon: User, label: "Contacts", sub: "View leader directory" },
    { icon: FolderOpen, label: "Resources", sub: "Access documents" },
    { icon: HelpCircle, label: "Support", sub: "Get help" },
];

// ─── Ministry Overview ─────────────────────────────────────────────────────────
const ministries = [
    { initials: "AB", color: "#e53e3e", name: "A Baby's Breath", category: "Pro-Life", leader: "Claire Howley", events: 4 },
    { initials: "GC", color: "#805ad5", name: "Gianna Center of Philadelphia", category: "Family & Life", leader: "Theresa Notare", events: 6 },
    { initials: "HG", color: "#d97706", name: "House of God's Light", category: "Evangelization", leader: "Bernadette Jaeger", events: 8 },
    { initials: "LR", color: "#dc2626", name: "Life Runners", category: "Pro-Life", leader: "Ann Scheidler", events: 5 },
    { initials: "SV", color: "#0d9488", name: "Society of St. Vincent de Paul", category: "Outreach", leader: "John Dwyer", events: 7 },
];

// ─── Main Page Content ────────────────────────────────────────────────────────
export default function Home() {
    const router = useRouter();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="px-20 py-10 bg-white min-h-full flex flex-col">
            <div className="flex-1">
                {/* ── Welcome + Quote ── */}
                <div className="flex gap-6 mb-7">
                    {/* Welcome text */}
                    <div className="flex-1">
                        <h1
                            style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 700, color: "#1e3a8a", lineHeight: "1.2", marginBottom: "6px" }}
                        >
                            Good morning, <span className="text-[#c9a553] text-3xl" >{user?.firstName || "User"}</span>
                        </h1>
                        <p style={{ color: "#6b7a99", fontSize: "17px", marginBottom: "10px" }}>
                            Welcome to The Upper Room Ministry Hub
                        </p>
                        <div style={{ width: "44px", height: "3px", backgroundColor: "#c9a553", borderRadius: "2px" }} />
                    </div>

                    {/* Quote card */}
                    <div
                        className="relative overflow-hidden rounded-3xl px-6 py-5 "
                        style={{ backgroundColor: "#eef3fb", border: "1px solid #dce6f5", minWidth: "380px", maxWidth: "320px" }}
                    >
                        <div className="absolute bottom-4 right-5 ">
                            {/* <BotanicalDecor /> */}
                            <Image
                                src="/images/leaf.png"
                                alt="ornament"
                                width={124}
                                height={124}
                            />
                        </div>
                        <p
                            style={{ color: "#c9a553", fontSize: "32px", lineHeight: "1", marginBottom: "4px", fontFamily: "'Playfair Display', serif" }}
                        >
                            ❝
                        </p>
                        <p className="font-semibold z-10"
                            style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px", fontStyle: "italic", color: "#1e3a8a", lineHeight: "1.6", marginBottom: "8px", maxWidth: "200px" }}
                        >
                            As the Father has sent me, even so I send you.
                        </p>
                        <p style={{ color: "#6b7a99", fontSize: "12px", fontFamily: "'Inter', sans-serif" }}>
                            – John 20:21
                        </p>
                    </div>
                </div>

                {/* ── Quick Actions ── */}
                <div className="mb-7">
                    <h2
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: 700, color: "#1e3a8a", marginBottom: "14px" }}
                    >
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-4 gap-4">
                        {user?.role === 'admin' ? (
                            <QuickActionCard
                                icon={Church}
                                iconBg="#fff8e1"
                                iconColor="#f59e0b"
                                title="Edit Ministry"
                                description="Update your ministry details"
                                onClick={() => {
                                    if (user?.ministryId) {
                                        router.push(`/dashboard/ministries/add?editId=${user.ministryId}`);
                                    } else {
                                        alert("No ministry assigned to your account.");
                                    }
                                }}
                            />
                        ) : (
                            <QuickActionCard
                                icon={Church}
                                iconBg="#fff8e1"
                                iconColor="#f59e0b"
                                title="Add Ministry"
                                description="Create a new ministry"
                                onClick={() => router.push('/dashboard/ministries/add')}
                            />
                        )}
                        <QuickActionCard
                            icon={CalendarPlus}
                            iconBg="#e0f7fa"
                            iconColor="#0097a7"
                            title="Add Event"
                            description="Create a new ministry event"
                            onClick={() => router.push('/dashboard/events/add')}
                        />

                        <QuickActionCard
                            icon={FolderOpen}
                            iconBg="#e8f5e9"
                            iconColor="#43a047"
                            title="Upload Resource"
                            description="Share documents with leaders"
                        />
                        <QuickActionCard
                            icon={UsersRound}
                            iconBg="#f3e8ff"
                            iconColor="#9333ea"
                            title="View Directory"
                            description="Browse participating ministries"
                        />
                    </div>
                </div>

                {/* ── Events + Activity ── */}
                <div className="grid grid-cols-[1fr_340px] gap-5 mb-7">
                    {/* Upcoming Events */}
                    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf5" }}>
                        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f0f4fb" }}>
                            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1e3a8a" }}>
                                Upcoming Events
                            </h3>
                            <button className="flex items-center gap-1 text-base font-semibold" style={{ color: "#1d4ed8" }}>
                                View all events <ArrowRight size={12} />
                            </button>
                        </div>

                        {/* Table header */}
                        <div className="grid px-5 py-2.5" style={{ gridTemplateColumns: "72px 1fr 130px", borderBottom: "1px solid #f0f4fb" }}>
                            {["DATE", "EVENT", "MINISTRY"].map((h) => (
                                <span key={h} style={{ color: "#9aaac0", fontSize: "14px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                    {h}
                                </span>
                            ))}
                        </div>

                        {/* Rows */}
                        {events.map((ev, i) => (
                            <div
                                key={i}
                                className="grid px-5 py-3.5 items-center"
                                style={{ gridTemplateColumns: "72px 1fr 130px", borderBottom: i < events.length - 1 ? "1px solid #f7f9fc" : "none" }}
                            >
                                <div className="flex flex-col items-start">
                                    <span style={{ color: "#9aaac0", fontSize: "14px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                        {ev.month}
                                    </span>
                                    <span style={{ color: "#1e3a8a", fontSize: "28px", fontWeight: 700, lineHeight: "1.1", fontFamily: "'Inter', sans-serif" }}>
                                        {ev.day}
                                    </span>
                                </div>
                                <div>
                                    <p style={{ color: "#1e3a8a", fontSize: "16px", fontWeight: 700, marginBottom: "2px" }}>{ev.name}</p>
                                    <p style={{ color: "#9aaac0", fontSize: "14px" }}>{ev.date}</p>
                                </div>
                                <p className="font-semibold" style={{ color: "#4a5f80", fontSize: "14px", lineHeight: "1.4" }}>{ev.ministry}</p>
                            </div>
                        ))}

                        {/* Footer */}
                        <div className="px-5 py-3.5" style={{ borderTop: "1px solid #f0f4fb" }}>
                            <button
                                className="flex items-center gap-2 mx-auto px-5 py-2 rounded-lg text-base font-medium transition-colors hover:bg-gray-50"
                                style={{ color: "#1e3a8a", border: "1px solid #e8edf5", fontFamily: "'Inter', sans-serif", fontSize: "16px" }}
                            >
                                View Full Calendar
                                <CalendarDays size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf5" }}>
                        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f0f4fb" }}>
                            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1e3a8a" }}>
                                Recent Activity
                            </h3>
                            <button className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#1d4ed8" }}>
                                View all activity <ArrowRight size={12} />
                            </button>
                        </div>

                        <div className="divide-y divide-gray-100 px-4">
                            {activities.map((act, i) => (
                                <div key={i} className="flex gap-3 px-5 py-4">
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                        style={{ backgroundColor: act.iconBg }}
                                    >
                                        <act.icon size={16} style={{ color: act.iconColor }} />
                                    </div>
                                    <div>
                                        <p style={{ color: "#1e3a8a", fontSize: "16px", fontWeight: 700, marginBottom: "2px" }}>
                                            {act.title}
                                        </p>
                                        <p style={{ color: "#323335ff", fontSize: "13px", lineHeight: "1.2", marginBottom: "4px", fontWeight: 600 }}>
                                            {act.desc}
                                        </p>
                                        <p style={{ color: "#9aaac0", fontSize: "14px" }}>{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Quick Links ── */}
                <div
                    className="rounded-xl mb-7"
                    style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf5" }}
                >
                    <div className="px-5 py-4" style={{ borderBottom: "1px solid #f0f4fb" }}>
                        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1e3a8a" }}>
                            Quick Links
                        </h3>
                    </div>
                    <div className="grid grid-cols-5">
                        {quickLinks.map((link, i) => (
                            <button
                                key={i}
                                className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
                                style={{ borderRight: i < quickLinks.length - 1 ? "1px solid #f0f4fb" : "none" }}
                            >
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: "#eef3fb" }}
                                >
                                    <link.icon size={16} style={{ color: "#1e3a8a" }} />
                                </div>
                                <div>
                                    <p style={{ color: "#1e3a8a", fontSize: "16px", fontWeight: 700 }}>{link.label}</p>
                                    <p style={{ color: "#9aaac0", fontSize: "12px" }}>{link.sub}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Ministry Overview ── */}
                <div
                    className="rounded-xl mb-8"
                    style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf5" }}
                >
                    <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f0f4fb" }}>
                        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1e3a8a" }}>
                            Ministry Overview
                        </h3>
                        <button className="flex items-center gap-1 text-base font-semibold" style={{ color: "#1d4ed8" }}>
                            View all ministries <ArrowRight size={12} />
                        </button>
                    </div>

                    {/* Table header */}
                    <div
                        className="grid px-5 py-2.5"
                        style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid #f0f4fb" }}
                    >
                        {["MINISTRY", "CATEGORY", "LEADER", "EVENTS", "STATUS", "ACTIONS"].map((h) => (
                            <span key={h} style={{ color: "#9aaac0", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                {h}
                            </span>
                        ))}
                    </div>

                    {ministries.map((m, i) => (
                        <div
                            key={i}
                            className="grid items-center px-5 py-3.5"
                            style={{
                                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr ",
                                borderBottom: i < ministries.length - 1 ? "1px solid #f7f9fc" : "none",
                            }}
                        >
                            {/* Name */}
                            <div className="flex items-center gap-3">
                                {/* <MinistryLogo initials={m.initials} color={m.color} /> */}
                                <Image src="/images/holy_spirit.png" width={90} height={70} alt="Logo" />
                                <span style={{ color: "#1e3a8a", fontSize: "14px", fontWeight: 700 }}>{m.name}</span>
                            </div>
                            {/* Category */}
                            <div>
                                <CategoryBadge label={m.category} />
                            </div>
                            {/* Leader */}
                            <span style={{ color: "#4a5f80", fontSize: "14px" }}>{m.leader}</span>
                            {/* Events */}
                            <span style={{ color: "#4a5f80", fontSize: "14px" }}>{m.events}</span>
                            {/* Status */}
                            <span
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium w-fit"
                                style={{ backgroundColor: "#dcfce7", color: "#166534" }}
                            >
                                Active
                            </span>
                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                                    style={{ border: "1px solid #e8edf5", color: "#1e3a8a" }}
                                >
                                    View
                                </button>
                                <button className="ml-8 p-1 rounded hover:bg-gray-50 transition-colors">
                                    <MoreHorizontal size={14} style={{ color: "#9aaac0" }} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* View All */}
                    <div className="px-5 py-4 text-center" style={{ borderTop: "1px solid #f0f4fb" }}>
                        <button
                            className="text-base font-medium hover:underline"
                            style={{ color: "#1d4ed8", fontFamily: "'Inter', sans-serif", fontSize: "16px" }}
                        >
                            View All Ministries
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Footer ── */}
            <footer
                className="flex items-center justify-between py-4 mt-auto"
                style={{ borderTop: "1px solid #e8edf5", paddingTop: "24px" }}
            >
                <div className="flex items-center gap-2">
                    <FooterCross />
                    <span style={{ color: "#9aaac0", fontSize: "10px" }}>
                        © 2026 The Upper Room Ministry Hub. All rights reserved.
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <a href="#" style={{ color: "#9aaac0", fontSize: "10px" }}>Privacy Policy</a>
                    <span style={{ color: "#d1d9e6" }}>|</span>
                    <a href="#" style={{ color: "#9aaac0", fontSize: "10px" }}>Terms of Use</a>
                </div>
            </footer>
        </div>
    );
}