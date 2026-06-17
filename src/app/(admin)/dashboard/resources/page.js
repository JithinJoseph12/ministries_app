"use client";
// app/resources/page.js
import React, { useState } from 'react';
import {
    FaPlus,
    FaSearch,
    FaEye,
    FaEdit,
    FaTrash,
    FaFilePdf,
    FaImage,
    FaDownload,
    FaFileUpload,
    FaCheckCircle,
    FaPrayingHands,
} from 'react-icons/fa';
import {
    Folder,
    Globe,
    ShieldCheck,
    Download,
    Plus,
    FilePlus2,
    FileText,
    ChevronUp,
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link,
    Quote,
    Undo2,
    Redo2,
    Upload,
    ChevronDown,
    Settings,
    Tag,
    Lightbulb,
    Check,
    BookOpen,
    Users,
    MoreHorizontal,
    Church,
} from "lucide-react";
import { GiFamilyHouse } from 'react-icons/gi';

const resources = [
    {
        id: 1,
        title: "Rosary Companion Guide",
        description: "A complete guide to praying the Holy Rosary.",
        ministry: "Family Life Ministry",
        ministryLogo: "/images/cross_logo.png",
        category: "Prayer Guides",
        visibility: "Public",
        visibilityColor: "bg-[#EAF8E8] text-[#15803D] border-[#BFE3BE]",
        downloadAvailable: true,
        addedDate: "May 18, 2026",
        addedBy: "John Admin"
    },
    {
        id: 2,
        title: "Ministry Leader Toolkit",
        description: "Practical tools and templates for ministry leaders.",
        ministry: "Leadership Hub",
        ministryLogo: "/images/cross_logo.png",
        category: "Leadership",
        visibility: "Leaders Only",
        visibilityColor: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
        downloadAvailable: true,
        addedDate: "May 15, 2026",
        addedBy: "Sarah Johnson"
    },
    {
        id: 3,
        title: "Eucharistic Adoration PDF",
        description: "Guides and reflections for Eucharistic Adoration.",
        ministry: "Worship Ministry",
        ministryLogo: "/images/cross_logo.png",
        category: "Eucharist",
        visibility: "Public",
        visibilityColor: "bg-[#EAF8E8] text-[#15803D] border-[#BFE3BE]",
        downloadAvailable: true,
        addedDate: "May 12, 2026",
        addedBy: "Fr. Michael"
    },
    {
        id: 4,
        title: "Youth Retreat Workbook",
        description: "Workbook for youth retreats and activities.",
        ministry: "Youth Ministry",
        ministryLogo: "/images/cross_logo.png",
        category: "Youth",
        visibility: "Public",
        visibilityColor: "bg-[#EAF8E8] text-[#15803D] border-[#BFE3BE]",
        downloadAvailable: false,
        addedDate: "May 10, 2026",
        addedBy: "Maria Gonzales"
    },
    {
        id: 5,
        title: "Family Prayer Guide",
        description: "Daily prayers and devotions for families.",
        ministry: "Family Life Ministry",
        ministryLogo: "/images/cross_logo.png",
        category: "Family",
        visibility: "Leaders Only",
        visibilityColor: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
        downloadAvailable: true,
        addedDate: "May 8, 2026",
        addedBy: "David Chen"
    }
];

export default function ResourcesPage() {
    const [openSections, setOpenSections] = useState({
        1: true,
        2: false,
        3: false,
        4: false
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const totalResources = resources.length;
    const publicResources = resources.filter(r => r.visibility === "Public").length;
    const leadersOnlyResources = resources.filter(r => r.visibility === "Leaders Only").length;
    const downloadsEnabled = resources.filter(r => r.downloadAvailable).length;

    return (
        <div className="min-h-screen bg-[#F7F9FC] font-['Inter',sans-serif]">
            {/* CONTENT */}
            <main className="flex-1">

                <div className="p-8">
                    <div className="grid grid-cols-12 gap-6">
                        {/* LEFT COLUMN */}
                        <div className="col-span-8">
                            {/* KPI CARDS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                                {/* Card 1 */}
                                <div className="bg-white border border-[#E8EDF5] rounded-2xl px-5 py-5 flex items-center gap-4 shadow-md">
                                    <div className="w-14 h-14 rounded-full bg-[#F3F7FF] flex items-center justify-center shrink-0">
                                        <Folder size={28} className="text-[#2554D7]" />
                                    </div>

                                    <div>
                                        <p className="text-[15px] font-semibold text-[#111827]">
                                            Total Resources
                                        </p>

                                        <h3 className="text-[30px] leading-none font-bold text-[#111827] mt-1">
                                            {totalResources}
                                        </h3>

                                        <p className="text-[13px] text-[#6B7280] mt-1">
                                            All resources
                                        </p>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="bg-white border border-[#E8EDF5] rounded-2xl px-5 py-5 flex items-center gap-4 shadow-md">
                                    <div className="w-14 h-14 rounded-full bg-[#ECFDF3] flex items-center justify-center shrink-0">
                                        <Globe size={28} className="text-[#16A34A]" />
                                    </div>

                                    <div>
                                        <p className="text-[15px] font-semibold text-[#111827]">
                                            Public Resources
                                        </p>

                                        <h3 className="text-[30px] leading-none font-bold text-[#111827] mt-1">
                                            {publicResources}
                                        </h3>

                                        <p className="text-[13px] text-[#6B7280] mt-1">
                                            Visible to all users
                                        </p>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="bg-white border border-[#E8EDF5] rounded-2xl px-5 py-5 flex items-center gap-4 shadow-md">
                                    <div className="w-14 h-14 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                                        <ShieldCheck size={28} className="text-[#2563EB]" />
                                    </div>

                                    <div>
                                        <p className="text-[15px] font-semibold text-[#111827]">
                                            Leaders Only
                                        </p>

                                        <h3 className="text-[30px] leading-none font-bold text-[#111827] mt-1">
                                            {leadersOnlyResources}
                                        </h3>

                                        <p className="text-[13px] text-[#6B7280] mt-1">
                                            Leaders only access
                                        </p>
                                    </div>
                                </div>

                                {/* Card 4 */}
                                <div className="bg-white border border-[#E8EDF5] rounded-2xl px-5 py-5 flex items-center gap-4 shadow-md">
                                    <div className="w-14 h-14 rounded-full bg-[#F5F3FF] flex items-center justify-center shrink-0">
                                        <Download size={28} className="text-[#7C3AED]" />
                                    </div>

                                    <div>
                                        <p className="text-[15px] font-semibold text-[#111827]">
                                            Downloads Enabled
                                        </p>

                                        <h3 className="text-[30px] leading-none font-bold text-[#111827] mt-1">
                                            {downloadsEnabled}
                                        </h3>

                                        <p className="text-[13px] text-[#6B7280] mt-1">
                                            Resources
                                        </p>
                                    </div>
                                </div>

                            </div>



                            {/* FILTERS */}

                            <div className="grid grid-cols-5 gap-3 mb-4">
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                    <input
                                        className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 bg-white focus:ring-[#0A49B7] focus:border-transparent"
                                        placeholder="Search Resources..."
                                    />
                                </div>
                                <select className="border border-[#E5E7EB] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A49B7] focus:border-transparent bg-white">
                                    <option>All Ministries</option>
                                </select>
                                <select className="border border-[#E5E7EB] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A49B7] focus:border-transparent bg-white">
                                    <option>All Categories</option>
                                </select>
                                <select className="border border-[#E5E7EB] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A49B7] focus:border-transparent bg-white">
                                    <option>All Visibility</option>
                                </select>
                                <button className="border border-[#E5E7EB] rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors bg-white">
                                    Clear
                                </button>
                            </div>


                            {/* RESOURCE TABLE */}
                            <div className="bg-white border border-[#E5EAF1] rounded-2xl overflow-hidden">
                                <div className="px-6 py-5 border-b border-[#EEF2F7]">
                                    <h2 className="text-[28px] font-bold text-[#1E2A5A]">
                                        Resources ({totalResources})
                                    </h2>
                                </div>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[#EEF2F7]">
                                            <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase text-[#64748B]">
                                                Resource
                                            </th>
                                            <th className=" text-left text-[12px] font-semibold uppercase text-[#64748B]">
                                                Ministry
                                            </th>
                                            <th className=" text-left text-[12px] font-semibold uppercase text-[#64748B]">
                                                Category
                                            </th>
                                            <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase text-[#64748B]">
                                                Visibility
                                            </th>

                                            <th className="px-5 py-4 text-left text-[12px] font-semibold uppercase text-[#64748B]">
                                                Added
                                            </th>
                                            <th className="px-5 py-4 text-center text-[12px] font-semibold uppercase text-[#64748B]">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {resources.map((resource) => (
                                            <tr key={resource.id} className="border-b border-[#EEF2F7] hover:bg-[#FAFBFD]">

                                                {/* Resource */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-start gap-3">

                                                        <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E5EAF1] flex items-center justify-center">
                                                            <FaFilePdf className="text-[#DC2626] text-xl" />
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold text-sm text-[#1E293B]">
                                                                {resource.title}
                                                            </h4>

                                                            <p className="text-[13px] text-[#64748B] mt-1">
                                                                {resource.description}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </td>

                                                {/* Ministry */}
                                                <td className="px- py-">

                                                    <div className="flex items-center gap-3">


                                                        <span className="text-[#334155] text-xs">
                                                            {resource.ministry}
                                                        </span>

                                                    </div>

                                                </td>

                                                {/* Category */}
                                                <td className="px-1 py-4">

                                                    <span className="px-2 py-1 rounded-md text-xs font-medium bg-[#EEF4FF] text-[#2554D7] border border-[#C7D8FF]">
                                                        {resource.category}
                                                    </span>

                                                </td>

                                                {/* Visibility */}
                                                <td className="px-5 py-4">

                                                    <span className={`px-3 py-1 rounded-md text-xs font-medium border ${resource.visibilityColor}`}>
                                                        {resource.visibility}
                                                    </span>

                                                </td>



                                                {/* Added */}
                                                <td className="px-5 py-4">

                                                    <div>
                                                        <p className="font-medium text-sm text-[#334155]">
                                                            {resource.addedDate}
                                                        </p>

                                                        <p className="text-[10px] text-[#64748B]">
                                                            by {resource.addedBy}
                                                        </p>
                                                    </div>

                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-4">

                                                    <div className="flex justify-center gap-2">

                                                        <button className="w-9 h-9 rounded-lg border border-[#C9D7EE] flex items-center justify-center hover:bg-[#F8FAFC]">
                                                            <FaEdit className="text-[#2554D7] text-sm" />
                                                        </button>

                                                        <button className="w-9 h-9 rounded-lg border border-[#F3C7C7] flex items-center justify-center hover:bg-[#FEF2F2]">
                                                            <FaTrash className="text-[#DC2626] text-sm" />
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                                <div className="px-5 py-4 flex items-center justify-between">

                                    <p className="text-sm text-[#64748B]">
                                        Showing 1 to {totalResources} of {totalResources} resources
                                    </p>

                                    <div className="flex items-center gap-2">

                                        <button className="w-8 h-8 rounded border border-[#E5EAF1]">
                                            ‹
                                        </button>

                                        <button className="w-8 h-8 rounded bg-[#0A49B7] text-white">
                                            1
                                        </button>

                                        <button className="w-8 h-8 rounded border border-[#E5EAF1]">
                                            2
                                        </button>

                                        <button className="w-8 h-8 rounded border border-[#E5EAF1]">
                                            3
                                        </button>

                                        <button className="w-8 h-8 rounded border border-[#E5EAF1]">
                                            ...
                                        </button>

                                        <button className="w-8 h-8 rounded border border-[#E5EAF1]">
                                            31
                                        </button>

                                        <button className="w-8 h-8 rounded border border-[#E5EAF1]">
                                            ›
                                        </button>

                                    </div>

                                    <select className="h-9 px-3 rounded-lg border border-[#E5EAF1] text-sm">
                                        <option>5 per page</option>
                                    </select>

                                </div>

                            </div>
                            <div className="grid lg:grid-cols-[340px_1fr] gap-5 mt-6">

                                {/* LEFT CARD */}

                                <div className="bg-white border border-[#E5EAF1] rounded-2xl p-6">

                                    <div className="flex items-center gap-3 mb-7">
                                        <Lightbulb
                                            size={22}
                                            className="text-[#4B5563]"
                                        />

                                        <h3 className="text-[18px] font-bold text-[#1E293B]">
                                            Tips for Great Resources
                                        </h3>
                                    </div>

                                    <div className="space-y-5">

                                        {[
                                            "Upload searchable PDFs for better discovery",
                                            "Use clear, descriptive titles and categories",
                                            "Add ministry ownership for accountability",
                                            "Review visibility and download settings",
                                            "Consider making it a featured resource",
                                        ].map((tip, idx) => (
                                            <div key={idx} className="flex items-start gap-3">

                                                <div className="w-6 h-6 rounded-full bg-[#ECFDF3] flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check
                                                        size={14}
                                                        className="text-[#16A34A]"
                                                    />
                                                </div>

                                                <p className="text-[14px] leading-6 text-[#475569]">
                                                    {tip}
                                                </p>

                                            </div>
                                        ))}

                                    </div>

                                </div>

                                {/* RIGHT CARD */}

                                <div className="bg-white border border-[#E5EAF1] rounded-2xl p-5">

                                    <div className="flex items-center justify-between mb-5">

                                        <h3 className="text-[18px] font-bold text-[#1E293B]">
                                            Resource Categories
                                        </h3>

                                        <button className="text-[#2554D7] text-sm font-semibold hover:underline">
                                            View All Categories
                                        </button>

                                    </div>

                                    <div className="grid grid-cols-3 gap-2">

                                        <CategoryCard
                                            icon={<Church size={18} color="#2554D7" />}
                                            title="Prayer Guides"
                                            count="25 Resources"
                                        />

                                        <CategoryCard
                                            icon={<BookOpen size={18} color="#16A34A" />}
                                            title="Formation Materials"
                                            count="38 Resources"
                                        />

                                        <CategoryCard
                                            icon={<Users size={18} color="#7C3AED" />}
                                            title="Leadership Resources"
                                            count="22 Resources"
                                        />

                                        <CategoryCard
                                            icon={<GiFamilyHouse size={18} color="#EC4899" />}
                                            title="Family Resources"
                                            count="18 Resources"
                                        />

                                        <CategoryCard
                                            icon={<Users size={18} color="#F59E0B" />}
                                            title="Youth Resources"
                                            count="15 Resources"
                                        />

                                        <CategoryCard
                                            icon={<FileText size={18} color="#2554D7" />}
                                            title="Documents"
                                            count="20 Resources"
                                        />

                                        <CategoryCard
                                            icon={<Download size={18} color="#14B8A6" />}
                                            title="Downloads"
                                            count="16 Resources"
                                        />

                                        <CategoryCard
                                            icon={<MoreHorizontal size={18} color="#6B7280" />}
                                            title="Other Resources"
                                            count="0 Resources"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="col-span-4 relative">

                            {/* Floating Button */}
                            <button
                                className="
                                        absolute
                                        -top-4
                                        right-0
                                        z-20
                                        h-[52px]
                                        px-7
                                        bg-[#082B63]
                                        text-white
                                        rounded-xl
                                        
                                        font-semibold
                                        flex
                                        items-center
                                        gap-2
                                        shadow-[0_10px_25px_rgba(8,43,99,0.25)]
                                        hover:bg-[#061F4A]
                                        transition
                                        "
                            >
                                <Plus size={18} />
                                Add Resource
                            </button>

                            {/* Main Card */}
                            <div className="bg-white border border-[#E5EAF1] rounded-2xl shadow-[0_2px_10px_rgba(15,23,42,0.04)] overflow-hidden">

                                {/* Header */}
                                <div className="px-8 pt-10 pb-6">
                                    <div className="flex items-center gap-4">
                                        <FilePlus2
                                            size={42}
                                            strokeWidth={1.8}
                                            color="#0A49B7"
                                        />

                                        <h2 className="text-[22px] font-bold text-[#1E2A5A]">
                                            Add New Resource
                                        </h2>
                                    </div>
                                </div>


                                <div className="px-6 pb-6">

                                    {/* SECTION 1 */}

                                    <div className="border border-[#E7ECF3] rounded-xl overflow-hidden mb-5">

                                        <div 
                                            className={`h-[58px] px-5 flex items-center justify-between cursor-pointer ${openSections[1] ? 'bg-[#FCFCFD] border-b border-[#EEF2F7]' : 'bg-white'}`}
                                            onClick={() => toggleSection(1)}
                                        >

                                            <div className="flex items-center gap-3">

                                                <FileText
                                                    size={18}
                                                    strokeWidth={2}
                                                    color="#082B63"
                                                />

                                                <span className="text-[15px] font-semibold text-[#082B63]">
                                                    1. Resource Information
                                                </span>

                                            </div>

                                            {openSections[1] ? (
                                                <ChevronUp size={18} color="#082B63" />
                                            ) : (
                                                <ChevronDown size={18} color="#082B63" />
                                            )}

                                        </div>

                                        {openSections[1] && (
                                        <div className="p-6">

                                            {/* Resource Title */}

                                            <div className="mb-5">

                                                <label className="block text-sm font-semibold text-[#111827] mb-2">
                                                    Resource Title <span className="text-red-500">*</span>
                                                </label>

                                                <input
                                                    placeholder="Enter resource title"
                                                    className="w-full h-[56px] px-4 border border-[#D9E2EC] rounded-lg outline-none focus:border-[#0A49B7]"
                                                />

                                            </div>

                                            {/* Category + Ministry */}

                                            <div className="grid grid-cols-2 gap-4 mb-5">

                                                <div>

                                                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                                                        Resource Category <span className="text-red-500">*</span>
                                                    </label>

                                                    <select className="w-full h-[56px] px-4 border border-[#D9E2EC] rounded-lg bg-white outline-none">
                                                        <option>Select category</option>
                                                    </select>

                                                </div>

                                                <div>

                                                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                                                        Ministry <span className="text-red-500">*</span>
                                                    </label>

                                                    <select className="w-full h-[56px] px-4 border border-[#D9E2EC] rounded-lg bg-white outline-none">
                                                        <option>Select ministry</option>
                                                    </select>

                                                </div>

                                            </div>

                                            {/* Short Description */}

                                            <div className="mb-5">

                                                <label className="block text-sm font-semibold text-[#111827] mb-2">
                                                    Short Description <span className="text-red-500">*</span>
                                                </label>

                                                <div className="relative">

                                                    <textarea
                                                        rows={4}
                                                        placeholder="Brief description (150 characters)"
                                                        className="w-full border border-[#D9E2EC] rounded-lg p-4 resize-none outline-none"
                                                    />

                                                    <span className="absolute bottom-3 right-3 text-xs text-[#94A3B8]">
                                                        0/150
                                                    </span>

                                                </div>

                                            </div>

                                            {/* Full Description */}

                                            <div>

                                                <label className="block text-sm font-semibold text-[#111827] mb-2">
                                                    Full Description
                                                </label>

                                                <div className="border border-[#D9E2EC] rounded-lg overflow-hidden">

                                                    {/* Toolbar */}

                                                    <div className="h-12 border-b border-[#D9E2EC] flex items-center gap-4 px-4 text-[#475569]">

                                                        <Bold size={16} />

                                                        <Italic size={16} />

                                                        <Underline size={16} />

                                                        <div className="w-px h-5 bg-[#E5E7EB]" />

                                                        <List size={16} />

                                                        <ListOrdered size={16} />

                                                        <div className="w-px h-5 bg-[#E5E7EB]" />

                                                        <Link size={16} />

                                                        <Quote size={16} />

                                                        <div className="w-px h-5 bg-[#E5E7EB]" />

                                                        <Undo2 size={16} />

                                                        <Redo2 size={16} />

                                                    </div>

                                                    <textarea
                                                        rows={8}
                                                        placeholder="Enter full description..."
                                                        className="w-full p-4 resize-none outline-none"
                                                    />

                                                </div>

                                            </div>

                                        </div>

                                        )}

                                    </div>

                                    {/* SECTION 2 */}

                                    <div className="border border-[#E7ECF3] rounded-xl overflow-hidden mb-5 bg-white">

                                        <div 
                                            className={`h-[58px] px-5 flex items-center justify-between cursor-pointer ${openSections[2] ? 'bg-[#FCFCFD] border-b border-[#EEF2F7]' : ''}`}
                                            onClick={() => toggleSection(2)}
                                        >

                                            <div className="flex items-center gap-3">

                                                <Upload
                                                    size={18}
                                                    color="#082B63"
                                                />

                                                <span className="text-[15px] font-semibold text-[#082B63]">
                                                    2. File Upload
                                                </span>

                                            </div>

                                            {openSections[2] ? (
                                                <ChevronUp size={18} color="#082B63" />
                                            ) : (
                                                <ChevronDown size={18} color="#082B63" />
                                            )}

                                        </div>

                                        {openSections[2] && (
                                            <div className="p-6 space-y-4">
                                                <div className="border-2 border-dashed border-[#D9E2EC] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#F8FAFC]">
                                                    <Upload size={32} className="text-[#94A3B8] mb-3" />
                                                    <h3 className="text-[15px] font-semibold text-[#1E293B] mb-1">Click to upload or drag and drop</h3>
                                                    <p className="text-sm text-[#64748B]">PDF, DOC, DOCX, or ZIP (Max. 20MB)</p>
                                                    <button className="mt-4 px-4 py-2 bg-white border border-[#D9E2EC] rounded-lg text-sm font-medium text-[#111827] shadow-sm hover:bg-slate-50">Select File</button>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[#334155] mb-1">External Link (Optional)</label>
                                                    <input type="text" placeholder="https://" className="w-full h-11 px-4 border border-[#D9E2EC] rounded-lg outline-none focus:border-[#0A49B7] text-sm" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* SECTION 3 */}

                                    <div className="border border-[#E7ECF3] rounded-xl overflow-hidden mb-5 bg-white">

                                        <div 
                                            className={`h-[58px] px-5 flex items-center justify-between cursor-pointer ${openSections[3] ? 'bg-[#FCFCFD] border-b border-[#EEF2F7]' : ''}`}
                                            onClick={() => toggleSection(3)}
                                        >

                                            <div className="flex items-center gap-3">

                                                <Settings
                                                    size={18}
                                                    color="#082B63"
                                                />

                                                <span className="text-[15px] font-semibold text-[#082B63]">
                                                    3. Resource Settings
                                                </span>

                                            </div>

                                            {openSections[3] ? (
                                                <ChevronUp size={18} color="#082B63" />
                                            ) : (
                                                <ChevronDown size={18} color="#082B63" />
                                            )}

                                        </div>

                                        {openSections[3] && (
                                            <div className="p-6 space-y-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-[#334155] mb-2">Visibility</label>
                                                    <select className="w-full h-11 px-4 border border-[#D9E2EC] rounded-lg outline-none focus:border-[#0A49B7] text-sm bg-white">
                                                        <option>Public</option>
                                                        <option>Leaders Only</option>
                                                        <option>Private</option>
                                                    </select>
                                                </div>
                                                <div className="flex items-center justify-between p-4 border border-[#E7ECF3] rounded-lg bg-[#FCFCFD]">
                                                    <div>
                                                        <p className="text-sm font-semibold text-[#1E293B]">Enable Downloads</p>
                                                        <p className="text-xs text-[#64748B] mt-1">Allow users to download this resource</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A49B7]"></div>
                                                    </label>
                                                </div>
                                                <div className="flex items-center justify-between p-4 border border-[#E7ECF3] rounded-lg bg-[#FCFCFD]">
                                                    <div>
                                                        <p className="text-sm font-semibold text-[#1E293B]">Feature Resource</p>
                                                        <p className="text-xs text-[#64748B] mt-1">Pin to the top of the resources page</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A49B7]"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* SECTION 4 */}

                                    <div className="border border-[#E7ECF3] rounded-xl overflow-hidden mb-5 bg-white">

                                        <div 
                                            className={`h-[58px] px-5 flex items-center justify-between cursor-pointer ${openSections[4] ? 'bg-[#FCFCFD] border-b border-[#EEF2F7]' : ''}`}
                                            onClick={() => toggleSection(4)}
                                        >

                                            <div className="flex items-center gap-3">

                                                <Tag
                                                    size={18}
                                                    color="#082B63"
                                                />

                                                <span className="text-[15px] font-semibold text-[#082B63]">
                                                    4. Additional Details
                                                </span>

                                            </div>

                                            {openSections[4] ? (
                                                <ChevronUp size={18} color="#082B63" />
                                            ) : (
                                                <ChevronDown size={18} color="#082B63" />
                                            )}

                                        </div>

                                        {openSections[4] && (
                                            <div className="p-6 space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-[#334155] mb-2">Tags</label>
                                                    <input type="text" placeholder="e.g. guide, prayer, youth (comma separated)" className="w-full h-11 px-4 border border-[#D9E2EC] rounded-lg outline-none focus:border-[#0A49B7] text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[#334155] mb-2">Author / Credit</label>
                                                    <input type="text" placeholder="Who created this resource?" className="w-full h-11 px-4 border border-[#D9E2EC] rounded-lg outline-none focus:border-[#0A49B7] text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[#334155] mb-2">Publication Date</label>
                                                    <input type="date" className="w-full h-11 px-4 border border-[#D9E2EC] rounded-lg outline-none focus:border-[#0A49B7] text-sm text-[#64748B]" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}

                                    <div className="flex justify-end gap-4 mt-8">

                                        <button className="h-[50px] px-4 border border-[#D9E2EC] text-sm rounded-lg text-[#111827] font-medium">
                                            Cancel
                                        </button>

                                        <button className="h-[50px] px-4 border border-[#AFC3EA] rounded-lg text-[#082B63] text-sm font-medium bg-white">
                                            Save Draft
                                        </button>

                                        <button 
                                            onClick={() => setShowSuccessModal(true)}
                                            className="h-[50px] px-4 bg-[#082B63] text-sm text-white rounded-lg font-medium shadow-md hover:bg-[#061F4A]"
                                        >
                                            Publish Resource
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* SUCCESS MODAL */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-[400px] p-8 text-center shadow-xl transform transition-all animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 rounded-full bg-[#ECFDF3] flex items-center justify-center mx-auto mb-5">
                            <FaCheckCircle className="text-[#16A34A] text-3xl" />
                        </div>
                        <h3 className="text-[22px] font-bold text-[#1E2A5A] mb-2">Successfully Published!</h3>
                        <p className="text-[#64748B] text-[15px] mb-8 leading-relaxed">
                            Your resource has been published and is now available to users.
                        </p>
                        <button 
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full h-[50px] bg-[#0A49B7] text-white rounded-xl font-medium shadow-md hover:bg-[#082B63] transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
function CategoryCard({ icon, title, count }) {
    return (
        <div className="border border-[#E5EAF1] rounded-xl px-1 py-4 hover:shadow-sm transition cursor-pointer">

            <div className="flex items-center gap-4">

                <div className="w-8 h-8 rounded-full bg-[#F8FAFC] flex items-center justify-center shrink-0">
                    {icon}
                </div>

                <div>
                    <h4 className="font-semibold text-[12px] text-[#1E293B]">
                        {title}
                    </h4>

                    <p className="text-[10px] text-[#64748B] mt-1">
                        {count}
                    </p>
                </div>

            </div>

        </div>
    );
}