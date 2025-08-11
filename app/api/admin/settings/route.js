import { getSiteSettings, updateSiteSettings } from "../../../../lib/admin-vercel";
import { requireAuth } from "../../../../lib/auth";

export const runtime = "edge";

export const GET = requireAuth(async () => {
 const settings = await getSiteSettings();
 return new Response(JSON.stringify(settings), {
  headers: { "Content-Type": "application/json" },
 });
});

export const PUT = requireAuth(async (request) => {
 const updates = await request.json();
 const result = await updateSiteSettings(updates);
 return new Response(JSON.stringify(result), {
  headers: { "Content-Type": "application/json" },
 });
});
