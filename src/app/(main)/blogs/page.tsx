import { getAllBlogs, type BlogPost } from "@/lib/blogs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BlogCard } from "@/components/blogs/BlogCard";
import { ExternalBlogCard, type ExternalBlog } from "@/components/blogs/ExternalBlogCard";
import Link from "next/link";
import { ArrowRight, Clock, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Engineering Notes & Technical Insights | Star Consulting",
  description: "Technical articles, guides, and case studies on piping stress analysis, vibration control, and engineering standards.",
};

export const revalidate = 60; // Revalidate page every 60 seconds

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  const externalBlogs: ExternalBlog[] = [
    {
      title: "When Piping Meets Pulsation: Preventing Vibrations in Reciprocating Compressor Systems",
      url: "https://www.tataconsultingengineers.com/blogs/when-piping-meets-pulsation-preventing-vibrations-in-reciprocating-compressor-systems/",
      source: "TATA Consulting Engineers",
      excerpt: "Explore the critical intersection of piping design and pulsation control in reciprocating compressor systems to ensure mechanical integrity.",
      category: "Vibration Engineering",
      date: "2024-03-15",
      image: "/images/compressor-vibration.png"
    },
    {
      title: "Managing Pressure Surges in LPG Unloading Pipelines",
      url: "https://www.tataconsultingengineers.com/blogs/managing-pressure-surges-in-lpg-unloading-pipelines/",
      source: "TATA Consulting Engineers",
      excerpt: "Technical deep-dive into transient surge analysis and mitigation strategies for hazardous LPG unloading operations.",
      category: "Safety Engineering",
      date: "2023-11-20",
      image: "/images/industrial-piping.jpg"
    }
  ];

  // Combine internal and external blogs for the marquee
  const marqueeItems = [
    ...blogs.map(b => ({
      title: b.title,
      url: `/blogs/${b.slug}`,
      source: "Internal Insight",
      excerpt: b.excerpt,
      category: b.category,
      date: b.date,
      image: b.image,
      isExternal: false
    })),
    ...externalBlogs.map(b => ({
      ...b,
      isExternal: true
    }))
  ];

  // If no blogs, return early.
  if (!blogs.length) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold">No insights published yet.</h1>
      </div>
    );
  }

  const featuredBlog = blogs.find(b => b.slug === "complete-guide-piping-stress-analysis") || blogs[0];
  const otherBlogs = blogs.filter(b => b.slug !== featuredBlog.slug);

  return (
    <div className="pb-20">
      {/* Top Slideshow Marquee (Utilizing the empty space with ALL content) */}
      <div className="relative overflow-hidden bg-white border-b border-steel-100 pt-20">
        <div className="absolute inset-0 bg-linear-to-b from-navy-50/50 to-transparent opacity-50" />
        
        <div className="mx-auto max-w-[1280px] px-6 pt-12 mb-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-navy-400">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Knowledge Showcase</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-steel-200" />
              <span className="text-[10px] font-medium text-steel-400 uppercase tracking-widest">Global Engineering Network</span>
            </div>
          </div>
        </div>

        <div className="relative flex overflow-x-hidden pb-16 my-pause">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 z-20 w-32 bg-linear-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 z-20 w-32 bg-linear-to-l from-white to-transparent pointer-events-none" />
          
          <div className="flex my-marquee whitespace-nowrap items-stretch gap-8 px-6">
            {/* Multiple copies for seamless loop on all screen sizes */}
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="w-[400px] flex-shrink-0 whitespace-normal">
                {item.isExternal ? (
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block relative h-full rounded-2xl border border-steel-200 bg-white p-2 transition-all hover:border-amber-400 hover:shadow-xl"
                  >
                    <MarqueeCardContent item={item} />
                  </a>
                ) : (
                  <Link 
                    href={item.url}
                    className="group block relative h-full rounded-2xl border border-steel-200 bg-white p-2 transition-all hover:border-amber-400 hover:shadow-xl"
                  >
                    <MarqueeCardContent item={item} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <Section className="pt-20 pb-8">
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

      {/* Categories & Filter */}
      <Section className="py-20">
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

function MarqueeCardContent({ item }: { item: any }) {
  return (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-navy-900 shadow-sm">
          {item.category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider",
            item.isExternal ? "text-amber-600" : "text-navy-500"
          )}>
            {item.source}
          </span>
          <span className="h-1 w-1 rounded-full bg-steel-300" />
          <span className="text-[10px] text-steel-400 font-medium">
            {item.isExternal ? "External Partner" : "Engineering Note"}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-tight text-navy-900 group-hover:text-amber-600 transition-colors whitespace-normal line-clamp-2">
          {item.title}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-steel-500 italic">
            {item.isExternal ? "Featured Technical Case Study" : "Deep-dive Internal Paper"}
          </p>
          <div className="flex items-center gap-1 text-[10px] font-bold text-navy-900 group-hover:text-amber-500 transition-colors uppercase tracking-tighter">
            {item.isExternal ? "View Paper" : "Read Insight"} <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </>
  );
}
