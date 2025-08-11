// Database abstraction layer for Vercel deployment
// Uses Vercel KV when available, falls back to in-memory storage

// In-memory fallback storage
let memoryStore = {
 maintenance: { enabled: false, reason: "", enabledAt: null, enabledBy: null },
 blogPosts: [
  {
   id: "1",
   title: "Welcome to My Portfolio",
   content: "This is my first blog post on my new portfolio website!",
   slug: "welcome-to-my-portfolio",
   status: "published",
   tags: ["portfolio", "web-development"],
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
  },
 ],
 contactMessages: [
  {
   id: "1",
   name: "John Doe",
   email: "john@example.com",
   message: "Great portfolio! I'd love to work with you.",
   read: false,
   receivedAt: new Date().toISOString(),
  },
 ],
 siteSettings: {
  siteName: "Sakshyam Portfolio",
  siteDescription: "Full Stack Developer & Creative Technologist",
  socialLinks: {
   github: "https://github.com/sakshyam",
   twitter: "https://twitter.com/sakshyam",
   linkedin: "https://linkedin.com/in/sakshyam",
  },
 },
};

// Check if we're in Vercel environment with KV
const hasKV = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

// Simple KV operations for Vercel KV
async function kvGet(key) {
 if (!hasKV) return null;

 try {
  const response = await fetch(`${process.env.KV_REST_API_URL}/get/${key}`, {
   headers: {
    Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
   },
  });
  const data = await response.json();
  return data.result ? JSON.parse(data.result) : null;
 } catch (error) {
  console.error("KV get error:", error);
  return null;
 }
}

async function kvSet(key, value) {
 if (!hasKV) return false;

 try {
  const response = await fetch(`${process.env.KV_REST_API_URL}/set/${key}`, {
   method: "POST",
   headers: {
    Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ value: JSON.stringify(value) }),
  });
  return response.ok;
 } catch (error) {
  console.error("KV set error:", error);
  return false;
 }
}

// Generic storage functions
async function getData(key) {
 const kvData = await kvGet(key);
 return kvData || memoryStore[key] || null;
}

async function setData(key, value) {
 memoryStore[key] = value; // Always update memory store
 await kvSet(key, value); // Try to update KV store
 return value;
}

// Maintenance Mode Functions
export async function getMaintenanceStatus() {
 return (await getData("maintenance")) || memoryStore.maintenance;
}

export async function enableMaintenanceMode(reason = "Site under maintenance", enabledBy = "Admin") {
 const status = {
  enabled: true,
  reason,
  enabledAt: new Date().toISOString(),
  enabledBy,
 };
 await setData("maintenance", status);
 return { success: true, message: "Maintenance mode enabled" };
}

export async function disableMaintenanceMode() {
 const status = {
  enabled: false,
  reason: "",
  enabledAt: null,
  enabledBy: null,
 };
 await setData("maintenance", status);
 return { success: true, message: "Maintenance mode disabled" };
}

// Blog Management Functions
export async function getBlogPosts() {
 return (await getData("blogPosts")) || [];
}

export async function createBlogPost(post) {
 const posts = await getBlogPosts();
 const newPost = {
  id: Date.now().toString(),
  ...post,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
 };
 posts.push(newPost);
 await setData("blogPosts", posts);
 return { success: true, post: newPost };
}

export async function updateBlogPost(id, updates) {
 const posts = await getBlogPosts();
 const index = posts.findIndex((post) => post.id === id);
 if (index === -1) {
  return { success: false, error: "Post not found" };
 }

 posts[index] = {
  ...posts[index],
  ...updates,
  updatedAt: new Date().toISOString(),
 };

 await setData("blogPosts", posts);
 return { success: true, post: posts[index] };
}

export async function deleteBlogPost(id) {
 const posts = await getBlogPosts();
 const index = posts.findIndex((post) => post.id === id);
 if (index === -1) {
  return { success: false, error: "Post not found" };
 }

 posts.splice(index, 1);
 await setData("blogPosts", posts);
 return { success: true, message: "Post deleted successfully" };
}

// Contact Management Functions
export async function getContactMessages() {
 return (await getData("contactMessages")) || [];
}

export async function addContactMessage(message) {
 const messages = await getContactMessages();
 const newMessage = {
  id: Date.now().toString(),
  ...message,
  read: false,
  receivedAt: new Date().toISOString(),
 };
 messages.push(newMessage);
 await setData("contactMessages", messages);
 return { success: true, message: newMessage };
}

export async function markMessageAsRead(id) {
 const messages = await getContactMessages();
 const index = messages.findIndex((msg) => msg.id === id);
 if (index === -1) {
  return { success: false, error: "Message not found" };
 }

 messages[index].read = true;
 await setData("contactMessages", messages);
 return { success: true, message: "Message marked as read" };
}

export async function deleteContactMessage(id) {
 const messages = await getContactMessages();
 const index = messages.findIndex((msg) => msg.id === id);
 if (index === -1) {
  return { success: false, error: "Message not found" };
 }

 messages.splice(index, 1);
 await setData("contactMessages", messages);
 return { success: true, message: "Message deleted successfully" };
}

// Settings Management Functions
export async function getSiteSettings() {
 return (await getData("siteSettings")) || memoryStore.siteSettings;
}

export async function updateSiteSettings(updates) {
 const currentSettings = await getSiteSettings();
 const newSettings = {
  ...currentSettings,
  ...updates,
 };
 await setData("siteSettings", newSettings);
 return { success: true, settings: newSettings };
}

// Analytics Helper Functions
function generateSessionId(ip, userAgent) {
 const today = new Date().toDateString();
 return btoa(`${ip}-${userAgent}-${today}`).substr(0, 16);
}

function formatTimeAgo(timestamp) {
 const now = new Date();
 const time = new Date(timestamp);
 const diffInSeconds = Math.floor((now - time) / 1000);

 if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
 if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
 if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
 return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

function calculateAvgSessionDuration(views) {
 if (views.length === 0) return "0:00";

 const sessionDurations = {};
 views.forEach((view) => {
  if (!sessionDurations[view.sessionId]) {
   sessionDurations[view.sessionId] = { first: view.timestamp, last: view.timestamp };
  } else {
   sessionDurations[view.sessionId].last = view.timestamp;
  }
 });

 const durations = Object.values(sessionDurations).map((session) => {
  const first = new Date(session.first);
  const last = new Date(session.last);
  return (last - first) / 1000; // duration in seconds
 });

 const avgDuration = durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
 const minutes = Math.floor(avgDuration / 60);
 const seconds = Math.floor(avgDuration % 60);

 return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Analytics Functions
export async function trackPageView(data) {
 const views = (await getData("page_views")) || [];
 const newView = {
  id: Date.now() + Math.random().toString(36).substr(2, 9),
  page: data.page || "/",
  referrer: data.referrer || "",
  userAgent: data.userAgent || "",
  ip: data.ip || "",
  timestamp: data.timestamp || new Date().toISOString(),
  sessionId: data.sessionId || generateSessionId(data.ip, data.userAgent),
  timezone: data.timezone || "",
  country: data.country || "Unknown",
  language: data.language || "",
 };

 views.push(newView);

 // Keep only last 10,000 views to prevent memory issues
 if (views.length > 10000) {
  views.splice(0, views.length - 10000);
 }

 await setData("page_views", views);
 return newView;
}

export async function getAnalyticsData(timeRange = "7d") {
 const views = (await getData("page_views")) || [];
 const now = new Date();
 let cutoffDate;

 switch (timeRange) {
  case "1d":
   cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
   break;
  case "7d":
   cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
   break;
  case "30d":
   cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
   break;
  case "90d":
   cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
   break;
  default:
   cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
 }

 const filteredViews = views.filter((view) => new Date(view.timestamp) >= cutoffDate);

 // Calculate unique visitors (based on sessionId)
 const uniqueSessions = new Set(filteredViews.map((view) => view.sessionId));
 const totalVisitors = uniqueSessions.size;

 // Calculate page views
 const pageViews = filteredViews.length;

 // Calculate top pages
 const pageStats = {};
 filteredViews.forEach((view) => {
  if (!pageStats[view.page]) {
   pageStats[view.page] = { path: view.page, views: 0 };
  }
  pageStats[view.page].views++;
 });

 const topPages = Object.values(pageStats)
  .sort((a, b) => b.views - a.views)
  .slice(0, 10);

 // Calculate bounce rate (sessions with only one page view)
 const sessionViews = {};
 filteredViews.forEach((view) => {
  if (!sessionViews[view.sessionId]) {
   sessionViews[view.sessionId] = 0;
  }
  sessionViews[view.sessionId]++;
 });

 const totalSessions = Object.keys(sessionViews).length;
 const bouncedSessions = Object.values(sessionViews).filter((count) => count === 1).length;
 const bounceRate = totalSessions > 0 ? Math.round((bouncedSessions / totalSessions) * 100) : 0;

 // Get recent visitors
 const recentVisitors = filteredViews
  .slice(-20)
  .reverse()
  .map((view) => ({
   page: view.page,
   timestamp: formatTimeAgo(view.timestamp),
   country: view.country || "Unknown",
  }));

 // Calculate average session duration (simplified)
 const avgSessionDuration = calculateAvgSessionDuration(filteredViews);

 return {
  totalVisitors,
  pageViews,
  bounceRate,
  avgSessionDuration,
  topPages,
  recentVisitors,
 };
}

// Dashboard Stats Functions
export async function getDashboardStats() {
 const posts = await getBlogPosts();
 const messages = await getContactMessages();
 const maintenance = await getMaintenanceStatus();
 const analytics = await getAnalyticsData("7d");

 return {
  blogPosts: posts.length,
  contactMessages: messages.length,
  unreadMessages: messages.filter((msg) => !msg.read).length,
  maintenanceMode: maintenance.enabled,
  totalVisitors: analytics.totalVisitors,
  pageViews: analytics.pageViews,
  uptime: process.uptime ? `${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m` : "Unknown",
  storageType: hasKV ? "Vercel KV" : "Memory (temporary)",
 };
}
