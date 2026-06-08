import { getAllBlogs } from "@/lib/blogs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BlogCard } from "@/components/blogs/BlogCard";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata = {
  title: "Engineering Notes & Technical Insights | Star Consulting",
  description: "Technical articles, guides, and case studies on piping stress analysis, vibration control, and engineering standards.",
};

export const revalidate = 60; // Revalidate page every 60 seconds

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  // If no blogs, return early.
  if (!blogs.length) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold">No insights published yet.</h1>
      </div>
    );
  }

  // Find the longest or most comprehensive post as the featured post.
  // In our case, the "Complete Guide" is the featured one.
  const featuredBlog = blogs.find(b => b.slug === "complete-guide-piping-stress-analysis") || blogs[0];
  
  // Exclude the featured blog from the main grid
  const otherBlogs = blogs.filter(b => b.slug !== featuredBlog.slug);

  return (
    <div className="pt-24 pb-20">
      <Section className="pb-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold text-navy-900 md:text-5xl tracking-tight">
            Technical Insights
          </h1>
          <p className="mt-6 text-lg text-steel-600">
            Deep-dive articles, case studies, and code interpretations written by our senior engineers for the heavy industry community.
          </p>
        </div>
      </Section>

      {/* Featured Post */}
      <Section className="py-8">
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-steel-400">Featured Insight</h2>
        </div>
        <Link 
          href={`/blogs/${featuredBlog.slug}`} 
          className="group grid items-center gap-8 overflow-hidden rounded-2xl border border-steel-200 bg-white transition-all hover:border-amber-400 hover:shadow-xl lg:grid-cols-2"
        >
          <div className="relative aspect-[4/3] h-full w-full overflow-hidden bg-steel-100 lg:aspect-auto">
            <img 
              src={featuredBlog.image} 
              alt={featuredBlog.title} 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute left-6 top-6 rounded-md bg-navy-900/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              {featuredBlog.category}
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="flex items-center gap-4 text-sm font-medium text-steel-500">
              <time dateTime={featuredBlog.date}>
                {new Date(featuredBlog.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
              <span className="flex items-center gap-1">
                <Clock size={16} /> {featuredBlog.readTime}
              </span>
            </div>
            <h3 className="mt-4 text-3xl font-bold leading-tight text-navy-900 group-hover:text-amber-500 transition-colors md:text-4xl">
              {featuredBlog.title}
            </h3>
            <p className="mt-6 text-lg text-steel-600 line-clamp-3">
              {featuredBlog.excerpt}
            </p>
            <div className="mt-8 flex items-center gap-2 font-semibold text-navy-900 group-hover:text-amber-500">
              Read the full guide <ArrowRight size={18} />
            </div>
          </div>
        </Link>
      </Section>

      {/* Categories Filter (Visual only for now, can be expanded to state) */}
      <Section className="py-8">
        <div className="flex flex-wrap gap-3 mb-10 border-b border-steel-200 pb-4">
          <span className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white">All Insights</span>
          <span className="rounded-full bg-steel-100 px-4 py-2 text-sm font-semibold text-steel-600 hover:bg-steel-200 cursor-pointer transition-colors">Piping Stress Analysis</span>
          <span className="rounded-full bg-steel-100 px-4 py-2 text-sm font-semibold text-steel-600 hover:bg-steel-200 cursor-pointer transition-colors">Vibration & Pulsation</span>
          <span className="rounded-full bg-steel-100 px-4 py-2 text-sm font-semibold text-steel-600 hover:bg-steel-200 cursor-pointer transition-colors">Codes & Standards</span>
          <span className="rounded-full bg-steel-100 px-4 py-2 text-sm font-semibold text-steel-600 hover:bg-steel-200 cursor-pointer transition-colors">Case Studies</span>
        </div>

        {/* Regular Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </Section>
    </div>
  );
}
