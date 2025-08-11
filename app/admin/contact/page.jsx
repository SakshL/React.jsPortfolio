"use client";

import { EnvelopeIcon, UserIcon, ClockIcon, TrashIcon, MagnifyingGlassIcon, ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";

export default function ContactPage() {
 const [messages, setMessages] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState("");
 const [filterStatus, setFilterStatus] = useState("all");
 const [selectedMessage, setSelectedMessage] = useState(null);

 const loadMessages = async () => {
  // Simulate loading messages
  // In a real implementation, you'd fetch from your API
  setTimeout(() => {
   setMessages([
    {
     id: "1",
     name: "John Doe",
     email: "john@example.com",
     message: "Hi, I really liked your blog post about Next.js. Could we discuss a potential collaboration?",
     timestamp: new Date("2024-01-15T10:30:00"),
     status: "unread",
     priority: "normal",
    },
    {
     id: "2",
     name: "Jane Smith",
     email: "jane@company.com",
     message: "We are interested in hiring you for a React project. Please check your email for more details.",
     timestamp: new Date("2024-01-14T15:45:00"),
     status: "read",
     priority: "high",
    },
    {
     id: "3",
     name: "Alex Johnson",
     email: "alex@startup.io",
     message: "Your portfolio is impressive! We have an exciting opportunity that might interest you.",
     timestamp: new Date("2024-01-13T09:20:00"),
     status: "replied",
     priority: "normal",
    },
    {
     id: "4",
     name: "Sarah Wilson",
     email: "sarah@example.com",
     message: "Thanks for the helpful tutorial on your blog. It solved my problem!",
     timestamp: new Date("2024-01-12T14:10:00"),
     status: "read",
     priority: "low",
    },
   ]);
   setLoading(false);
  }, 1000);
 };

 useEffect(() => {
  loadMessages();
 }, []);

 const updateMessageStatus = (messageId, status) => {
  setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, status } : msg)));
 };

 const deleteMessage = (messageId) => {
  if (!window.confirm("Are you sure you want to delete this message?")) return;
  setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  setSelectedMessage(null);
 };

 const filteredMessages = messages.filter((message) => {
  const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) || message.email.toLowerCase().includes(searchTerm.toLowerCase()) || message.message.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesFilter = filterStatus === "all" || message.status === filterStatus;

  return matchesSearch && matchesFilter;
 });

 const getStatusColor = (status) => {
  switch (status) {
   case "unread":
    return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
   case "read":
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
   case "replied":
    return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
   default:
    return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
 };

 const getPriorityIcon = (priority) => {
  switch (priority) {
   case "high":
    return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
   case "low":
    return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
   default:
    return null;
  }
 };

 const formatDate = (date) => {
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24)), "day");
 };

 const unreadCount = messages.filter((msg) => msg.status === "unread").length;
 const readCount = messages.filter((msg) => msg.status === "read").length;
 const repliedCount = messages.filter((msg) => msg.status === "replied").length;

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
      <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900">
       <EnvelopeIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
       <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
       <p className="text-gray-500 dark:text-gray-400">Manage and respond to contact form submissions</p>
      </div>
     </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
     <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
       <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
        <EnvelopeIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
       </div>
       <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Messages</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{messages.length}</p>
       </div>
      </div>
     </div>

     <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
       <div className="rounded-lg bg-red-100 p-3 dark:bg-red-900">
        <span className="text-xl">🔴</span>
       </div>
       <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unread</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
       </div>
      </div>
     </div>

     <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
       <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900">
        <span className="text-xl">👁️</span>
       </div>
       <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Read</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{readCount}</p>
       </div>
      </div>
     </div>

     <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="flex items-center">
       <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
        <span className="text-xl">✅</span>
       </div>
       <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Replied</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{repliedCount}</p>
       </div>
      </div>
     </div>
    </div>

    {/* Filters */}
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
     <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="relative max-w-md flex-1">
       <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
       <input type="text" placeholder="Search messages..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
      </div>

      <div className="flex items-center space-x-4">
       <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        <option value="all">All Messages</option>
        <option value="unread">Unread</option>
        <option value="read">Read</option>
        <option value="replied">Replied</option>
       </select>
      </div>
     </div>
    </div>

    {/* Messages */}
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
     {/* Messages List */}
     <div className="lg:col-span-2">
      <div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
       {filteredMessages.length === 0 ? (
        <div className="p-12 text-center">
         <EnvelopeIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
         <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">{searchTerm ? "No messages found" : "No messages yet"}</h3>
         <p className="text-gray-500 dark:text-gray-400">{searchTerm ? "Try adjusting your search terms" : "New messages will appear here"}</p>
        </div>
       ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
         {filteredMessages.map((message) => (
          <div
           key={message.id}
           onClick={() => {
            setSelectedMessage(message);
            if (message.status === "unread") {
             updateMessageStatus(message.id, "read");
            }
           }}
           className={`cursor-pointer p-6 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${selectedMessage?.id === message.id ? "border-r-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}`}
          >
           <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
             <div className="mb-2 flex items-center space-x-3">
              <div className="flex items-center space-x-2">
               <UserIcon className="h-4 w-4 text-gray-500" />
               <p className="text-sm font-medium text-gray-900 dark:text-white">{message.name}</p>
              </div>
              {getPriorityIcon(message.priority)}
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(message.status)}`}>{message.status}</span>
             </div>

             <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{message.email}</p>

             <p className="line-clamp-2 text-sm text-gray-800 dark:text-gray-300">{message.message}</p>

             <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
               <ClockIcon className="h-3 w-3" />
               <span>{formatDate(message.timestamp)}</span>
              </div>
             </div>
            </div>
           </div>
          </div>
         ))}
        </div>
       )}
      </div>
     </div>

     {/* Message Details */}
     <div className="lg:col-span-1">
      <div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
       {selectedMessage ? (
        <div className="p-6">
         <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Message Details</h3>
          <div className="flex space-x-2">
           <button onClick={() => (window.location.href = `mailto:${selectedMessage.email}`)} className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20" title="Reply via Email">
            <EnvelopeIcon className="h-5 w-5" />
           </button>
           <button onClick={() => deleteMessage(selectedMessage.id)} className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20" title="Delete Message">
            <TrashIcon className="h-5 w-5" />
           </button>
          </div>
         </div>

         <div className="space-y-4">
          <div>
           <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">From</label>
           <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedMessage.name}</p>
           <p className="text-sm text-gray-600 dark:text-gray-400">{selectedMessage.email}</p>
          </div>

          <div>
           <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
           <select value={selectedMessage.status} onChange={(e) => updateMessageStatus(selectedMessage.id, e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
           </select>
          </div>

          <div>
           <label className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400">Received</label>
           <p className="text-sm text-gray-900 dark:text-white">
            {selectedMessage.timestamp.toLocaleDateString("en-US", {
             year: "numeric",
             month: "long",
             day: "numeric",
             hour: "2-digit",
             minute: "2-digit",
            })}
           </p>
          </div>

          <div>
           <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">Message</label>
           <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-300">{selectedMessage.message}</p>
           </div>
          </div>

          <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
           <button onClick={() => (window.location.href = `mailto:${selectedMessage.email}?subject=Re: Contact Form Message`)} className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
            <EnvelopeIcon className="h-5 w-5" />
            <span>Reply via Email</span>
           </button>
          </div>
         </div>
        </div>
       ) : (
        <div className="p-12 text-center">
         <EnvelopeIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
         <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Select a Message</h3>
         <p className="text-gray-500 dark:text-gray-400">Choose a message to view details and reply</p>
        </div>
       )}
      </div>
     </div>
    </div>
   </div>
  </AdminLayout>
 );
}
