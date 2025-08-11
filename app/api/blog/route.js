import { getBlogPosts } from "../../../lib/admin-vercel";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Public API to get published blog posts
export async function GET() {
 try {
  const posts = await getBlogPosts();
  const publishedPosts = posts.filter(post => post.status === "published");
  
  return new Response(JSON.stringify(publishedPosts), {
   headers: { 
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate"
   },
  });
 } catch (error) {
  console.error("Error fetching blog posts:", error);
  return new Response(JSON.stringify([]), {
   headers: { "Content-Type": "application/json" },
  });
 }
}
