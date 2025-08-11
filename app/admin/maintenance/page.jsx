"use client";

import { WrenchScrewdriverIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";

export default function MaintenancePage() {
 const [maintenanceStatus, setMaintenanceStatus] = useState({ enabled: false });
 const [loading, setLoading] = useState(false);
 const [reason, setReason] = useState("");

 const loadMaintenanceStatus = async () => {
  try {
   const response = await fetch("/api/admin/maintenance");
   if (response.ok) {
    const status = await response.json();
    setMaintenanceStatus(status);
    setReason(status.reason || "");
   }
  } catch (error) {
   console.error("Failed to load maintenance status:", error);
  }
 };

 useEffect(() => {
  loadMaintenanceStatus();
 }, []);

 const toggleMaintenance = async (enable) => {
  setLoading(true);
  try {
   const response = await fetch("/api/admin/maintenance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     action: enable ? "enable" : "disable",
     reason: enable ? reason : undefined,
    }),
   });

   if (response.ok) {
    await loadMaintenanceStatus();
   }
  } catch (error) {
   console.error("Failed to toggle maintenance:", error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <AdminLayout>
   <div className="mx-auto max-w-4xl space-y-8">
    {/* Header */}
    <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
     <div className="flex items-center space-x-4">
      <div className={`rounded-xl p-4 ${maintenanceStatus.enabled ? "bg-red-100 dark:bg-red-900" : "bg-green-100 dark:bg-green-900"}`}>{maintenanceStatus.enabled ? <WrenchScrewdriverIcon className="h-8 w-8 text-red-600 dark:text-red-400" /> : <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />}</div>
      <div>
       <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Maintenance Mode</h1>
       <p className="text-gray-500 dark:text-gray-400">Control website accessibility during maintenance</p>
      </div>
     </div>
    </div>

    {/* Current Status */}
    <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
     <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Current Status</h2>

     <div className={`rounded-xl border-2 p-6 ${maintenanceStatus.enabled ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20" : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"}`}>
      <div className="flex items-center space-x-3">
       {maintenanceStatus.enabled ? <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" /> : <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />}
       <div>
        <h3 className={`text-lg font-semibold ${maintenanceStatus.enabled ? "text-red-800 dark:text-red-300" : "text-green-800 dark:text-green-300"}`}>{maintenanceStatus.enabled ? "Maintenance Mode Active" : "Website Online"}</h3>
        <p className={`text-sm ${maintenanceStatus.enabled ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>{maintenanceStatus.enabled ? "Visitors see maintenance page" : "Website is accessible to all visitors"}</p>
       </div>
      </div>

      {maintenanceStatus.enabled && (
       <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
         <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
         <span className="text-sm text-red-700 dark:text-red-300">Enabled: {new Date(maintenanceStatus.enabledAt).toLocaleString()}</span>
        </div>
        {maintenanceStatus.reason && (
         <p className="text-sm text-red-700 dark:text-red-300">
          <strong>Reason:</strong> {maintenanceStatus.reason}
         </p>
        )}
       </div>
      )}
     </div>
    </div>

    {/* Controls */}
    <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
     <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Maintenance Controls</h2>

     {!maintenanceStatus.enabled ? (
      <div className="space-y-6">
       <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Maintenance Reason (Optional)</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="e.g., Scheduled maintenance, Server updates, Database migration..." rows={3} />
       </div>

       <button onClick={() => toggleMaintenance(true)} disabled={loading} className="flex items-center space-x-2 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-red-700 disabled:opacity-50">
        {loading && <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" />}
        <WrenchScrewdriverIcon className="h-5 w-5" />
        <span>Enable Maintenance Mode</span>
       </button>
      </div>
     ) : (
      <div className="space-y-4">
       <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
        <div className="flex">
         <ExclamationTriangleIcon className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
         <div className="text-sm text-yellow-800 dark:text-yellow-300">
          <p className="font-medium">Warning: Maintenance Mode is Active</p>
          <p>All visitors (except admin) will see the maintenance page.</p>
         </div>
        </div>
       </div>

       <button onClick={() => toggleMaintenance(false)} disabled={loading} className="flex items-center space-x-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-green-700 disabled:opacity-50">
        {loading && <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" />}
        <CheckCircleIcon className="h-5 w-5" />
        <span>Disable Maintenance Mode</span>
       </button>
      </div>
     )}
    </div>

    {/* Information */}
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-8 dark:border-blue-800 dark:bg-blue-900/20">
     <h3 className="mb-4 text-lg font-semibold text-blue-900 dark:text-blue-300">💡 How Maintenance Mode Works</h3>
     <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
      <p>• When enabled, all visitors see a maintenance page instead of your website</p>
      <p>• Admin panel remains accessible for management</p>
      <p>• Search engines are notified with appropriate HTTP status codes</p>
      <p>• You can customize the maintenance message and reason</p>
      <p>• Maintenance mode can be disabled instantly when work is complete</p>
     </div>
    </div>
   </div>
  </AdminLayout>
 );
}
