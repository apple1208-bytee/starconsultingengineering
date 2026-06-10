import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExternalBlog = {
  title: string;
  url: string;
  source: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
};

export function ExternalBlogCard({ blog }: { blog: ExternalBlog }) {
  return (
    <a 
      href={blog.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-steel-200 bg-white transition-all hover:-translate-y-1 hover:border-amber-400 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-steel-100">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-md bg-amber-500 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {blog.category}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-navy-900/80 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <ExternalLink size={16} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-xs font-medium text-steel-500">
          <time dateTime={blog.date}>
            {new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <span className="flex items-center gap-1 font-bold text-navy-600">
            via {blog.source}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-bold leading-tight text-navy-900 group-hover:text-amber-500 transition-colors">
          {blog.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm text-steel-600">
          {blog.excerpt}
        </p>
        <div className="mt-auto pt-6 flex items-center gap-1 text-sm font-semibold text-navy-700 group-hover:text-amber-500">
          View on {blog.source.split(' ')[0]} <ArrowRight size={16} />
        </div>
      </div>
    </a>
  );
}
