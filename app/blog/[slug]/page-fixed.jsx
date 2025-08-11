import Avatar from "/public/assets/avatar.png";
import { allBlogs } from "contentlayer/generated";
import { parseISO } from "/lib/utils";
import { meta } from "/config";
import { TocItem } from "components/blog/Toc";
import { MDXComponent } from "components/blog/Components";
import Image from "next/image";
import Link from "next/link";
import "styles/blog.css";
import { notFound } from "next/navigation";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
 // Get static params from contentlayer
 const staticParams = allBlogs.map((post) => ({
  slug: post.slug,
 }));

 // Get dynamic params from public API
 let dynamicParams = [];
 try {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' });
  if (response.ok) {
   const apiPosts = await response.json();
   dynamicParams = apiPosts.map((post) => ({
    slug: post.slug,
   }));
  }
 } catch (error) {
  console.error("Failed to fetch dynamic blog params:", error);
 }

 return [...staticParams, ...dynamicParams];
}

export async function generateMetadata({ params }) {
 // Check static posts first
 let post = allBlogs.find((post) => post?.slug === params?.slug);

 // If not found in static, check dynamic posts
 if (!post) {
  try {
   const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
   const response = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' });
   if (response.ok) {
    const apiPosts = await response.json();
    const dynamicPost = apiPosts.find((p) => p.slug === params?.slug);
    if (dynamicPost) {
     post = {
      title: dynamicPost.title,
      publishedAt: dynamicPost.publishedAt || dynamicPost.createdAt,
      summary: dynamicPost.summary || dynamicPost.content?.substring(0, 150),
      slug: dynamicPost.slug,
     };
    }
   }
  } catch (error) {
   console.error("Failed to fetch dynamic blog metadata:", error);
  }
 }

 if (!post) {
  return;
 }

 const { title, publishedAt: publishedTime, summary: description, slug } = post;

 return {
  title,
  description,
  openGraph: {
   title,
   description,
   type: "article",
   publishedTime,
   url: `${meta.url}/blog/${slug}`,
  },
  twitter: {
   card: "summary_large_image",
   title,
   description,
  },
 };
}

export default async function Post({ params }) {
 // Check static posts first
 let post = allBlogs.find((post) => post?.slug === params?.slug);
 let isDynamic = false;

 // If not found in static, check dynamic posts
 if (!post) {
  try {
   const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
   const response = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' });
   if (response.ok) {
    const apiPosts = await response.json();
    const dynamicPost = apiPosts.find((p) => p.slug === params?.slug);
    if (dynamicPost) {
     post = dynamicPost;
     isDynamic = true;
    }
   }
  } catch (error) {
   console.error("Failed to fetch dynamic blog post:", error);
  }
 }

 if (!post) {
  return notFound();
 }

 return (
  <article className="mx-auto mb-16 flex min-h-screen w-full max-w-2xl flex-col items-start justify-center">
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
     __html: JSON.stringify(post?.structuredData || {}),
    }}
   />
   <div className="prose grid flex-1 grid-cols-1 gap-x-8  dark:prose-dark md:grid-cols-[1fr,minmax(auto,640px),1fr] md:[&>*]:col-start-2">
    <div>
     <header className="w-full ">
      <h1 className="mb-2 mt-6 flex items-center box-decoration-clone bg-clip-text  text-[2.5rem] font-semibold motion-reduce:transition-none">
       {post?.title}
       <span className="bg-gradient-to-r from-[#6310ff] to-[#1491ff] box-decoration-clone bg-clip-text text-fill-transparent dark:from-[#a2facf] dark:to-[#64acff]">.</span>
      </h1>
      <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
       <div>
        <div className="flex items-center">
         <Image alt={meta?.title} height={24} width={24} src={Avatar} className="rounded-full" />
         <time className="ml-2 text-sm text-gray-700 dark:text-gray-300" dateTime={new Date(post?.publishedAt || post?.createdAt).toUTCString()}>
          {post?.author || "Sakshyam Baral"} / {parseISO(post?.publishedAt || post?.createdAt)}
         </time>
        </div>
       </div>
       <p className="min-w-32 mt-2 text-sm text-gray-600 dark:text-gray-400 md:mt-0">
        {post?.wordCount || Math.ceil((post?.content?.length || 0) / 5)} words • {post?.readingTime?.text || Math.ceil((post?.content?.length || 0) / 1000) + " min read"}
       </p>
      </div>
     </header>
     
     {/* Render MDX for static posts or plain content for dynamic posts */}
     {isDynamic ? (
      <div className="prose prose-lg max-w-none dark:prose-dark">
       <div dangerouslySetInnerHTML={{ __html: post.content?.replace(/\n/g, "<br/>") }} />
      </div>
     ) : (
      <MDXComponent code={post.body.code} />
     )}
    </div>
    
    {/* Table of contents - only for static posts with headings */}
    {!isDynamic && post?.headings && (
     <div className="sticky top-24 !col-start-3 ml-3 mt-8 hidden max-w-[14rem] flex-col space-y-2 self-start text-base xl:flex">
      <p className="mb-0 text-sm uppercase">On this page</p>
      {post?.headings?.map((props) => (
       <TocItem key={props?.slug} {...props} />
      ))}
     </div>
    )}
   </div>
   
   {/* Edit suggestion link - only for static posts */}
   {!isDynamic && (
    <div className="flex w-full justify-end py-4  text-gray-700 dark:text-gray-300">
     <Link href={`https://github.com/${meta.accounts.github.username}/${meta.accounts.github.repo}/blob/master/data/blog/${post.slug}.mdx`} target="_blank" rel="noopener noreferrer">
      Suggest a change
     </Link>
    </div>
   )}
  </article>
 );
}
