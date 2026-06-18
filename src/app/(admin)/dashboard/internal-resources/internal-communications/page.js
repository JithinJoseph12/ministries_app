
// export default function InternalCommunicationsPage() {
//     return (
//         <div className="w-full h-[calc(100vh-80px)] overflow-auto bg-[#F7F9FC]">
//             <img
//                 src="/images/internal-communications.png"
//                 alt="Leader Directory"
//                 className="w-full h-full object-fill"
//             />
//         </div>
//     );
// }

// app/internal-communication/page.js
"use client";
import {
  Lock,
  Plus,
  Megaphone,
  Users,
  HandHeart,
  BookOpen,
  Calendar,
  Eye,
  MessageSquare,
  MoreVertical,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  UploadCloud,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Using a placeholder image since heroImg import won't work in Next.js without proper setup
const heroImg = "https://images.unsplash.com/photo-1529078155058-5d716f45d604?w=1200&h=400&fit=crop";

const posts = [
  {
    icon: <Megaphone className="size-5" />,
    iconBg: "bg-indigo-100 text-indigo-600",
    title: "Leadership Update",
    desc: "Important updates regarding ministry restructuring and new initiatives.",
    author: "Upper Room Admin",
    initials: "/images/man1.jpg",
    avatarBg: "bg-amber-200 text-amber-800",
    date: "May 16, 2026",
    category: "Leadership Updates",
    catClass: "bg-indigo-50 text-indigo-700 border-indigo-100",
    views: 45,
    comments: 12,
  },
  {
    icon: <Users className="size-5" />,
    iconBg: "bg-emerald-100 text-emerald-600",
    title: "Ministry Collaboration Opportunities",
    desc: "New collaboration opportunities between youth and family ministries.",
    author: "Mary Johnson",
    initials: "/images/girl3.jpg",
    avatarBg: "bg-rose-200 text-rose-800",
    date: "May 14, 2026",
    category: "Announcements",
    catClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
    views: 32,
    comments: 8,
  },
  {
    icon: <HandHeart className="size-5" />,
    iconBg: "bg-rose-100 text-rose-600",
    title: "Prayer Request",
    desc: "Please keep the upcoming retreat in your prayers.",
    author: "David Williams",
    initials: "/images/man2.jpg",
    avatarBg: "bg-sky-200 text-sky-800",
    date: "May 12, 2026",
    category: "Prayer Requests",
    catClass: "bg-rose-50 text-rose-700 border-rose-100",
    views: 28,
    comments: 16,
  },
  {
    icon: <Calendar className="size-5" />,
    iconBg: "bg-orange-100 text-orange-600",
    title: "Upcoming Event Coordination",
    desc: "Let's coordinate our efforts for the summer outreach program.",
    author: "Lisa Martinez",
    initials: "/images/girl2.jpg",
    avatarBg: "bg-purple-200 text-purple-800",
    date: "May 10, 2026",
    category: "Events Coordination",
    catClass: "bg-orange-50 text-orange-700 border-orange-100",
    views: 22,
    comments: 7,
  },
  {
    icon: <BookOpen className="size-5" />,
    iconBg: "bg-blue-100 text-blue-600",
    title: "Formation Resource",
    desc: "New spiritual formation resources are now available.",
    author: "Michael Lee",
    initials: "/images/girl1.avif",
    avatarBg: "bg-teal-200 text-teal-800",
    date: "May 8, 2026",
    category: "Formation",
    catClass: "bg-blue-50 text-blue-700 border-blue-100",
    views: 19,
    comments: 5,
  },
];

const categories = [
  { icon: <Megaphone className="size-5" />, color: "text-indigo-600", label: "Announcements", count: 12 },
  { icon: <Users className="size-5" />, color: "text-indigo-600", label: "Leadership Updates", count: 18 },
  { icon: <HandHeart className="size-5" />, color: "text-indigo-600", label: "Prayer Requests", count: 9 },
  { icon: <BookOpen className="size-5" />, color: "text-indigo-600", label: "Formation", count: 14 },
//   { icon: <Calendar className="size-5" />, color: "text-indigo-600", label: "Events Coordination", count: 11 },
];

export default function InternalCommunications() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] px-6 py-8 text-slate-900">
      <div className="mx-auto ">
        {/* Header */}
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b pb-6 border-slate-200">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-900">
              Internal Communications
              <Lock className="size-5 text-indigo-600" />
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Internal updates, announcements and private communications.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-[#003eba] bg-white px-4 py-2.5 text-sm font-semibold text-[#003eba] hover:bg-[#e8eefd]">
              View All Posts
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#003eba] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#003eba]">
              <Plus className="size-4 stroke-4" /> New Article
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Featured */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <img
                src="/images/gathering.png"
                alt="Monthly Leadership Gathering"
                className="h-[320px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/85 via-indigo-800/70 to-indigo-700/40" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <span className="w-fit rounded-md bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                  FEATURED ANNOUNCEMENT
                </span>
                <div>
                  <h2 className="text-3xl font-bold">Monthly Leadership Gathering</h2>
                  <p className="mt-2 max-w-md text-sm text-white/85 leading-8">
                    Join us for our monthly leadership gathering to discuss ministry updates, upcoming events
                    and collaboration opportunities.
                  </p>
                  <div className="mt-4 flex items-end justify-between">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-full bg-amber-200 text-[10px] font-semibold text-amber-800">
                          UR
                        </div>
                        Posted by Upper Room Admin
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" /> May 18, 2026
                      </div>
                    </div>
                    <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle column - Categories */}
          <div className="col-span-12 lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-4 text-lg font-semibold">Communication Categories</h3>
              <ul className="divide-y divide-slate-100">
                {categories.map((c, i) => (
                  <li key={i} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                        <div className='bg-indigo-50 text-indigo-600 p-1.5 rounded-xl'><span className={c.color}>{c.icon}</span></div>
                      <span className="text-sm font-medium text-slate-800">{c.label}</span>
                    </div>
                    <span className="text-xs text-slate-500">{c.count} Posts</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-indigo-600 hover:bg-slate-50">
                View All Categories
              </button>
            </div>
          </div>

          {/* Right column - Create New Article */}
          <div className="col-span-12 lg:col-span-3 lg:row-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Create New Article</h3>
                <button className="text-slate-400 hover:text-slate-600"><X className="size-5" /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Title <span className="text-rose-500">*</span></label>
                  <input
                    placeholder="Enter article title"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Category <span className="text-rose-500">*</span></label>
                  <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-50">
                    Select category <ChevronDown className="size-4" />
                  </button>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Content <span className="text-rose-500">*</span></label>
                  <div className="overflow-hidden rounded-lg border border-slate-200">
                    <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50/50 px-2 py-1.5">
                      <button className="flex items-center gap-1 rounded px-2 py-1 text-xs hover:bg-slate-200">
                        Paragraph <ChevronDown className="size-3" />
                      </button>
                      <span className="mx-1 h-4 w-px bg-slate-200" />
                      <button className="rounded p-1.5 hover:bg-slate-200"><Bold className="size-3.5" /></button>
                      <button className="rounded p-1.5 hover:bg-slate-200"><Italic className="size-3.5" /></button>
                      <span className="mx-1 h-4 w-px bg-slate-200" />
                      <button className="rounded p-1.5 hover:bg-slate-200"><List className="size-3.5" /></button>
                      <button className="rounded p-1.5 hover:bg-slate-200"><ListOrdered className="size-3.5" /></button>
                      <button className="rounded p-1.5 hover:bg-slate-200"><LinkIcon className="size-3.5" /></button>
                    </div>
                    <textarea
                      rows={6}
                      placeholder="Write your content here..."
                      className="w-full resize-none px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Attachments</label>
                  <div className="flex flex-col items-center rounded-lg border border-dashed border-slate-300 bg-slate-50/50 px-4 py-6 text-center">
                    <UploadCloud className="size-7 text-indigo-500" />
                    <p className="mt-2 text-sm font-medium text-slate-700">Drag & drop files here</p>
                    <p className="text-xs text-slate-500">or click to browse</p>
                    <p className="mt-1 text-[11px] text-slate-400">PDF, DOC, DOCX, JPG, PNG (Max 20MB)</p>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Visibility</label>
                  <div className="flex items-center gap-5 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="vis" defaultChecked className="size-4 accent-indigo-600" />
                      Leaders Only
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="vis" className="size-4 accent-indigo-600" />
                      Ministry Heads Only
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Publish Now</span>
                  <button className="relative h-6 w-11 rounded-full bg-indigo-600">
                    <span className="absolute right-0.5 top-0.5 size-5 rounded-full bg-white shadow" />
                  </button>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-medium hover:bg-slate-50">
                    Save Draft
                  </button>
                  <button className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
                    Publish Article
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="col-span-12 lg:col-span-9">
            <h3 className="mb-3 text-lg font-semibold">Recent Posts</h3>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {posts.map((p, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-5 px-5 py-4 ${
                    i !== posts.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${p.iconBg}`}>
                    {p.icon}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-900 truncate">{p.title}</div>
                    <div className="mt-0.5 text-[13px] text-slate-500 truncate">{p.desc}</div>
                  </div>
                  
                  <div className="hidden md:block w-[200px] shrink-0">
                    <div className="text-xs text-slate-500">Posted by</div>
                    <div className="mt-1 flex items-center gap-2">
<div className="size-7 shrink-0 overflow-hidden rounded-full">
  <img
    src={p.initials}
    alt={p.name}
    className="h-full w-full object-cover"
  />
</div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">{p.author}</div>
                        <div className="text-[12px] text-slate-500">{p.date}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden lg:block w-[160px] shrink-0">
                    <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${p.catClass}`}>
                      {p.category}
                    </span>
                  </div>
                  
                  <div className="flex w-[120px] shrink-0 items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Eye className="size-4" /> {p.views}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="size-4" /> {p.comments}</span>
                    <button className="ml-auto text-slate-400 hover:text-slate-600"><MoreVertical className="size-4" /></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <button className="text-sm font-medium text-indigo-600 hover:underline">View Older Posts</button>
              <div className="flex items-center gap-1.5 text-sm">
                <button className="flex size-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
                  <ChevronLeft className="size-4" />
                </button>
                <button className="size-8 rounded-md bg-indigo-600 font-medium text-white">1</button>
                {[2, 3, 4].map((n) => (
                  <button key={n} className="size-8 rounded-md text-slate-600 hover:bg-slate-100">{n}</button>
                ))}
                <span className="px-1 text-slate-400">...</span>
                <button className="size-8 rounded-md text-slate-600 hover:bg-slate-100">10</button>
                <button className="flex size-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
