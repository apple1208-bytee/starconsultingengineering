import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { services, getService } from "@/data/services";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Service not found" };
  return { title: `${s.title} | Star Consulting Engineering`, description: s.subtitle };
}

function getServiceMarkdown(slug: string) {
  const contentDirectory = path.join(process.cwd(), "src/content/services");
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { data, content };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const md = getServiceMarkdown(slug);
  const content = md?.content || "";
  const heroCtaText = md?.data?.hero_cta || "Request a Scope Review";
  const bottomCtaText = md?.data?.bottom_cta || "Contact Our Engineers";

  // Schema Markup
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": s.title,
    "provider": {
      "@type": "Organization",
      "name": "Star Consulting Engineering"
    },
    "areaServed": "Global"
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity" 
          style={{ backgroundImage: "url('/images/welding-sparks.jpg')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
        <div className="relative mx-auto max-w-[1280px] flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-400 mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Services
            </Link>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tighter md:text-6xl">{s.title}</h1>
            <p className="mt-6 text-xl text-steel-400">{s.subtitle}</p>
          </div>
          <div className="md:shrink-0">
            <ButtonLink href="/contact" size="lg" className="bg-amber-500 text-navy-900 hover:bg-amber-400 shadow-xl">
              {heroCtaText} <ArrowRight size={18} className="ml-2 inline" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Markdown Content */}
      <Section className="bg-white">
        <div className="mx-auto max-w-[800px]">
          <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-navy-900 prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-xl prose-img:w-full prose-li:text-steel-700 max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <section className="bg-navy-900 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Ready to solve your engineering challenges?</h2>
          <p className="mt-4 text-lg text-steel-400">Our specialists are ready to support your project.</p>
          <div className="mt-8">
            <ButtonLink href="/contact" size="lg" className="bg-amber-500 text-navy-900 hover:bg-amber-400">
              {bottomCtaText} <ArrowRight size={18} className="ml-2 inline" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <Section className="bg-steel-50">
        <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center">Related Services</h2>
        <div className="mx-auto grid max-w-[1000px] gap-6 sm:grid-cols-3">
          {services.filter(svc => svc.slug !== slug).slice(0, 3).map((rel) => (
            <Link key={rel.slug} href={`/services/${rel.slug}`} className="group block rounded-xl border border-steel-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg">
              <h3 className="font-semibold text-navy-900 group-hover:text-amber-600 transition-colors">{rel.title}</h3>
              <p className="mt-2 text-sm text-steel-600 line-clamp-2">{rel.subtitle}</p>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}
