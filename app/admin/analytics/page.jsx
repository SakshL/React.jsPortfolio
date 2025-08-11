"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";

const UsersIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
 </svg>
);

const EyeIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
 </svg>
);

const ChartIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
 </svg>
);

const ClockIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
);

export default function AnalyticsPage() {
 const [loading, setLoading] = useState(true);
 const [analytics, setAnalytics] = useState(null);
 const [timeRange, setTimeRange] = useState("7d");

 const loadRealAnalytics = async () => {
  try {
   setLoading(true);
   const response = await fetch("/api/admin/analytics");
   if (response.ok) {
    const data = await response.json();
    setAnalytics(data);
   } else {
    // Fallback to some basic data if API fails
    setAnalytics({
     totalVisitors: 0,
     pageViews: 0,
     bounceRate: 0,
     avgSessionDuration: "0:00",
     topPages: [],
     recentVisitors: [],
     errorMessage: "Analytics data unavailable - displaying basic info",
    });
   }
  } catch (error) {
   console.error("Failed to load analytics:", error);
   setAnalytics({
    totalVisitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: "0:00",
    topPages: [],
    recentVisitors: [],
    errorMessage: "Failed to connect to analytics service",
   });
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  loadRealAnalytics();
 }, [timeRange]);

 if (loading) {
  return (
   <AdminLayout>
    <div className="flex h-64 items-center justify-center">
     <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
     <span className="ml-3 text-zinc-600 dark:text-zinc-400">Loading real analytics data...</span>
    </div>
   </AdminLayout>
  );
 }

 if (!analytics) {
  return (
   <AdminLayout>
    <div className="flex h-64 items-center justify-center">
     <div className="text-center">
      <p className="text-red-600 dark:text-red-400">Failed to load analytics data</p>
      <button onClick={loadRealAnalytics} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
       Retry
      </button>
     </div>
    </div>
   </AdminLayout>
  );
 }

 return (
  <AdminLayout>
   <div className="space-y-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
     <div>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Analytics Dashboard</h1>
      <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">Real-time website performance and visitor insights</p>
      {analytics.errorMessage && <div className="mt-2 rounded bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">{analytics.errorMessage}</div>}
     </div>
     <div className="flex items-center gap-2">
      <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="rounded-xl border border-zinc-200/50 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-900 backdrop-blur-xl transition-colors hover:border-zinc-300/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:text-white dark:hover:border-zinc-700/50">
       <option value="1d">Last 24 hours</option>
       <option value="7d">Last 7 days</option>
       <option value="30d">Last 30 days</option>
       <option value="90d">Last 90 days</option>
      </select>
      <button onClick={loadRealAnalytics} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
       Refresh
      </button>
     </div>
    </div>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
     <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <div className="mb-4 flex items-center gap-3">
       <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400">
        <UsersIcon />
       </div>
       <div>
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total Visitors</h3>
        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{analytics.totalVisitors.toLocaleString()}</p>
       </div>
      </div>
     </div>

     <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <div className="mb-4 flex items-center gap-3">
       <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400">
        <EyeIcon />
       </div>
       <div>
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Page Views</h3>
        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{analytics.pageViews.toLocaleString()}</p>
       </div>
      </div>
     </div>

     <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <div className="mb-4 flex items-center gap-3">
       <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400">
        <ChartIcon />
       </div>
       <div>
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Bounce Rate</h3>
        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{analytics.bounceRate}%</p>
       </div>
      </div>
     </div>

     <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <div className="mb-4 flex items-center gap-3">
       <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 text-orange-600 dark:text-orange-400">
        <ClockIcon />
       </div>
       <div>
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Avg. Session</h3>
        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{analytics.avgSessionDuration}</p>
       </div>
      </div>
     </div>
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
     <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">Top Pages</h3>
      <div className="space-y-4">
       {analytics.topPages.length > 0 ? (
        analytics.topPages.map((page, index) => (
         <div key={index} className="flex items-center justify-between rounded-lg bg-zinc-50/50 p-3 dark:bg-zinc-800/50">
          <div>
           <span className="text-sm font-medium text-zinc-900 dark:text-white">{page.path}</span>
           <p className="text-xs text-zinc-500 dark:text-zinc-400">{page.title || "No title"}</p>
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{page.views.toLocaleString()} views</span>
         </div>
        ))
       ) : (
        <p className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">No page data available</p>
       )}
      </div>
     </div>

     <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">Recent Activity</h3>
      <div className="space-y-3">
       {analytics.recentVisitors.length > 0 ? (
        analytics.recentVisitors.map((visitor, index) => (
         <div key={index} className="flex items-center justify-between border-b border-zinc-200/50 py-2 last:border-0 dark:border-zinc-700/50">
          <div>
           <span className="text-sm text-zinc-900 dark:text-white">{visitor.page}</span>
           <p className="text-xs text-zinc-500 dark:text-zinc-400">{visitor.country || "Unknown"}</p>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{visitor.timestamp}</span>
         </div>
        ))
       ) : (
        <p className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">No recent activity</p>
       )}
      </div>
     </div>
    </div>
   </div>
  </AdminLayout>
 );
}
