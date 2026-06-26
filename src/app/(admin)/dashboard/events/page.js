"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
    MoreHorizontal,
    ChevronDown,
    X,
    Target,
    FileText,
    Globe,
    Mail,
    Info
} from 'lucide-react';
import { GiDove } from "react-icons/gi";

export default function EventsPage() {
    const router = useRouter();
    const today = useMemo(() => new Date(), []);
    const [viewType, setViewType] = useState('calendar');
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedMinistry, setSelectedMinistry] = useState('All Ministries');
    const [selectedStatus, setSelectedStatus] = useState('All Status');

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [selectedDateData, setSelectedDateData] = useState(null);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleDelete = (id) => {
        setItemToDelete(id);
    };

    const handleDateClick = (day) => {
        if (!day) return;
        const clickedDate = new Date(selectedYear, selectedMonth, day.day);
        setSelectedDateData({ date: clickedDate, dayData: day });
        setIsDateModalOpen(true);
    };


    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            const res = await fetch(`/api/events/${itemToDelete}`, { method: 'DELETE' });
            if (res.ok) {
                setEvents(prev => prev.filter(e => e.id !== itemToDelete));
                setItemToDelete(null);
            } else {
                alert("Failed to delete event");
            }
        } catch (err) {
            console.error("Error deleting event", err);
            alert("An error occurred while deleting the event");
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events');
                const data = await res.json();
                if (data.success) {
                    const mappedEvents = data.events.map(e => {
                        // Create nicely formatted date string
                        let dateStr = '';
                        if (e.startDate) {
                            const startD = new Date(e.startDate);
                            const startStr = startD.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                            dateStr = startStr;

                            if (e.endDate && e.endDate !== e.startDate) {
                                const endD = new Date(e.endDate);
                                const endStr = endD.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                                dateStr = `${startStr} – ${endStr}`;
                            } else {
                                dateStr = `${startStr}, ${startD.getFullYear()}`;
                            }
                        }

                        // Determine Icon
                        let icon = <CalendarIcon size={20} />;
                        const cat = e.category?.toLowerCase() || '';
                        if (cat.includes('formation')) icon = <Cross size={20} />;
                        else if (cat.includes('men') || cat.includes('family')) icon = <Users size={20} />;
                        else if (cat.includes('life') || cat.includes('prayer')) icon = <Heart size={20} />;
                        else if (cat.includes('youth')) icon = <GiDove size={20} />;
                        else if (cat.includes('outreach') || cat.includes('mission')) icon = <HandHeart size={20} />;

                        return {
                            id: e._id,
                            title: e.title,
                            ministry: e.hostMinistry || 'Unassigned',
                            date: dateStr,
                            startDate: e.startDate,
                            location: e.city && e.state ? `${e.city}, ${e.state}` : e.venue || 'TBD',
                            category: e.category,
                            status: e.status || 'Published',
                            icon: icon,
                            fullData: e
                        };
                    });
                    setEvents(mappedEvents);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

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

    const filteredEvents = events.filter(event => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchTerm === '' ||
            event.title?.toLowerCase().includes(searchLower) ||
            event.ministry?.toLowerCase().includes(searchLower) ||
            event.location?.toLowerCase().includes(searchLower);

        const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
        const matchesMinistry = selectedMinistry === 'All Ministries' || event.ministry === selectedMinistry;
        const matchesStatus = selectedStatus === 'All Status' || event.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesMinistry && matchesStatus;
    });

    // Calendar days generation for May 2026
    const getCalendarDays = () => {
        const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayEvents = filteredEvents.filter(event => {

                const eventDate = new Date(event.startDate);

                return (
                    eventDate.getDate() === i &&
                    eventDate.getMonth() === selectedMonth &&
                    eventDate.getFullYear() === selectedYear
                );

            });
            days.push({

                day: i,

                hasEvent: dayEvents.length > 0,

                events: dayEvents

            });
        }

        return days;
    };

    const goToPreviousMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(prev => prev - 1);
        } else {
            setSelectedMonth(prev => prev - 1);
        }
    };

    const goToNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(prev => prev + 1);
        } else {
            setSelectedMonth(prev => prev + 1);
        }
    };

    const years = Array.from(
        { length: 21 },
        (_, i) => new Date().getFullYear() - 10 + i
    );

    const calendarDays = useMemo(() => {
    return getCalendarDays();
}, [filteredEvents, selectedMonth, selectedYear]);
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
                                className={`flex-1 rounded-xl py-3.5 font-semibold transition-all flex items-center justify-center gap-2 ${viewType === 'calendar'
                                    ? 'bg-gradient-to-r from-[#082B63] to-[#1E4AA8] text-white shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                <CalendarIcon size={18} />
                                Calendar
                            </button>
                            <button
                                onClick={() => setViewType('list')}
                                className={`flex-1 rounded-xl py-3.5 font-semibold transition-all flex items-center justify-center gap-2 ${viewType === 'list'
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
                                        <div className="w-11 h-11 rounded-xl bg-[#082B63]/10 border border-[#082B63]/10 flex items-center justify-center shadow-sm">
                                            <CalendarIcon size={22} className="text-[#082B63]" />
                                        </div>                                        <div className="flex items-center gap-3">
                                            {/* Month */}
                                            <div className="relative">
                                                <select
                                                    value={selectedMonth}
                                                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                                    className="appearance-none h-11 min-w-[170px] rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-[#082B63]/30 focus:outline-none focus:ring-2 focus:ring-[#082B63]/15 focus:border-[#082B63] cursor-pointer"
                                                >
                                                    {monthNames.map((month, index) => (
                                                        <option key={month} value={index}>
                                                            {month}
                                                        </option>
                                                    ))}
                                                </select>

                                                <ChevronDown
                                                    size={18}
                                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                                />
                                            </div>

                                            {/* Year */}
                                            <div className="relative">
                                                <select
                                                    value={selectedYear}
                                                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                                                    className="appearance-none h-11 w-28 rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-[#082B63]/30 focus:outline-none focus:ring-2 focus:ring-[#082B63]/15 focus:border-[#082B63] cursor-pointer"
                                                >
                                                    {years.map((year) => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                                </select>

                                                <ChevronDown
                                                    size={18}
                                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                                />
                                            </div>
                                        </div>                                   
                                    </h2>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={goToPreviousMonth}
                                            className="p-2 rounded-lg hover:bg-slate-100 transition"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={goToNextMonth}
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
                                    {calendarDays.map((day, idx) => {
                                        const isToday =
                                            day &&
                                            day.day === today.getDate() &&
                                            selectedMonth === today.getMonth() &&
                                            selectedYear === today.getFullYear();
                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => handleDateClick(day)}
                                                className={`border rounded-xl min-h-[100px] p-2 transition-all cursor-pointer flex flex-col
                                        ${isToday
                                                        ? "border-[#082B63]/30 bg-[#082B63]/10"
                                                        : day?.hasEvent
                                                            ? "border-[#D6A646]/40 bg-amber-50/30 hover:shadow-md"
                                                            : "border-slate-200 bg-white hover:bg-slate-50"
                                                    }`}
                                            >
                                                {day && (
                                                    <>
                                                        <span
                                                            className={`text-sm font-semibold mb-1 ${isToday
                                                                ? "text-[#082B63]"
                                                                : day.hasEvent
                                                                    ? "text-[#D6A646]"
                                                                    : "text-slate-600"
                                                                }`}
                                                        >
                                                            {day.day}
                                                        </span>
                                                        {day.hasEvent && (
                                                            <div className="mt-1 space-y-1 flex-1 overflow-hidden">
                                                                {day.events.slice(0, 2).map((evt, eIdx) => (
                                                                    <div key={eIdx} className="bg-white/60 border border-[#D6A646]/30 rounded-md p-1.5 text-left hover:bg-white/80 transition-colors">
                                                                        <div className="text-xs font-bold text-slate-800 truncate" title={evt.title}>{evt.title}</div>
                                                                        <div className="text-[10px] text-slate-500 truncate flex items-center gap-0.5 mt-0.5">
                                                                            <MapPin size={8} /> 
                                                                            <span className="truncate">{evt.location}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {day.events.length > 2 && (
                                                                    <div className="text-[10px] font-semibold text-[#D6A646] text-left pl-1">
                                                                        +{day.events.length - 2} more
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )
                                    })}
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
                                            {isLoading ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-8 text-slate-500">Loading events...</td>
                                                </tr>
                                            ) : filteredEvents.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-8 text-slate-500">No events found matching filters.</td>
                                                </tr>
                                            ) : filteredEvents.map((event, index) => (
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
                                                            <button 
                                                                onClick={() => setSelectedEvent(event.fullData)}
                                                                className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all font-medium text-sm flex items-center gap-1"
                                                            >
                                                                <Eye size={14} /> View
                                                            </button>
                                                            <button 
                                                                onClick={() => router.push(`/dashboard/events/add?editId=${event.id}`)}
                                                                className="bg-[#082B63] hover:bg-[#0B3578] transition-all text-white px-3 py-1.5 rounded-lg font-medium text-sm flex items-center gap-1 shadow-sm"
                                                            >
                                                                <Edit size={14} /> Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(event.id)}
                                                                className="border border-red-200 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all font-medium text-sm flex items-center gap-1"
                                                            >
                                                                <Trash2 size={14} />
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
                                    <p className="text-sm text-slate-500 font-medium">Showing 1-{filteredEvents.length} of {totalEvents} events</p>
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

            {/* Date Details Modal */}
            {isDateModalOpen && selectedDateData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <CalendarIcon className="text-[#082B63]" size={24} />
                                {selectedDateData.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                            </h3>
                            <button onClick={() => setIsDateModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-xl transition-all">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            {selectedDateData.dayData.hasEvent ? (
                                <div className="space-y-4">
                                    {selectedDateData.dayData.events.map(evt => (
                                        <div key={evt.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50 hover:bg-slate-100/50 transition-colors">
                                            <div className="flex items-start gap-3">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${evt.category === 'Faith Formation' ? 'bg-purple-100' : 'bg-white border border-slate-200'}`}>
                                                    {evt.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-lg text-slate-900">{evt.title}</h4>
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${getStatusColor(evt.status)} border`}>
                                                            {evt.status}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 space-y-1.5">
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <MapPin size={14} className="text-slate-400" /> {evt.location}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <Users size={14} className="text-slate-400" /> {evt.ministry}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${getCategoryColor(evt.category)} border`}>
                                                                {evt.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-3">
                                                <button 
                                                    onClick={() => setSelectedEvent(evt.fullData)}
                                                    className="px-3 py-1.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
                                                >
                                                    <Eye size={14} /> View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                        <CalendarDays size={32} className="text-slate-400" />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">No Events Scheduled</h4>
                                    <p className="text-slate-500 mb-6 max-w-sm mx-auto">There are currently no events scheduled for this day. Would you like to create one?</p>
                                    <button 
                                        onClick={() => {
                                            const d = selectedDateData.date;
                                            const localDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                                            router.push(`/dashboard/events/add?date=${localDateStr}`);
                                        }}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#082B63] to-[#1E4AA8] hover:from-[#0B3578] hover:to-[#2563B5] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
                                    >
                                        <Plus size={18} /> Add New Event
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {itemToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 border border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-red-600">
                            <div className="bg-red-100 p-2 rounded-full">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Confirm Deletion</h3>
                        </div>
                        <p className="text-slate-600 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
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
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Details Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 my-auto">
                        {/* Header Image / Pattern Area */}
                        <div className="h-32 bg-gradient-to-r from-[#082B63] to-[#1E4AA8] rounded-t-3xl relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                            <button 
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-6 sm:px-8 pb-8">
                            {/* Profile Header */}
                            <div className="relative -mt-12 sm:-mt-16 mb-8 flex flex-col sm:flex-row items-start sm:items-end gap-5">
                                <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <CalendarIcon size={40} />
                                    </div>
                                </div>
                                <div className="flex-1 pb-1">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 sm:mb-6">{selectedEvent.title}</h2>

                                    <div className="flex flex-wrap items-center gap-3 ">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                            {selectedEvent.category || 'Event'}
                                        </span>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedEvent.status || 'Published')} border`}>
                                            {(!selectedEvent.status || selectedEvent.status === 'Published') ? <CheckCircle size={12} /> : <Clock size={12} />}
                                            {selectedEvent.status || 'Published'}
                                        </span>
                                    </div>
                                </div>
                                <div className="pb-1 flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                                    <button 
                                        onClick={() => {
                                            setSelectedEvent(null);
                                            router.push(`/dashboard/events/add?editId=${selectedEvent._id}`);
                                        }}
                                        className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-medium text-sm flex justify-center items-center gap-2 transition-all"
                                    >
                                        <Edit size={16} /> Edit
                                    </button>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Left Column - Main Info */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Short Description */}
                                    <section>
                                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                            <Target size={20} className="text-[#D6A646]" />
                                            Summary
                                        </h3>
                                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-slate-700 leading-relaxed italic">
                                            "{selectedEvent.shortDescription || 'No summary provided.'}"
                                        </div>
                                    </section>

                                    {/* Description */}
                                    <section>
                                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                            <FileText size={20} className="text-[#082B63]" />
                                            Event Details
                                        </h3>
                                        <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                            {selectedEvent.description || 'No detailed description provided.'}
                                        </div>
                                    </section>

                                    {/* Additional Details */}
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                                            <h4 className="font-bold text-slate-900 mb-2">Location / Venue</h4>
                                            <p className="text-sm text-slate-600">
                                                {selectedEvent.venue && <span className="block font-semibold">{selectedEvent.venue}</span>}
                                                {selectedEvent.address && <span className="block">{selectedEvent.address}</span>}
                                                {selectedEvent.city && selectedEvent.state && <span className="block">{selectedEvent.city}, {selectedEvent.state} {selectedEvent.zip}</span>}
                                                {!selectedEvent.venue && !selectedEvent.address && !selectedEvent.city && 'No location provided.'}
                                            </p>
                                        </section>
                                        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                                            <h4 className="font-bold text-slate-900 mb-2">Registration</h4>
                                            <p className="text-sm text-slate-600 mb-2">
                                                {selectedEvent.allowRegistration ? 'Registration is open.' : 'No registration required.'}
                                            </p>
                                            {selectedEvent.registrationLink && (
                                                <a href={selectedEvent.registrationLink} target="_blank" rel="noreferrer" className="text-[#D6A646] hover:text-[#082B63] font-semibold text-sm transition-colors flex items-center gap-1">
                                                    Register Here <ArrowRight size={14} />
                                                </a>
                                            )}
                                        </section>
                                    </div>
                                </div>

                                {/* Right Column - Quick Facts & Contact */}
                                <div className="space-y-6">
                                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                                        <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2 border-b border-slate-200 pb-3">
                                            <Info size={18} className="text-[#082B63]" />
                                            Quick Facts
                                        </h3>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                                    <CalendarIcon size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium">Date & Time</p>
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {selectedEvent.startDate ? new Date(selectedEvent.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                                                        {selectedEvent.startTime && ` at ${selectedEvent.startTime}`}
                                                    </p>
                                                    {(selectedEvent.endDate || selectedEvent.endTime) && (
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            To: {selectedEvent.endDate ? new Date(selectedEvent.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''} {selectedEvent.endTime && selectedEvent.endTime}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                                    <Church size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium">Host Ministry</p>
                                                    <p className="text-sm font-semibold text-slate-900">{selectedEvent.hostMinistry || 'Unassigned'}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                                    <MapPin size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium">Location</p>
                                                    <p className="text-sm font-semibold text-slate-900">{selectedEvent.venue || selectedEvent.city || 'Not specified'}</p>
                                                    {selectedEvent.mapUrl && (
                                                        <a href={selectedEvent.mapUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                                                            View on Maps
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#082B63] rounded-2xl p-6 shadow-md text-white">
                                        <h3 className="text-base font-bold mb-5 flex items-center gap-2 border-b border-white/20 pb-3">
                                            <Mail size={18} className="text-[#D6A646]" />
                                            Contact Info
                                        </h3>
                                        
                                        <div className="space-y-4">
                                            <p className="text-sm font-semibold text-white mb-2">{selectedEvent.contactPerson || 'General Contact'}</p>
                                            {selectedEvent.contactEmail && (
                                                <a href={`mailto:${selectedEvent.contactEmail}`} className="flex items-center gap-3 text-sm text-blue-100 hover:text-white transition-colors">
                                                    <Mail size={16} className="text-blue-300 shrink-0" />
                                                    <span className="break-all">{selectedEvent.contactEmail}</span>
                                                </a>
                                            )}
                                            {selectedEvent.contactPhone && (
                                                <div className="flex items-center gap-3 text-sm text-blue-100">
                                                    <Globe size={16} className="text-blue-300 shrink-0" />
                                                    <span>{selectedEvent.contactPhone}</span>
                                                </div>
                                            )}
                                            {!selectedEvent.contactEmail && !selectedEvent.contactPhone && (
                                                <p className="text-sm text-blue-200">No contact information available.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}