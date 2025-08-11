import fs from "fs/promises";
import path from "path";

const MAINTENANCE_FILE = path.join(process.cwd(), ".maintenance");
const SETTINGS_FILE = path.join(process.cwd(), "data", "admin-settings.json");

// Maintenance mode functions
export async function enableMaintenanceMode(reason = "Scheduled maintenance") {
 const maintenanceData = {
  enabled: true,
  reason,
  enabledAt: new Date().toISOString(),
  enabledBy: "admin",
 };

 await fs.writeFile(MAINTENANCE_FILE, JSON.stringify(maintenanceData, null, 2));
 return maintenanceData;
}

export async function disableMaintenanceMode() {
 try {
  await fs.unlink(MAINTENANCE_FILE);
  return { enabled: false };
 } catch (error) {
  // File doesn't exist, maintenance already disabled
  return { enabled: false };
 }
}

export async function getMaintenanceStatus() {
 try {
  const data = await fs.readFile(MAINTENANCE_FILE, "utf8");
  return JSON.parse(data);
 } catch (error) {
  return { enabled: false };
 }
}

// Settings management
export async function getAdminSettings() {
 try {
  const data = await fs.readFile(SETTINGS_FILE, "utf8");
  return JSON.parse(data);
 } catch (error) {
  // Return default settings
  return {
   siteTitle: "Sakshyam Baral",
   siteDescription: "I'm a full-stack developer based in Nepal",
   maintenanceMode: false,
   allowComments: true,
   analyticsEnabled: true,
   theme: "dark",
   contactFormEnabled: true,
   maxFileSize: "10MB",
   allowedFileTypes: ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx"],
   socialMedia: {
    github: "SakshL",
    twitter: "@sakshyamky",
    discord: "sakshspamw",
    instagram: "fymsakshyam",
   },
  };
 }
}

export async function saveAdminSettings(settings) {
 await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
 return settings;
}

// Blog management
export async function getBlogPosts() {
 const blogDir = path.join(process.cwd(), "data", "blog");
 try {
  const files = await fs.readdir(blogDir);
  const posts = [];

  for (const file of files) {
   if (file.endsWith(".mdx")) {
    const content = await fs.readFile(path.join(blogDir, file), "utf8");
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
     const frontmatter = frontmatterMatch[1];
     const body = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "");

     // Parse frontmatter
     const metadata = {};
     frontmatter.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length > 0) {
       const value = valueParts.join(":").trim().replace(/['"]/g, "");
       metadata[key.trim()] = value;
      }
     });

     posts.push({
      filename: file,
      slug: file.replace(".mdx", ""),
      ...metadata,
      content: body,
      wordCount: body.split(" ").length,
      lastModified: (await fs.stat(path.join(blogDir, file))).mtime,
     });
    }
   }
  }

  return posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
 } catch (error) {
  return [];
 }
}

export async function saveBlogPost(slug, frontmatter, content) {
 const filename = `${slug}.mdx`;
 const filepath = path.join(process.cwd(), "data", "blog", filename);

 const frontmatterStr = Object.entries(frontmatter)
  .map(([key, value]) => `${key}: "${value}"`)
  .join("\n");

 const fileContent = `---\n${frontmatterStr}\n---\n\n${content}`;

 await fs.writeFile(filepath, fileContent);
 return { filename, slug };
}

export async function deleteBlogPost(slug) {
 const filepath = path.join(process.cwd(), "data", "blog", `${slug}.mdx`);
 await fs.unlink(filepath);
 return { deleted: true };
}

// File management
export async function getUploadedFiles() {
 const uploadDir = path.join(process.cwd(), "public", "uploads");

 try {
  await fs.mkdir(uploadDir, { recursive: true });
  const files = await fs.readdir(uploadDir);
  const fileDetails = [];

  for (const file of files) {
   const stats = await fs.stat(path.join(uploadDir, file));
   fileDetails.push({
    name: file,
    size: stats.size,
    lastModified: stats.mtime,
    url: `/uploads/${file}`,
   });
  }

  return fileDetails;
 } catch (error) {
  return [];
 }
}

export async function deleteFile(filename) {
 const filepath = path.join(process.cwd(), "public", "uploads", filename);
 await fs.unlink(filepath);
 return { deleted: true };
}
