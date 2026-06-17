// app/resources/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/src/components/layout/Navbar';
import {
    Search,
    LayoutGrid,
    Heart,
    Users,
    Cross,
    Megaphone,
    HandHeart,
    ShieldCheck,
    Church,
    CalendarDays,
    MapPin,
    Mail,
    ArrowRight,
    HandHelping,
    BookOpen,
    FileText,
    UserRound,
    HeartHandshake,
    Download,
    Folder,
    UsersRound,
    X
} from 'lucide-react';
import { GiDove } from 'react-icons/gi';

// Resource Categories
const categories = [
    { name: "All", icon: LayoutGrid, color: "#5B6EE8" },
    { name: "Prayer", icon: Heart, color: "#D6A646" },
    { name: "Formation", icon: GiDove, color: "#5B6EE8" },
    { name: "Leadership", icon: Users, color: "#D6A646" },
    { name: "Evangelization", icon: Megaphone, color: "#5B6EE8" },
    { name: "Family", icon: HandHeart, color: "#D6A646" },
    { name: "Youth", icon: ShieldCheck, color: "#5B6EE8" },
    { name: "Documents", icon: Church, color: "#D6A646" },
];

// Featured Resources Data
const featuredResources = [
    {
        id: 1,
        title: "Rosary Companion",
        category: "Prayer Guides",
        description: "A complete guide to praying the Rosary and meditating on the mysteries.",
        badgeColor: "bg-blue-100 text-blue-700",
        icon: "🙏",
        image: "/images/resources1.png",
    },
    {
        id: 2,
        title: "Eucharistic Adoration Handbook",
        category: "Formation Materials",
        description: "Resources and reflections for adoration and devotion.",
        badgeColor: "bg-green-100 text-green-700",
        icon: "📖",
        image: "/images/resources2.png",
    },
    {
        id: 3,
        title: "Ministry Leader Toolkit",
        category: "Ministry Leadership",
        description: "Templates, planning guides, and ministry resources.",
        badgeColor: "bg-purple-100 text-purple-700",
        icon: "👥",
        image: "/images/resources3.png",
    },
];

// Resource Library Data
const libraryResources = [
    { name: "Rosary Guide", category: "Prayer", type: "Guide", format: "PDF" },
    { name: "Family Prayer Guide", category: "Family", type: "Guide", format: "PDF" },
    { name: "Leadership Toolkit", category: "Leadership", type: "Toolkit", format: "DOCX" },
    { name: "Eucharistic Adoration Guide", category: "Formation", type: "Guide", format: "PDF" },
    { name: "Youth Ministry Handbook", category: "Youth", type: "Handbook", format: "PDF" },
];

// Resource Library Table Data
const resourceLibraryItems = [
    {
        icon: "📕",
        name: "Rosary Guide: Joyful Mysteries",
        category: "Prayer Guides",
        color: "#2554D7",
        type: "Guide",
        format: "PDF",
        date: "May 18, 2026",
    },
    {
        icon: "📘",
        name: "Ministry Planning Template",
        category: "Ministry Leadership",
        color: "#4F46E5",
        type: "Template",
        format: "DOCX",
        date: "May 15, 2026",
    },
    {
        icon: "📕",
        name: "Family Prayer Guide",
        category: "Family Resources",
        color: "#15803D",
        type: "Guide",
        format: "PDF",
        date: "May 12, 2026",
    },
    {
        icon: "📕",
        name: "Evangelization Pocket Guide",
        category: "Evangelization",
        color: "#EA580C",
        type: "Guide",
        format: "PDF",
        date: "May 10, 2026",
    },
    {
        icon: "📙",
        name: "Youth Retreat Planning Kit",
        category: "Youth Resources",
        color: "#2563EB",
        type: "Kit",
        format: "PPTX",
        date: "May 8, 2026",
    },
];

export default function ResourcesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [libraryFilter, setLibraryFilter] = useState('All Resources');

    // Filter resources based on search and category
    const filteredResources = libraryResources.filter(resource => {
        const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const filteredFeaturedResources = featuredResources.filter(resource => {
        return selectedCategory === 'All' || resource.category === selectedCategory;
    });

    const filteredTableResources = resourceLibraryItems.filter(item => {
        if (libraryFilter === 'All Resources') return true;
        return item.category.toLowerCase().includes(libraryFilter.toLowerCase());
    });

    const categories = [
        {
            name: "Prayer Guides",
            icon: HandHelping,
            description: "Rosaries, novenas, adoration & more",
        },
        {
            name: "Formation Materials",
            icon: BookOpen,
            description: "Study guides, catechesis, courses",
        },
        {
            name: "Ministry Leadership",
            icon: Users,
            description: "Leadership, planning, templates, & tools",
        },
        {
            name: "Evangelization",
            icon: Megaphone,
            description: "Outreach materials, missions, & tools",
        },
        {
            name: "Family Resources",
            icon: HeartHandshake,
            description: "Marriage, parenting, family prayer",
        },
        {
            name: "Youth Resources",
            icon: UserRound,
            description: "Youth ministry, retreats, & more",
        },
        {
            name: "Documents",
            icon: FileText,
            description: "Policies, guides, ministry docs",
        },
        {
            name: "Downloads",
            icon: Download,
            description: "PDFs, templates, flyers, & more",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section - Matching Events Page Style */}
            <section className="bg-white overflow-hidden border-b border-[#EEF2F7]">
                <div className="mx-auto">
                    <div className="grid lg:grid-cols-[55%_45%] items-center">
                        {/* Left */}
                        <div className="px-16 py-12">
                            <h1
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: "62px",
                                    fontWeight: 700,
                                    lineHeight: "1.08",
                                    color: "#082B63",
                                }}
                            >
                                Spiritual Resources
                                <br />& Formation
                            </h1>

                            <p
                                className="mt-6"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "18px",
                                    color: "#31456A",
                                    lineHeight: "1.8",
                                    maxWidth: "780px",
                                }}
                            >
                                Access trusted Catholic resources to deepen your prayer life,
                                grow in faith, strengthen your ministry, and support evangelization
                                efforts across Southeast Pennsylvania.
                            </p>

                            {/* Stats */}
                            <div className="max-w-4xl mt-6">

                                {/* Search Box */}
                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#3B5BA9]"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search guides, documents, prayers, formation materials..."
                                        className="w-full h-[54px] pl-12 pr-4 bg-white border border-[#E6EBF3] rounded-xl shadow-sm text-[14px] outline-none"
                                    />
                                </div>

                                {/* Stats Card */}
                                <div className="mt-4 bg-white border border-[#E6EBF3] rounded-xl px-8 py-5 shadow-sm">
                                    <div className="grid grid-cols-4">

                                        {/* Resources */}
                                        <div className="flex items-center gap-3 border-r border-[#E6EBF3]">
                                            <BookOpen
                                                size={34}
                                                strokeWidth={1.8}
                                                className="text-[#274AA5]"
                                            />

                                            <div>
                                                <h3 className="text-[30px] font-bold leading-none text-[#1E2A5A]">
                                                    150+
                                                </h3>

                                                <p className="text-[12px] font-medium text-[#5B6785] mt-1">
                                                    Resources
                                                </p>
                                            </div>
                                        </div>

                                        {/* Prayer Guides */}
                                        <div className="flex items-center gap-3 pl-6 border-r border-[#E6EBF3]">
                                            <HandHelping
                                                size={34}
                                                strokeWidth={1.8}
                                                className="text-[#274AA5]"
                                            />

                                            <div>
                                                <h3 className="text-[30px] font-bold leading-none text-[#1E2A5A]">
                                                    25
                                                </h3>

                                                <p className="text-[12px] font-medium text-[#5B6785] mt-1">
                                                    Prayer Guides
                                                </p>
                                            </div>
                                        </div>

                                        {/* Documents */}
                                        <div className="flex items-center gap-3 pl-6 border-r border-[#E6EBF3]">
                                            <FileText
                                                size={34}
                                                strokeWidth={1.8}
                                                className="text-[#274AA5]"
                                            />

                                            <div>
                                                <h3 className="text-[30px] font-bold leading-none text-[#1E2A5A]">
                                                    50
                                                </h3>

                                                <p className="text-[12px] font-medium text-[#5B6785] mt-1">
                                                    Documents
                                                </p>
                                            </div>
                                        </div>

                                        {/* Categories */}
                                        <div className="flex items-center gap-3 pl-6">
                                            <Folder
                                                size={34}
                                                strokeWidth={1.8}
                                                className="text-[#274AA5]"
                                            />

                                            <div>
                                                <h3 className="text-[30px] font-bold leading-none text-[#1E2A5A]">
                                                    10
                                                </h3>

                                                <p className="text-[12px] font-medium text-[#5B6785] mt-1">
                                                    Resource Categories
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="relative h-[520px]">
                            <Image
                                src="/images/bible_cathedral.png"
                                alt="Catholic Resource Library"
                                fill
                                priority
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Search and Filter Bar - Matching Events Page */}
            <section className="bg-white mt-8">
                <div className="mx-auto px-28">

                    {/* Heading */}
                    <div className="flex justify-between items-center mb-5">
                        <h2
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "32px",
                                fontWeight: 700,
                                color: "#082B63",
                            }}
                        >
                            Browse by Category
                        </h2>
                        {selectedCategory !== 'All' && (
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className="flex items-center gap-1.5 text-sm font-semibold text-[#6B7280] hover:text-[#082B63] transition-colors bg-[#F8FAFC] px-4 py-2 rounded-full border border-[#E2E8F0] hover:border-[#CBD5E1]"
                            >
                                <X size={16} />
                                Clear Filter
                            </button>
                        )}
                    </div>

                    {/* Search */}
                    {/* <div className="relative mb-8">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
      />

      <input
        type="text"
        placeholder="Search guides, documents, prayers, formation materials..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-[52px] pl-12 pr-4 border border-[#E5EAF2] rounded-xl outline-none text-[14px]"
      />
    </div> */}

                    {/* Category Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">

                        {categories.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setSelectedCategory(selectedCategory === item.name ? 'All' : item.name)}
                                className={`
            group
            border
            rounded-xl
            p-4
            text-center
            transition-all
            hover:shadow-md
            hover:border-[#2563EB]
            min-h-[135px]
            ${selectedCategory === item.name
                                        ? "border-[#2563EB] bg-[#F8FAFF]"
                                        : "border-[#E5EAF2] bg-white"
                                    }
          `}
                            >
                                <item.icon
                                    size={38}
                                    strokeWidth={1.8}
                                    className="mx-auto mb-3 text-[#2563EB]"
                                />

                                <h3
                                    className="leading-tight"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        color: "#1E2A5A",
                                    }}
                                >
                                    {item.name}
                                </h3>

                                <p
                                    className="mt-2 leading-relaxed"
                                    style={{
                                        fontSize: "11px",
                                        color: "#6B7280",
                                    }}
                                >
                                    {item.description}
                                </p>
                            </button>
                        ))}
                    </div>

                </div>
            </section>

            {/* Featured Resources - Matching Events Page Style */}
            <section className="mx-auto px-28 py-8">
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-serif text-2xl font-bold text-[#082B63]">Featured Resources</h2>
                        <Link href="#" className="text-[#082B63] font-medium hover:underline text-sm flex items-center gap-1">
                            View All Resources <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {filteredFeaturedResources.length > 0 ? (
                            filteredFeaturedResources.map((resource, index) => (
                                <div key={resource.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col">
                                    <div className="h-50 relative flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] flex items-center justify-center">
                                        <Image
                                            src={resource.image}
                                            alt={resource.title}
                                            fill
                                            className="object-cover"
                                        /> </div>
                                    <div className="p-5">
                                        <span className={`${resource.badgeColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                                            {resource.category}
                                        </span>
                                        <h3 className="font-bold text-lg text-[#082B63] mt-3">{resource.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                                        <button className="mt-3 text-[#082B63] font-semibold text-sm hover:underline">
                                            Download PDF →
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 py-12 text-center text-[#6B7280] bg-[#F8FAFF] rounded-xl border border-dashed border-[#E5EAF2]">
                                No featured resources found for "{selectedCategory}".
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Resource Library Table - Matching Events Page Calendar Style */}
<section className="mx-auto px-28 py-8">
  <div className="grid lg:grid-cols-[2.3fr_1fr] gap-6">

    {/* LEFT SIDE */}
    <div className="bg-white border border-[#E8EDF5] rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-[34px] font-bold text-[#1E2A5A]">
          Resource Library
        </h2>

        <button className="text-[#2554D7] font-semibold text-sm flex items-center gap-2">
          View full library →
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        {[
          "All Resources",
          "Prayer",
          "Formation",
          "Leadership",
          "Family",
          "Youth",
          "Documents",
          "Downloads",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setLibraryFilter(item)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold border transition
              ${
                item === libraryFilter
                  ? "bg-[#082B63] text-white border-[#082B63]"
                  : "bg-white border-[#E8EDF5] text-[#243B63] hover:bg-gray-50"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#EEF2F7]">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FAFBFC] border-b border-[#EEF2F7]">
              <th className="text-left px-6 py-4 text-xs font-bold text-[#64748B]">
                RESOURCE
              </th>
              <th className="text-left px-4 py-4 text-xs font-bold text-[#64748B]">
                CATEGORY
              </th>
              <th className="text-left px-4 py-4 text-xs font-bold text-[#64748B]">
                TYPE
              </th>
              <th className="text-left px-4 py-4 text-xs font-bold text-[#64748B]">
                FORMAT
              </th>
              <th className="text-left px-4 py-4 text-xs font-bold text-[#64748B]">
                ADDED
              </th>
              <th className="w-12"></th>
            </tr>
          </thead>

          <tbody>
            {filteredTableResources.length > 0 ? (
                filteredTableResources.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#EEF2F7] last:border-0 hover:bg-[#FAFBFC]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium text-[#1F2937]">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td
                      className="px-4 py-4 font-semibold text-sm"
                      style={{ color: item.color }}
                    >
                      {item.category}
                    </td>

                    <td className="px-4 py-4 text-[#475569] text-sm">
                      {item.type}
                    </td>

                    <td className="px-4 py-4 text-[#475569] text-sm">
                      {item.format}
                    </td>

                    <td className="px-4 py-4 text-[#475569] text-sm">
                      {item.date}
                    </td>

                    <td className="px-4 py-4 text-[#64748B] text-lg cursor-pointer">
                      ⬇
                    </td>
                  </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#6B7280]">
                        No resources found for "{libraryFilter}".
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="mt-5 text-[#2554D7] font-semibold text-sm flex items-center gap-2">
        View all resources →
      </button>
    </div>

    {/* RIGHT SIDEBAR */}
    <div className="bg-[#F7F9FC] border border-[#E8EDF5] rounded-2xl p-6">

      <h3 className="font-serif text-[32px] leading-tight font-bold text-[#1E2A5A]">
        Grow in Faith.
        <br />
        Grow in Service.
      </h3>

      <p className="mt-3 text-[15px] text-[#6B7280] leading-relaxed">
        Recommended resources for every stage of your faith journey.
      </p>

      <div className="space-y-4 mt-6">

        <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-[#EEF2F7]">
          <div className="flex gap-4">
            <BookOpen className="text-[#243B7A]" size={28} />
            <div>
              <h4 className="font-bold text-[#1E2A5A]">
                Ministry Leaders
              </h4>
              <p className="text-sm text-[#6B7280]">
                Leadership handbooks, planning templates and best practices
              </p>
            </div>
          </div>
          <span className="text-[#2554D7] text-xl">›</span>
        </div>

        <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-[#EEF2F7]">
          <div className="flex gap-4">
            <Users className="text-[#243B7A]" size={28} />
            <div>
              <h4 className="font-bold text-[#1E2A5A]">
                Families
              </h4>
              <p className="text-sm text-[#6B7280]">
                Family prayer, marriage enrichment and parenting resources
              </p>
            </div>
          </div>
          <span className="text-[#2554D7] text-xl">›</span>
        </div>

        <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-[#EEF2F7]">
          <div className="flex gap-4">
            <UsersRound className="text-[#243B7A]" size={28} />
            <div>
              <h4 className="font-bold text-[#1E2A5A]">
                Youth
              </h4>
              <p className="text-sm text-[#6B7280]">
                Retreat materials, faith formation guides and youth ministry tools
              </p>
            </div>
          </div>
          <span className="text-[#2554D7] text-xl">›</span>
        </div>

      </div>
    </div>

  </div>
</section>

            {/* Working Together Section - Matching Events Page */}
<section className="mx-auto px-28 pb-8">
  <h2 className="font-serif text-[34px] font-bold text-[#1E2A5A] mb-5">
    Download Center
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

    {/* Card 1 */}
    <div className="bg-white border border-[#E8EDF5] rounded-2xl p-6 flex items-center gap-5 hover:shadow-sm transition">
      <div className="w-14 h-14 rounded-full bg-[#F4F7FC] flex items-center justify-center shrink-0">
        <Download size={28} color="#243B7A" />
      </div>

      <div>
        <h3 className="font-bold text-[18px] text-[#1E2A5A]">
          Most Downloaded
        </h3>

        <p className="text-[14px] text-[#6B7280] mt-2 leading-relaxed">
          Top resources our users are downloading
        </p>

        <button className="mt-5 text-[#2554D7] font-semibold text-[14px] flex items-center gap-2">
          View resources →
        </button>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white border border-[#E8EDF5] rounded-2xl p-6 flex items-center gap-5 hover:shadow-sm transition">
      <div className="w-14 h-14 rounded-full bg-[#F4F7FC] flex items-center justify-center shrink-0">
        <CalendarDays size={28} color="#243B7A" />
      </div>

      <div>
        <h3 className="font-bold text-[18px] text-[#1E2A5A]">
          Recently Added
        </h3>

        <p className="text-[14px] text-[#6B7280] mt-2 leading-relaxed">
          Latest resources and formation materials
        </p>

        <button className="mt-5 text-[#2554D7] font-semibold text-[14px] flex items-center gap-2">
          View resources →
        </button>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-white border border-[#E8EDF5] rounded-2xl p-6 flex items-center gap-5 hover:shadow-sm transition">
      <div className="w-14 h-14 rounded-full bg-[#F4F7FC] flex items-center justify-center shrink-0">
        <BookOpen size={28} color="#243B7A" />
      </div>

      <div>
        <h3 className="font-bold text-[18px] text-[#1E2A5A]">
          Popular Prayer Guides
        </h3>

        <p className="text-[14px] text-[#6B7280] mt-2 leading-relaxed">
          Rosaries, novenas, litanies and prayer booklets
        </p>

        <button className="mt-5 text-[#2554D7] font-semibold text-[14px] flex items-center gap-2">
          View resources →
        </button>
      </div>
    </div>

    {/* Card 4 */}
    <div className="bg-white border border-[#E8EDF5] rounded-2xl p-6 flex items-center gap-5 hover:shadow-sm transition">
      <div className="w-14 h-14 rounded-full bg-[#F4F7FC] flex items-center justify-center shrink-0">
        <Users size={28} color="#243B7A" />
      </div>

      <div>
        <h3 className="font-bold text-[18px] text-[#1E2A5A]">
          Leader Resources
        </h3>

        <p className="text-[14px] text-[#6B7280] mt-2 leading-relaxed">
          Essential tools for ministry leaders
        </p>

        <button className="mt-5 text-[#2554D7] font-semibold text-[14px] flex items-center gap-2">
          View resources →
        </button>
      </div>
    </div>

  </div>
</section>

            {/* Newsletter Section - Matching Events Page */}
            <section className="mx-auto px-28 pb-16">
                <div
                    className="rounded-2xl px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm"
                    style={{
                        background: "#062B6F",
                        border: "1px solid #17458F",
                    }}
                >
                    {/* Left */}
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                            <Mail size={34} strokeWidth={1.8} color="#062B6F" />
                        </div>
                        <div>
                            <h3 className="font-serif text-[34px] font-bold text-white leading-tight">
                                Stay Connected
                            </h3>
                            <p className="mt-1 text-sm text-[#D7E3FF] leading-relaxed">
                                Receive new prayer guides, formation materials,
                                <br />and ministry resources.
                            </p>
                        </div>
                    </div>

                    {/* Right */}
                    <div
                        className="flex overflow-hidden rounded-xl bg-white border border-[#E8EDF5]"
                        style={{ width: "430px", height: "52px" }}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-5 outline-none text-sm"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                        <button
                            className="px-8 font-semibold text-white transition"
                            style={{
                                background: "#F4A000",
                                fontFamily: "'Inter', sans-serif",
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
            
        </div>
    );
}