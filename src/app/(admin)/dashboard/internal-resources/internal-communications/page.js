"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Trash2,
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

const categories = [
  { icon: <Megaphone className="size-5" />, color: "text-indigo-600", label: "Announcements", count: 12 },
  { icon: <Users className="size-5" />, color: "text-indigo-600", label: "Leadership Updates", count: 18 },
  { icon: <HandHeart className="size-5" />, color: "text-indigo-600", label: "Prayer Requests", count: 9 },
  { icon: <BookOpen className="size-5" />, color: "text-indigo-600", label: "Formation", count: 14 },
  //   { icon: <Calendar className="size-5" />, color: "text-indigo-600", label: "Events Coordination", count: 11 },
];

const getCategoryStyles = (category) => {
  switch (category) {
    case 'Announcements':
      return {
        icon: <Megaphone className="size-5" />,
        iconBg: "bg-indigo-100 text-indigo-600",
        catClass: "bg-indigo-50 text-indigo-700 border-indigo-100"
      };
    case 'Leadership Updates':
      return {
        icon: <Users className="size-5" />,
        iconBg: "bg-emerald-100 text-emerald-600",
        catClass: "bg-emerald-50 text-emerald-700 border-emerald-100"
      };
    case 'Prayer Requests':
      return {
        icon: <HandHeart className="size-5" />,
        iconBg: "bg-rose-100 text-rose-600",
        catClass: "bg-rose-50 text-rose-700 border-rose-100"
      };
    case 'Formation':
      return {
        icon: <BookOpen className="size-5" />,
        iconBg: "bg-blue-100 text-blue-600",
        catClass: "bg-blue-50 text-blue-700 border-blue-100"
      };
    default:
      return {
        icon: <Megaphone className="size-5" />,
        iconBg: "bg-slate-100 text-slate-600",
        catClass: "bg-slate-50 text-slate-700 border-slate-100"
      };
  }
};

export default function InternalCommunications() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("leaders");
  const [publishNow, setPublishNow] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(true);

  const [isPublishing, setIsPublishing] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchArticles = async (page = 1) => {
    setIsLoadingPosts(true);
    try {
      const res = await fetch(`/api/articles?page=${page}&limit=5`);
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles);
        setCurrentPage(data.pagination.page);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePublish = async () => {
    if (!title || !shortDescription || !category || !content) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsPublishing(true);
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          shortDescription,
          category,
          content,
          visibility,
          status: publishNow ? 'published' : 'draft',
          image: '/images/blog.png'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      setTitle("");
      setShortDescription("");
      setCategory("");
      setContent("");
      setVisibility("leaders");
      setPublishNow(true);
      setShowCreateForm(false);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
      fetchArticles(1);
    } catch (error) {
      console.error(error);
      alert('Error creating article. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = (id) => {
    setArticleToDelete(id);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;

    try {
      const res = await fetch(`/api/articles/${articleToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        fetchArticles(currentPage);
        showToastMessage("Article deleted successfully", "success");
      } else {
        showToastMessage(data.message || 'Failed to delete article', "error");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      showToastMessage('Error deleting article', "error");
    } finally {
      setArticleToDelete(null);
    }
  };

  const showToastMessage = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] px-6 py-8 text-slate-900 relative">
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-[400px] flex-col items-center rounded-xl bg-white p-8 text-center shadow-2xl">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-800">Published Successfully</h2>
            <p className="mb-6 text-sm text-slate-500">Your article has been published and is now live.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-[400px] flex-col items-center rounded-xl bg-white p-8 text-center shadow-2xl">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Trash2 className="size-8" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-800">Delete Article</h2>
            <p className="mb-6 text-sm text-slate-500">Are you sure you want to delete this article? This action cannot be undone.</p>
            <div className="flex w-full gap-3">
              <button
                onClick={() => setArticleToDelete(null)}
                className="flex-1 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-md bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg transition-all ${toast.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'}`}>
          {toast.type === 'error' ? <X className="size-4" /> : <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
          {toast.message}
        </div>
      )}

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
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 rounded-lg bg-[#003eba] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#003eba]"
            >
              {showCreateForm ? <X className="size-4 stroke-4" /> : <Plus className="size-4 stroke-4" />}
              {!showCreateForm && "New Article"}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Featured */}
          <div className={`col-span-12 ${showCreateForm ? 'lg:col-span-6' : 'lg:col-span-9'}`}>
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
          {showCreateForm && (
            <div className="col-span-12 lg:col-span-3 lg:row-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Create New Article</h3>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Title <span className="text-rose-500">*</span></label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter article title"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Short Description <span className="text-rose-500">*</span></label>
                    <textarea
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      rows={2}
                      placeholder="Enter a short summary..."
                      className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Category <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      >
                        <option value="" disabled className="text-slate-400">Select category</option>
                        {categories.map((c) => (
                          <option key={c.label} value={c.label}>{c.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    </div>
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
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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
                        <input
                          type="radio"
                          name="vis"
                          checked={visibility === "leaders"}
                          onChange={() => setVisibility("leaders")}
                          className="size-4 accent-indigo-600"
                        />
                        Visible to All
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="vis"
                          checked={visibility === "heads"}
                          onChange={() => setVisibility("heads")}
                          className="size-4 accent-indigo-600"
                        />
                        Super Admins Only
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Publish Now</span>
                    <button
                      onClick={() => setPublishNow(!publishNow)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${publishNow ? "bg-indigo-600" : "bg-slate-300"
                        }`}
                    >
                      <span
                        className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform ${publishNow ? "right-0.5" : "left-0.5"
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-medium hover:bg-slate-50">
                      Save Draft
                    </button>
                    <button
                      onClick={handlePublish}
                      disabled={isPublishing}
                      className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {isPublishing ? 'Publishing...' : 'Publish Article'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Posts */}
          <div className={`col-span-12 ${showCreateForm ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
            <h3 className="mb-3 text-lg font-semibold">Recent Posts</h3>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {isLoadingPosts ? (
                <div className="p-8 text-center text-sm text-slate-500">Loading posts...</div>
              ) : articles.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">No posts found. Create one above!</div>
              ) : (
                articles.map((p, i) => {
                  const styles = getCategoryStyles(p.category);
                  const dateStr = new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  return (
                    <div
                      key={p._id || i}
                      onClick={() => router.push(`/dashboard/internal-resources/internal-communications/${p._id}`)}
                      className={`flex items-center gap-5 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors ${i !== articles.length - 1 ? "border-b border-slate-100" : ""
                        }`}
                    >
                      <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${styles.iconBg}`}>
                        {styles.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-900 truncate">{p.title}</div>
                        <div className="mt-0.5 text-[13px] text-slate-500 truncate">{p.shortDescription || p.content}</div>
                      </div>

                      <div className="hidden md:block w-[200px] shrink-0">
                        <div className="text-xs text-slate-500">Posted by</div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="size-7 shrink-0 overflow-hidden rounded-full">
                            <img
                              src={p.image || "/images/man1.jpg"}
                              alt="Author"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-900 truncate">
                              {p.createdBy ? `${p.createdBy.firstName} ${p.createdBy.lastName}` : "Upper Room Admin"}
                            </div>
                            <div className="text-[12px] text-slate-500">{dateStr}</div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden lg:block w-[160px] shrink-0">
                        <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${styles.catClass}`}>
                          {p.category}
                        </span>
                      </div>

                      <div className="flex w-[140px] shrink-0 items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Eye className="size-4" /> 0</span>
                        <span className="flex items-center gap-1"><MessageSquare className="size-4" /> {p.commentCount || 0}</span>
                        <div className="ml-auto flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(p._id);
                            }}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="size-4" />
                          </button>
                          <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="size-4" /></button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <button 
                  onClick={() => fetchArticles(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="text-sm font-medium text-indigo-600 hover:underline disabled:opacity-50 disabled:hover:no-underline"
                >
                  View Older Posts
                </button>
                <div className="flex items-center gap-1.5 text-sm">
                  <button 
                    onClick={() => fetchArticles(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex size-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button 
                      key={n} 
                      onClick={() => fetchArticles(n)}
                      className={`size-8 rounded-md font-medium ${n === currentPage ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      {n}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => fetchArticles(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex size-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
                <button 
                  onClick={() => fetchArticles(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-sm font-medium text-indigo-600 hover:underline disabled:opacity-50 disabled:hover:no-underline"
                >
                  View Newer Posts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
