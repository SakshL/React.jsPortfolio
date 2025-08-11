"use client";

import { DocumentTextIcon, EyeIcon, CodeBracketIcon, BookmarkIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AdminLayout from "../../../../components/admin/AdminLayout";

export default function NewBlogPostPage() {
 const router = useRouter();
 const [loading, setLoading] = useState(false);
 const [previewMode, setPreviewMode] = useState(false);
 const [formData, setFormData] = useState({
  title: "",
  slug: "",
  author: "Sakshyam Baral",
  publishedAt: new Date().toISOString().split("T")[0],
  summary: "",
  image: "",
  content: "",
 });

 // Auto-generate slug from title
 useEffect(() => {
  if (formData.title && !formData.slug) {
   const generatedSlug = formData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
   setFormData((prev) => ({ ...prev, slug: generatedSlug }));
  }
 }, [formData.title]); // eslint-disable-line react-hooks/exhaustive-deps

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
   const response = await fetch("/api/admin/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     title: formData.title,
     content: formData.content,
     tags: [], // Add tags if needed
     status: "published",
     slug: formData.slug,
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
   alert("Error saving blog post: " + error.message);
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
         <h1 className="text-xl font-bold text-gray-900 dark:text-white">Create New Blog Post</h1>
         <p className="text-sm text-gray-500 dark:text-gray-400">Write and publish a new article</p>
        </div>
       </div>
      </div>

      <div className="flex items-center space-x-3">
       <div className="text-sm text-gray-500 dark:text-gray-400">
        {getWordCount()} words • {getReadingTime()} min read
       </div>
       <button type="button" onClick={() => setPreviewMode(!previewMode)} className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
        {previewMode ? <CodeBracketIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        <span>{previewMode ? "Editor" : "Preview"}</span>
       </button>
       <button type="submit" form="blog-form" disabled={loading} className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700 disabled:opacity-50">
        {loading ? <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" /> : <BookmarkIcon className="h-4 w-4" />}
        <span>{loading ? "Saving..." : "Publish"}</span>
       </button>
      </div>
     </div>
    </div>

    <form id="blog-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
     {/* Main Content */}
     <div className="space-y-6 lg:col-span-2">
      {/* Title */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
       <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
       <input type="text" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} className="w-full resize-none border-0 bg-transparent px-4 py-3 text-xl font-semibold text-gray-900 placeholder-gray-500 focus:ring-0 dark:text-white" placeholder="Enter your blog post title..." required />
      </div>

      {/* Content Editor */}
      <div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
       <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white">{previewMode ? "Preview" : "Content"}</h3>
       </div>

       {previewMode ? (
        <div className="prose max-w-none p-6 dark:prose-invert">
         {formData.content ? (
          <div
           dangerouslySetInnerHTML={{
            __html: formData.content
             .replace(/\n/g, "<br>")
             .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
             .replace(/\*(.*?)\*/g, "<em>$1</em>")
             .replace(/`(.*?)`/g, "<code>$1</code>"),
           }}
          />
         ) : (
          <p className="italic text-gray-500">Start writing to see preview...</p>
         )}
        </div>
       ) : (
        <textarea
         value={formData.content}
         onChange={(e) => handleChange("content", e.target.value)}
         className="h-96 w-full resize-none border-0 bg-transparent p-6 text-gray-900 placeholder-gray-500 focus:ring-0 dark:text-white"
         placeholder="Write your blog post content here...

You can use Markdown syntax:
- **bold text**
- *italic text*
- `code`
- # Headings
- [Links](url)
- ![Images](url)"
         required
        />
       )}
      </div>
     </div>

     {/* Sidebar */}
     <div className="space-y-6">
      {/* Post Settings */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
       <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Post Settings</h3>

       <div className="space-y-4">
        <div>
         <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">URL Slug *</label>
         <input type="text" value={formData.slug} onChange={(e) => handleChange("slug", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="url-friendly-title" required />
         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">URL: /blog/{formData.slug || "your-slug"}</p>
        </div>

        <div>
         <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
         <input type="text" value={formData.author} onChange={(e) => handleChange("author", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" required />
        </div>

        <div>
         <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Publish Date</label>
         <input type="date" value={formData.publishedAt} onChange={(e) => handleChange("publishedAt", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" required />
        </div>

        <div>
         <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image URL (Optional)</label>
         <input type="url" value={formData.image} onChange={(e) => handleChange("image", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="https://example.com/image.jpg" />
        </div>
       </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
       <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Summary *</h3>
       <textarea value={formData.summary} onChange={(e) => handleChange("summary", e.target.value)} className="h-24 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="Brief description of your blog post..." required />
       <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{formData.summary.length}/160 characters recommended for SEO</p>
      </div>

      {/* Post Stats */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
       <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Post Statistics</h3>
       <div className="space-y-3">
        <div className="flex justify-between">
         <span className="text-gray-500 dark:text-gray-400">Word Count:</span>
         <span className="font-medium text-gray-900 dark:text-white">{getWordCount()}</span>
        </div>
        <div className="flex justify-between">
         <span className="text-gray-500 dark:text-gray-400">Reading Time:</span>
         <span className="font-medium text-gray-900 dark:text-white">{getReadingTime()} min</span>
        </div>
        <div className="flex justify-between">
         <span className="text-gray-500 dark:text-gray-400">Characters:</span>
         <span className="font-medium text-gray-900 dark:text-white">{formData.content.length}</span>
        </div>
       </div>
      </div>

      {/* Markdown Guide */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
       <h3 className="mb-3 text-sm font-semibold text-blue-900 dark:text-blue-300">📝 Markdown Quick Guide</h3>
       <div className="space-y-1 text-xs text-blue-800 dark:text-blue-300">
        <div>
         <code>**bold**</code> → <strong>bold</strong>
        </div>
        <div>
         <code>*italic*</code> → <em>italic</em>
        </div>
        <div>
         <code>`code`</code> → <code>code</code>
        </div>
        <div>
         <code># Header</code> → Header
        </div>
        <div>
         <code>[link](url)</code> → link
        </div>
       </div>
      </div>
     </div>
    </form>
   </div>
  </AdminLayout>
 );
}
