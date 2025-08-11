"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// Simple SVG icons
const HomeIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
 </svg>
);

const ChartIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
 </svg>
);

const DocumentIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
 </svg>
);

const CogIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
);

const WrenchIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
 </svg>
);

const PhotoIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
 </svg>
);

const MailIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
 </svg>
);

const LogoutIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
 </svg>
);

const MenuIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
 </svg>
);

const XIcon = () => (
 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
);

const navigation = [
 { name: "Dashboard", href: "/admin", icon: HomeIcon },
 { name: "Analytics", href: "/admin/analytics", icon: ChartIcon },
 { name: "Blog Posts", href: "/admin/blog", icon: DocumentIcon },
 { name: "Maintenance", href: "/admin/maintenance", icon: WrenchIcon },
 { name: "Media", href: "/admin/media", icon: PhotoIcon },
 { name: "Settings", href: "/admin/settings", icon: CogIcon },
 { name: "Contact", href: "/admin/contact", icon: MailIcon },
];

export default function AdminLayout({ children }) {
 const [sidebarOpen, setSidebarOpen] = useState(false);
 const pathname = usePathname();
 const router = useRouter();

 const handleLogout = async () => {
  try {
   await fetch("/api/admin/logout", { method: "POST" });
   router.push("/admin");
  } catch (error) {
   console.error("Logout failed:", error);
  }
 };

 return (
  <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
   {/* Mobile menu overlay */}
   {sidebarOpen && (
    <div className="fixed inset-0 z-40 lg:hidden">
     <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
    </div>
   )}

   {/* Sidebar */}
   <div className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-zinc-200/50 bg-white/80 backdrop-blur-xl transition-transform duration-300 ease-in-out dark:border-zinc-800/50 dark:bg-zinc-900/80 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
    <div className="flex h-16 items-center justify-between border-b border-zinc-200/50 px-6 dark:border-zinc-800/50">
     <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Admin Panel</h1>
     <button onClick={() => setSidebarOpen(false)} className="rounded-md p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 lg:hidden">
      <XIcon />
     </button>
    </div>

    <nav className="mt-8 px-4">
     <ul className="space-y-2">
      {navigation.map((item) => {
       const isActive = pathname === item.href;
       return (
        <li key={item.name}>
         <Link href={item.href} className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive ? "border border-blue-200/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:border-blue-800/50 dark:text-blue-400" : "text-zinc-600 hover:bg-zinc-100/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"}`} onClick={() => setSidebarOpen(false)}>
          <item.icon />
          <span className="ml-3">{item.name}</span>
         </Link>
        </li>
       );
      })}
     </ul>

     <div className="mt-8 border-t border-zinc-200/50 pt-8 dark:border-zinc-800/50">
      <button onClick={handleLogout} className="flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
       <LogoutIcon />
       <span className="ml-3">Logout</span>
      </button>
     </div>
    </nav>
   </div>

   {/* Main content */}
   <div className="lg:pl-64">
    <div className="flex h-16 items-center justify-between border-b border-zinc-200/50 bg-white/80 px-4 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80 lg:px-8">
     <button onClick={() => setSidebarOpen(true)} className="rounded-md p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 lg:hidden">
      <MenuIcon />
     </button>

     <div className="ml-auto">
      <div className="flex items-center gap-4">
       <div className="text-sm text-zinc-600 dark:text-zinc-400">Welcome back, Admin</div>
      </div>
     </div>
    </div>

    <main className="p-4 lg:p-8">{children}</main>
   </div>
  </div>
 );
}
