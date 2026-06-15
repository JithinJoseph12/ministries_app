"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  ChevronLeft, 
  ChevronRight,
  LayoutGrid,
  Table as TableIcon,
  Heart,
  Users,
  Cross,
  Megaphone,
  HandHeart,
  ShieldCheck,
  Church,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  Building2,
  User,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { GiDove } from "react-icons/gi";

export default function MinistriesPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState('table');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedStatus, setSelectedStatus] = useState('All Status');

    const ministries = [
        { id: 1, name: "A Baby's Breath", category: "Pro-Life", leader: "George Smith", location: "Philadelphia, PA", events: 5, status: "Active", icon: <Heart size={24} />, iconBg: "bg-rose-100", iconColor: "text-rose-600" },
        { id: 2, name: "House of God's Light", category: "Evangelization", leader: "Michael Thomas", location: "Norristown, PA", events: 4, status: "Active", icon: <Megaphone size={24} />, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
        { id: 3, name: "Life Runners", category: "Pro-Life", leader: "John Martin", location: "Pennsylvania", events: 8, status: "Pending", icon: <Heart size={24} />, iconBg: "bg-rose-100", iconColor: "text-rose-600" },
        { id: 4, name: "Gianna Center", category: "Family", leader: "Sarah Williams", location: "Philadelphia, PA", events: 6, status: "Active", icon: <Users size={24} />, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
        { id: 5, name: "Militia of Immaculata", category: "Men", leader: "David Miller", location: "Malvern, PA", events: 3, status: "Active", icon: <ShieldCheck size={24} />, iconBg: "bg-indigo-100", iconColor: "text-indigo-600" },
        { id: 6, name: "Society of St. Vincent", category: "Mission", leader: "Robert Brown", location: "Philadelphia, PA", events: 7, status: "Active", icon: <HandHeart size={24} />, iconBg: "bg-teal-100", iconColor: "text-teal-600" },
    ];

    const getStatusColor = (status) => {
        return status === 'Active' 
            ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
            : 'bg-amber-100 text-amber-700 border-amber-200';
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'Pro-Life': <Heart size={14} />,
            'Youth': <GiDove size={14} />,
            'Family': <Users size={14} />,
            'Evangelization': <Megaphone size={14} />,
            'Men': <ShieldCheck size={14} />,
            'Mission': <Church size={14} />,
        };
        return icons[category] || <Cross size={14} />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="p-8 lg:p-10">
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1 h-10 bg-gradient-to-b from-[#D6A646] to-[#082B63] rounded-full"></div>
                                <p className="text-sm font-semibold text-[#D6A646] uppercase tracking-wider">Ministries Directory</p>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-2 tracking-tight bg-gradient-to-r from-[#082B63] to-[#1E4AA8] bg-clip-text text-transparent">
                                Participating Ministries
                            </h1>
                            <p className="text-slate-500 mt-4 text-lg max-w-2xl">
                                Manage ministry profiles, contacts, and participation status across Southeast Pennsylvania.
                            </p>
                        </div>
                        <button 
                            onClick={() => router.push('/dashboard/ministries/add')}
                            className="bg-gradient-to-r from-[#082B63] to-[#1E4AA8] hover:from-[#0B3578] hover:to-[#2563B5] transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl flex items-center gap-3 transform hover:-translate-y-0.5"
                        >
                            <Plus size={20} />
                            Add New Ministry
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#D6A646]/30 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Total Ministries</p>
                                <h3 className="text-4xl font-bold mt-2 text-slate-900">20</h3>
                                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                    <TrendingUp size={12} /> +12% this year
                                </p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-[#082B63]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Building2 size={28} className="text-[#082B63]" />
                            </div>
                        </div>
                    </div>

                    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#D6A646]/30 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Active</p>
                                <h3 className="text-4xl font-bold mt-2 text-emerald-600">18</h3>
                                <p className="text-xs text-slate-500 mt-2">90% of total</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <CheckCircle size={28} className="text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#D6A646]/30 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Pending</p>
                                <h3 className="text-4xl font-bold mt-2 text-amber-600">2</h3>
                                <p className="text-xs text-slate-500 mt-2">Awaiting review</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Clock size={28} className="text-amber-600" />
                            </div>
                        </div>
                    </div>

                    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#D6A646]/30 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Categories</p>
                                <h3 className="text-4xl font-bold mt-2 text-slate-900">8</h3>
                                <p className="text-xs text-slate-500 mt-2">Across all ministries</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <LayoutGrid size={28} className="text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 mb-8 backdrop-blur-sm">
                    <div className="grid lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-5 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search ministries by name, location, or leader..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#D6A646] focus:ring-2 focus:ring-[#D6A646]/20 transition-all bg-slate-50/50"
                            />
                        </div>
                        <div className="lg:col-span-3">
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#D6A646] bg-slate-50/50 text-slate-700 cursor-pointer transition-all"
                            >
                                <option>All Categories</option>
                                <option>Pro-Life</option>
                                <option>Youth</option>
                                <option>Family</option>
                                <option>Evangelization</option>
                                <option>Men</option>
                                <option>Mission</option>
                            </select>
                        </div>
                        <div className="lg:col-span-2">
                            <select 
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#D6A646] bg-slate-50/50 text-slate-700 cursor-pointer transition-all"
                            >
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Pending</option>
                            </select>
                        </div>
                        <div className="lg:col-span-2">
                            <button className="w-full bg-gradient-to-r from-[#082B63] to-[#1E4AA8] hover:from-[#0B3578] hover:to-[#2563B5] text-white rounded-xl py-3.5 font-semibold transition-all flex items-center justify-center gap-2 shadow-md">
                                <Filter size={18} />
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* View Toggle & Content */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Building2 size={22} className="text-[#082B63]" />
                            Ministry Directory
                        </h2>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setViewMode('table')}
                                className={`border rounded-xl px-4 py-2 transition-all font-medium text-sm flex items-center gap-2 ${
                                    viewMode === 'table' 
                                        ? 'bg-[#082B63] text-white border-[#082B63] shadow-md' 
                                        : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                <TableIcon size={16} />
                                Table
                            </button>
                            <button 
                                onClick={() => setViewMode('cards')}
                                className={`border rounded-xl px-4 py-2 transition-all font-medium text-sm flex items-center gap-2 ${
                                    viewMode === 'cards' 
                                        ? 'bg-[#082B63] text-white border-[#082B63] shadow-md' 
                                        : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                <LayoutGrid size={16} />
                                Cards
                            </button>
                        </div>
                    </div>

                    {viewMode === 'table' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ministry</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Leader</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Events</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ministries.map((ministry, index) => (
                                        <tr key={ministry.id} className={`border-t border-slate-100 hover:bg-slate-50/80 transition-colors group ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-xl ${ministry.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                        <div className={ministry.iconColor}>{ministry.icon}</div>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">{ministry.name}</p>
                                                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                            <MapPin size={10} /> {ministry.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                                                    {getCategoryIcon(ministry.category)}
                                                    {ministry.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <User size={14} className="text-slate-400" />
                                                    <span className="font-medium text-slate-700">{ministry.leader}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-slate-400" />
                                                    <span className="font-semibold text-slate-700">{ministry.events} events</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ministry.status)} border`}>
                                                    {ministry.status === 'Active' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                    {ministry.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all font-medium text-sm flex items-center gap-1">
                                                        <Eye size={14} /> View
                                                    </button>
                                                    <button className="bg-[#082B63] hover:bg-[#0B3578] transition-all text-white px-3 py-1.5 rounded-lg font-medium text-sm flex items-center gap-1 shadow-sm">
                                                        <Edit size={14} /> Edit
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {ministries.map((ministry) => (
                                <div key={ministry.id} className="group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-xl hover:border-[#D6A646]/30 transition-all duration-300">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-14 h-14 rounded-2xl ${ministry.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <div className={`${ministry.iconColor}`}>{ministry.icon}</div>
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(ministry.status)} border`}>
                                            {ministry.status === 'Active' ? <CheckCircle size={10} /> : <Clock size={10} />}
                                            {ministry.status}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 mb-1">{ministry.name}</h3>
                                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-3">
                                        <MapPin size={12} /> {ministry.location}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600">
                                            {getCategoryIcon(ministry.category)}
                                            {ministry.category}
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600">
                                            <Calendar size={10} /> {ministry.events} Events
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-slate-400" />
                                            <span className="text-sm text-slate-600">{ministry.leader}</span>
                                        </div>
                                        <button className="text-[#082B63] font-semibold text-sm hover:gap-2 transition-all inline-flex items-center gap-1 group-hover:gap-2">
                                            View Details <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="px-6 py-5 border-t border-slate-100 flex justify-between items-center bg-slate-50/30">
                        <p className="text-sm text-slate-500 font-medium">Showing 1-{ministries.length} of {ministries.length} ministries</p>
                        <div className="flex gap-2">
                            <button className="border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-all px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-1">
                                <ChevronLeft size={16} /> Previous
                            </button>
                            <button className="bg-gradient-to-r from-[#082B63] to-[#1E4AA8] text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-md">1</button>
                            <button className="border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-all px-4 py-2 rounded-xl font-semibold text-sm">2</button>
                            <button className="border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-all px-4 py-2 rounded-xl font-semibold text-sm">3</button>
                            <button className="border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-all px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-1">
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}