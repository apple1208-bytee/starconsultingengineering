import { getAllBlogs } from "@/lib/blogs";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/blogs/BlogCard";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata = {
  title: "Engineering Insights & Technical Articles | Flexotech Consulting Engineers",
  description:
    "Explore engineering articles, piping stress analysis guides, CAESAR II tutorials, pipeline engineering insights, vibration analysis, and industrial engineering knowledge from Flexotech Consulting Engineers.",
};

export const revalidate = 60;

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  if (!blogs.length) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold text-navy-900">
          No technical articles published yet.
        </h1>
        <p className="mt-4 text-steel-600">
          Please check back soon for engineering insights from Flexotech
          Consulting Engineers.
        </p>
      </div>
    );
  }

  const featuredBlog =
    blogs.find(
      (b) => b.slug === "complete-guide-piping-stress-analysis"
    ) || blogs[0];

  const otherBlogs = blogs.filter((b) => b.slug !== featuredBlog.slug);

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <Section className="pb-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-navy-900 md:text-5xl">
            Engineering Insights
          </h1>

          <p className="mt-6 text-lg text-steel-600">
            Explore technical articles, piping stress analysis guides, CAESAR II
            tutorials, vibration engineering, pipeline engineering, and industry
            best practices written by the engineering team at Flexotech
            Consulting Engineers.
          </p>
        </div>
      </Section>

      {/* Featured Article */}
      <Section className="py-8">
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-steel-400">
            Featured Article
          </h2>
        </div>

        <Link
          href={`/blogs/${featuredBlog.slug}`}
          className="group grid items-center gap-8 overflow-hidden rounded-2xl border border-steel-200 bg-white transition-all hover:border-amber-400 hover:shadow-xl lg:grid-cols-2"
        >
          <div className="relative h-full w-full overflow-hidden bg-steel-100 aspect-[4/3] lg:aspect-auto">
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
                {new Date(featuredBlog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <span className="flex items-center gap-1">
                <Clock size={16} />
                {featuredBlog.readTime}
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 transition-colors group-hover:text-amber-500 md:text-4xl">
              {featuredBlog.title}
            </h2>

            <p className="mt-6 line-clamp-3 text-lg text-steel-600">
              {featuredBlog.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-2 font-semibold text-navy-900 group-hover:text-amber-500">
              Read Full Article <ArrowRight size={18} />
            </div>
          </div>
        </Link>
      </Section>

      {/* Categories */}
      <Section className="py-8">
        <div className="mb-10 flex flex-wrap gap-3 border-b border-steel-200 pb-4">
          <span className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white">
            All Articles
          </span>

          <span className="cursor-pointer rounded-full bg-steel-100 px-4 py-2 text-sm font-semibold text-steel-600 transition-colors hover:bg-steel-200">
            Piping Stress Analysis
          </span>

          <span className="cursor-pointer rounded-full bg-steel-100 px-4 py-2 text-sm font-semibold text-steel-600 transition-colors hover:bg-steel-200">
            CAESAR II
          </span>

          <span className="cursor-pointer rounded-full bg-steel-100 px-4 py-2 text-sm font-semibold text-steel-600 transition-colors hover:bg-steel-200">
            Pipeline Engineering
          </span>

          <span className="cursor-pointer rounded-full bg-steel-100 px-4 py-2 text-sm font-semibold text-steel-600 transition-colors hover:bg-steel-200">
            Vibration Analysis
          </span>

          <span className="cursor-pointer rounded-full bg-steel-100 px-4 py-2 text-sm font-semibold text-steel-600 transition-colors hover:bg-steel-200">
            Codes & Standards
          </span>

          <span className="cursor-pointer rounded-full bg-steel-100 px-4 py-2 text-sm font-semibold text-steel-600 transition-colors hover:bg-steel-200">
            Case Studies
          </span>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </Section>
    </div>
  );
}
