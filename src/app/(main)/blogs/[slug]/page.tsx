import { getBlogBySlug, getAllBlogs } from "@/lib/blogs";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const revalidate = 60; // Revalidate page every 60 seconds

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    return {
      title: `${blog.title} | Star Consulting`,
      description: blog.excerpt,
    };
  } catch (e) {
    return { title: "Blog Not Found" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  let blog;
  try {
    const { slug } = await params;
    blog = await getBlogBySlug(slug);
    
    if (!blog) {
      notFound();
    }
  } catch (e) {
    notFound();
  }

  return (
    <article className="pb-24 pt-32">
      <div className="mx-auto max-w-[800px] px-6">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-500 mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Insights
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm font-medium text-steel-500 mb-6">
            <span className="rounded-md bg-steel-100 px-2.5 py-1 font-semibold text-navy-900">
              {blog.category}
            </span>
            <time dateTime={blog.date}>
              {new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {blog.readTime}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-navy-900 md:text-5xl lg:text-6xl">
            {blog.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-steel-600">
            {blog.excerpt}
          </p>
        </header>
      </div>

      <div className="mx-auto max-w-[1000px] px-6 mb-16">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-steel-100 shadow-lg">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-6">
        <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md prose-pre:bg-navy-900 prose-pre:text-steel-100 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </div>

        <div className="mt-16 border-t border-steel-200 pt-8">
          <div className="rounded-2xl bg-steel-50 p-8 text-center sm:p-12">
            <h3 className="text-2xl font-bold text-navy-900">Project-Specific Analysis Needed?</h3>
            <p className="mt-4 text-steel-600 max-w-lg mx-auto">
              Our engineering team is ready to apply these methodologies to your specific operational challenges. Contact us for a detailed technical review.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-navy-900 transition-colors hover:bg-amber-400">
                Contact Our Engineers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
