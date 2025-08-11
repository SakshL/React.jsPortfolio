"use client";

import Image from "next/image";
import { PhotoIcon, PlusIcon, TrashIcon, EyeIcon, MagnifyingGlassIcon, FolderIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";

export default function MediaPage() {
 const [files, setFiles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [uploading, setUploading] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");

 const loadFiles = async () => {
  try {
   setTimeout(() => {
    setFiles([
     {
      id: "1",
      name: "hero-image.jpg",
      type: "image",
      size: "2.4 MB",
      url: "/assets/photography/1.jpg",
      uploadedAt: new Date("2024-01-15T10:30:00"),
     },
     {
      id: "2",
      name: "blog-thumbnail.png",
      type: "image",
      size: "1.8 MB",
      url: "/assets/photography/2.jpg",
      uploadedAt: new Date("2024-01-14T15:45:00"),
     },
    ]);
    setLoading(false);
   }, 1000);
  } catch (error) {
   console.error("Failed to load files:", error);
   setLoading(false);
  }
 };

 useEffect(() => {
  loadFiles();
 }, []);

 const handleFileUpload = async (event) => {
  const files = Array.from(event.target.files);
  if (files.length === 0) return;

  setUploading(true);
  try {
   await new Promise((resolve) => setTimeout(resolve, 2000));

   const newFiles = files.map((file, index) => ({
    id: Date.now() + index,
    name: file.name,
    type: file.type.startsWith("image/") ? "image" : "document",
    size: (file.size / 1024 / 1024).toFixed(1) + " MB",
    url: URL.createObjectURL(file),
    uploadedAt: new Date(),
   }));

   setFiles((prev) => [...newFiles, ...prev]);
  } catch (error) {
   console.error("Upload failed:", error);
  } finally {
   setUploading(false);
  }
 };

 const deleteFile = async (fileName) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this file?");
  if (!confirmDelete) return;

  try {
   setFiles((prev) => prev.filter((file) => file.name !== fileName));
  } catch (error) {
   console.error("Delete failed:", error);
  }
 };

 const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()));

 const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
   year: "numeric",
   month: "short",
   day: "numeric",
  });
 };

 const getFileIcon = (type) => {
  if (type === "image") {
   return <PhotoIcon className="h-8 w-8 text-blue-500" />;
  }
  return <DocumentIcon className="h-8 w-8 text-gray-500" />;
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
     <div className="flex items-center space-x-4">
      <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-900">
       <PhotoIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
      </div>
      <div>
       <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Media Library</h1>
       <p className="text-gray-500 dark:text-gray-400">Manage your images and files</p>
      </div>
     </div>
    </div>

    {/* Upload Section */}
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
     <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
      <PhotoIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Upload Files</h3>
      <p className="mb-4 text-gray-500 dark:text-gray-400">Drag and drop files here, or click to select</p>
      <label className="inline-flex cursor-pointer items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700">
       <PlusIcon className="h-5 w-5" />
       <span>Choose Files</span>
       <input type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
      </label>
      {uploading && (
       <div className="mt-4">
        <div className="mx-auto h-4 w-32 rounded-full bg-gray-200 dark:bg-gray-700">
         <div className="h-4 animate-pulse rounded-full bg-blue-600" style={{ width: "60%" }}></div>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Uploading...</p>
       </div>
      )}
     </div>
    </div>

    {/* Search */}
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
     <div className="relative max-w-md">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
      <input type="text" placeholder="Search files..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
     </div>
    </div>

    {/* Files Grid */}
    <div className="rounded-xl bg-white shadow-lg dark:bg-gray-800">
     {filteredFiles.length === 0 ? (
      <div className="p-12 text-center">
       <FolderIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
       <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">{searchTerm ? "No files found" : "No files uploaded"}</h3>
      </div>
     ) : (
      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
       {filteredFiles.map((file) => (
        <div key={file.id} className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
         {file.type === "image" ? <Image src={file.url} alt={file.name} width={300} height={192} className="h-48 w-full object-cover" /> : <div className="flex h-48 items-center justify-center bg-gray-50 dark:bg-gray-700">{getFileIcon(file.type)}</div>}

         <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex h-full items-center justify-center space-x-2">
           <button className="rounded-lg bg-white p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100">
            <EyeIcon className="h-5 w-5" />
           </button>
           <button onClick={() => deleteFile(file.name)} className="rounded-lg bg-red-500 p-2 text-white transition-colors duration-200 hover:bg-red-600">
            <TrashIcon className="h-5 w-5" />
           </button>
          </div>
         </div>

         <div className="p-4">
          <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">{file.name}</h3>
          <div className="mt-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
           <span>{file.size}</span>
           <span>{formatDate(file.uploadedAt)}</span>
          </div>
         </div>
        </div>
       ))}
      </div>
     )}
    </div>
   </div>
  </AdminLayout>
 );
}
