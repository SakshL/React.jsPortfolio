import { getAnalyticsData, trackPageView } from "../../../../lib/admin-vercel";
import { requireAuth } from "../../../../lib/auth";

export const runtime = "edge";

export const GET = requireAuth(async (request) => {
 try {
  const url = new URL(request.url);
  const timeRange = url.searchParams.get("range") || "7d";

  const analytics = await getAnalyticsData(timeRange);

  return new Response(JSON.stringify(analytics), {
   headers: { "Content-Type": "application/json" },
  });
 } catch (error) {
  console.error("Analytics API error:", error);
  return new Response(
   JSON.stringify({
    error: "Failed to fetch analytics",
    totalVisitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: "0:00",
    topPages: [],
    recentVisitors: [],
   }),
   {
    status: 200,
    headers: { "Content-Type": "application/json" },
   }
  );
 }
});

// Public endpoint to track page views (no auth required)
export const POST = async (request) => {
 try {
  const { page, referrer, userAgent, timezone, country, language } = await request.json();
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";

  await trackPageView({
   page,
   referrer,
   userAgent,
   ip,
   timestamp: new Date().toISOString(),
   timezone,
   country: country || "Unknown",
   language,
  });

  return new Response(JSON.stringify({ success: true }), {
   headers: { "Content-Type": "application/json" },
  });
 } catch (error) {
  console.error("Page view tracking error:", error);
  return new Response(JSON.stringify({ success: false }), {
   status: 200,
   headers: { "Content-Type": "application/json" },
  });
 }
};
