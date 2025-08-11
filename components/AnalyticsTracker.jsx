"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
 const pathname = usePathname();

 // Helper function to map timezone to country
 const getCountryFromTimezone = (timezone) => {
  const timezoneMap = {
   "America/New_York": "United States",
   "America/Los_Angeles": "United States",
   "America/Chicago": "United States",
   "America/Denver": "United States",
   "Europe/London": "United Kingdom",
   "Europe/Paris": "France",
   "Europe/Berlin": "Germany",
   "Europe/Rome": "Italy",
   "Europe/Madrid": "Spain",
   "Asia/Tokyo": "Japan",
   "Asia/Shanghai": "China",
   "Asia/Kolkata": "India",
   "Asia/Seoul": "South Korea",
   "Asia/Bangkok": "Thailand",
   "Asia/Singapore": "Singapore",
   "Asia/Manila": "Philippines",
   "Asia/Kathmandu": "Nepal",
   "Australia/Sydney": "Australia",
   "Australia/Melbourne": "Australia",
   "Africa/Cairo": "Egypt",
   "Africa/Lagos": "Nigeria",
   "America/Toronto": "Canada",
   "America/Vancouver": "Canada",
   "America/Sao_Paulo": "Brazil",
   "America/Argentina/Buenos_Aires": "Argentina",
   "America/Mexico_City": "Mexico",
   // Add more as needed
  };

  return timezoneMap[timezone] || "Unknown";
 };

 useEffect(() => {
  // Track page view
  const trackPageView = async () => {
   try {
    // Get approximate location from timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = getCountryFromTimezone(timezone);

    await fetch("/api/admin/analytics", {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
      page: pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      timezone: timezone,
      country: country,
      language: navigator.language,
     }),
    });
   } catch (error) {
    // Silently fail - don't interrupt user experience
    console.debug("Analytics tracking failed:", error);
   }
  };

  // Track after a small delay to ensure page is loaded
  const timer = setTimeout(trackPageView, 1000);

  return () => clearTimeout(timer);
 }, [pathname]);

 // This component renders nothing
 return null;
}
