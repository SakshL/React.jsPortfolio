import { getDashboardStats } from "../../../../lib/admin-vercel";
import { requireAuth } from "../../../../lib/auth";

export const runtime = "edge";

export const GET = requireAuth(async () => {
 const stats = await getDashboardStats();
 return new Response(JSON.stringify(stats), {
  headers: { "Content-Type": "application/json" },
 });
});
