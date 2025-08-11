import { ListElement } from "components/blog/BlogList";
import { pick } from "contentlayer/client";
import { allBlogs } from "contentlayer/generated";

export const runtime = "edge";

// Force dynamic rendering and disable all caching
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function Blog() {
 // Get both static posts from Contentlayer and dynamic posts from API
 const staticPosts = allBlogs.map((post) => pick(post, ["slug", "title", "summary", "publishedAt"]));

 // Get dynamic posts from public API
 let dynamicPosts = [];
 try {
  // Use the public blog API that doesn't require auth
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/blog`, {
   method: 'GET',
   headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
   },
   cache: 'no-store',
   next: { revalidate: 0 }
  });
  
  if (response.ok) {
   const apiPosts = await response.json();
   dynamicPosts = apiPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary || post.content?.substring(0, 150) + "...",
    publishedAt: post.publishedAt || post.createdAt,
   }));
  }
 } catch (error) {
  console.error("Failed to fetch dynamic posts:", error);
 }

 // Combine and sort all posts
 const allPosts = [...staticPosts, ...dynamicPosts].sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)));

 return (
  <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
   <h1 className="mb-4 flex items-center justify-center box-decoration-clone bg-clip-text text-center  text-[2rem] font-semibold motion-reduce:transition-none">
    Tech Blog <span className="bg-gradient-to-r from-[#6310ff] to-[#1491ff] box-decoration-clone bg-clip-text text-fill-transparent dark:from-[#a2facf] dark:to-[#64acff]">.</span>
   </h1>
   <p className="mb-4  text-slate-600 dark:text-slate-400">
    A blog about technology, programming and many other interesting things. There {allPosts.length > 1 ? "are" : "is"} currently {allPosts.length} {allPosts.length > 1 ? "posts" : "post"} on the blog, use the search below to filter posts.
   </p>

   <h3 className="mt-8 flex items-center justify-center box-decoration-clone bg-clip-text text-center  text-[1.7rem] font-semibold motion-reduce:transition-none">
    All Posts
    <span className="bg-gradient-to-r from-[#6310ff] to-[#1491ff] box-decoration-clone bg-clip-text text-fill-transparent dark:from-[#a2facf] dark:to-[#64acff]">.</span>
   </h3>
   {!allPosts.length && <p className="mb-4  text-rose-500">No posts found!</p>}
   <ol className="relative mt-8 border-l border-slate-200 dark:border-neutral-800">
    {allPosts.map((post, index) => (
     <ListElement {...post} index={index} key={post.slug} />
    ))}
   </ol>
  </div>
 );
}
