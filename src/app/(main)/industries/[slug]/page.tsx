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
  return industries.map((i) => ({
    slug: i.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const industry = getIndustry(slug);

  if (!industry) {
    return {
      title: "Industry Not Found",
    };
  }

  return {
    title: `${industry.name} Engineering | Flexotech Consulting Engineers`,
    description: industry.overview.slice(0, 160),
    keywords: [
      "Flexotech Consulting Engineers",
      industry.name,
      "Piping Stress Analysis",
      "Pipeline Engineering",
      "CAESAR II",
      "Engineering Consultancy",
    ],
  };
}

function getIndustryMarkdown(slug: string) {
  const contentDirectory = path.join(
    process.cwd(),
    "src/content/industries"
  );

  const fullPath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    data,
    content,
  };
}

export default async function IndustryDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  const md = getIndustryMarkdown(slug);

  const content = md?.content || "";

  const heroTitle =
    md?.data?.title || `${industry.name} Engineering`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flexotech Consulting Engineers",
    url: "https://flexotechconsultingengineers.com",
    description: `Professional engineering consultancy for ${industry.name}`,
    areaServed: "Worldwide",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage:
              "url('/images/industrial-port.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent blur-[80px]" />

        <div className="relative mx-auto flex max-w-[1280px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <Link
              href="/industries"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-500 transition-colors hover:text-amber-400"
            >
              <ArrowLeft size={16} />
              Back to Industries
            </Link>

            <h1 className="mt-4 text-5xl font-extrabold tracking-tighter md:text-6xl">
              {heroTitle}
            </h1>

            <p className="mt-6 text-xl text-steel-400">
              {industry.overview}
            </p>
          </div>

          <div className="md:shrink-0">
            <ButtonLink
              href="/contact"
              size="lg"
              className="bg-amber-500 text-navy-900 shadow-xl hover:bg-amber-400"
            >
              Discuss Your Project
              <ArrowRight
                size={18}
                className="ml-2 inline"
              />
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <div className="mx-auto max-w-[800px]">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-3xl prose-h2:text-navy-900 prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-img:w-full prose-img:rounded-2xl prose-img:shadow-xl prose-li:text-steel-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </Section>
            <Section className="bg-steel-50">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">
              Our Services for {industry.name}
            </h2>

            <div className="mt-6 space-y-3">
              {industry.services.map((slug) => {
                const service = getService(slug);

                if (!service) return null;

                return (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    className="flex items-center justify-between rounded-lg border border-steel-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400"
                  >
                    <span className="font-semibold text-navy-900">
                      {service.title}
                    </span>

                    <ArrowRight
                      size={16}
                      className="text-amber-500"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-navy-900">
              Standards & Codes
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {industry.standards.map((standard) => (
                <span
                  key={standard}
                  className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  {standard}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-navy-900 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">
            Discuss Your {industry.name} Project
          </h2>

          <p className="mt-4 text-steel-300">
            Flexotech Consulting Engineers delivers expert
            piping stress analysis, pipeline engineering,
            vibration analysis, and engineering consultancy
            tailored to your industry.
          </p>

          <div className="mt-7">
            <ButtonLink
              href="/contact"
              size="lg"
              className="bg-amber-500 text-navy-900 hover:bg-amber-400"
            >
              Contact Flexotech Consulting Engineers
              <ArrowRight
                size={18}
                className="ml-2 inline"
              />
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
