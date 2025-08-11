"use client";

import { DocumentTextIcon, EyeIcon, CodeBracketIcon, BookmarkIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import AdminLayout from "../../../../../components/admin/AdminLayout";

export default function EditBlogPostPage() {
 const router = useRouter();
 const params = useParams();
 const [loading, setLoading] = useState(false);
 const [postLoading, setPostLoading] = useState(true);
 const [previewMode, setPreviewMode] = useState(false);
 const [formData, setFormData] = useState({
  title: "",
  slug: "",
  author: "Sakshyam Baral",
  publishedAt: new Date().toISOString().split("T")[0],
  summary: "",
  image: "",
  content: "",
  status: "published",
 });

 // Load existing post data
 useEffect(() => {
  const loadPost = async () => {
   try {
    const response = await fetch("/api/admin/blog");
    if (response.ok) {
     const posts = await response.json();
     const post = posts.find((p) => p.slug === params.slug || p.id === params.slug);
     if (post) {
      setFormData({
       title: post.title || "",
       slug: post.slug || "",
       author: post.author || "Sakshyam Baral",
       publishedAt: post.publishedAt ? post.publishedAt.split("T")[0] : new Date().toISOString().split("T")[0],
       summary: post.summary || "",
       image: post.image || "",
       content: post.content || "",
       status: post.status || "published",
      });
     }
    }
   } catch (error) {
    console.error("Failed to load post:", error);
   } finally {
    setPostLoading(false);
   }
  };
  loadPost();
 }, [params.slug]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
   const response = await fetch("/api/admin/blog", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     id: params.slug,
     slug: params.slug,
     title: formData.title,
     content: formData.content,
     tags: [],
     status: formData.status,
     author: formData.author,
     publishedAt: formData.publishedAt,
     summary: formData.summary,
     image: formData.image,
    }),
   });

   if (response.ok) {
    router.push("/admin/blog");
   } else {
    const error = await response.json();
    // eslint-disable-next-line no-alert
    alert("Error: " + error.error);
   }
  } catch (error) {
   // eslint-disable-next-line no-alert
   alert("Error updating blog post: " + error.message);
  } finally {
   setLoading(false);
  }
 };

 const handleChange = (field, value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
 };

 const getWordCount = () => {
  return formData.content.split(/\s+/).filter((word) => word.length > 0).length;
 };

 const getReadingTime = () => {
  return Math.ceil(getWordCount() / 200);
 };

 if (postLoading) {
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
   <div className="mx-auto max-w-6xl space-y-6">
    {/* Header */}
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
     <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
       <button onClick={() => router.push("/admin/blog")} className="rounded-lg p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-300">
        <ArrowLeftIcon className="h-5 w-5" />
       </button>
       <div className="flex items-center space-x-3">
        <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900">
         <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
         <h1 className="text-xl font-bold text-gray-900 dark:text-white">Edit Blog Post</h1>
         <p className="text-sm text-gray-500 dark:text-gray-400">Update your article</p>
        </div>
       </div>
      </div>

      <div className="flex items-center space-x-3">
       <div className="hidden text-sm text-gray-500 dark:text-gray-400 sm:flex sm:items-center sm:space-x-4">
        <span>{getWordCount()} words</span>
        <span>·</span>
        <span>{getReadingTime()} min read</span>
       </div>
       <button onClick={() => setPreviewMode(!previewMode)} className="inline-flex items-center space-x-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
        {previewMode ? <CodeBracketIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        <span>{previewMode ? "Edit" : "Preview"}</span>
       </button>
      </div>
     </div>
    </div>

    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
     {/* Main Content */}
     <div className="space-y-6 lg:col-span-2">
      {/* Title */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
       <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
       <input type="text" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg font-semibold placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" placeholder="Enter your blog post title..." />
      </div>

      {/* Content */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
       <div className="mb-3 flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
        <span className="text-sm text-gray-500 dark:text-gray-400">{previewMode ? "Preview Mode" : "Markdown Mode"}</span>
       </div>

       {previewMode ? (
        <div className="prose max-w-none rounded-lg border border-gray-200 bg-gray-50 p-6 dark:prose-invert dark:border-gray-600 dark:bg-gray-900">
         <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, "<br>") }} />
        </div>
       ) : (
        <textarea value={formData.content} onChange={(e) => handleChange("content", e.target.value)} rows={20} className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" placeholder="Start writing your blog post content here..." />
       )}
      </div>
     </div>

     {/* Sidebar */}
     <div className="space-y-6">
      {/* Publish Settings */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
       <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
        <BookmarkIcon className="mr-2 h-5 w-5" />
        Publish Settings
       </h3>

       <div className="space-y-4">
        <div>
         <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
         <select value={formData.status} onChange={(e) => handleChange("status", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
          <option value="published">Published</option>
          <option value="draft">Draft</option>
         </select>
        </div>

        <div>
         <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
         <input type="text" value={formData.author} onChange={(e) => handleChange("author", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
        </div>

        <div>
         <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Publish Date</label>
         <input type="date" value={formData.publishedAt} onChange={(e) => handleChange("publishedAt", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
        </div>
       </div>
      </div>

      {/* SEO Settings */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
       <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">SEO & Meta</h3>

       <div className="space-y-4">
        <div>
         <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
         <input type="text" value={formData.slug} onChange={(e) => handleChange("slug", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="post-url-slug" />
        </div>

        <div>
         <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Summary</label>
         <textarea value={formData.summary} onChange={(e) => handleChange("summary", e.target.value)} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Brief description for SEO and social sharing..." />
        </div>

        <div>
         <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image URL</label>
         <input type="url" value={formData.image} onChange={(e) => handleChange("image", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="https://example.com/image.jpg" />
        </div>
       </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
       <button type="submit" disabled={loading || !formData.title || !formData.content} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
        {loading ? "Updating..." : "Update Blog Post"}
       </button>

       <button type="button" onClick={() => router.push("/admin/blog")} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
        Cancel
       </button>
      </div>
     </div>
    </form>
   </div>
  </AdminLayout>
 );
}
