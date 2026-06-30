// app/ministries/page.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/src/components/layout/Navbar';
import { ArrowRight, Bird, CalendarDays, ChevronRight, Church, Cross, Grid2x2, HandHeart, Heart, MapPin, Megaphone, Menu, ShieldCheck, User2, Users, Search, LayoutGrid } from 'lucide-react';
import { GiDove } from "react-icons/gi";
import { FaDashcube } from 'react-icons/fa';

const upcomingEvents = [
  {
    month: "MAY",
    day: "24",
    title: "Eucharistic Miracles Exhibit",
    organization: "MRH – St. Carlo Shrine",
    date: "May 24 – Jun 15, 2026",
    time: "",
  },
  {
    month: "MAY",
    day: "30",
    title: "Men Through Mary Retreat",
    organization: "Mid-Atlantic Knights of Immaculata",
    date: "May 30, 2026",
    time: "8:00 AM",
  },
  {
    month: "JUN",
    day: "03",
    title: "Family Prayer Evening",
    organization: "Militia of Immaculata Village",
    date: "Jun 3, 2026",
    time: "7:00 PM",
  },
  {
    month: "JUN",
    day: "07",
    title: "Pro-Life Prayer Vigil",
    organization: "Life Runners",
    date: "Jun 7, 2026",
    time: "9:00 AM",
  },
];

const categories = [
    { id: "pro-life", name: "Pro-Life", icon: <Heart size={34} strokeWidth={1.8} /> },
    { id: "youth", name: "Youth", icon: <GiDove size={34} strokeWidth={1.8} /> },
    { id: "family", name: "Family", icon: <Users size={34} strokeWidth={1.8} /> },
    { id: "spiritual", name: "Spiritual", icon: <Cross size={34} strokeWidth={1.8} /> },
    { id: "evangelization", name: "Evangelization", icon: <Megaphone size={34} strokeWidth={1.8} /> },
    { id: "outreach", name: "Outreach", icon: <HandHeart size={34} strokeWidth={1.8} /> },
    { id: "formation", name: "Formation", icon: <ShieldCheck size={34} strokeWidth={1.8} /> },
    { id: "mission", name: "Mission", icon: <Church size={34} strokeWidth={1.8} /> }
];


export default function MinistriesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [expandedIds, setExpandedIds] = useState([]);
    const [showAllEvents, setShowAllEvents] = useState(false);
    
    // Dynamic Ministries Data State
    const [ministriesData, setMinistriesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAllMinistries, setShowAllMinistries] = useState(false);

    useEffect(() => {
        const fetchMinistries = async () => {
            setIsLoading(true);
            try {
                // Fetch up to 100 ministries for client-side display and filtering
                const res = await fetch('/api/ministries?limit=100');
                const data = await res.json();
                if (data.success) {
                    // Filter out Draft and Pending from public view
                    const activeMinistries = data.ministries.filter(m => m.status !== 'Draft' && m.status !== 'Pending');
                    
                    const mapped = activeMinistries.map(m => ({
                        id: m._id,
                        name: m.name,
                        category: m.category || 'Mission',
                        description: m.shortDescription || m.fullDescription || m.missionStatement || '',
                        website: m.website || '',
                        logo: m.logoUrl || '/images/mini1.webp',
                    }));
                    setMinistriesData(mapped);
                }
            } catch (error) {
                console.error("Error fetching ministries:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMinistries();
    }, []);

    const toggleExpand = (id) => {
        setExpandedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Filter ministries based on search and category
    const filteredMinistries = ministriesData.filter(ministry => {
        const matchesSearch = ministry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ministry.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || (ministry.category || '').toLowerCase().includes(selectedCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    // Sort ministries alphabetically
    const sortedMinistries = [...filteredMinistries].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    const displayedMinistries = showAllMinistries ? sortedMinistries : sortedMinistries.slice(0, 9);

    return (
        <div className="min-h-screen bg-white">
            {/* Top Banner */}
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
          Find a Ministry
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
          Search Catholic ministries, apostolates, outreach organizations and faith communities across Southeast Pennsylvania.
        </p>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-10 mt-12 max-w-5xl">

          {/* Events */}

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

          {/* Ministries */}

          <div className="flex items-start gap-4">

            <LayoutGrid
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
                8
              </h3>

              <p
                style={{
                  color: "#31456A",
                  fontSize: "15px",
                }}
              >
                Categories
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

            {/* Floating Search Bar */}
            <div className="max-w-[700px] mx-auto px-6 -mt-9 relative z-10">
                <div className="bg-white rounded-[14px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#E8EDF5] p-2 flex items-center">
                    <Search size={22} className="text-[#3157C9] ml-4 mr-3" />
                    <input
                        type="text"
                        placeholder="Search ministries, apostolates, missions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 py-3 outline-none text-[#5F6C84] text-[15px] bg-transparent placeholder-[#9BA5B7]"
                    />
                </div>
            </div>

            {/* Categories Section */}
            <section className=" mx-auto px-28 pt-12 pb-8">

                <h2
                    className="mb-5"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#1E3A8A",
                    }}
                >
                    Browse by Category
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">

                    {categories.map((ministry, index) => (

                        <button
                            key={ministry.id}
                            onClick={() =>
                                setSelectedCategory(
                                    selectedCategory === ministry.name
                                        ? ""
                                        : ministry.name
                                )
                            }
                            className="group transition-all duration-300"
                            style={{
                                background: "#fff",
                                border:
                                    selectedCategory === ministry.name
                                        ? "1.5px solid #D6A646"
                                        : "1px solid #E8EDF5",
                                borderRadius: "12px",
                                height: "95px",
                                boxShadow:
                                    selectedCategory === ministry.name
                                        ? "0 6px 18px rgba(214,166,70,.12)"
                                        : "0 2px 8px rgba(15,23,42,.04)",
                            }}
                        >
                            <div className="flex flex-col items-center justify-center h-full">

                                <div
                                    className="text-[30px] transition-transform group-hover:scale-110"
                                    style={{
                                        color:
                                            ministry.color || (index % 2 === 0 ? "#D6A646" : "blue"),
                                    }}
                                >
                                    {ministry.icon}
                                </div>

                                <p
                                    className="mt-2 px-1"
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        color: "#243B63",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    {ministry.name}
                                </p>

                            </div>
                        </button>

                    ))}

                </div>

                {selectedCategory && (

                    <div className="text-center mt-4">

                        <button
                            onClick={() => setSelectedCategory("")}
                            className="text-sm font-medium hover:underline"
                            style={{
                                color: "#1E3A8A",
                            }}
                        >
                            Clear filter
                        </button>

                    </div>

                )}

            </section>

            {/* Ministry Directory */}
            <section className=" mx-auto px-28 pb-12">

                {/* Header */}

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-[30px] font-bold font-serif text-[#1F2D5A]">
                        All Ministries
                    </h2>

                    <div className="flex items-center gap-2">
                        <span className="text-[13px] text-gray-500 font-medium">
                            Sort by:
                        </span>

                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border border-gray-300 rounded-md text-[13px] font-semibold text-[#1F2D5A] px-3 py-2 outline-none bg-white"
                        >
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </div>

                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                    {isLoading ? (
                        <div className="col-span-full py-12 text-center text-[#4B5563] text-[15px] font-medium">
                            Loading ministries...
                        </div>
                    ) : displayedMinistries.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-[#4B5563] text-[15px] font-medium">
                            No ministries found matching your criteria.
                        </div>
                    ) : displayedMinistries.map((ministry) => (

                        <div
                            key={ministry.id}
                            className="bg-white border border-[#E5E7EB] rounded-lg p-5 hover:shadow-md transition duration-300"
                        >

                            <div className="flex gap-4">

                                {/* Logo */}

                                <div className="w-[68px] h-[68px] rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 bg-white">

                                    {/* Replace with actual logo */}

                                    <img
                                        src="/images/mini1.webp"
                                        alt=""
                                        className="w-12 h-12 object-contain"
                                    />

                                </div>

                                {/* Content */}

                                <div className="flex-1">

                                  <div>
                                      <h3 className="text-[20px] leading-5 font-bold text-[#20376D]">
                                          {ministry.name}
                                      </h3>

                                      <span className="inline-flex mt-2 text-[10px] uppercase tracking-wide px-2 py-[2px] rounded bg-[#F7E8C2] text-[#9A6B00] font-semibold">
                                          {ministry.category}
                                      </span>
                                  </div>

                                    <div>
                                        <p className={`text-[13px] text-[#4B5563] leading-[20px] mt-2 ${expandedIds.includes(ministry.id) ? "" : "line-clamp-2"}`}>
                                            {ministry.description}
                                        </p>
                                        <button 
                                            onClick={() => toggleExpand(ministry.id)}
                                            className="text-[12px] text-[#3157C9] font-medium mt-1 hover:underline outline-none"
                                        >
                                            {expandedIds.includes(ministry.id) ? "Less" : "More"}
                                        </button>
                                    </div>

                                    <Link
                                        href={ministry.website || `/ministries/${ministry.id}`}
                                        target={ministry.website ? "_blank" : undefined}
                                        rel={ministry.website ? "noopener noreferrer" : undefined}
                                        className="inline-flex items-center gap-1 mt-3 text-[#1E4AA8] text-[13px] font-semibold hover:underline"
                                    >
                                        View Profile
                                        <span>→</span>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {sortedMinistries.length > 9 && (
                    <div className="flex justify-center mt-8">
                        <button 
                            onClick={() => setShowAllMinistries(!showAllMinistries)}
                            className="border border-[#9EB3DB] text-[#20376D] font-semibold text-[14px] px-8 py-3 rounded-md hover:bg-[#F5F8FD] transition"
                        >
                            {showAllMinistries ? "Show Less" : "View All Ministries"}
                        </button>
                    </div>
                )}

            </section>

            {/* Working Together & Events */}
            <section className=" mx-auto px-28 pb-12">
                <div className="grid lg:grid-cols-2 gap-6">
<div className="bg-white border border-[#E8EDF5] rounded-2xl p-6 shadow-sm">

  {/* Heading */}

  <h3
    style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "30px",
      fontWeight: 700,
      color: "#1E3A8A",
    }}
  >
    Working Together
  </h3>

  <p
    className="mt-1 mb-5"
    style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: "15px",
      color: "#6B7280",
    }}
  >
    Discover ministries related to your interests.
  </p>

  {/* Cards */}

  <div className="border border-[#E8EDF5] rounded-xl overflow-hidden">

    <div className="grid grid-cols-3">

      {/* Card 1 */}

      <div className="p-6 border-r border-[#E8EDF5]">

        <div className="text-[#D6A646] text-4xl mb-4">
          <Heart/>
        </div>

        <h4
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "#1E3A8A",
            lineHeight: "1.4",
          }}
        >
          Interested in
          <br />
          Pro-Life?
        </h4>

        <div className="mt-5 space-y-2">

          <p className="text-sm text-[#243B63]">
            A Baby's Breath
          </p>

          <p className="text-sm text-[#243B63]">
            Gianna Center
          </p>

          <p className="text-sm text-[#243B63]">
            Life Runners
          </p>

        </div>

        <button className="mt-5 text-[#3157C9] text-sm font-semibold">
          Explore →
        </button>

      </div>

      {/* Card 2 */}

      <div className="p-6 border-r border-[#E8EDF5]">

        <div className="text-[#5B6EE8] text-4xl mb-4">
          <Users/>
        </div>

        <h4
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "#1E3A8A",
            lineHeight: "1.4",
          }}
        >
          Interested in
          <br />
          Family?
        </h4>

        <div className="mt-5 space-y-2">

          <p className="text-sm text-[#243B63]">
            Gianna Center
          </p>

          <p className="text-sm text-[#243B63]">
            Militia of Immaculata Village
          </p>

          <p className="text-sm text-[#243B63]">
            Domestic Church Families
          </p>

        </div>

        <button className="mt-5 text-[#3157C9] text-sm font-semibold">
          Explore →
        </button>

      </div>

      {/* Card 3 */}

      <div className="p-6">

        <div className="text-[#7C4DDB] text-4xl mb-4">
          <Megaphone/>
        </div>

        <h4
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "#1E3A8A",
            lineHeight: "1.4",
          }}
        >
          Interested in
          <br />
          Evangelization?
        </h4>

        <div className="mt-5 space-y-2">

          <p className="text-sm text-[#243B63]">
            House of God's Light
          </p>

          <p className="text-sm text-[#243B63]">
            In His Sign Ministry
          </p>

          <p className="text-sm text-[#243B63]">
            Pastoral Missionaries
          </p>

        </div>

        <button className="mt-5 text-[#3157C9] text-sm font-semibold">
          Explore →
        </button>

      </div>

    </div>

  </div>

</div>

<div className="bg-white border border-[#E8EDF5] rounded-2xl p-6 shadow-sm">

  {/* Header */}

  <div className="flex justify-between items-start mb-5">

    <div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "30px",
          fontWeight: 700,
          color: "#1E3A8A",
        }}
      >
        Upcoming Events
      </h3>

      <p
        className="mt-1"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: "#6B7280",
        }}
      >
        See what's happening across our ministries.
      </p>
    </div>

    <Link
      href="/events"
      className="flex items-center gap-2 text-sm font-semibold"
      style={{
        color: "#3157C9",
      }}
    >
      View Full Calendar
      <ArrowRight size={15} />
    </Link>

  </div>

  {/* Events */}

  <div className="space-y-3">

    {upcomingEvents.slice(0, showAllEvents ? upcomingEvents.length : 2).map((event, idx) => (

      <div
        key={idx}
        className="border border-[#E8EDF5] rounded-xl px-4 py-3 hover:bg-[#FAFBFD] transition"
      >

        <div className="flex items-center justify-between">

          <div className="flex gap-5">

            {/* Date */}

            <div className="w-[58px] text-center flex-shrink-0">

              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#1E3A8A",
                  letterSpacing: "1px",
                }}
              >
                {event.month}
              </p>

              <p
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  lineHeight: "1",
                  color: "#1E3A8A",
                }}
              >
                {event.day}
              </p>

            </div>

            {/* Content */}

            <div>

              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#1E3A8A",
                }}
              >
                {event.title}
              </h4>

              <p
                className="mt-1"
                style={{
                  fontSize: "14px",
                  color: "#5F6C84",
                  fontWeight: 500,
                }}
              >
                {event.organization}
              </p>

              <div className="flex items-center gap-2 mt-1">

                <MapPin
                  size={13}
                  color="#7A869A"
                />

                <span
                  style={{
                    fontSize: "13px",
                    color: "#7A869A",
                  }}
                >
                  {event.date} • {event.time}
                </span>

              </div>

            </div>

          </div>

          <ChevronRight
            size={22}
            color="#3157C9"
          />

        </div>

      </div>

    ))}
    
    {upcomingEvents.length > 2 && (
      <button 
        onClick={() => setShowAllEvents(!showAllEvents)}
        className="w-full mt-2 py-2 text-center text-sm font-semibold text-[#3157C9] hover:bg-[#FAFBFD] rounded-xl border border-[#E8EDF5] transition"
      >
        {showAllEvents ? "Show less" : "Show more"}
      </button>
    )}

  </div>

</div>
                </div>
            </section>

            {/* CTA Section */}
<section className=" mx-auto px-28 pb-16">
  <div
    className="border border-[#F0E8D8] rounded-2xl px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-6"
    style={{
      background: "#F8F4EA",
    }}
  >
    {/* Left */}

    <div className="flex items-center gap-6">

      {/* Icon */}

      <div
        className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: "#082B63",
        }}
      >
        <HandHeart
          size={38}
          strokeWidth={2}
          style={{
            color: "#D6A646",
          }}
        />
      </div>

      {/* Text */}

      <div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "38px",
            fontWeight: 700,
            color: "#1E3A8A",
            lineHeight: "1.2",
          }}
        >
          Is Your Ministry Missing?
        </h3>

        <p
          className="mt-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            color: "#4B5563",
            lineHeight: "1.7",
          }}
        >
          Help strengthen Catholic collaboration across Southeast
          Pennsylvania.
          <br />
          Apply to join The Upper Room Ministry Hub.
        </p>
      </div>
    </div>

    {/* Button */}

    <button
      className="transition-all hover:scale-[1.02]"
      style={{
        background: "#082B63",
        color: "#fff",
        width: "250px",
        height: "58px",
        borderRadius: "10px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: "18px",
        boxShadow: "0 4px 12px rgba(8,43,99,.15)",
      }}
    >
      Apply to Join
    </button>
  </div>
</section>

     
        </div>
    );
}