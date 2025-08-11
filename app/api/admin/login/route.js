import { NextResponse } from "next/server";
import { authenticate, generateToken } from "../../../../lib/auth";

export const runtime = "edge";

export async function POST(request) {
 const { username, password } = await request.json();

 if (!username || !password) {
  return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
 }

 if (authenticate(username, password)) {
  const token = generateToken(username);
  const response = NextResponse.json({ success: true, message: "Login successful" });

  // Set HTTP-only cookie
  response.cookies.set("admin-token", token, {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production",
   sameSite: "strict",
   maxAge: 24 * 60 * 60, // 24 hours
  });

  return response;
 } else {
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
 }
}
