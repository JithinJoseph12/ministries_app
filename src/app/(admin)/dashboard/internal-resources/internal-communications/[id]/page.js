"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Bookmark,
  MoreVertical,
  Calendar,
  Clock,
  Eye,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  CornerDownRight,
  X,
  Trash2
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function ArticleDetails({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchComments = async (sort = sortBy) => {
    try {
      const res = await fetch(`/api/articles/${id}/comments?sort=${sort}`);
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
        setCurrentUserRole(data.userRole);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${id}`);
        const data = await res.json();
        if (data.success) {
          setArticle(data.article);
          setRelatedArticles(data.relatedArticles || []);
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticle();
      fetchComments();
    }
  }, [id]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/articles/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          parentCommentId: replyingTo ? replyingTo._id : null
        })
      });
      const data = await res.json();
      if (data.success) {
        setNewComment("");
        setReplyingTo(null);
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleLike = async (commentId) => {
    // Optimistic UI update
    setComments(prevComments => {
      const updateLikes = (list) => list.map(c => {
        if (c._id === commentId) {
          return { ...c, hasLiked: !c.hasLiked, likes: c.hasLiked ? c.likes.slice(1) : [...c.likes, "dummy"] };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: updateLikes(c.replies) };
        }
        return c;
      });
      return updateLikes(prevComments);
    });

    try {
      const res = await fetch(`/api/articles/comments/${commentId}/like`, { method: "POST" });
      const data = await res.json();
      if (!data.success) {
        fetchComments();
      } else {
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
      fetchComments();
    }
  };

  const handleDeleteComment = (commentId) => {
    setCommentToDelete(commentId);
    setActiveDropdown(null);
  };

  const confirmDeleteComment = async () => {
    if (!commentToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/articles/comments/${commentToDelete}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchComments();
        setToast({ show: true, message: "Comment deleted successfully", type: "success" });
      } else {
        setToast({ show: true, message: data.message || "Failed to delete comment", type: "error" });
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
      setToast({ show: true, message: "An error occurred while deleting the comment", type: "error" });
    } finally {
      setIsDeleting(false);
      setCommentToDelete(null);
      setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FDFDFD]">
        <div className="text-slate-500">Loading article...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#FDFDFD]">
        <div className="text-xl font-semibold text-slate-800">Article Not Found</div>
        <button
          onClick={() => router.back()}
          className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const dateStr = new Date(article.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  const timeStr = new Date(article.createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit'
  });

  const authorName = article.createdBy ? `${article.createdBy.firstName} ${article.createdBy.lastName}` : "Upper Room Admin";

  return (
    <div className="min-h-screen bg-[#FDFDFD] px-12 py-8 text-slate-900">
      <div className="mx-auto">

        {/* Header Breadcrumb & Actions */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm  text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="size-4" /> Back to All Posts
          </button>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
              Edit Post
            </button>
            <button className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
              <Bookmark className="size-4" />
            </button>
            <button className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
              <MoreVertical className="size-4" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-4 inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-[#1850c0] uppercase tracking-wider">
              {article.category}
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-slate-900">
              {article.title}
            </h1>

            {article.shortDescription && (
              <p className="text-lg leading-relaxed text-slate-500 mb-8">
                {article.shortDescription}
              </p>
            )}

            <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="size-6 overflow-hidden rounded-full bg-slate-200">
                  <img src={article.image || "/images/man1.jpg"} alt="Author" className="h-full w-full object-cover" />
                </div>
                <span>By <span className="font-medium text-slate-700">{authorName}</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4" /> {dateStr}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4" /> 5 min read
              </div>

              <div className="ml-auto flex items-center gap-4">
                <span className="flex items-center gap-1"><Eye className="size-4" /> 0</span>
                <span className="flex items-center gap-1"><MessageSquare className="size-4" /> {comments.length + comments.reduce((acc, curr) => acc + curr.replies.length, 0)}</span>
              </div>
            </div>

            <div className="mb-8 overflow-hidden rounded-2xl">
              <img
                src="/images/blog.png"
                alt="Post cover"
                className="h-[400px] w-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed">
              <p className="text-lg leading-relaxed text-slate-600 mb-8 whitespace-pre-wrap">
                {article.content}
              </p>

              {/* Dummy formatted sections matching screenshot for visual effect */}
              {/* <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 m-0">Ministry Restructuring</h3>
              </div>
              
              <p className="mb-4">
                After much prayer and consideration, we are excited to announce a restructuring of our ministry teams to better align with our mission and vision. This restructuring will help us:
              </p>
              
              <ul className="space-y-3 pl-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-indigo-600" />
                  <span className="text-slate-600">Improve communication across all ministry departments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-indigo-600" />
                  <span className="text-slate-600">Enhance collaboration and resource sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-indigo-600" />
                  <span className="text-slate-600">Better serve our community's diverse needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-indigo-600" />
                  <span className="text-slate-600">Create more opportunities for volunteer involvement</span>
                </li>
              </ul> */}
            </div>

            {/* Comments Section */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Comments ({comments.length + comments.reduce((acc, curr) => acc + curr.replies.length, 0)})</h3>
                <div className="relative group cursor-pointer flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      fetchComments(e.target.value);
                    }}
                    className="appearance-none bg-transparent pr-4 cursor-pointer outline-none"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  <ChevronDown className="size-4 absolute right-0 pointer-events-none" />
                </div>
              </div>

              {/* Comment Input */}
              <div className="mb-8 flex flex-col gap-2">
                {replyingTo && (
                  <div className="flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 w-fit rounded-full">
                    <CornerDownRight className="size-3" />
                    Replying to {replyingTo.createdBy?.firstName} {replyingTo.createdBy?.lastName}
                    <button onClick={() => setReplyingTo(null)} className="ml-1 hover:text-indigo-800"><X className="size-3" /></button>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="size-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
                    <img src="/images/man1.jpg" alt="Current User" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex gap-3 relative">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handlePostComment();
                      }}
                      placeholder="Write a comment..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      onClick={handlePostComment}
                      disabled={isSubmitting || !newComment.trim()}
                      className="shrink-0 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {isSubmitting ? "Posting..." : "Post Comment"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {(showAllComments ? comments : comments.slice(0, 3)).map((comment) => (
                  <div key={comment._id} className="flex flex-col gap-4">
                    {/* Parent Comment */}
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                        {`${comment.createdBy?.firstName?.[0] || ""}${comment.createdBy?.lastName?.[0] || ""}` || "U"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-semibold text-sm text-slate-900">{comment.createdBy?.firstName} {comment.createdBy?.lastName}</span>
                            <span className="ml-3 text-xs text-slate-500">{timeAgo(comment.createdAt)}</span>
                          </div>
                          <div className="relative">
                            <button 
                              onClick={() => setActiveDropdown(activeDropdown === comment._id ? null : comment._id)}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              <MoreVertical className="size-4" />
                            </button>
                            {activeDropdown === comment._id && currentUserRole === 'superadmin' && (
                              <div className="absolute right-0 top-6 z-10 w-32 rounded-md bg-white py-1 shadow-lg border border-slate-100">
                                <button 
                                  onClick={() => handleDeleteComment(comment._id)}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-slate-600 whitespace-pre-wrap">
                          {comment.content}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-xs font-medium text-slate-500">
                          <button onClick={() => { setReplyingTo(comment); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} className="hover:text-slate-800">Reply</button>
                          <button
                            onClick={() => handleToggleLike(comment._id)}
                            className={`flex items-center gap-1 transition-transform duration-200 hover:scale-110 active:scale-90 ${comment.hasLiked ? 'text-indigo-600' : 'hover:text-slate-800'}`}
                          >
                            <ThumbsUp className={`size-3 ${comment.hasLiked ? 'fill-current' : ''}`} /> {comment.likes?.length || 0}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Replies (1-level deep) */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-14 space-y-5 border-l-2 border-slate-100 pl-5">
                        {comment.replies.map((reply) => (
                          <div key={reply._id} className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                              {(`${reply.createdBy?.firstName?.[0] || ""}${reply.createdBy?.lastName?.[0] || ""}` || "U").toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <span className="font-bold text-slate-900 text-sm">{reply.createdBy?.firstName} {reply.createdBy?.lastName}</span>
                                  <span className="ml-3 text-xs text-slate-500">{timeAgo(reply.createdAt)}</span>
                                </div>
                                <div className="relative">
                                  <button 
                                    onClick={() => setActiveDropdown(activeDropdown === reply._id ? null : reply._id)}
                                    className="text-slate-400 hover:text-slate-600"
                                  >
                                    <MoreVertical className="size-4" />
                                  </button>
                                  {activeDropdown === reply._id && currentUserRole === 'superadmin' && (
                                    <div className="absolute right-0 top-6 z-10 w-32 rounded-md bg-white py-1 shadow-lg border border-slate-100">
                                      <button 
                                        onClick={() => handleDeleteComment(reply._id)}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-slate-600 whitespace-pre-wrap">
                                {reply.content}
                              </p>
                              <div className="mt-2 flex items-center gap-4 text-xs font-medium text-slate-500">
                                <button onClick={() => { setReplyingTo(comment); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} className="hover:text-slate-800">Reply</button>
                                <button
                                  onClick={() => handleToggleLike(reply._id)}
                                  className={`flex items-center gap-1 transition-transform duration-200 hover:scale-110 active:scale-90 ${reply.hasLiked ? 'text-indigo-600' : 'hover:text-slate-800'}`}
                                >
                                  <ThumbsUp className={`size-3 ${reply.hasLiked ? 'fill-current' : ''}`} /> {reply.likes?.length || 0}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {comments.length === 0 && (
                  <div className="text-center py-6 text-sm text-slate-500">
                    No comments yet. Be the first to share your thoughts!
                  </div>
                )}
              </div>

              {comments.length > 3 && (
                <div className="mt-6">
                  <button 
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    {showAllComments ? (
                      <>Show less <ChevronUp className="size-4" /></>
                    ) : (
                      <>View all {comments.length + comments.reduce((acc, curr) => acc + curr.replies.length, 0)} comments <ChevronDown className="size-4" /></>
                    )}
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Post Details Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="mb-5 text-lg font-bold text-slate-900">Post Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500">Category :</span>
                    <span className="inline-flex rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 size-4.5 text-slate-400" />
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-500 mb-0.5">Published :</div>
                    <div className="text-sm font-medium text-slate-700">{dateStr} at {timeStr}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4.5 text-slate-400" />
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-500 mb-0.5">Last Updated :</div>
                    <div className="text-sm font-medium text-slate-700">{dateStr} at {timeStr}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-500 mb-0.5">Author :</div>
                    <div className="text-sm font-medium text-slate-700">{authorName}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4.5 text-slate-400" />
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-500 mb-1">Status :</div>
                    <span className="inline-flex rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                      Published
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Eye className="mt-0.5 size-4.5 text-slate-400" />
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-500 mb-0.5">Views :</div>
                    <div className="text-sm font-medium text-slate-700">45</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 size-4.5 text-slate-400" />
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-500 mb-0.5">Comments :</div>
                    <div className="text-sm font-medium text-slate-700">{comments.length + comments.reduce((acc, curr) => acc + curr.replies.length, 0)}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-500 mb-0.5">Reading Time :</div>
                    <div className="text-sm font-medium text-slate-700">5 min read</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Posts Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="mb-5 text-lg font-bold text-slate-900">Related Posts</h3>
              <div className="space-y-5">
                {relatedArticles.length > 0 ? relatedArticles.map((rel) => (
                  <div
                    key={rel._id}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => router.push(`/dashboard/internal-resources/internal-communications/${rel._id}`)}
                  >
                    <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <img src="/images/gathering.png" alt="thumbnail" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {rel.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-2 text-[10px]">
                        <span className="rounded bg-indigo-50 px-1.5 py-0.5 font-medium text-indigo-600">
                          {rel.category}
                        </span>
                        <span className="text-slate-400">
                          {new Date(rel.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-sm text-slate-500">No related posts found.</div>
                )}
              </div>
            </div>

            {/* Share This Post Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="mb-1 text-lg font-bold text-slate-900">Share This Post</h3>
              <p className="mb-5 text-sm text-slate-500">Help spread the word</p>
              <div className="flex items-center gap-2">
                <button className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors">
                  <FaFacebook className="size-4" />
                </button>
                <button className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors">
                  <FaTwitter className="size-4" />
                </button>
                <button className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors">
                  <FaLinkedin className="size-4" />
                </button>
                <button className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors ml-auto">
                  <LinkIcon className="size-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {commentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-[400px] flex-col items-center rounded-xl bg-white p-8 text-center shadow-2xl">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Trash2 className="size-8" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-800">Delete Comment</h2>
            <p className="mb-6 text-sm text-slate-500">Are you sure you want to delete this comment? This action cannot be undone.</p>
            <div className="flex w-full gap-3">
              <button
                onClick={() => setCommentToDelete(null)}
                disabled={isDeleting}
                className="flex-1 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteComment}
                disabled={isDeleting}
                className="flex-1 rounded-md bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
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
    </div>
  );
}
