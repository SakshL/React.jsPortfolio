import { NextResponse } from "next/server";
import { getMaintenanceStatus } from "../../../lib/admin-vercel";

export const runtime = "edge";

// Simple maintenance check endpoint for middleware
export async function GET(request) {
  // Only allow internal requests
  const isInternal = request.headers.get("x-internal") === "true";

  if (!isInternal) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const status = await getMaintenanceStatus();
    return NextResponse.json({ enabled: status.enabled });
  } catch (error) {
    // Default to not in maintenance if there's an error
    return NextResponse.json({ enabled: false });
  }
}