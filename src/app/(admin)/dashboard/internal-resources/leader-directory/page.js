
// export default function LeaderDirectoryPage() {
//     return (
//         <div className="w-full h-[calc(100vh-80px)] overflow-auto bg-[#F7F9FC]">
//             <img
//                 src="/images/leader-directory1.png"
//                 alt="Leader Directory"
//                 className="w-full h-full object-fill"
//             />
//         </div>
//     );
// }

// app/leader-directory/page.js
"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Building2,
  UserCog,
  ShieldCheck,
  Search,
  Filter,
  Plus,
  Download,
  Mail,
  Phone,
  MapPin,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Undo2,
  Redo2,
  Pencil,
} from "lucide-react";

const roleBadge = {
  "Ministry Head": "bg-blue-50 text-blue-600",
  Leader: "bg-green-50 text-green-600",
  Coordinator: "bg-purple-50 text-purple-600",
  "Youth Leader": "bg-orange-50 text-orange-600",
  Director: "bg-red-50 text-red-500",
};

const leaders = [
  {
    name: "George Taylor",
    role: "Ministry Head",
    ministry: "Upper Room Ministry",
    email: "george@upperroom.org",
    phone: "(410) 555-1234",
    avatar: "/images/man1.jpg",
  },
  {
    name: "John Smith",
    role: "Leader",
    ministry: "House of God's Light",
    email: "john@hogl.org",
    phone: "(410) 555-2345",
    avatar: "/images/man2.jpg",
  },
  {
    name: "Mary Johnson",
    role: "Coordinator",
    ministry: "Family Life Ministry",
    email: "mary@familylife.org",
    phone: "(410) 555-3456",
    avatar: "/images/girl1.avif",
  },
  {
    name: "David Williams",
    role: "Youth Leader",
    ministry: "Arise! Youth Ministry",
    email: "david@ariseyouth.org",
    phone: "(410) 555-4567",
    avatar: "/images/man3.jpg",
  },
  {
    name: "Sarah Brown",
    role: "Director",
    ministry: "Faith Formation Ministry",
    email: "sarah@formation.org",
    phone: "(410) 555-5678",
    avatar: "/images/girl2.jpg",
  },
  {
    name: "Michael Lee",
    role: "Coordinator",
    ministry: "Worship Ministry",
    email: "michael@worship.org",
    phone: "(410) 555-6789",
    avatar: "/images/man4.webp",
  },
  {
    name: "Lisa Martinez",
    role: "Leader",
    ministry: "Outreach Ministry",
    email: "lisa@outreach.org",
    phone: "(410) 555-7890",
    avatar: "/images/girl3.jpg",
  },
  {
    name: "Daniel Kim",
    role: "Leader",
    ministry: "Media Ministry",
    email: "daniel@media.org",
    phone: "(410) 555-8901",
    avatar: "/images/man5.jpg",
  },
];

function StatCard({ icon, color, value, label }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900 leading-tight">{value}</div>
        <div className="text-sm text-slate-500">{label}</div>
      </div>
    </div>
  );
}

function SelectBox({ label }) {
  return (
    <button className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 min-w-[140px]">
      <span>{label}</span>
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}

function LeaderCard({ leader, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border bg-white p-5 flex flex-col items-center text-center transition ${
        active
          ? "border-blue-500 ring-1 ring-blue-500/30 bg-blue-50/30"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className={`rounded-full p-1 ${active ? "ring-2 ring-blue-500" : ""}`}>
        <img
          src={leader.avatar}
          alt={leader.name}
          className="h-20 w-20 rounded-full object-cover"
        />
      </div>
      <h3 className="mt-3 font-semibold text-slate-900">{leader.name}</h3>
      <span
        className={`mt-2 inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
          roleBadge[leader.role]
        }`}
      >
        {leader.role}
      </span>
      <p className="mt-2 text-sm text-slate-600">{leader.ministry}</p>
      <div className="mt-3 w-full space-y-1.5 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5" />
          <span className="truncate">{leader.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5" />
          <span>{leader.phone}</span>
        </div>
      </div>
      <button className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-blue-600 hover:bg-slate-50">
        View Profile
      </button>
    </div>
  );
}

function ProfilePanel({ leader, onClose }) {
  return (
    <aside className="w-[440px] shrink-0 border-l border-slate-200 bg-white p-5 relative ml-auto h-screen sticky top-0 overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
      >
        <X className="h-5 w-5" />
      </button>
      <h2 className="font-semibold text-slate-900 mb-4">Leader Profile</h2>
      <div className="rounded-xl border border-slate-200 p-5">
        <div className="flex flex-col items-center text-center relative">
          <button className="absolute right-0 top-0 text-slate-400">
            <X className="h-4 w-4" />
          </button>
          <div className="relative">
            <img
              src={leader.avatar}
              alt={leader.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <span className="absolute -right-14 top-2 rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
              Active
            </span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-900">
            {leader.name}
          </h3>
          <span
            className={`mt-2 rounded-md px-2 py-0.5 text-xs font-medium ${
              roleBadge[leader.role]
            }`}
          >
            {leader.role}
          </span>
          <p className="mt-2 text-sm text-slate-600">{leader.ministry}</p>
        </div>

        <Section title="Contact Information">
          <Row icon={<Mail className="h-4 w-4" />} text={leader.email} />
          <Row icon={<Phone className="h-4 w-4" />} text={leader.phone} />
          <Row
            icon={<MapPin className="h-4 w-4" />}
            text="123 Faith Way, Baltimore, MD 21201"
          />
        </Section>

        <Section title="Ministry Details">
          <DetailRow label="Role" value={leader.role} />
          <DetailRow label="Ministry" value={leader.ministry} />
          <DetailRow label="Joined" value="Jan 15, 2022" />
        </Section>

        <Section title="Areas of Service">
          <div className="flex flex-wrap gap-2">
            {[
              "Leadership",
              "Ministry Planning",
              "Team Building",
              "Evangelization",
              "Discipleship",
            ].map((t) => (
              <span
                key={t}
                className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600"
              >
                {t}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Notes">
          <p className="text-sm text-slate-600">
            Oversees all ministry activities and team development initiatives.
          </p>
        </Section>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Pencil className="h-4 w-4" /> Edit Profile
        </button>
      </div>
    </aside>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-5 border-t border-slate-100 pt-4">
      <h4 className="mb-2 text-sm font-semibold text-slate-900">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <span className="text-slate-400">{icon}</span>
      {text}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex text-sm">
      <span className="w-20 text-slate-500">{label}</span>
      <span className="text-slate-900">{value}</span>
    </div>
  );
}

export default function LeaderDirectory() {
  const [selected, setSelected] = useState(0);
  const [panelOpen, setPanelOpen] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [ministryFilter, setMinistryFilter] = useState("All Ministries");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("Active");

  const uniqueMinistries = ["All Ministries", ...Array.from(new Set(leaders.map(l => l.ministry)))];
  const uniqueRoles = ["All Roles", ...Array.from(new Set(leaders.map(l => l.role)))];

  const filteredLeaders = leaders.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.ministry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMinistry = ministryFilter === "All Ministries" || l.ministry === ministryFilter;
    const matchesRole = roleFilter === "All Roles" || l.role === roleFilter;
    
    return matchesSearch && matchesMinistry && matchesRole;
  });

  useEffect(() => {
    setPanelOpen(false);
    setSelected(0);
  }, [searchQuery, ministryFilter, roleFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex">
      <main className="flex-1 p-8 ">
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Leader Directory
            </h1>
            <p className="text-slate-500 mt-1">
              Connect with ministry leaders, coordinators and administrators.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-[#003eba] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              <Plus className="h-4 w-4 stroke-5" /> Add Leader
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#003eba] hover:bg-slate-50">
              <Download className="h-4 w-4 stroke-3" /> Export Directory
            </button>
          </div>
        </div>

<div className="grid grid-cols-4 gap-4 mb-5">

  {/* Total Leaders */}
  <div className="bg-white border border-[#E8EDF5] rounded-xl h-[92px] px-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center shrink-0">
      <Users size={24} strokeWidth={2} className="text-[#2453D4]" />
    </div>

    <div>
      <h3 className="text-[32px] leading-none font-bold text-[#1E2A5A]">
        24
      </h3>
      <p className="text-[14px] font-semibold text-[#6B7280] mt-1">
        Total Leaders
      </p>
    </div>
  </div>

  {/* Ministries */}
  <div className="bg-white border border-[#E8EDF5] rounded-xl h-[92px] px-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-[#EDF9F1] flex items-center justify-center shrink-0">
      <Building2 size={24} strokeWidth={2} className="text-[#23914D]" />
    </div>

    <div>
      <h3 className="text-[32px] leading-none font-bold text-[#1E2A5A]">
        18
      </h3>
      <p className="text-[14px] font-semibold text-[#6B7280] mt-1">
        Ministries
      </p>
    </div>
  </div>

  {/* Coordinators */}
  <div className="bg-white border border-[#E8EDF5] rounded-xl h-[92px] px-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-[#F5F0FF] flex items-center justify-center shrink-0">
      <UserCog size={24} strokeWidth={2} className="text-[#7C3AED]" />
    </div>

    <div>
      <h3 className="text-[32px] leading-none font-bold text-[#1E2A5A]">
        12
      </h3>
      <p className="text-[14px] font-semibold text-[#6B7280] mt-1">
        Coordinators
      </p>
    </div>
  </div>

  {/* Administrators */}
  <div className="bg-white border border-[#E8EDF5] rounded-xl h-[92px] px-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-[#FFF6EB] flex items-center justify-center shrink-0">
      <ShieldCheck size={24} strokeWidth={2} className="text-[#F59E0B]" />
    </div>

    <div>
      <h3 className="text-[32px] leading-none font-bold text-[#1E2A5A]">
        5
      </h3>
      <p className="text-[14px] font-semibold text-[#6B7280] mt-1">
        Administrators
      </p>
    </div>
  </div>

</div>


<div className="bg-white border border-[#E8EDF5] rounded-xl p-3 mb-6">
  <div className="flex gap-3">

    {/* Search */}
    <div className="relative flex-1">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
      />

      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search leader by name, email, or ministry..."
        className="
          w-full
          h-[42px]
          pl-11
          pr-4
          rounded-lg
          border
          border-[#E8EDF5]
          bg-white
          text-[14px]
          outline-none
          focus:border-[#2453D4]
        "
      />
    </div>

    {/* Ministry */}
    <select
      value={ministryFilter}
      onChange={(e) => setMinistryFilter(e.target.value)}
      className="
        h-[42px]
        min-w-[150px]
        px-4
        rounded-lg
        border
        border-[#E8EDF5]
        text-[14px]
        text-[#334155]
        bg-white
        outline-none
      "
    >
      {uniqueMinistries.map(m => <option key={m} value={m}>{m}</option>)}
    </select>

    {/* Roles */}
    <select
      value={roleFilter}
      onChange={(e) => setRoleFilter(e.target.value)}
      className="
        h-[42px]
        min-w-[130px]
        px-4
        rounded-lg
        border
        border-[#E8EDF5]
        text-[14px]
        text-[#334155]
        bg-white
        outline-none
      "
    >
      {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
    </select>

    {/* Status */}
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="
        h-[42px]
        min-w-[110px]
        px-4
        rounded-lg
        border
        border-[#E8EDF5]
        text-[14px]
        text-[#334155]
        bg-white
        outline-none
      "
    >
      <option>Active</option>
      <option>Inactive</option>
    </select>

    {/* Filter Button */}
    <button
      className="
        h-[42px]
        px-4
        rounded-lg
        border
        border-[#E8EDF5]
        bg-white
        flex
        items-center
        gap-2
        text-[14px]
        font-medium
        text-[#334155]
      "
    >
      <Filter size={16} />
      Filters
    </button>

  </div>
</div>

        <div className="grid grid-cols-4 gap-4">
          {filteredLeaders.length > 0 ? filteredLeaders.map((l, i) => (
            <LeaderCard
              key={l.name}
              leader={l}
              active={i === selected && panelOpen}
              onClick={() => {
                setSelected(i);
                setPanelOpen(true);
              }}
            />
          )) : (
            <div className="col-span-4 text-center py-10 text-slate-500">
              No leaders found matching your criteria.
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between text-sm">
          <span className="text-slate-500">Showing {filteredLeaders.length} leaders</span>
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-md border border-slate-200 bg-white flex items-center justify-center">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 rounded-md bg-blue-600 text-white font-medium">
              1
            </button>
            <button className="h-9 w-9 rounded-md border border-slate-200 bg-white">
              2
            </button>
            
          </div>
          <SelectBox label="8 per page" />
        </div>
      </main>

      {panelOpen && filteredLeaders[selected] && (
        <ProfilePanel leader={filteredLeaders[selected]} onClose={() => setPanelOpen(false)} />
      )}
    </div>
  );
}