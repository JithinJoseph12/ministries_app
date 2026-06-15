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
  Calendar as CalendarIcon,
  List,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Heart,
  Cross,
  Megaphone,
  HandHeart,
  Church,
  TrendingUp,
  AlertCircle,
  Upload,
  Download,
  CalendarDays,
  ArrowRight,
  LayoutGrid,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { GiDove } from "react-icons/gi";

export default function EventsPage() {
    const router = useRouter();
    const [viewType, setViewType] = useState('calendar');
    const [selectedMonth, setSelectedMonth] = useState(4); // May = 4
    const [selectedYear, setSelectedYear] = useState(2026);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedMinistry, setSelectedMinistry] = useState('All Ministries');
    const [selectedStatus, setSelectedStatus] = useState('All Status');

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const events = [
        { id: 1, title: "Eucharistic Miracles Exhibit", ministry: "MRH – St. Carlo Shrine", date: "May 24 – Jun 15, 2026", startDate: "2026-05-24", location: "Malvern, PA", category: "Faith Formation", status: "Published", icon: <Cross size={20} /> },
        { id: 2, title: "Men Through Mary Retreat", ministry: "Mid-Atlantic Knights", date: "May 30, 2026", startDate: "2026-05-30", location: "Malvern, PA", category: "Men", status: "Published", icon: <Users size={20} /> },
        { id: 3, title: "Family Prayer Evening", ministry: "Militia of Immaculata", date: "Jun 3, 2026", startDate: "2026-06-03", location: "St. Carlos Center", category: "Family", status: "Published", icon: <Heart size={20} /> },
        { id: 4, title: "Pro-Life Prayer Vigil", ministry: "Life Runners", date: "Jun 7, 2026", startDate: "2026-06-07", location: "Philadelphia, PA", category: "Pro-Life", status: "Published", icon: <Heart size={20} /> },
        { id: 5, title: "Formation Night", ministry: "House of God's Light", date: "May 28, 2026", startDate: "2026-05-28", location: "Norristown, PA", category: "Faith Formation", status: "Draft", icon: <Cross size={20} /> },
        { id: 6, title: "Youth Rally", ministry: "Bishop Shanahan HS", date: "Jun 12, 2026", startDate: "2026-06-12", location: "Downingtown, PA", category: "Youth", status: "Published", icon: <GiDove size={20} /> },
        { id: 7, title: "Outreach Food Drive", ministry: "St. Vincent de Paul", date: "Jun 14, 2026", startDate: "2026-06-14", location: "Philadelphia, PA", category: "Outreach", status: "Draft", icon: <HandHeart size={20} /> },
    ];

    const upcomingEvents = events.filter(e => e.status === 'Published').slice(0, 5);
    const totalEvents = events.length;
    const upcomingCount = events.filter(e => new Date(e.startDate) > new Date() && e.status === 'Published').length;
    const draftCount = events.filter(e => e.status === 'Draft').length;
    const completedCount = events.filter(e => new Date(e.startDate) < new Date() && e.status === 'Published').length;

    const getStatusColor = (status) => {
        return status === 'Published' 
            ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
            : 'bg-amber-100 text-amber-700 border-amber-200';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Faith Formation': 'bg-purple-100 text-purple-700 border-purple-200',
            'Family': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'Pro-Life': 'bg-rose-100 text-rose-700 border-rose-200',
            'Men': 'bg-indigo-100 text-indigo-700 border-indigo-200',
            'Youth': 'bg-cyan-100 text-cyan-700 border-cyan-200',
            'Outreach': 'bg-teal-100 text-teal-700 border-teal-200',
        };
        return colors[category] || 'bg-slate-100 text-slate-700 border-slate-200';
    };

    // Calendar days generation for May 2026
    const getCalendarDays = () => {
        const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const days = [];
        
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            const hasEvent = events.some(e => new Date(e.startDate).getDate() === i && 
                                              new Date(e.startDate).getMonth() === selectedMonth);
            days.push({ day: i, hasEvent });
        }
        
        return days;
    };

    const calendarDays = getCalendarDays();
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="p-8 lg:p-10">
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1 h-10 bg-gradient-to-b from-[#D6A646] to-[#082B63] rounded-full"></div>
                                <p className="text-sm font-semibold text-[#D6A646] uppercase tracking-wider">Events / Calendar Management</p>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-2 tracking-tight bg-gradient-to-r from-[#082B63] to-[#1E4AA8] bg-clip-text text-transparent">
                                Events
                            </h1>
                            <p className="text-slate-500 mt-4 text-lg max-w-2xl">
                                Manage all ministry events, scheduling and publication status across Southeast Pennsylvania.
                            </p>
                        </div>
                        <button 
                            onClick={() => router.push('/dashboard/events/add')}
                            className="bg-gradient-to-r from-[#082B63] to-[#1E4AA8] hover:from-[#0B3578] hover:to-[#2563B5] transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl flex items-center gap-3 transform hover:-translate-y-0.5"
                        >
                            <Plus size={20} />
                            Add New Event
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#D6A646]/30 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Total Events</p>
                                <h3 className="text-4xl font-bold mt-2 text-slate-900">{totalEvents}</h3>
                                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                    <TrendingUp size={12} /> +15% this month
                                </p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-[#082B63]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <CalendarDays size={28} className="text-[#082B63]" />
                            </div>
                        </div>
                    </div>

                    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#D6A646]/30 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Upcoming</p>
                                <h3 className="text-4xl font-bold mt-2 text-emerald-600">{upcomingCount}</h3>
                                <p className="text-xs text-slate-500 mt-2">Next 30 days</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <CalendarIcon size={28} className="text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#D6A646]/30 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Drafts</p>
                                <h3 className="text-4xl font-bold mt-2 text-amber-600">{draftCount}</h3>
                                <p className="text-xs text-slate-500 mt-2">Need review</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Clock size={28} className="text-amber-600" />
                            </div>
                        </div>
                    </div>

                    <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#D6A646]/30 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Completed</p>
                                <h3 className="text-4xl font-bold mt-2 text-slate-900">{completedCount}</h3>
                                <p className="text-xs text-slate-500 mt-2">Past events</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <CheckCircle size={28} className="text-slate-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 mb-8 backdrop-blur-sm">
                    <div className="grid lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-4 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                            <input 
                                type="text"
                                placeholder="Search events by title, ministry, or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#D6A646] focus:ring-2 focus:ring-[#D6A646]/20 transition-all bg-slate-50/50"
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#D6A646] bg-slate-50/50 text-slate-700 cursor-pointer transition-all"
                            >
                                <option>All Categories</option>
                                <option>Faith Formation</option>
                                <option>Family</option>
                                <option>Pro-Life</option>
                                <option>Youth</option>
                                <option>Men</option>
                                <option>Outreach</option>
                            </select>
                        </div>
                        <div className="lg:col-span-2">
                            <select 
                                value={selectedMinistry}
                                onChange={(e) => setSelectedMinistry(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#D6A646] bg-slate-50/50 text-slate-700 cursor-pointer transition-all"
                            >
                                <option>All Ministries</option>
                                <option>MRH – St. Carlo Shrine</option>
                                <option>Mid-Atlantic Knights</option>
                                <option>Militia of Immaculata</option>
                                <option>Life Runners</option>
                            </select>
                        </div>
                        <div className="lg:col-span-2">
                            <select 
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#D6A646] bg-slate-50/50 text-slate-700 cursor-pointer transition-all"
                            >
                                <option>All Status</option>
                                <option>Published</option>
                                <option>Draft</option>
                            </select>
                        </div>
                        <div className="lg:col-span-2 flex gap-2">
                            <button 
                                onClick={() => setViewType('calendar')}
                                className={`flex-1 rounded-xl py-3.5 font-semibold transition-all flex items-center justify-center gap-2 ${
                                    viewType === 'calendar' 
                                        ? 'bg-gradient-to-r from-[#082B63] to-[#1E4AA8] text-white shadow-md' 
                                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <CalendarIcon size={18} />
                                Calendar
                            </button>
                            <button 
                                onClick={() => setViewType('list')}
                                className={`flex-1 rounded-xl py-3.5 font-semibold transition-all flex items-center justify-center gap-2 ${
                                    viewType === 'list' 
                                        ? 'bg-gradient-to-r from-[#082B63] to-[#1E4AA8] text-white shadow-md' 
                                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <List size={18} />
                                List
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-6">
                    {/* Left Column - Calendar/Events List */}
                    <div className="lg:col-span-8">
                        {viewType === 'calendar' ? (
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                        <CalendarIcon size={24} className="text-[#082B63]" />
                                        {monthNames[selectedMonth]} {selectedYear}
                                    </h2>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setSelectedMonth(prev => prev === 0 ? 11 : prev - 1)}
                                            className="p-2 rounded-lg hover:bg-slate-100 transition"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button 
                                            onClick={() => setSelectedMonth(prev => prev === 11 ? 0 : prev + 1)}
                                            className="p-2 rounded-lg hover:bg-slate-100 transition"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-2 text-center mb-3">
                                    {weekDays.map(day => (
                                        <div key={day} className="text-xs font-bold text-slate-500 py-2 uppercase tracking-wider">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-2">
                                    {calendarDays.map((day, idx) => (
                                        <div
                                            key={idx}
                                            className={`border rounded-xl min-h-[100px] p-2 transition-all ${
                                                day?.hasEvent 
                                                    ? 'border-[#D6A646]/40 bg-amber-50/30 hover:shadow-md' 
                                                    : 'border-slate-200 bg-white hover:bg-slate-50'
                                            }`}
                                        >
                                            {day && (
                                                <>
                                                    <span className={`text-sm font-semibold ${
                                                        day.hasEvent ? 'text-[#D6A646]' : 'text-slate-600'
                                                    }`}>
                                                        {day.day}
                                                    </span>
                                                    {day.hasEvent && (
                                                        <div className="mt-1">
                                                            <div className="w-2 h-2 bg-[#D6A646] rounded-full"></div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Legend */}
                                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#D6A646]"></div>
                                        <span className="text-xs text-slate-600">Events scheduled</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                        <span className="text-xs text-slate-600">Faith Formation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                        <span className="text-xs text-slate-600">Pro-Life</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                        <span className="text-xs text-slate-600">Men</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/30">
                                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        <LayoutGrid size={22} className="text-[#082B63]" />
                                        Event Directory
                                    </h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Event</th>
                                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ministry</th>
                                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.map((event, index) => (
                                                <tr key={event.id} className={`border-t border-slate-100 hover:bg-slate-50/80 transition-colors group ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-xl ${event.category === 'Faith Formation' ? 'bg-purple-100' : 'bg-slate-100'} flex items-center justify-center`}>
                                                                {event.icon}
                                                            </div>
                                                            <span className="font-bold text-slate-900">{event.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-slate-700">{event.ministry}</td>
                                                    <td className="px-6 py-4 font-medium text-slate-700">{event.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)} border`}>
                                                            {event.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)} border`}>
                                                            {event.status === 'Published' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                            {event.status}
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

                                {/* Pagination */}
                                <div className="px-6 py-5 border-t border-slate-100 flex justify-between items-center bg-slate-50/30">
                                    <p className="text-sm text-slate-500 font-medium">Showing 1-{events.length} of {totalEvents} events</p>
                                    <div className="flex gap-2">
                                        <button className="border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-all px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-1">
                                            <ChevronLeft size={16} /> Previous
                                        </button>
                                        <button className="bg-gradient-to-r from-[#082B63] to-[#1E4AA8] text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-md">1</button>
                                        <button className="border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-all px-4 py-2 rounded-xl font-semibold text-sm">2</button>
                                        <button className="border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-all px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-1">
                                            Next <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Upcoming Events Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="font-bold text-xl mb-4 text-slate-900 flex items-center gap-2">
                                <CalendarIcon size={20} className="text-[#D6A646]" />
                                Upcoming This Week
                            </h3>
                            <div className="space-y-3">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="group p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-200">
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${event.category === 'Faith Formation' ? 'bg-purple-100' : 'bg-slate-100'}`}>
                                                {event.icon}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-900 group-hover:text-[#082B63] transition-colors">{event.title}</p>
                                                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                                    <MapPin size={12} /> {event.location}
                                                </p>
                                                <p className="text-xs text-slate-400 mt-1">{event.date}</p>
                                            </div>
                                            <ArrowRight size={16} className="text-slate-300 group-hover:text-[#D6A646] transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="font-bold text-xl mb-4 text-slate-900 flex items-center gap-2">
                                <LayoutGrid size={20} className="text-[#D6A646]" />
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={() => router.push('/dashboard/events/add')}
                                    className="col-span-2 w-full bg-gradient-to-r from-[#082B63] to-[#1E4AA8] hover:from-[#0B3578] hover:to-[#2563B5] transition-all text-white rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    <Plus size={18} /> Add New Event
                                </button>
                                <button className="border border-slate-200 hover:bg-slate-50 hover:border-[#082B63]/20 transition-all text-slate-700 rounded-xl py-3 px-2 font-semibold flex flex-col items-center justify-center gap-2 group shadow-sm hover:shadow-md">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#082B63]/5">
                                        <Upload size={18} className="text-slate-500 group-hover:text-[#082B63]" />
                                    </div>
                                    <span className="text-xs">Import</span>
                                </button>
                                <button className="border border-slate-200 hover:bg-slate-50 hover:border-[#082B63]/20 transition-all text-slate-700 rounded-xl py-3 px-2 font-semibold flex flex-col items-center justify-center gap-2 group shadow-sm hover:shadow-md">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#082B63]/5">
                                        <Download size={18} className="text-slate-500 group-hover:text-[#082B63]" />
                                    </div>
                                    <span className="text-xs">Export</span>
                                </button>
                            </div>
                        </div>

                        {/* Calendar Health Card */}
                        {/* <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="font-bold text-xl mb-4 text-slate-900 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={20} className="text-emerald-600" />
                                    Calendar Health
                                </div>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">Optimal</span>
                            </h3>
                            <div className="flex items-start gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                                    <CheckCircle size={16} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-emerald-800 font-bold text-sm">No conflicts detected</p>
                                    <p className="text-xs font-medium text-emerald-600/80 mt-1">All scheduled events are conflict free.</p>
                                </div>
                            </div>
                            <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <CalendarIcon size={14} className="text-slate-400" /> Events this month
                                    </span>
                                    <span className="font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{events.length}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <Clock size={14} className="text-amber-400" /> Pending reviews
                                    </span>
                                    <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">{draftCount}</span>
                                </div>
                            </div>
                        </div> */}

                        {/* Categories Overview */}
                        {/* <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="font-bold text-xl mb-4 text-slate-900 flex items-center gap-2">
                                <Filter size={20} className="text-[#D6A646]" />
                                Categories
                            </h3>
                            <div className="space-y-3">
                                {['Faith Formation', 'Family', 'Pro-Life', 'Youth', 'Men', 'Outreach'].map((cat) => (
                                    <div key={cat} className="flex justify-between items-center">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(cat)} border`}>
                                            {cat}
                                        </span>
                                        <span className="text-sm font-semibold text-slate-600">
                                            {events.filter(e => e.category === cat).length}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}