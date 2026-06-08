import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { industries, getIndustry } from "@/data/industries";
import { getService } from "@/data/services";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return { title: "Industry not found" };
  return { title: `${i.name} Engineering | Star Consulting`, description: i.overview.slice(0, 150) };
}

function getIndustryMarkdown(slug: string) {
  const contentDirectory = path.join(process.cwd(), "src/content/industries");
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { data, content };
}

export default async function IndustryDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) notFound();

  const md = getIndustryMarkdown(slug);
  const content = md?.content || "";
  const heroTitle = md?.data?.title || `${i.name} Engineering`;

  // Schema Markup
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Star Consulting Engineering",
    "description": `Specialist engineering services for ${i.name}`,
    "areaServed": "Global"
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity" 
          style={{ backgroundImage: "url('/images/industrial-port.jpg')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent blur-[80px]" />
        <div className="relative mx-auto max-w-[1280px] flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-3xl">
            <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-400 mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Industries
            </Link>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tighter md:text-6xl">{heroTitle}</h1>
            <p className="mt-6 text-xl text-steel-400">{i.overview}</p>
          </div>
          <div className="md:shrink-0">
            <ButtonLink href="/contact" size="lg" className="bg-amber-500 text-navy-900 hover:bg-amber-400 shadow-xl">
              Discuss Your Project <ArrowRight size={18} className="ml-2 inline" />
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

      <Section className="bg-steel-50">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Our services for {i.name}</h2>
            <div className="mt-6 space-y-3">
              {i.services.map((sslug) => {
                const svc = getService(sslug);
                if (!svc) return null;
                return (
                  <Link key={sslug} href={`/services/${sslug}`} className="flex items-center justify-between rounded-lg border border-steel-200 bg-white p-4 hover:border-amber-400 shadow-sm transition-all hover:-translate-y-0.5">
                    <span className="font-semibold text-navy-900">{svc.title}</span>
                    <ArrowRight size={16} className="text-amber-500" />
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Standards and codes</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {i.standards.map((t) => <span key={t} className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white">{t}</span>)}
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-navy-900 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Discuss a project in {i.name}</h2>
          <div className="mt-7"><ButtonLink href="/contact" size="lg" className="bg-amber-500 text-navy-900 hover:bg-amber-400">Get in Touch <ArrowRight size={18} className="ml-2 inline" /></ButtonLink></div>
        </div>
      </section>
    </main>
  );
}
