"use client";

import { CogIcon, GlobeAltIcon, ShieldCheckIcon, PaintBrushIcon, BellIcon, PhotoIcon, DevicePhoneMobileIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";

export default function SettingsPage() {
 const [settings, setSettings] = useState(null);
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [saved, setSaved] = useState(false);
 const [activeTab, setActiveTab] = useState("general");

 const loadSettings = async () => {
  try {
   const response = await fetch("/api/admin/settings");
   if (response.ok) {
    const data = await response.json();
    setSettings(data);
   }
  } catch (error) {
   console.error("Failed to load settings:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  loadSettings();
 }, []);

 const saveSettings = async () => {
  setSaving(true);
  try {
   const response = await fetch("/api/admin/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
   });

   if (response.ok) {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
   }
  } catch (error) {
   console.error("Failed to save settings:", error);
  } finally {
   setSaving(false);
  }
 };

 const updateSetting = (key, value) => {
  setSettings((prev) => ({
   ...prev,
   [key]: value,
  }));
 };

 const updateNestedSetting = (parent, key, value) => {
  setSettings((prev) => ({
   ...prev,
   [parent]: {
    ...prev[parent],
    [key]: value,
   },
  }));
 };

 const tabs = [
  { id: "general", name: "General", icon: GlobeAltIcon },
  { id: "appearance", name: "Appearance", icon: PaintBrushIcon },
  { id: "social", name: "Social Media", icon: DevicePhoneMobileIcon },
  { id: "content", name: "Content", icon: PhotoIcon },
  { id: "security", name: "Security", icon: ShieldCheckIcon },
  { id: "notifications", name: "Notifications", icon: BellIcon },
 ];

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
   <div className="mx-auto max-w-6xl space-y-8">
    {/* Header */}
    <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
     <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
       <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-900">
        <CogIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
       </div>
       <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Configure your website settings and preferences</p>
       </div>
      </div>

      <button onClick={saveSettings} disabled={saving} className={`flex items-center space-x-2 rounded-lg px-6 py-3 font-medium transition-colors duration-200 ${saved ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"}`}>
       {saving ? <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" /> : saved ? <CheckIcon className="h-4 w-4" /> : <CogIcon className="h-4 w-4" />}
       <span>{saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}</span>
      </button>
     </div>
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
     {/* Sidebar */}
     <div className="lg:col-span-1">
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
       <nav className="space-y-2">
        {tabs.map((tab) => (
         <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-colors duration-200 ${activeTab === tab.id ? "border-r-2 border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"}`}>
          <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "text-blue-500" : "text-gray-500"}`} />
          <span className="font-medium">{tab.name}</span>
         </button>
        ))}
       </nav>
      </div>
     </div>

     {/* Content */}
     <div className="lg:col-span-3">
      <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
       {activeTab === "general" && (
        <div className="space-y-6">
         <div>
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">General Settings</h2>
         </div>

         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
           <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Site Title</label>
           <input type="text" value={settings.siteTitle} onChange={(e) => updateSetting("siteTitle", e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
           <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
           <select value={settings.theme} onChange={(e) => updateSetting("theme", e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
           </select>
          </div>
         </div>

         <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Site Description</label>
          <textarea value={settings.siteDescription} onChange={(e) => updateSetting("siteDescription", e.target.value)} rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
         </div>

         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center justify-between">
           <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Form</label>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enable contact form on website</p>
           </div>
           <button onClick={() => updateSetting("contactFormEnabled", !settings.contactFormEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${settings.contactFormEnabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.contactFormEnabled ? "translate-x-6" : "translate-x-1"}`} />
           </button>
          </div>

          <div className="flex items-center justify-between">
           <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Analytics</label>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enable website analytics</p>
           </div>
           <button onClick={() => updateSetting("analyticsEnabled", !settings.analyticsEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${settings.analyticsEnabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.analyticsEnabled ? "translate-x-6" : "translate-x-1"}`} />
           </button>
          </div>
         </div>
        </div>
       )}

       {activeTab === "social" && (
        <div className="space-y-6">
         <div>
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Social Media Settings</h2>
         </div>

         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
           <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub Username</label>
           <input type="text" value={settings.socialMedia?.github || ""} onChange={(e) => updateNestedSetting("socialMedia", "github", e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="your-username" />
          </div>

          <div>
           <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Twitter Handle</label>
           <input type="text" value={settings.socialMedia?.twitter || ""} onChange={(e) => updateNestedSetting("socialMedia", "twitter", e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="@your-handle" />
          </div>

          <div>
           <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Discord Username</label>
           <input type="text" value={settings.socialMedia?.discord || ""} onChange={(e) => updateNestedSetting("socialMedia", "discord", e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="your-username" />
          </div>

          <div>
           <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Instagram Handle</label>
           <input type="text" value={settings.socialMedia?.instagram || ""} onChange={(e) => updateNestedSetting("socialMedia", "instagram", e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" placeholder="your-handle" />
          </div>
         </div>
        </div>
       )}

       {activeTab === "content" && (
        <div className="space-y-6">
         <div>
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Content Settings</h2>
         </div>

         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
           <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Max File Size</label>
           <select value={settings.maxFileSize} onChange={(e) => updateSetting("maxFileSize", e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <option value="5MB">5MB</option>
            <option value="10MB">10MB</option>
            <option value="25MB">25MB</option>
            <option value="50MB">50MB</option>
           </select>
          </div>

          <div className="flex items-center justify-between">
           <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Allow Comments</label>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enable comments on blog posts</p>
           </div>
           <button onClick={() => updateSetting("allowComments", !settings.allowComments)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${settings.allowComments ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.allowComments ? "translate-x-6" : "translate-x-1"}`} />
           </button>
          </div>
         </div>

         <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Allowed File Types</label>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
           {["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx", "txt"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
             <input
              type="checkbox"
              checked={settings.allowedFileTypes?.includes(type) || false}
              onChange={(e) => {
               const current = settings.allowedFileTypes || [];
               if (e.target.checked) {
                updateSetting("allowedFileTypes", [...current, type]);
               } else {
                updateSetting(
                 "allowedFileTypes",
                 current.filter((t) => t !== type)
                );
               }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
             />
             <span className="text-sm uppercase text-gray-700 dark:text-gray-300">{type}</span>
            </label>
           ))}
          </div>
         </div>
        </div>
       )}

       {/* Add more tab content for security, notifications, etc. */}
       {activeTab === "security" && (
        <div className="space-y-6">
         <div>
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Security Settings</h2>
         </div>

         <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
          <div className="flex">
           <ShieldCheckIcon className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
           <div className="text-sm text-yellow-800 dark:text-yellow-300">
            <p className="font-medium">Security Notice</p>
            <p>Advanced security settings are managed at the server level. Contact your system administrator for changes.</p>
           </div>
          </div>
         </div>

         <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
           <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Authentication</h3>
           <p className="text-sm text-gray-600 dark:text-gray-400">Admin authentication is currently active and secure.</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
           <h3 className="mb-2 font-medium text-gray-900 dark:text-white">HTTPS</h3>
           <p className="text-sm text-gray-600 dark:text-gray-400">All traffic is encrypted with SSL/TLS certificates.</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
           <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Edge Runtime</h3>
           <p className="text-sm text-gray-600 dark:text-gray-400">APIs are running on secure edge runtime for optimal performance.</p>
          </div>
         </div>
        </div>
       )}
      </div>
     </div>
    </div>
   </div>
  </AdminLayout>
 );
}
