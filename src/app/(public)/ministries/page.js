// app/ministries/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/src/components/layout/Navbar';
import { ArrowRight, Bird, CalendarDays, ChevronRight, Church, Cross, Grid2x2, HandHeart, Heart, MapPin, Megaphone, Menu, ShieldCheck, User2, Users, Search, LayoutGrid } from 'lucide-react';
import { GiDove } from "react-icons/gi";
import { FaDashcube } from 'react-icons/fa';
// Sample ministry data - replace with your actual data source
const ministriesData = [
    {
        id: 1,
        name: "A Baby's Breath",
        category: "Pro-Life",
        description: "A Baby's Breath offers a variety of services aimed at supporting mothers, fathers, and families during challenging times. These services include in-person counseling to help mothers navigate the emotional and practical aspects of crisis pregnancy. A Baby Store is available for essential items for newborns and children. They also provide parenting classes and prenatal education to help families prepare for the arrival of the newborn. A Baby's Breath has 6 Philadelphia locations.",
        iconColor: "bg-blue-100",
        textColor: "text-blue-700",
        bgIcon: "bg-blue-50",
        image: "/images/ministries/baby-breath.jpg",
        logo: "/images/mini1.webp",
        website: "https://ababysbreath.org"
    },
    {
        id: 2,
        name: "Society of Saint Vincent de Paul",
        category: "Mission",
        description: "The Society of St. Vincent de Paul is a worldwide organization of volunteer lay Catholics following Christ’s call to serve the poor, the suffering, and the deprived. Volunteers not only provide material assistance such as rent, utilities, food, or clothing, but also help with needed resources, referral information, friendship, and most importantly, prayer. We assist all people in need, regardless of religious beliefs, ethnic or social background, age, or gender.",
        iconColor: "bg-indigo-100",
        textColor: "text-indigo-700",
        bgIcon: "bg-indigo-50",
        image: "/images/ministries/mission.jpg",
        logo: "/images/mini1.webp",
        website: "https://ssvpusa.org/"
    },
    {
        id: 3,
        name: "Bishop Shanahan HS Theology Dept.",
        category: "Youth",
        description: "Bishop Shanahan High School, a Catholic co-educational secondary school of the Archdiocese of Phila., provides a strong spiritual life, along with challenging academic and rich extracurricular programs. A strong witness to Christian values and commitment to academic rigor and integrity prepare all students to be critical thinkers and moral stewards in a rapidly evolving global world.",
        iconColor: "bg-pink-100",
        textColor: "text-pink-700",
        bgIcon: "bg-pink-50",
        image: "/images/ministries/youth.jpg",
        logo: "/images/mini1.webp",
        website: "https://www.shanahan.org"
    },
    {
        id: 4,
        name: "Gianna Center of Philadelphia",
        category: "Family",
        description: "The Gianna Center of Philadelphia provides general gynecologic care, natural family planning education and infertility services - all while honoring the sanctity of each human life, the dignity of women and the integrity of marriage. All medical treatments are aimed at restoring the reproductive system and working cooperatively with a woman's body.",
        iconColor: "bg-green-100",
        textColor: "text-green-700",
        bgIcon: "bg-green-50",
        image: "/images/ministries/gianna-center.jpg",
        logo: "/images/mini1.webp",
        website: "https://www.phgiannacenter.org"
    },
    {
        id: 5,
        name: "House of God's Light",
        category: "Evangelization",
        description: "HOGL's mission is to make wholehearted disciples of Jesus and to see the Church renewed with growing disciples who are equipped to advance God's kingdom in the world. We build a community that embodies the values of a wholehearted disciple: As a community, we choose to spend our lives in adoration, honor, and praise to God. We seek to display the unity of the Body of Christ by loving one another deeply. We hunger to respond to God's Word in prayer and use our spiritual gifts to encourage one another. We follow the Jesus in our community and in the world by interceding, equipping, giving, and going.",
        iconColor: "bg-purple-100",
        textColor: "text-purple-700",
        bgIcon: "bg-purple-50",
        image: "/images/ministries/gods-light.jpg",
        logo: "/images/mini1.webp",
        website: "https://www.houseofgodslight.com"
    },
    {
        id: 6,
        name: "In His Sign Ministry",
        category: "Evangelization",
        description: "IN HIS SIGN NETWORK is a radio and communications ministry of lay Catholics proclaiming the Good News of Jesus Christ in obedience to the Magisterium of the Roman Catholic Church. The mission is to communicate Catholic Christian moral principles in accordance with the authority of the Church primarily through radio and the Internet. In His Sign Network has adopted as our patron Saint Maximilian Maria Kolbe, one of the greatest spiritual communicators of the twentieth century.",
        iconColor: "bg-yellow-100",
        textColor: "text-yellow-700",
        bgIcon: "bg-yellow-50",
        image: "/images/ministries/evangelization.jpg",
        logo: "/images/mini1.webp",
        website: "https://www.inhissign.com"
    },
    {
        id: 7,
        name: "Intelligent Design for Catholics",
        category: "Formation",
        description: "Fifty percent of the millions leaving the faith give science as the reason. By that, they mean Darwinian evolution. Intelligent design theory argues that macroevolution is a \"theory in crisis.\" In ministry, Tim discusses why many feel that this is a crucial issue to people of faith in our modern era while demonstrating that all life is designed by an evident designer who Christians acknowledge as the God of creation.",
        iconColor: "bg-teal-100",
        textColor: "text-teal-700",
        bgIcon: "bg-teal-50",
        image: "/images/ministries/formation.jpg",
        logo: "/images/mini1.webp",
        website: "https://app.screencast.com/QblucGFR5e5X4"
    },
    {
        id: 8,
        name: "Life Runners",
        category: "Pro-Life",
        description: "We believe in the dignity of all human life from conception to natural death. We run as a Prayer, to defend children in the womb. We run to build Endurance, for the race is long and we must keep our eyes fixed on You Lord. We run for Awareness, so our culture will view all human life as a reflection of Your glory Lord. We run for Charity, to provide support for mothers and fathers tempted to abort their child, and healing support for post-abortion women. We run to End abortion, for Christ died so that all may live.",
        iconColor: "bg-red-100",
        textColor: "text-red-700",
        bgIcon: "bg-red-50",
        image: "/images/ministries/pro-life.jpg",
        logo: "/images/mini1.webp",
        website: "https://www.liferunners.org"
    },
    {
        id: 9,
        name: "Mid-Atlantic Knights of Immaculata",
        category: "Men",
        description: "The Militia Immaculata is a world-wide organization started by St. Maximillian Kolbe in 1917. Its mission is to bring souls to Christ through total consecration to Mary. The local MI of the Mid-Atlantic sponsors an annual retreat of over 300 men at the Malvern Retreat House. The goal of this retreat is to lead men to Christ through Mary, thereby helping them to become holy fathers, husbands and leaders.",
        iconColor: "bg-orange-100",
        textColor: "text-orange-700",
        bgIcon: "bg-orange-50",
        image: "/images/ministries/men.jpg",
        logo: "/images/mini1.webp",
        website: "https://www.facebook.com"
    }
];
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
    { id: "formation", name: "Formation", icon: <Cross size={34} strokeWidth={1.8} /> },
    { id: "evangelization", name: "Evangelization", icon: <Megaphone size={34} strokeWidth={1.8} /> },
    { id: "outreach", name: "Outreach", icon: <HandHeart size={34} strokeWidth={1.8} /> },
    { id: "men", name: "Men", icon: <ShieldCheck size={34} strokeWidth={1.8} /> },
    { id: "mission", name: "Mission", icon: <Church size={34} strokeWidth={1.8} /> }
];

// const upcomingEvents = [
//     { date: "May 24", title: "Eucharistic Miracles Exhibit", time: "6:30 PM" },
//     { date: "May 30", title: "Men Through Mary Retreat", time: "9:00 AM" },
//     { date: "June 03", title: "Family Prayer Evening", time: "7:00 PM" }
// ];

export default function MinistriesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [expandedIds, setExpandedIds] = useState([]);
    const [showAllEvents, setShowAllEvents] = useState(false);

    const toggleExpand = (id) => {
        setExpandedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Filter ministries based on search and category
    const filteredMinistries = ministriesData.filter(ministry => {
        const matchesSearch = ministry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ministry.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || ministry.category === selectedCategory;
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

                    {categories.map((category, index) => (

                        <button
                            key={category.id}
                            onClick={() =>
                                setSelectedCategory(
                                    selectedCategory === category.name
                                        ? ""
                                        : category.name
                                )
                            }
                            className="group transition-all duration-300"
                            style={{
                                background: "#fff",
                                border:
                                    selectedCategory === category.name
                                        ? "1.5px solid #D6A646"
                                        : "1px solid #E8EDF5",
                                borderRadius: "12px",
                                height: "95px",
                                boxShadow:
                                    selectedCategory === category.name
                                        ? "0 6px 18px rgba(214,166,70,.12)"
                                        : "0 2px 8px rgba(15,23,42,.04)",
                            }}
                        >
                            <div className="flex flex-col items-center justify-center h-full">

                                <div
                                    className="text-[30px] transition-transform group-hover:scale-110"
                                    style={{
                                        color:
                                            category.color || (index % 2 === 0 ? "#D6A646" : "blue"),
                                    }}
                                >
                                    {category.icon}
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
                                    {category.name}
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

                    {sortedMinistries.map((ministry) => (

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

                                    <div className="flex flex-wrap items-center gap-2">

                                        <h3 className="text-[20px] leading-5 font-bold text-[#20376D]">
                                            {ministry.name}
                                        </h3>

                                        <span className="text-[10px] uppercase tracking-wide px-2 py-[2px] rounded bg-[#F7E8C2] text-[#9A6B00] font-semibold">
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

                <div className="flex justify-center mt-8">

                    <button className="border border-[#9EB3DB] text-[#20376D] font-semibold text-[14px] px-8 py-3 rounded-md hover:bg-[#F5F8FD] transition">
                        View All Ministries
                    </button>

                </div>

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