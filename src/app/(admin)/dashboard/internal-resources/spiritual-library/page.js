// export default function SpiritualLibraryPage() {
//     return (
//         <div className="w-full h-[calc(100vh-80px)] overflow-auto bg-[#F7F9FC]">
//             <img
//                 src="/images/spiritual-library4.png"
//                 alt="Spiritual Library"
//                 className="w-full h-full object-fill"
//             />
//         </div>
//     );
// }

// app/spiritual-library/page.js
"use client";
import {
    Plus,
    Search,
    ChevronLeft,
    ChevronRight,
    Download,
    MoreVertical,
    X,
    BookOpen,
    Diamond,
    BookMarked,
    Flame,
    Shield,
    AlertTriangle,
    Library,
    Box,
    Grid3x3,
    Pencil,
    GraduationCap,
    Grid3X3,
} from "lucide-react";

// Using placeholder images since the imports won't work in Next.js without proper setup
const featuredPrayer = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=600&fit=crop";
const rosaryFamilies = "/images/re1.png";
const prayerCrisis = "/images/re2.png";
const spiritualWarfare = "/images/re3.png";
const eucharisticAdoration = "/images/re4.png";
const litanyProtection = "/images/re4.png";
const novenaLady = "/images/re3.png";
const readinessChecklist = "/images/re2.png";
const churchDocuments = "/images/re1.png";
const adminAvatar = "/images/re2.png";

const categories = [
    {
        icon: BookOpen,
        name: "Prayer Guides",
        count: 25,
        bg: "#EEF3FF",
        color: "#2453D4",
    },
    {
        icon: Diamond,
        name: "Rosary",
        count: 18,
        bg: "#F4F7FA",
        color: "#64748B",
    },
    {
        icon: BookMarked,
        name: "Novenas",
        count: 16,
        bg: "#FFF1F2",
        color: "#EF4444",
    },
    {
        icon: Flame,
        name: "Eucharistic Adoration",
        count: 15,
        bg: "#FFF7ED",
        color: "#F59E0B",
    },
    {
        icon: Shield,
        name: "Spiritual Warfare",
        count: 20,
        bg: "#FFF1F2",
        color: "#F43F5E",
    },
    {
        icon: AlertTriangle,
        name: "Emergency Prayers",
        count: 14,
        bg: "#FFF7ED",
        color: "#EF4444",
    },
    {
        icon: Library,
        name: "Church Documents",
        count: 12,
        bg: "#ECFDF5",
        color: "#16A34A",
    },
    {
        icon: GraduationCap,
        name: "Formation Articles",
        count: 28,
        bg: "#EEF3FF",
        color: "#2453D4",
    },
];

const resources = [
    {
        img: rosaryFamilies,
        title: "Rosary for Families",
        type: "Prayer Guide",
        desc: "A complete guide to praying the Rosary as a family, including mysteries, intentions and prayers.",
        downloads: "1,284",
    },
    {
        img: prayerCrisis,
        title: "Prayer in Times of Crisis",
        type: "Preparedness Resource",
        desc: "Powerful prayers and reflections to seek God's protection and strength in difficult times.",
        downloads: "956",
    },
    {
        img: spiritualWarfare,
        title: "Spiritual Warfare Prayers",
        type: "Prayer Guide",
        desc: "Prayers and Scriptures for protection, victory and spiritual discernment.",
        downloads: "768",
    },
    {
        img: eucharisticAdoration,
        title: "Eucharistic Adoration Guide",
        type: "Formation Resource",
        desc: "A guide to understanding and deepening our time in Eucharistic Adoration.",
        downloads: "448",
    },
    {
        img: litanyProtection,
        title: "Litany of Protection",
        type: "Prayer Guide",
        desc: "Traditional litanies for protection of yourself, your family and community.",
        downloads: "521",
    },
    {
        img: novenaLady,
        title: "Novena to Our Lady",
        type: "Novena",
        desc: "A powerful nine-day novena seeking Mary's intercession for special intentions.",
        downloads: "328",
    },
    {
        img: readinessChecklist,
        title: "Spiritual Readiness Checklist",
        type: "Preparedness Resource",
        desc: "A practical checklist to help individuals and families prepare spiritually.",
        downloads: "412",
    },
    {
        img: churchDocuments,
        title: "Church Documents on Spirituality",
        type: "Church Document",
        desc: "Official Church documents and teachings on spiritual life.",
        downloads: "288",
    },
];

const related = [
    { img: litanyProtection, title: "Litany of Protection", size: "908 KB" },
    { img: prayerCrisis, title: "Prayer in Times of Crisis", size: "1.5 MB" },
    { img: eucharisticAdoration, title: "Novena to Our Lady", size: "702 KB" },
];

export default function SpiritualLibrary() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900">
            <div className="mx-auto px-8 py-8">
                {/* Header */}
                <header className="flex items-start justify-between gap-6 mb-6 border-b  border-slate-200 pb-4">
                    <div>
                        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">
                            Spiritual Preparedness Library
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Guidelines, prayers and spiritual resources for our times.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 rounded-lg border border-[#003eba] bg-white px-4 py-2.5 text-sm font-semibold text-[#003eba] hover:bg-slate-50 transition">
                            <Plus className="h-4 w-4 stroke-3" /> Add Resource
                        </button>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="w-[320px] rounded-lg border border-slate-200 bg-white pl-9 pr-9 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        </div>
                    </div>
                </header>

                {/* Main grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left column */}
                    <div className="col-span-7 space-y-6">
                        {/* Featured */}
                        <div className="relative rounded-2xl overflow-hidden bg-[#0a1628] h-[350px]">
                            <img
                                src="/images/spiritual.png"
                                alt="Prayer"
                                className="absolute inset-0 w-full h-full object-cover opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
                            <div className="ml-10 relative p-8 flex flex-col h-full justify-between text-white">
                                <div>
                                    <span className=" inline-block rounded-md bg-amber-700/90 px-2.5 py-1 text-[10px] font-bold tracking-wider">
                                        FEATURED RESOURCE
                                    </span>
                                    <h2 className="mt-4 text-3xl font-bold">Prayer During Difficult Times</h2>
                                    <p className="mt-3 text-sm font-semibold text-white/80 max-w-md leading-8">
                                        A comprehensive prayer guide to help you and your community stay strong in faith during challenging times.
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <span className="rounded-md bg-white/15 backdrop-blur px-3 py-1 text-xs">
                                            Prayer Guide
                                        </span>
                                        <span className="rounded-md bg-white/15 backdrop-blur px-3 py-1 text-xs">
                                            PDF Document
                                        </span>
                                    </div>
                                </div>
                                <button className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition">
                                    <Download className="h-4 w-4" /> View / Download
                                </button>
                            </div>
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                                <span className="h-2 w-2 rounded-full bg-white/40" />
                                <span className="h-2 w-2 rounded-full bg-white/40" />
                                <span className="h-2 w-2 rounded-full bg-white/40" />
                                <span className="h-2 w-2 rounded-full bg-white/40" />
                            </div>
                        </div>

                        {/* All Resources */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold">All Resources</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    Sort by:
                                    <select className="rounded-md border font-semibold border-slate-200 bg-white px-2 py-1.5 text-xs">
                                        <option>Latest Added</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {resources.map((r) => (
                                    <div
                                        key={r.title}
                                        className="rounded-xl bg-white border border-slate-200 overflow-hidden flex flex-col"
                                    >
                                        <div className="relative aspect-[4/3]">
                                            <img
                                                src={r.img}
                                                alt={r.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute top-2 right-2 rounded bg-white px-1.5 py-0.5 text-[9px] font-bold text-red-500 shadow">
                                                PDF
                                            </span>
                                        </div>
                                        <div className="p-3 flex flex-col flex-1">
                                            <h4 className="text-[14px] font-semibold leading-tight">{r.title}</h4>
                                            <p className="text-[13px] text-slate-500 mt-0.5">{r.type}</p>
                                            <p className="text-[12px] text-slate-500 mt-2 line-clamp-3 flex-1">
                                                {r.desc}
                                            </p>
                                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200">
                                                <span className="inline-flex items-center gap-1 text-[12px] text-slate-500">
                                                    <Download className="h-3 w-3" /> {r.downloads}
                                                </span>
                                                <button className="text-slate-400 hover:text-slate-600">
                                                    <MoreVertical className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                                <span>Showing 1 to 8 of 75 resources</span>
                                <div className="flex items-center gap-1">
                                    <button className="h-7 w-7 rounded-md border border-slate-200 bg-white flex items-center justify-center">
                                        <ChevronLeft className="h-3.5 w-3.5" />
                                    </button>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button
                                            key={n}
                                            className={`h-7 w-7 rounded-md text-xs flex items-center justify-center ${n === 1
                                                ? "bg-blue-600 text-white"
                                                : "border border-slate-200 bg-white"
                                                }`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                    <span className="px-1">...</span>
                                    <button className="h-7 w-7 rounded-md border border-slate-200 bg-white text-xs">
                                        10
                                    </button>
                                    <button className="h-7 w-7 rounded-md border border-slate-200 bg-white flex items-center justify-center">
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                <select className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs">
                                    <option>8 per page</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Categories column */}
                    <div className="col-span-2">
                        <div className="bg-white border border-[#E8EDF5] rounded-2xl p-6">

                            {/* Title */}
                            <h3 className="text-[20px] font-serif font-bold text-[#1E2A5A] mb-4">
                                Categories
                            </h3>

                            {/* Category List */}
                            <div>

                                {categories.map((c, index) => (
                                    <div key={c.name}>

                                        <div className="flex items-center gap-4 py-4">

                                            {/* Icon Circle */}
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                                style={{ background: c.bg }}
                                            >
                                                <c.icon
                                                    size={14}
                                                    strokeWidth={2}
                                                    color={c.color}
                                                />
                                            </div>

                                            {/* Content */}
                                            <div>
                                                <h4 className="text-[12px] font-bold text-[#1E2A5A] leading-none">
                                                    {c.name}
                                                </h4>

                                                <p className="text-[12px] text-[#64748B] mt-2">
                                                    {c.count} Resources
                                                </p>
                                            </div>

                                        </div>

                                        {index !== categories.length - 1 && (
                                            <div className="border-b border-[#EDF2F7]" />
                                        )}
                                    </div>
                                ))}

                            </div>

                            {/* Button */}
                            <button
                                className="
        w-full
        mt-6
        h-[52px]
        border
        border-[#E8EDF5]
        rounded-xl
        flex
        items-center
        justify-center
        gap-3
        text-[#2453D4]
        font-semibold
        text-[15px]
        hover:bg-[#F8FAFC]
        transition
      "
                            >
                                <Grid3X3 size={18} />
                                View All Categories
                            </button>

                        </div>
                    </div>

                    {/* Resource Details */}
                    <div className="col-span-3">
                        <div className="rounded-xl bg-white border border-slate-200 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold">Resource Details</h3>
                                <button className="text-slate-400 hover:text-slate-600">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <img
                                    src="/images/re1.png"
                                    alt="Rosary"
                                    className="h-16 w-16 rounded-lg object-cover"
                                    loading="lazy"
                                />
                                <div>
                                    <h4 className="text-sm font-bold">Rosary for Families</h4>
                                    <p className="text-[11px] text-slate-500 mt-0.5">Prayer Guide • PDF</p>
                                    <p className="text-[11px] text-slate-500">1.2 MB</p>
                                </div>
                            </div>
                            <p className="text-[13px] text-slate-500 mt-4 leading-relaxed">
                                A complete guide to praying the Rosary as a family, including mysteries, intentions, and prayers suitable for children.
                            </p>
                            <dl className="mt-4 space-y-2.5 text-[12px]">
                                <div className="flex justify-between">
                                    <dt className="text-slate-500">Category</dt>
                                    <dd className="font-medium">Prayer Guides</dd>
                                </div>
                                <div className="flex justify-between items-start gap-2">
                                    <dt className="text-slate-500">Tags</dt>
                                    <dd className="flex flex-wrap gap-1 justify-end">
                                        {["Rosary", "Family", "Prayer", "Guide"].map((t) => (
                                            <span
                                                key={t}
                                                className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-blue-600 font-medium"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-500">Downloads</dt>
                                    <dd className="font-medium">1,284</dd>
                                </div>
                                <div className="flex justify-between items-center">
                                    <dt className="text-slate-500">Added By</dt>
                                    <dd className="flex items-center gap-1.5">
                                        <img
                                            src={adminAvatar}
                                            alt=""
                                            className="h-5 w-5 rounded-full object-cover"
                                            loading="lazy"
                                        />
                                        <span className="font-medium">Upper Room Admin</span>
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-500">Added On</dt>
                                    <dd className="font-medium">May 10, 2026</dd>
                                </div>
                            </dl>
                            <button className="mt-5 w-full rounded-lg font-semibold bg-[#003eba] text-white py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-[#003eba]">
                                <Download className="h-4 w-4 stroke-3" /> Download PDF
                            </button>
                            <button className="mt-2 w-full rounded-lg font-semibold border border-slate-200 py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-slate-50">
                                <Pencil className="h-4 w-4 stroke-3" /> Edit Resource
                            </button>

                            <div className="mt-6">
                                <h4 className="text-sm font-bold mb-3">Related Resources</h4>
                                <ul className="space-y-3">
                                    {related.map((r) => (
                                        <li key={r.title} className="flex items-center gap-3">
                                            <img
                                                src={r.img}
                                                alt=""
                                                className="h-10 w-10 rounded-md object-cover"
                                                loading="lazy"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[12px] font-semibold truncate">{r.title}</div>
                                                <div className="text-[10px] text-slate-500">PDF • {r.size}</div>
                                            </div>
                                            <span className="rounded bg-red-50 px-1.5 py-0.5 text-[9px] font-bold text-red-500">
                                                PDF
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="mt-4 w-full text-center text-xs font-medium text-blue-600 hover:underline">
                                    View All Related Resources
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
