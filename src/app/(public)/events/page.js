// app/events/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/src/components/layout/Navbar';
import {
    ChevronDown,
    ArrowRight,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Heart,
    MapPin,
    Clock,
    Users,
    Cross,
    Megaphone,
    HandHeart,
    ShieldCheck,
    Church,
    Filter,
    Search,
    X,
    CalendarDays,
    LayoutGrid,
    CalendarX2,
    Handshake,
    Sparkles,
    Mail
} from 'lucide-react';
import { GiDove } from "react-icons/gi";

// Event Data
const allEvents = [
    {
        id: 1,
        title: "Eucharistic Miracles Exhibit",
        date: "May 24 – Jun 15, 2026",
        startDate: "2026-05-24",
        endDate: "2026-06-15",
        time: "10:00 AM - 5:00 PM",
        location: "MRH – St. Carlo Shrine",
        address: "Malvern Retreat House, Malvern, PA",
        description: "Explore over 120 Eucharistic miracles from around the world in the first permanent exhibit of Saint Carlo Acutis.",
        category: "Faith Formation",
        ministry: "Malvern Retreat House",
        image: "/images/events/eucharistic-miracles.jpg",
        featured: true,
    },
    {
        id: 2,
        title: "Men Through Mary Retreat",
        date: "May 30, 2026",
        startDate: "2026-05-30",
        time: "8:00 AM - 3:00 PM",
        location: "Mid-Atlantic Knights of Immaculata",
        address: "Malvern Retreat House, Malvern, PA",
        description: "A day of prayer, reflection, and brotherhood to help men grow in holiness through the intercession of Our Lady.",
        category: "Men's Ministries",
        ministry: "Mid-Atlantic Knights of Immaculata",
        image: "/images/events/men-retreat.jpg",
        featured: true,
    },
    {
        id: 3,
        title: "Family Prayer Evening",
        date: "June 3, 2026",
        startDate: "2026-06-03",
        time: "7:00 PM",
        location: "Militia of Immaculata Village",
        address: "St. Carlos Center",
        description: "An evening of adoration, rosary, and Mass for families to grow together in faith and devotion.",
        category: "Family",
        ministry: "Militia of Immaculata Village",
        image: "/images/events/family-prayer.jpg",
        featured: true,
    },
    {
        id: 4,
        title: "Pro-Life Prayer Vigil",
        date: "June 7, 2026",
        startDate: "2026-06-07",
        time: "9:00 AM",
        location: "Life Runners",
        address: "Philadelphia, PA",
        description: "Join us for a peaceful prayer vigil to defend the sanctity of human life from conception to natural death.",
        category: "Pro-Life",
        ministry: "Life Runners",
        image: "/images/events/pro-life-vigil.jpg",
        featured: true,
    },
    {
        id: 5,
        title: "Formation Night",
        date: "May 28, 2026",
        startDate: "2026-05-28",
        time: "7:00 PM",
        location: "House of God's Light",
        address: "Malvern, PA",
        description: "Deepen your faith with an evening of Catholic teaching, discussion, and fellowship.",
        category: "Faith Formation",
        ministry: "House of God's Light",
        image: "/images/events/formation-night.jpg",
        featured: false,
    },
    {
        id: 6,
        title: "Youth Rally",
        date: "June 12, 2026",
        startDate: "2026-06-12",
        time: "6:00 PM",
        location: "Bishop Shanahan HS",
        address: "Downingtown, PA",
        description: "An energetic evening of music, talks, and adoration for high school teens.",
        category: "Youth",
        ministry: "Bishop Shanahan HS Theology Dept.",
        image: "/images/events/youth-rally.jpg",
        featured: false,
    },
    {
        id: 7,
        title: "Outreach Food Drive",
        date: "June 14, 2026",
        startDate: "2026-06-14",
        time: "9:00 AM - 1:00 PM",
        location: "Society of St. Vincent de Paul",
        address: "Philadelphia, PA",
        description: "Help collect and distribute food to families in need across the Philadelphia area.",
        category: "Outreach",
        ministry: "Society of Saint Vincent de Paul",
        image: "/images/events/food-drive.jpg",
        featured: false,
    },
    {
        id: 8,
        title: "Evangelization Workshop",
        date: "June 20, 2026",
        startDate: "2026-06-20",
        time: "9:00 AM - 4:00 PM",
        location: "In His Sign Ministry",
        address: "Philadelphia, PA",
        description: "Learn practical skills for sharing the Catholic faith with others in your daily life.",
        category: "Evangelization",
        ministry: "In His Sign Ministry",
        image: "/images/events/evangelization-workshop.jpg",
        featured: false,
    },
];

// Ministries with upcoming events
const ministriesWithEvents = [
    {
        id: 1,
        name: "House of God's Light",
        category: "Evangelization",
        eventCount: 4,
        events: [
            { id: 101, title: "Formation Night", date: "May 28, 2026", time: "7:00 PM" }
        ],
        image: "/images/ministries/hogl.jpg",
    },
    {
        id: 2,
        name: "Life Runners",
        category: "Pro-Life",
        eventCount: 3,
        events: [
            { id: 102, title: "Pro-Life Prayer Vigil", date: "June 7, 2026", time: "9:00 AM" }
        ],
        image: "/images/ministries/life-runners.jpg",
    },
    {
        id: 3,
        name: "Militia of Immaculata Village",
        category: "Family",
        eventCount: 5,
        events: [
            { id: 103, title: "Family Prayer Evening", date: "June 3, 2026", time: "7:00 PM" }
        ],
        image: "/images/ministries/militia.jpg",
    },
    {
        id: 4,
        name: "Mid-Atlantic Knights of Immaculata",
        category: "Men",
        eventCount: 2,
        events: [
            { id: 104, title: "Men Through Mary Retreat", date: "May 30, 2026", time: "8:00 AM" }
        ],
        image: "/images/ministries/knights.jpg",
    },
];

const categories = [
    { id: "pro-life", name: "Pro-Life", icon: <Heart size={20} />, color: "bg-red-100 text-red-700" },
    { id: "youth", name: "Youth", icon: <GiDove size={20} />, color: "bg-blue-100 text-blue-700" },
    { id: "family", name: "Family", icon: <Users size={20} />, color: "bg-green-100 text-green-700" },
    { id: "faith-formation", name: "Faith Formation", icon: <Cross size={20} />, color: "bg-purple-100 text-purple-700" },
    { id: "evangelization", name: "Evangelization", icon: <Megaphone size={20} />, color: "bg-orange-100 text-orange-700" },
    { id: "outreach", name: "Outreach", icon: <HandHeart size={20} />, color: "bg-teal-100 text-teal-700" },
    { id: "mens-ministries", name: "Men's Ministries", icon: <ShieldCheck size={20} />, color: "bg-indigo-100 text-indigo-700" },
    { id: "mission", name: "Mission", icon: <Church size={20} />, color: "bg-amber-100 text-amber-700" },
];

// Get current month for calendar
const getCurrentMonthDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { year, month, daysInMonth, startingDayOfWeek, today: today.getDate() };
};

export default function EventsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTimeFilter, setSelectedTimeFilter] = useState('Upcoming');
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthDates().month);
    const [selectedYear, setSelectedYear] = useState(getCurrentMonthDates().year);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const { daysInMonth, startingDayOfWeek, today, month: currentMonth, year: currentYear } = getCurrentMonthDates();

    // Filter events based on search, category, and time
    const filteredEvents = allEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

        let matchesTime = true;
        const eventDate = new Date(event.startDate);
        const todayDate = new Date();
        const thisWeekEnd = new Date();
        thisWeekEnd.setDate(todayDate.getDate() + 7);
        const thisMonthEnd = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0);

        if (selectedTimeFilter === 'Today') {
            matchesTime = eventDate.toDateString() === todayDate.toDateString();
        } else if (selectedTimeFilter === 'This Week') {
            matchesTime = eventDate >= todayDate && eventDate <= thisWeekEnd;
        } else if (selectedTimeFilter === 'This Month') {
            matchesTime = eventDate.getMonth() === todayDate.getMonth() && eventDate.getFullYear() === todayDate.getFullYear();
        }

        return matchesSearch && matchesCategory && matchesTime;
    });

    const featuredEvents = allEvents.filter(event => event.featured);
    const selectedEvent = selectedEventId ? allEvents.find(e => e.id === selectedEventId) : featuredEvents[0];

    // Calendar days generation
    const calendarDays = [];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const hasEvent = allEvents.some(event => {
            const eventDate = new Date(event.startDate);
            return eventDate.getDate() === i && eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear;
        });
        calendarDays.push({ day: i, hasEvent });
    }

    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const categories = [
        {
            name: "All",
            icon: LayoutGrid,
            color: "#5B6EE8",
        },
        {
            name: "Pro-Life",
            icon: Heart,
            color: "#D6A646",
        },
        {
            name: "Youth",
            icon: GiDove,
            color: "#5B6EE8",
        },
        {
            name: "Family",
            icon: Users,
            color: "#D6A646",
        },
        {
            name: "Faith Formation",
            icon: Cross,
            color: "#5B6EE8",
        },
        {
            name: "Evangelization",
            icon: Megaphone,
            color: "#D6A646",
        },
        {
            name: "Outreach",
            icon: HandHeart,
            color: "#5B6EE8",
        },
        {
            name: "Men's Ministries",
            icon: ShieldCheck,
            color: "#D6A646",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
<section className="bg-white overflow-hidden border-b border-[#EEF2F7]">
  <div className=" mx-auto">

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
          Upcoming Catholic Events
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
          Discover retreats, prayer gatherings, pro-life events,
          youth programs, formation opportunities, and ministry
          events happening across Southeast Pennsylvania.
        </p>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-10 mt-12 max-w-5xl">

          {/* Events */}

          <div className="flex items-start gap-4">

            <CalendarDays
              size={42}
              color="#D6A646"
            />

            <div>

              <h3
                className="font-bold"
                style={{
                  fontSize: "30px",
                  color: "#082B63",
                }}
              >
                200+
              </h3>

              <p
                style={{
                  color: "#31456A",
                  fontSize: "15px",
                }}
              >
                Events Annually
              </p>

            </div>

          </div>

          {/* Ministries */}

          <div className="flex items-start gap-4">

            <Users
              size={42}
              color="#D6A646"
            />

            <div>

              <h3
                className="font-bold"
                style={{
                  fontSize: "30px",
                  color: "#082B63",
                }}
              >
                20+
              </h3>

              <p
                style={{
                  color: "#31456A",
                  fontSize: "15px",
                }}
              >
                Ministries
              </p>

            </div>

          </div>

          {/* Location */}

          <div className="flex items-start gap-4">

            <MapPin
              size={42}
              color="#D6A646"
            />

            <div>

              <h3
                className="font-bold"
                style={{
                  fontSize: "26px",
                  color: "#082B63",
                }}
              >
                Southeast
              </h3>

              <p
                style={{
                  color: "#31456A",
                  fontSize: "15px",
                }}
              >
                Pennsylvania
              </p>

            </div>

          </div>

          {/* Mission */}

          <div className="flex items-start gap-4">

            <Cross
              size={42}
              color="#D6A646"
            />

            <div>

              <h3
                className="font-bold"
                style={{
                  fontSize: "26px",
                  color: "#082B63",
                }}
              >
                One
              </h3>

              <p
                style={{
                  color: "#31456A",
                  fontSize: "15px",
                }}
              >
                Unified Mission
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="relative h-[380px]">

        <Image
          src="/images/mary_cathedral.png"
          alt="Mary and Cathedral"
          fill
          priority
          className="object-cover object-center"
        />

      </div>

    </div>

  </div>
</section>

            {/* Search and Filter Bar */}
            <section className=" z-20 bg-white mt-6">
                <div className=" mx-auto px-28 py-4">

                    {/* Search */}

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                        />

                        <input
                            type="text"
                            placeholder="Search events, ministries, speakers, locations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#E8EDF5] outline-none text-sm"
                        />

                    </div>

                    {/* Category */}

                    <div className="flex flex-wrap gap-3 mt-8">

                        {categories.map((item) => (

                            <button
                                key={item.name}
                                onClick={() => setSelectedCategory(item.name)}
                                className={`flex items-center gap-2 px-4 py-6 h-10 rounded-xl transition-all
          ${selectedCategory === item.name
                                        ? "bg-[#082B63] text-white"
                                        : "bg-white border border-[#E8EDF5] text-[#243B63]"
                                    }`}
                            >

                                <item.icon
                                    size={18}
                                    color={
                                        selectedCategory === item.name
                                            ? "#FFFFFF"
                                            : item.color
                                    }
                                />

                                <span
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {item.name}
                                </span>

                            </button>

                        ))}

                    </div>

                    {/* Time */}

                    <div className="flex items-center gap-3 mt-4">

                        {["Upcoming", "Today", "This Week", "This Month"].map((item) => (

                            <button
                                key={item}
                                onClick={() => setSelectedTimeFilter(item)}
                                className={`px-5 py-3  rounded-xl text-[15px] font-semibold transition 
          ${selectedTimeFilter === item
                                        ? "bg-[#082B63] text-white"
                                        : "bg-white border border-[#E8EDF5] text-[#243B63]"
                                    }`}
                            >
                                {item}
                            </button>

                        ))}

                        <button
                            className="w-10 h-10 rounded-xl border border-[#E8EDF5] flex items-center justify-center"
                        >
                            <CalendarDays
                                size={18}
                                color="#243B63"
                            />
                        </button>

                    </div>

                </div>
            </section>

            {/* Main Content - Calendar and Events Side by Side */}
            <section className=" mx-auto px-28 py-8 bg-white">
                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Calendar Column - Left Side */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-lg border border-gray-100 p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                            {/* Calendar Header */}
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-[#082B63] hover:bg-gray-50 transition-colors">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-[#082B63] hover:bg-gray-50 transition-colors">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>

                                <h3 className="font-bold text-[22px] text-[#082B63]">
                                    {monthNames[selectedMonth]} {selectedYear}
                                </h3>

                                <div className="flex gap-2 items-center">
                                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                                        Month <ChevronDown size={14} />
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                        <CalendarDays size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Calendar Grid Headers */}
                            <div className="grid grid-cols-7 mb-2">
                                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
                                    <div key={day} className="text-[11px] font-bold text-[#082B63] text-center pb-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                                {calendarDays.map((day, idx) => {
                                    const eventsForDay = day ? allEvents.filter(event => {
                                        const eventDate = new Date(event.startDate);
                                        return eventDate.getDate() === day.day &&
                                            eventDate.getMonth() === selectedMonth &&
                                            eventDate.getFullYear() === selectedYear;
                                    }) : [];

                                    return (
                                        <div
                                            key={idx}
                                            className={`bg-white min-h-[110px] p-2 ${!day ? 'bg-gray-50/50' : ''}`}
                                        >
                                            <div className={`text-xs mb-1.5 ${day ? 'text-gray-500 font-medium' : 'text-gray-300'}`}>
                                                {day ? day.day : ""}
                                            </div>

                                            <div className="space-y-1.5">
                                                {eventsForDay.map((evt, i) => {
                                                    let colorClasses = "bg-[#FFF4D2] text-[#B88B00]"; // default Pro-Life
                                                    if (evt.category === "Youth") colorClasses = "bg-[#E6F4EA] text-[#1E8E3E]";
                                                    if (evt.category === "Family") colorClasses = "bg-[#F3E8FF] text-[#9333EA]";
                                                    if (evt.category === "Faith Formation") colorClasses = "bg-[#E8F0FE] text-[#1A73E8]";
                                                    if (evt.category === "Evangelization") colorClasses = "bg-[#FEF7E0] text-[#E37400]";
                                                    if (evt.category === "Outreach") colorClasses = "bg-[#E0F2F1] text-[#00897B]";

                                                    return (
                                                        <div key={i} className={`text-[10px] font-semibold leading-tight p-1.5 rounded-md truncate ${colorClasses}`}>
                                                            {evt.title}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Category Legend */}
                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 items-center justify-start px-2">
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFF4D2] border border-[#FDE08B]"></span> Pro-Life
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#E6F4EA] border border-[#A8DAB5]"></span> Youth
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#F3E8FF] border border-[#D8B4FE]"></span> Family
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#E8F0FE] border border-[#AECBFA]"></span> Faith Formation
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEF7E0] border border-[#FDE293]"></span> Evangelization
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#E0F2F1] border border-[#80CBC4]"></span> Outreach
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selected Events Column - Right Side */}
                    <div className="lg:col-span-4 border border-gray-100 rounded-lg p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-[22px] text-[#082B63]">Selected Events</h2>
                            <Link href="/events/all" className="text-[#082B63] font-medium hover:underline text-sm flex items-center gap-1">
                                View all events <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Events List */}
                        <div className="space-y-0">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.slice(0, 4).map((event) => {
                                    const eventDate = new Date(event.startDate);
                                    const monthName = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
                                    const dayNum = eventDate.getDate();

                                    return (
                                        <div
                                            key={event.id}
                                            onClick={() => setSelectedEventId(event.id)}
                                            className="py-5 border-b border-gray-100 flex items-start gap-4 cursor-pointer group"
                                        >
                                            {/* Date Box */}
                                            <div className="text-center w-12 flex-shrink-0 pt-1 border border-gray-100 rounded-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                                                <div className="text-[10px] font-bold text-[#082B63] uppercase tracking-widest">{monthName}</div>
                                                <div className="text-[28px] font-bold text-[#082B63] leading-none mt-1">{dayNum}</div>
                                            </div>

                                            {/* Event Details */}
                                            <div className="flex-1">
                                                <h4 className="font-bold text-[#082B63] text-[15px] leading-snug mb-2 group-hover:text-[#D6A646] transition-colors">{event.title}</h4>

                                                <div className="flex items-start gap-2 text-xs text-gray-500 mb-1.5">
                                                    <Clock size={13} className="mt-[2px] flex-shrink-0 text-gray-400" />
                                                    <span>{event.date} {event.time && `• ${event.time}`}</span>
                                                </div>

                                                <div className="flex items-start gap-2 text-xs text-gray-500 mb-1.5">
                                                    <MapPin size={13} className="mt-[2px] flex-shrink-0 text-gray-400" />
                                                    <span>{event.location}</span>
                                                </div>

                                                {event.address && (
                                                    <div className="flex items-start gap-2 text-xs text-gray-500">
                                                        <MapPin size={13} className="mt-[2px] flex-shrink-0 text-transparent" />
                                                        <span>{event.address}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <button className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-[#082B63] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors mt-1">
                                                View Event
                                            </button>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="py-10 text-center">
                                    <p className="text-gray-500 text-sm">No events found matching your criteria.</p>
                                </div>
                            )}

                            {filteredEvents.length > 0 && (
                                <div className="pt-6 text-center">
                                    <Link href="/events/calendar" className="text-[#082B63] font-semibold hover:underline text-sm inline-flex items-center gap-1">
                                        View Full Calendar <ArrowRight size={14} />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Events Section */}
            <section className=" mx-auto px-28 ">
                <div className="mt-12">
                    <h2 className="font-serif text-2xl font-bold text-[#082B63] mb-6">Featured Events</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {featuredEvents.map((event, index) => (
                            <div key={event.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col">
                                <div className="h-40 relative flex-shrink-0 overflow-hidden">
                                    <Image
                                        src={`/images/events${(index % 3) + 1}.png`}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Featured Badge */}
                                    <div
                                        className="absolute left-4 -bottom-1 px-3 py-1 rounded-t-lg rounded-b-sm shadow-sm"
                                        style={{
                                            background: "#FFF6DE",
                                            border: "1px solid #F2E2B5",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: "9px",
                                                fontWeight: 700,
                                                letterSpacing: "0.12em",
                                                color: "#C89211",
                                            }}
                                        >
                                            FEATURED
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">

                                    <h3 className="font-bold text-lg text-[#082B63]">{event.title}</h3>
                                    <div className="text-xs text-[#D6A646] font-semibold mb-1">
                                        {new Date(event.startDate).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>
                                    <button className="mt-3 text-[#082B63] font-semibold text-sm hover:underline">
                                        View Event →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events by Ministry Section */}
            <section className=" mx-auto px-28 py-12">

                {/* Header */}

                <div className="flex justify-between items-center mb-6">

                    <h2
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "32px",
                            fontWeight: 700,
                            color: "#1E3A8A",
                        }}
                    >
                        Events by Ministry
                    </h2>

                    <Link
                        href="/ministries"
                        className="flex items-center gap-2 text-sm font-semibold text-[#3157C9]"
                    >
                        View all ministries →
                    </Link>

                </div>

                {/* Cards */}

                <div className="grid lg:grid-cols-4 gap-4">

                    {ministriesWithEvents.map((ministry) => {

                        const event = ministry.events[0];

                        const eventDate = new Date(event.date);

                        const month = eventDate
                            .toLocaleString("default", {
                                month: "short",
                            })
                            .toUpperCase();

                        const day = eventDate
                            .getDate()
                            .toString()
                            .padStart(2, "0");

                        return (

                            <div
                                key={ministry.id}
                                className="bg-white border border-[#E8EDF5] rounded-2xl p-5 hover:shadow-md transition"
                            >

                                {/* Top */}

                                <div className="flex gap-4">

                                    <div
                                        className="w-14 h-14 rounded-full border border-[#ECECEC] flex items-center justify-center flex-shrink-0"
                                    >
                                        <Church
                                            size={28}
                                            color="#C79B3B"
                                        />
                                    </div>

                                    <div>

                                        <h3
                                            style={{
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: "18px",
                                                fontWeight: 700,
                                                color: "#1E3A8A",
                                                lineHeight: "1.2",
                                            }}
                                        >
                                            {ministry.name}
                                        </h3>

                                        <p
                                            className="mt-1"
                                            style={{
                                                fontSize: "14px",
                                                color: "#6B7280",
                                            }}
                                        >
                                            {ministry.eventCount} Upcoming Events
                                        </p>

                                    </div>

                                </div>

                                {/* Bottom */}

                                <div className="flex gap-4 mt-5">

                                    {/* Date */}

                                    <div
                                        className="w-14 border border-[#ECECEC] rounded-lg text-center py-2 flex-shrink-0"
                                    >

                                        <p
                                            style={{
                                                fontSize: "10px",
                                                fontWeight: 700,
                                                color: "#1E3A8A",
                                                letterSpacing: "1px",
                                            }}
                                        >
                                            {month}
                                        </p>

                                        <p
                                            style={{
                                                fontSize: "30px",
                                                fontWeight: 700,
                                                color: "#1E3A8A",
                                                lineHeight: "1",
                                            }}
                                        >
                                            {day}
                                        </p>

                                    </div>

                                    {/* Event */}

                                    <div className="flex-1">

                                        <h4
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: 700,
                                                color: "#1E3A8A",
                                            }}
                                        >
                                            {event.title}
                                        </h4>

                                        <p
                                            className="mt-1"
                                            style={{
                                                fontSize: "13px",
                                                color: "#6B7280",
                                            }}
                                        >
                                            {event.date} • {event.time}
                                        </p>

                                        <button
                                            className="mt-3 text-sm font-semibold text-[#3157C9]"
                                        >
                                            View Ministry →
                                        </button>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </section>

            {/* Working Together Section */}
            <section className=" mx-auto px-28 pb-12">

                <div
                    className="bg-[#F5F7FB] border border-[#E8EDF5] rounded-2xl px-8 py-7"
                >

                    <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr]">

                        {/* Column 1 */}

                        <div className="flex gap-5 pr-8 border-r border-[#E8EDF5]">

                            <div className="flex-shrink-0">
                                <CalendarDays
                                    size={54}
                                    strokeWidth={1.7}
                                    color="#2E356F"
                                />
                            </div>

                            <div>

                                <h3
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: "30px",
                                        fontWeight: 700,
                                        color: "#1E2A5A",
                                    }}
                                >
                                    Working Together
                                </h3>

                                <p
                                    className="mt-2"
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: "14px",
                                        color: "#4B5563",
                                        lineHeight: "1.7",
                                    }}
                                >
                                    The shared calendar helps ministries coordinate
                                    major events, avoid conflicts, and support one
                                    another's initiatives for the salvation of souls.
                                </p>

                            </div>

                        </div>

                        {/* Column 2 */}

                        <div className="flex gap-4 px-8 border-r border-[#E8EDF5]">

                            <CalendarX2
                                size={42}
                                strokeWidth={1.7}
                                color="#2E356F"
                            />

                            <div>

                                <h4
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "18px",
                                        color: "#1E2A5A",
                                    }}
                                >
                                    Avoid Conflicts
                                </h4>

                                <p
                                    className="mt-2 text-sm"
                                    style={{
                                        color: "#4B5563",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    See events across ministries in one place.
                                </p>

                            </div>

                        </div>

                        {/* Column 3 */}

                        <div className="flex gap-4 px-8 border-r border-[#E8EDF5]">

                            <Handshake
                                size={42}
                                strokeWidth={1.7}
                                color="#2E356F"
                            />

                            <div>

                                <h4
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "18px",
                                        color: "#1E2A5A",
                                    }}
                                >
                                    Support Each Other
                                </h4>

                                <p
                                    className="mt-2 text-sm"
                                    style={{
                                        color: "#4B5563",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    Promote and participate in ministry events.
                                </p>

                            </div>

                        </div>

                        {/* Column 4 */}

                        <div className="flex gap-4 pl-8">

                            <Sparkles
                                size={42}
                                strokeWidth={1.7}
                                color="#2E356F"
                            />

                            <div>

                                <h4
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "18px",
                                        color: "#1E2A5A",
                                    }}
                                >
                                    Stronger Together
                                </h4>

                                <p
                                    className="mt-2 text-sm"
                                    style={{
                                        color: "#4B5563",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    One mission. Many gifts.
                                    <br />
                                    Greater impact.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Newsletter Section */}
<section className=" mx-auto px-28 pb-16">

  <div
    className="rounded-2xl px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm"
    style={{
      background: "#062B6F",
      border: "1px solid #17458F",
    }}
  >

    {/* Left */}

    <div className="flex items-center gap-5">

      <div
        className="w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0"
      >
        <Mail
          size={34}
          strokeWidth={1.8}
          color="#062B6F"
        />
      </div>

      <div>

        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "34px",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: "1.2",
          }}
        >
          Never Miss An Event
        </h3>

        <p
          className="mt-1"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            color: "#D7E3FF",
            lineHeight: "1.7",
          }}
        >
          Receive updates about upcoming Catholic events
          <br />
          and ministry activities.
        </p>

      </div>

    </div>

    {/* Right */}

    <div
      className="flex overflow-hidden rounded-xl bg-white border border-[#E8EDF5]"
      style={{
        width: "430px",
        height: "52px",
      }}
    >

      <input
        type="email"
        placeholder="Enter your email address"
        className="flex-1 px-5 outline-none text-sm"
        style={{
          fontFamily: "'Inter', sans-serif",
        }}
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