"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminLogin from "../../components/admin/AdminLogin";

export default function AdminPage() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [loading, setLoading] = useState(true);

 const checkAuth = async () => {
  try {
   const response = await fetch("/api/admin/settings");
   if (response.ok) {
    setIsAuthenticated(true);
   }
  } catch (error) {
   console.error("Auth check failed:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  // Check if user is already authenticated
  checkAuth();
 }, []);

 if (loading) {
  return (
   <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
   </div>
  );
 }

 if (!isAuthenticated) {
  return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
 }

 return (
  <AdminLayout onLogout={() => setIsAuthenticated(false)}>
   <AdminDashboard />
  </AdminLayout>
 );
}

function AdminDashboard() {
 const [stats, setStats] = useState({
  blogPosts: 0,
  totalVisitors: 0,
  contactMessages: 0,
  pageViews: 0,
  systemStatus: "online",
  uptime: "0h 0m",
 });
 const [maintenanceStatus, setMaintenanceStatus] = useState({ enabled: false });

 const loadDashboardData = async () => {
  try {
   // Load dashboard stats from the real API
   const dashboardResponse = await fetch("/api/admin/dashboard");
   if (dashboardResponse.ok) {
    const dashboardStats = await dashboardResponse.json();
    setStats({
     blogPosts: dashboardStats.blogPosts,
     totalVisitors: dashboardStats.totalVisitors,
     contactMessages: dashboardStats.contactMessages,
     systemStatus: "online",
     pageViews: dashboardStats.pageViews,
     uptime: dashboardStats.uptime,
    });
   }

   // Load maintenance status
   const maintenanceResponse = await fetch("/api/admin/maintenance");
   if (maintenanceResponse.ok) {
    const maintenance = await maintenanceResponse.json();
    setMaintenanceStatus(maintenance);
   }
  } catch (error) {
   console.error("Failed to load dashboard data:", error);
  }
 };

 useEffect(() => {
  loadDashboardData();
 }, []);

 const quickActions = [
  { name: "New Blog Post", href: "/admin/blog/new", color: "bg-blue-500", icon: "📝" },
  { name: "View Analytics", href: "/admin/analytics", color: "bg-green-500", icon: "📊" },
  { name: "Manage Media", href: "/admin/media", color: "bg-purple-500", icon: "🖼️" },
  { name: "System Settings", href: "/admin/settings", color: "bg-orange-500", icon: "⚙️" },
 ];

 return (
  <div className="space-y-8">
   {/* Welcome Section */}
   <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
    <h1 className="mb-2 text-3xl font-bold">Welcome back, Admin! 👋</h1>
    <p className="text-blue-100">Here's what's happening with your website today.</p>
   </div>

   {/* Stats Grid */}
   <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
     <div className="flex items-center">
      <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
       <span className="text-2xl">📄</span>
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Blog Posts</p>
       <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.blogPosts}</p>
      </div>
     </div>
    </div>

    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
     <div className="flex items-center">
      <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
       <span className="text-2xl">👥</span>
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Visitors</p>
       <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVisitors.toLocaleString()}</p>
      </div>
     </div>
    </div>

    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
     <div className="flex items-center">
      <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
       <span className="text-2xl">📨</span>
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Messages</p>
       <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.contactMessages}</p>
      </div>
     </div>
    </div>

    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
     <div className="flex items-center">
      <div className={`rounded-lg p-3 ${maintenanceStatus.enabled ? "bg-red-100 dark:bg-red-900" : "bg-green-100 dark:bg-green-900"}`}>
       <span className="text-2xl">{maintenanceStatus.enabled ? "🔧" : "✅"}</span>
      </div>
      <div className="ml-4">
       <p className="text-sm font-medium text-gray-500 dark:text-gray-400">System Status</p>
       <p className="text-2xl font-bold text-gray-900 dark:text-white">{maintenanceStatus.enabled ? "Maintenance" : "Online"}</p>
      </div>
     </div>
    </div>
   </div>

   {/* Quick Actions */}
   <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
    <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
     {quickActions.map((action) => (
      <a key={action.name} href={action.href} className={`${action.color} group block rounded-xl p-6 text-center text-white transition-opacity duration-200 hover:opacity-90`}>
       <div className="mb-2 text-3xl">{action.icon}</div>
       <div className="font-semibold">{action.name}</div>
      </a>
     ))}
    </div>
   </div>

   {/* Recent Activity & System Info */}
   <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
    {/* Recent Activity */}
    <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
     <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
     <div className="space-y-4">
      <div className="flex items-center space-x-4">
       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
        <span className="text-sm">📝</span>
       </div>
       <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">Blog post published</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
       </div>
      </div>
      <div className="flex items-center space-x-4">
       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
        <span className="text-sm">👤</span>
       </div>
       <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">New visitor from Nepal</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</p>
       </div>
      </div>
      <div className="flex items-center space-x-4">
       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
        <span className="text-sm">💬</span>
       </div>
       <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">New contact message</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
       </div>
      </div>
     </div>
    </div>

    {/* System Information */}
    <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
     <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">System Information</h2>
     <div className="space-y-4">
      <div className="flex items-center justify-between">
       <span className="text-gray-500 dark:text-gray-400">Next.js Version</span>
       <span className="font-medium text-gray-900 dark:text-white">13.4.19</span>
      </div>
      <div className="flex items-center justify-between">
       <span className="text-gray-500 dark:text-gray-400">Node.js Version</span>
       <span className="font-medium text-gray-900 dark:text-white">18+</span>
      </div>
      <div className="flex items-center justify-between">
       <span className="text-gray-500 dark:text-gray-400">Deployment</span>
       <span className="font-medium text-gray-900 dark:text-white">Vercel</span>
      </div>
      <div className="flex items-center justify-between">
       <span className="text-gray-500 dark:text-gray-400">Last Deploy</span>
       <span className="font-medium text-gray-900 dark:text-white">Today</span>
      </div>
      <div className="flex items-center justify-between">
       <span className="text-gray-500 dark:text-gray-400">Runtime</span>
       <span className="font-medium text-green-600">Edge</span>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
