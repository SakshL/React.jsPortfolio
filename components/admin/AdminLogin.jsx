"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Simple SVG icons
const EyeIcon = () => (
 <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
 </svg>
);

const EyeSlashIcon = () => (
 <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
 </svg>
);

const UserIcon = () => (
 <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
 </svg>
);

const LockIcon = () => (
 <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
 </svg>
);

export default function AdminLogin({ onLogin }) {
 const [credentials, setCredentials] = useState({ username: "", password: "" });
 const [showPassword, setShowPassword] = useState(false);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const router = useRouter();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
   const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
   });

   const data = await response.json();

   if (response.ok) {
    onLogin();
    router.push("/admin");
   } else {
    setError(data.error || "Login failed");
   }
  } catch (error) {
   setError("Network error. Please try again.");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
   <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiKDI1NSwyNTUsMjU1LDAuMSkiLz4KPC9zdmc+')] opacity-20"></div>

   <div className="relative w-full max-w-md">
    <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
     <div className="mb-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
       <LockIcon className="h-8 w-8 text-white" />
      </div>
      <h1 className="mb-2 text-3xl font-bold text-white">Admin Panel</h1>
      <p className="text-gray-300">Sign in to access the dashboard</p>
     </div>

     {error && <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/20 p-4 text-sm text-red-200">{error}</div>}

     <form onSubmit={handleSubmit} className="space-y-6">
      <div>
       <label className="mb-2 block text-sm font-medium text-gray-200">Username</label>
       <div className="relative">
        <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        <input type="text" value={credentials.username} onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))} className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Enter username" required />
       </div>
      </div>

      <div>
       <label className="mb-2 block text-sm font-medium text-gray-200">Password</label>
       <div className="relative">
        <LockIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        <input type={showPassword ? "text" : "password"} value={credentials.password} onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))} className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-12 text-white placeholder-gray-400 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Enter password" required />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-200">
         {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
       </div>
      </div>

      <button type="submit" disabled={loading} className="w-full transform rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50">
       {loading ? (
        <div className="flex items-center justify-center">
         <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
         Signing in...
        </div>
       ) : (
        "Sign In"
       )}
      </button>
     </form>

     <div className="mt-8 text-center">
      <p className="text-sm text-gray-400">Protected by advanced security measures</p>
     </div>
    </div>

    <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-20 blur"></div>
   </div>
  </div>
 );
}
