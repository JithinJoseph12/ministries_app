
// export default function SharedResourcesPage() {
//     return (
//         <div className="w-full h-[calc(100vh-80px)] overflow-auto bg-[#F7F9FC]">
//             <img
//                 src="/images/shared-resources1.png"
//                 alt="Leader Directory"
//                 className="w-full h-full object-fill"
//             />
//         </div>
//     );
// }

// app/shared-resources/page.js
"use client";
import { useState } from "react";
import {
  Folder,
  FolderPlus,
  Upload,
  Users,
  Download,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  X,
  UploadCloud,
  FileText,
} from "lucide-react";

const fileIcon = (kind) => {
  const map = {
    pdf: { label: "PDF", bg: "bg-red-50", fg: "text-red-500" },
    doc: { label: "WORD", bg: "bg-blue-50", fg: "text-blue-600" },
    xls: { label: "XLS", bg: "bg-green-50", fg: "text-green-600" },
    ppt: { label: "PPT", bg: "bg-orange-50", fg: "text-orange-500" },
  };
  const m = map[kind];
  return (
    <div
      className={`flex h-10 w-9 flex-col items-center justify-end rounded-sm ${m.bg} relative overflow-hidden`}
    >
      <FileText
        className={`absolute inset-0 m-auto h-7 w-7 ${m.fg}`}
        strokeWidth={1.5}
      />
      <span className={`relative z-10 mb-0.5 text-[7px] font-bold ${m.fg}`}>
        {m.label}
      </span>
    </div>
  );
};

const folders = [
  { name: "Ministry Templates", count: 24, color: "text-amber-500" },
  { name: "Event Planning", count: 18, color: "text-amber-500" },
  { name: "Evangelization", count: 15, color: "text-amber-500" },
  { name: "Volunteer Training", count: 12, color: "text-amber-500" },
  { name: "Marketing Resources", count: 10, color: "text-amber-500" },
  { name: "Faith Formation", count: 15, color: "text-amber-500" },
  { name: "Finance & Admin", count: 8, color: "text-amber-500" },
  { name: "Worship & Music", count: 11, color: "text-amber-500" },
];

const catTone = {
  amber: "bg-amber-50 text-amber-600",
  blue: "bg-blue-50 text-blue-600",
  violet: "bg-violet-50 text-violet-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-500",
  rose: "bg-rose-50 text-rose-500",
  teal: "bg-teal-50 text-teal-600",
  slate: "bg-slate-100 text-slate-600",
};

const resources = [
  {
    name: "Ministry Startup Guide.pdf",
    icon: "pdf",
    cat: "Guide",
    tone: "amber",
    owner: "George Admin",
    downloads: 542,
    short: "May 18",
    long: "May 18, 2026",
  },
  {
    name: "Event Checklist.pdf",
    icon: "pdf",
    cat: "Checklists",
    tone: "blue",
    owner: "Mary Johnson",
    downloads: 678,
    short: "May 16",
    long: "May 16, 2026",
  },
  {
    name: "Volunteer Training Manual.docx",
    icon: "doc",
    cat: "Training",
    tone: "violet",
    owner: "Sarah Brown",
    downloads: 321,
    short: "May 12",
    long: "May 12, 2026",
  },
  {
    name: "Ministry Budget Template.xlsx",
    icon: "xls",
    cat: "Templates",
    tone: "green",
    owner: "George Admin",
    downloads: 298,
    short: "May 10,",
    long: "May 10, 2026",
  },
  {
    name: "Social Media Guidelines.pdf",
    icon: "pdf",
    cat: "Guidelines",
    tone: "orange",
    owner: "Daniel Kim",
    downloads: 186,
    short: "May 8",
    long: "May 8, 2026",
  },
  {
    name: "Retreat Planning Guide.pptx",
    icon: "ppt",
    cat: "Planning",
    tone: "rose",
    owner: "Lisa Martinez",
    downloads: 243,
    short: "May 5",
    long: "May 5, 2026",
  },
  {
    name: "Worship Set Planning.docx",
    icon: "doc",
    cat: "Worship",
    tone: "teal",
    owner: "Michael Lee",
    downloads: 167,
    short: "May 3",
    long: "May 3, 2026",
  },
  {
    name: "Ministry Vision Document.pdf",
    icon: "pdf",
    cat: "Documents",
    tone: "slate",
    owner: "George Admin",
    downloads: 194,
    short: "Mpr 30,",
    long: "Apr 30, 2026",
  },
];

function Field({ label, required, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function Select({ placeholder, value, onChange, options = [] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 focus:border-blue-400 focus:outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function Radio({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-2 text-sm text-slate-700"
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
          checked ? "border-blue-600" : "border-slate-300"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-blue-600" />}
      </span>
      {label}
    </button>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <button
        onClick={onChange}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function ResourcesPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [folder, setFolder] = useState("");
  const [visibility, setVisibility] = useState("leaders");
  const [description, setDescription] = useState("");
  const [allowDownload, setAllowDownload] = useState(true);
  const [pinTop, setPinTop] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUpload = () => {
    setTitle("");
    setCategory("");
    setFolder("");
    setVisibility("leaders");
    setDescription("");
    setAllowDownload(true);
    setPinTop(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [visibilityFilter, setVisibilityFilter] = useState("All Visibility");
  const [sortFilter, setSortFilter] = useState("Latest");

  const uniqueCategories = ["All Categories", ...Array.from(new Set(resources.map(r => r.cat)))];
  
  const filteredResources = resources.filter(r => {
    const searchMatch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        r.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const catMatch = categoryFilter === "All Categories" || r.cat === categoryFilter;
    // For now all resources are hardcoded to "Leaders" visibility, but we handle the filter anyway
    const visMatch = visibilityFilter === "All Visibility" || visibilityFilter === "Leaders";
    
    return searchMatch && catMatch && visMatch;
  }).sort((a, b) => {
    if (sortFilter === "Latest") {
      return new Date(b.long) - new Date(a.long);
    } else {
      return new Date(a.long) - new Date(b.long);
    }
  });

  return (
    <div
      className="min-h-screen bg-[#FDFDFD] p-6 text-slate-800 relative"
    >
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-[400px] flex-col items-center rounded-xl bg-white p-8 text-center shadow-2xl">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-800">Uploaded Successfully</h2>
            <p className="mb-6 text-sm text-slate-500">Your resource has been uploaded and is now available.</p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto flex  gap-5">
        {/* MAIN */}
        <div className="flex-1 space-y-5 items-center">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-5">
            <div>
              <h1 className="text-[26px] font-extrabold tracking-tight text-blue-950">
                Shared Resources & Toolkits
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Shared documents, templates, guides and ministry resources.
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <button className="flex items-center gap-2 rounded-md border border-[#003eba] bg-white px-4 py-2.5 text-sm font-semibold text-[#003eba] shadow-sm hover:bg-blue-50">
                <Folder className="h-4 w-4" /> New Folder
              </button>
              <button className="flex items-center gap-2 rounded-md bg-[#003eba] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800">
                <Upload className="h-4 w-4" /> Upload Resource
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                icon: <Folder className="h-5 w-5" />,
                val: "128",
                label: "Total Resources",
                bg: "bg-blue-50",
                fg: "text-blue-600",
              },
              {
                icon: <Folder className="h-5 w-5" />,
                val: "24",
                label: "Total Folders",
                bg: "bg-emerald-50",
                fg: "text-emerald-600",
              },
              {
                icon: <Users className="h-5 w-5" />,
                val: "18",
                label: "Contributors",
                bg: "bg-violet-50",
                fg: "text-violet-600",
              },
              {
                icon: <Download className="h-5 w-5" />,
                val: "3,457",
                label: "Total Downloads",
                bg: "bg-orange-50",
                fg: "text-orange-500",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-slate-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-lg"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.bg} ${s.fg}`}
                >
                  {s.icon}
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-blue-950">
                    {s.val}
                  </div>
                  <div className="text-sm font-semibold text-slate-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Folders + Table */}
          <div className="flex gap-5">
            {/* Folders */}
            <aside className="w-[230px] shrink-0 rounded-xl border border-slate-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-blue-950">Folders</h3>
                <button className="text-blue-600 hover:text-blue-700">
                  <FolderPlus className="h-4 w-4" />
                </button>
              </div>
              <ul className="space-y-0">
                {folders.map((f, i) => (
                  <li
                    key={f.name}
                    className={`flex items-center gap-3 py-4  ${
                      i !== folders.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    <Folder className={`h-10 w-10 ${f.color}`} fill="currentColor" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-800">
                        {f.name}
                      </div>
                      <div className="text-[12px] font-medium text-slate-400">
                        {f.count} Resources
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-blue-200 bg-blue-50/40 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50">
                <Folder className="h-3.5 w-3.5" /> View All Folders
              </button>
            </aside>

            {/* Table */}
            <section className="flex-1 rounded-xl border border-slate-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <h2 className="mb-4 text-lg font-bold text-blue-950">
                All Resources
              </h2>
              <div className="mb-4 flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resources..."
                    className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                  />
                </div>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="flex min-w-[130px] rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 focus:outline-none focus:border-blue-400"
                >
                  {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <select
                  value={visibilityFilter}
                  onChange={(e) => setVisibilityFilter(e.target.value)}
                  className="flex min-w-[130px] rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 focus:outline-none focus:border-blue-400"
                >
                  <option value="All Visibility">All Visibility</option>
                  <option value="Leaders">Leaders</option>
                  <option value="Ministry Heads">Ministry Heads</option>
                </select>

                <select
                  value={sortFilter}
                  onChange={(e) => setSortFilter(e.target.value)}
                  className="flex min-w-[130px] rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 focus:outline-none focus:border-blue-400"
                >
                  <option value="Latest">Latest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>

              <div className="overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-y border-slate-200 bg-slate-50/60 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-3 py-3 text-left">Resource Name</th>
                      <th className="px-3 py-3 text-left">Type</th>
                      <th className="px-3 py-3 text-left">Category</th>
                      <th className="px-3 py-3 text-left">Owner</th>
                      <th className="px-3 py-3 text-left">Visibility</th>
                      <th className="px-3 py-3 text-left">Downloads</th>
                      <th className="px-3 py-3 text-left"></th>
                      <th className="px-3 py-3 text-left">Updated</th>
                      <th className="px-3 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((r) => (
                      <tr key={r.name} className="border-b border-slate-100 last:border-0">
                        <td className="px-3 py-3.5">
                          <div className="flex items-center gap-3">
                            {fileIcon(r.icon)}
                            <span className="font-semibold text-slate-800">
                              {r.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3.5"></td>
                        <td className="px-3 py-3.5">
                          <span
                            className={`rounded-md px-2.5 py-1 text-xs font-semibold ${catTone[r.tone]}`}
                          >
                            {r.cat}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-slate-700">{r.owner}</td>
                        <td className="px-3 py-3.5">
                          <span className="rounded-md bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-600">
                            Leaders 
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-slate-700">
                          {r.downloads}
                        </td>
                        <td className="px-3 py-3.5 text-slate-500">
                          {r.short}
                        </td>
                        <td className="px-3 py-3.5 text-slate-500">{r.long}</td>
                        <td className="px-3 py-3.5">
                          <MoreVertical className="h-4 w-4 text-slate-400" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Showing 1 to 8 of 128 resources
                </span>
                <div className="flex items-center gap-1">
                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold ${
                        n === 1
                          ? "bg-blue-700 text-white"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="px-1 text-slate-400">...</span>
                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                    16
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <button className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                  8 per page <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Upload sidebar */}
        <aside className="w-[320px] shrink-0 self-start rounded-xl border border-slate-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-blue-950">
              Upload Resource
            </h3>
            <button className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <Field label="Resource Title" required>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resource title"
                className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
              />
            </Field>
            <Field label="Category" required>
              <Select 
                placeholder="Select category" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={uniqueCategories.filter(c => c !== "All Categories")}
              />
            </Field>
            <Field label="Folder" required>
              <Select 
                placeholder="Select folder" 
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                options={folders.map(f => f.name)}
              />
            </Field>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Visibility <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-5">
                <Radio
                  checked={visibility === "leaders"}
                  onChange={() => setVisibility("leaders")}
                  label="Leaders Only"
                />
                <Radio
                  checked={visibility === "heads"}
                  onChange={() => setVisibility("heads")}
                  label="Ministry Heads"
                />
              </div>
            </div>

            <Field label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
                rows={3}
                className="w-full resize-none rounded-md border border-slate-200 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
              />
            </Field>

            <div>
              <label className="mb-2 block text-xs font-semibold text-blue-700">
                File Upload <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col items-center rounded-lg border-2 border-dashed border-blue-200 bg-blue-50/30 px-4 py-6 text-center">
                <UploadCloud className="mb-2 h-8 w-8 text-blue-500" strokeWidth={1.5} />
                <div className="text-sm font-semibold text-slate-700">
                  Drag & Drop file here
                </div>
                <div className="text-xs text-slate-500">or click to browse</div>
                <div className="mt-2 text-[11px] text-slate-400">
                  PDF, DOC, DOCX, XLS, PPTX
                </div>
                <div className="text-[11px] text-slate-400">
                  Max file size: 50MB
                </div>
              </div>
            </div>

            <Toggle
              label="Allow Download"
              checked={allowDownload}
              onChange={() => setAllowDownload(!allowDownload)}
            />
            <Toggle
              label="Pin to Top"
              checked={pinTop}
              onChange={() => setPinTop(!pinTop)}
            />

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => {
                  setTitle("");
                  setCategory("");
                  setFolder("");
                  setVisibility("leaders");
                  setDescription("");
                  setAllowDownload(true);
                  setPinTop(false);
                }}
                className="flex-1 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpload}
                className="flex-1 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Upload
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
