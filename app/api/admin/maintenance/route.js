import { getMaintenanceStatus, enableMaintenanceMode, disableMaintenanceMode } from "../../../../lib/admin-vercel";
import { requireAuth } from "../../../../lib/auth";

export const runtime = "edge";

export const GET = requireAuth(async () => {
 const status = await getMaintenanceStatus();
 return new Response(JSON.stringify(status), {
  headers: { "Content-Type": "application/json" },
 });
});

export const POST = requireAuth(async (request) => {
 const { action, reason } = await request.json();

 if (action === "enable") {
  const result = await enableMaintenanceMode(reason);
  return new Response(JSON.stringify(result), {
   headers: { "Content-Type": "application/json" },
  });
 } else if (action === "disable") {
  const result = await disableMaintenanceMode();
  return new Response(JSON.stringify(result), {
   headers: { "Content-Type": "application/json" },
  });
 } else {
  return new Response(JSON.stringify({ error: "Invalid action" }), {
   status: 400,
   headers: { "Content-Type": "application/json" },
  });
 }
});
