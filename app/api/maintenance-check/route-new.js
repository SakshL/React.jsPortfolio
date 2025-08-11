import { NextResponse } from "next/server";
import { getMaintenanceStatus } from "../../../lib/admin-vercel";

export const runtime = "edge";

// Simple maintenance check endpoint for middleware
export async function GET(request) {
 // Only allow internal requests
 const isInternal = request.headers.get('x-internal') === 'true';
 console.log('Maintenance check request - internal:', isInternal);
 
 if (!isInternal) {
  return new Response('Forbidden', { status: 403 });
 }

 try {
  const status = await getMaintenanceStatus();
  console.log('Maintenance status retrieved:', status);
  return NextResponse.json({ enabled: status.enabled });
 } catch (error) {
  console.error('Error getting maintenance status:', error);
  // Default to not in maintenance if there's an error
  return NextResponse.json({ enabled: false });
 }
}
