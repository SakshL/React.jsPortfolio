import { getBlogPosts, createBlogPost, deleteBlogPost, updateBlogPost } from "../../../../lib/admin-vercel";
import { requireAuth } from "../../../../lib/auth";

export const runtime = "edge";

export const GET = requireAuth(async () => {
 const posts = await getBlogPosts();
 return new Response(JSON.stringify(posts), {
  headers: { "Content-Type": "application/json" },
 });
});

export const POST = requireAuth(async (request) => {
 const { title, content, tags, status, slug, author, publishedAt, summary, image } = await request.json();

 if (!title || !content) {
  return new Response(JSON.stringify({ error: "Title and content are required" }), {
   status: 400,
   headers: { "Content-Type": "application/json" },
  });
 }

 const post = {
  title,
  content,
  tags: tags || [],
  status: status || "published",
  slug:
   slug ||
   title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  author: author || "Sakshyam Baral",
  publishedAt: publishedAt || new Date().toISOString(),
  summary: summary || "",
  image: image || "",
 };

 const result = await createBlogPost(post);
 return new Response(JSON.stringify(result), {
  headers: { "Content-Type": "application/json" },
 });
});

export const DELETE = requireAuth(async (request) => {
 const { id } = await request.json();

 if (!id) {
  return new Response(JSON.stringify({ error: "ID is required" }), {
   status: 400,
   headers: { "Content-Type": "application/json" },
  });
 }

 const result = await deleteBlogPost(id);
 return new Response(JSON.stringify(result), {
  headers: { "Content-Type": "application/json" },
 });
});

export const PUT = requireAuth(async (request) => {
 const { id, title, content, tags, status, slug, author, publishedAt, summary, image } = await request.json();

 if (!id || !title || !content) {
  return new Response(JSON.stringify({ error: "ID, title and content are required" }), {
   status: 400,
   headers: { "Content-Type": "application/json" },
  });
 }

 const updates = {
  title,
  content,
  tags: tags || [],
  status: status || "draft",
  slug:
   slug ||
   title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  author,
  publishedAt,
  summary,
  image,
 };

 const result = await updateBlogPost(id, updates);
 return new Response(JSON.stringify(result), {
  headers: { "Content-Type": "application/json" },
 });
});
