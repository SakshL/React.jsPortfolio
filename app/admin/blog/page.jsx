"use client";

import { DocumentTextIcon, PlusIcon, PencilIcon, TrashIcon, EyeIcon, CalendarIcon, UserIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";

export default function BlogManagementPage() {
 const [posts, setPosts] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState("");
 const [sortBy, setSortBy] = useState("publishedAt");
 const [showDeleteModal, setShowDeleteModal] = useState(null);

 const loadBlogPosts = async () => {
  try {
   const response = await fetch("/api/admin/blog");
   if (response.ok) {
    const data = await response.json();
    setPosts(data);
   }
  } catch (error) {
   console.error("Failed to load blog posts:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  loadBlogPosts();
 }, []);

 const deleteBlogPost = async (slug) => {
  try {
   const response = await fetch("/api/admin/blog", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug }),
   });

   if (response.ok) {
    setPosts(posts.filter((post) => post.slug !== slug));
    setShowDeleteModal(null);
   }
  } catch (error) {
   console.error("Failed to delete blog post:", error);
  }
 };

 const filteredAndSortedPosts = posts
  .filter((post) => post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || post.summary?.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
   if (sortBy === "publishedAt") {
    return new Date(b.publishedAt) - new Date(a.publishedAt);
   }
   if (sortBy === "title") {
    return a.title.localeCompare(b.title);
   }
   if (sortBy === "wordCount") {
    return b.wordCount - a.wordCount;
   }
   return 0;
  });

 const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
   year: "numeric",
   month: "short",
   day: "numeric",
  });
 };

 const getReadingTime = (wordCount) => {
  return Math.ceil(wordCount / 200);
 };

 if (loading) {
  return (
   <AdminLayout>
    <div className="flex h-64 items-center justify-center">
     <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
    </div>
   </AdminLayout>
  );
 }

 return (
  <AdminLayout>
   <div className="space-y-8">
    {/* Header */}
    <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
     <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
       <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900">
        <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
       </div>
       <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Management</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your blog posts and articles</p>
       </div>
      </div>

      <button onClick={() => (window.location.href = "/admin/blog/new")} className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
       <PlusIcon className="h-5 w-5" />
       <span>New Post</span>
      </button>
     </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
     <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
       <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
        <DocumentTextIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
       </div>
       <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{posts.length}</p>
       </div>
      </div>
     </div>

     <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
       <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
        <ClockIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
       </div>
       <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Reading Time</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{posts.length > 0 ? Math.round(posts.reduce((acc, post) => acc + getReadingTime(post.wordCount), 0) / posts.length) : 0} min</p>
       </div>
      </div>
     </div>

     <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
       <div className="rounded-lg bg-orange-100 p-3 dark:bg-orange-900">
        <span className="text-xl">📝</span>
       </div>
       <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Words</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{posts.reduce((acc, post) => acc + post.wordCount, 0).toLocaleString()}</p>
       </div>
      </div>
     </div>
    </div>

    {/* Filters and Search */}
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
     <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="max-w-md flex-1">
       <input type="text" placeholder="Search posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
      </div>

      <div className="flex items-center space-x-4">
       <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        <option value="publishedAt">Sort by Date</option>
        <option value="title">Sort by Title</option>
        <option value="wordCount">Sort by Word Count</option>
       </select>
      </div>
     </div>
    </div>

    {/* Blog Posts List */}
    <div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
     {filteredAndSortedPosts.length === 0 ? (
      <div className="p-12 text-center">
       <DocumentTextIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
       <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">{searchTerm ? "No posts found" : "No blog posts yet"}</h3>
       <p className="mb-6 text-gray-500 dark:text-gray-400">{searchTerm ? "Try adjusting your search terms" : "Create your first blog post to get started"}</p>
       {!searchTerm && (
        <button onClick={() => (window.location.href = "/admin/blog/new")} className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
         Create First Post
        </button>
       )}
      </div>
     ) : (
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
       {filteredAndSortedPosts.map((post) => (
        <div key={post.slug} className="p-6 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700">
         <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
           <div className="mb-2 flex items-center space-x-3">
            <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h3>
            <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">Published</span>
           </div>

           <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{post.summary}</p>

           <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
             <CalendarIcon className="h-4 w-4" />
             <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
             <UserIcon className="h-4 w-4" />
             <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
             <ClockIcon className="h-4 w-4" />
             <span>{getReadingTime(post.wordCount)} min read</span>
            </div>
            <div>
             <span>{post.wordCount} words</span>
            </div>
           </div>
          </div>

          <div className="ml-6 flex items-center space-x-2">
           <button onClick={() => window.open(`/blog/${post.slug}`, "_blank")} className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20" title="View Post">
            <EyeIcon className="h-5 w-5" />
           </button>
           <button onClick={() => (window.location.href = `/admin/blog/edit/${post.slug}`)} className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20" title="Edit Post">
            <PencilIcon className="h-5 w-5" />
           </button>
           <button onClick={() => setShowDeleteModal(post)} className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20" title="Delete Post">
            <TrashIcon className="h-5 w-5" />
           </button>
          </div>
         </div>
        </div>
       ))}
      </div>
     )}
    </div>

    {/* Delete Confirmation Modal */}
    {showDeleteModal && (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 dark:bg-gray-800">
       <div className="mb-4 flex items-center space-x-3">
        <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
         <TrashIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <div>
         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Blog Post</h3>
         <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
        </div>
       </div>

       <p className="mb-6 text-gray-600 dark:text-gray-400">
        Are you sure you want to delete <strong>"{showDeleteModal.title}"</strong>?
       </p>

       <div className="flex space-x-3">
        <button onClick={() => setShowDeleteModal(null)} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
         Cancel
        </button>
        <button onClick={() => deleteBlogPost(showDeleteModal.slug)} className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700">
         Delete
        </button>
       </div>
      </div>
     </div>
    )}
   </div>
  </AdminLayout>
 );
}
