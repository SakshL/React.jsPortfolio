import { ClockIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import { getMaintenanceStatus } from "../../lib/admin-vercel";

export default async function MaintenancePage() {
 const maintenanceStatus = await getMaintenanceStatus();

 // If maintenance is not enabled, redirect to home
 if (!maintenanceStatus.enabled) {
  redirect("/");
 }

 return (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
   <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiKDI1NSwyNTUsMjU1LDAuMSkiLz4KPC9zdmc+')] opacity-20"></div>

   <div className="relative w-full max-w-md">
    <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-lg">
     {/* Icon */}
     <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600">
      <WrenchScrewdriverIcon className="h-10 w-10 text-white" />
     </div>

     {/* Title */}
     <h1 className="mb-4 text-3xl font-bold text-white">Under Maintenance</h1>

     {/* Message */}
     <p className="mb-6 leading-relaxed text-gray-300">{maintenanceStatus.reason || "We're currently performing scheduled maintenance to improve your experience. We'll be back shortly!"}</p>

     {/* Details */}
     <div className="mb-6 rounded-lg bg-white/5 p-4">
      <div className="flex items-center justify-center space-x-2 text-gray-400">
       <ClockIcon className="h-5 w-5" />
       <span className="text-sm">Started: {new Date(maintenanceStatus.enabledAt).toLocaleString()}</span>
      </div>
     </div>

     {/* Contact Info */}
     <div className="text-sm text-gray-400">
      <p>Need immediate assistance?</p>
      <p className="mt-2">
       Contact:
       <a href="mailto:sakshyambaral97@gmail.com" className="ml-1 text-blue-400 hover:text-blue-300">
        sakshyambaral97@gmail.com
       </a>
      </p>
     </div>

     {/* Admin Access */}
     <div className="mt-8 border-t border-white/10 pt-6">
      <a href="/admin" className="inline-flex items-center rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-white/20">
       Admin Access
      </a>
     </div>
    </div>

    {/* Glow effect */}
    <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 opacity-20 blur"></div>
   </div>

   {/* Animated background elements */}
   <div className="absolute left-10 top-10 h-4 w-4 animate-pulse rounded-full bg-white/20"></div>
   <div className="absolute right-20 top-32 h-2 w-2 animate-pulse rounded-full bg-blue-400/30 delay-1000"></div>
   <div className="absolute bottom-20 left-20 h-3 w-3 animate-pulse rounded-full bg-purple-400/20 delay-500"></div>
   <div className="delay-1500 absolute bottom-32 right-32 h-2 w-2 animate-pulse rounded-full bg-white/10"></div>
  </div>
 );
}
