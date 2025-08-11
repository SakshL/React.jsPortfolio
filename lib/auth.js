// Admin credentials - In production, use environment variables and proper hashing
const ADMIN_CREDENTIALS = {
 username: process.env.ADMIN_USERNAME || "sakshyam",
 password: process.env.ADMIN_PASSWORD || "admin2025",
};

// Simple JWT-like token generation
export function generateToken(username) {
 const timestamp = Date.now();
 const payload = { username, timestamp };
 return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function verifyToken(token) {
 try {
  const payload = JSON.parse(Buffer.from(token, "base64").toString());
  const { username, timestamp } = payload;

  // Token expires after 24 hours
  const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;

  if (isExpired) return null;
  return { username, timestamp };
 } catch (error) {
  return null;
 }
}

export function authenticate(username, password) {
 return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export function isAuthenticated(request) {
 const token = request.cookies.get("admin-token")?.value;
 if (!token) return false;
 return verifyToken(token) !== null;
}

export function requireAuth(handler) {
 return async (request, context) => {
  const token = request.cookies.get("admin-token")?.value;

  if (!token || !verifyToken(token)) {
   return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
   });
  }
  return handler(request, context);
 };
}
