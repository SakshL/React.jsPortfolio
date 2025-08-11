// Simple in-memory storage for Edge runtime compatibility
let maintenanceStatus = {
 enabled: false,
 reason: "",
 enabledAt: null,
 enabledBy: null,
};

let blogPosts = [];
let contactMessages = [];
let siteSettings = {
 siteName: "Sakshyam Portfolio",
 siteDescription: "Full Stack Developer & Creative Technologist",
 socialLinks: {
  github: "https://github.com/sakshyam",
  twitter: "https://twitter.com/sakshyam",
  linkedin: "https://linkedin.com/in/sakshyam",
 },
};

// Maintenance Mode Functions
export async function getMaintenanceStatus() {
 return maintenanceStatus;
}

export async function enableMaintenanceMode(reason = "Site under maintenance", enabledBy = "Admin") {
 maintenanceStatus = {
  enabled: true,
  reason,
  enabledAt: new Date().toISOString(),
  enabledBy,
 };
 return { success: true, message: "Maintenance mode enabled" };
}

export async function disableMaintenanceMode() {
 maintenanceStatus = {
  enabled: false,
  reason: "",
  enabledAt: null,
  enabledBy: null,
 };
 return { success: true, message: "Maintenance mode disabled" };
}

// Blog Management Functions
export async function getBlogPosts() {
 return blogPosts;
}

export async function createBlogPost(post) {
 const newPost = {
  id: Date.now().toString(),
  ...post,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
 };
 blogPosts.push(newPost);
 return { success: true, post: newPost };
}

export async function updateBlogPost(id, updates) {
 const index = blogPosts.findIndex((post) => post.id === id);
 if (index === -1) {
  return { success: false, error: "Post not found" };
 }

 blogPosts[index] = {
  ...blogPosts[index],
  ...updates,
  updatedAt: new Date().toISOString(),
 };

 return { success: true, post: blogPosts[index] };
}

export async function deleteBlogPost(id) {
 const index = blogPosts.findIndex((post) => post.id === id);
 if (index === -1) {
  return { success: false, error: "Post not found" };
 }

 blogPosts.splice(index, 1);
 return { success: true, message: "Post deleted successfully" };
}

// Contact Management Functions
export async function getContactMessages() {
 return contactMessages;
}

export async function addContactMessage(message) {
 const newMessage = {
  id: Date.now().toString(),
  ...message,
  read: false,
  receivedAt: new Date().toISOString(),
 };
 contactMessages.push(newMessage);
 return { success: true, message: newMessage };
}

export async function markMessageAsRead(id) {
 const index = contactMessages.findIndex((msg) => msg.id === id);
 if (index === -1) {
  return { success: false, error: "Message not found" };
 }

 contactMessages[index].read = true;
 return { success: true, message: "Message marked as read" };
}

export async function deleteContactMessage(id) {
 const index = contactMessages.findIndex((msg) => msg.id === id);
 if (index === -1) {
  return { success: false, error: "Message not found" };
 }

 contactMessages.splice(index, 1);
 return { success: true, message: "Message deleted successfully" };
}

// Settings Management Functions
export async function getSiteSettings() {
 return siteSettings;
}

export async function updateSiteSettings(updates) {
 siteSettings = {
  ...siteSettings,
  ...updates,
 };
 return { success: true, settings: siteSettings };
}

// Dashboard Stats Functions
export async function getDashboardStats() {
 return {
  blogPosts: blogPosts.length,
  contactMessages: contactMessages.length,
  unreadMessages: contactMessages.filter((msg) => !msg.read).length,
  maintenanceMode: maintenanceStatus.enabled,
  uptime: process.uptime ? `${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m` : "Unknown",
 };
}
