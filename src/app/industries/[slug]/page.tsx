import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { industries, getIndustry } from "@/data/industries";
import { getService } from "@/data/services";

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
  return { title: i.name, description: i.overview.slice(0, 150) };
}

export default async function IndustryDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) notFound();

  return (
    <main>
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity" 
          style={{ backgroundImage: "url('/images/industrial-port.jpg')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent blur-[80px]" />
        <div className="relative mx-auto max-w-[1280px]">
          <nav className="mb-6 text-sm text-steel-400">
            <Link href="/industries" className="hover:text-amber-500">Industries</Link>
            <span className="mx-2">/</span>
            <span className="text-steel-300">{i.name}</span>
          </nav>
          <Icon name={i.icon} className="text-amber-500" size={36} />
          <h1 className="mt-4 text-5xl font-extrabold tracking-tighter">{i.name}</h1>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">Overview</p>
          <p className="mt-4 text-lg text-steel-700">{i.overview}</p>
        </div>
      </Section>

      <Section className="bg-white">
        <h2 className="text-3xl font-bold text-navy-900">Key engineering challenges</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {i.challenges.map((c) => (
            <Card key={c.title} hover={false} className="border-l-4 border-l-amber-400">
              <h3 className="font-semibold text-navy-900">{c.title}</h3>
              <p className="mt-2 text-sm text-steel-600">{c.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Our services for this industry</h2>
            <div className="mt-6 space-y-3">
              {i.services.map((sslug) => {
                const svc = getService(sslug);
                if (!svc) return null;
                return (
                  <Link key={sslug} href={`/services/${sslug}`} className="flex items-center justify-between rounded-lg border border-steel-200 bg-white p-4 hover:border-amber-400">
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
              {i.standards.map((t) => <Badge key={t} className="bg-steel-100 text-steel-700">{t}</Badge>)}
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-[#0A0A0A] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Discuss a project in {i.name}</h2>
          <div className="mt-7"><ButtonLink href="/contact">Get in Touch <ArrowRight size={18} /></ButtonLink></div>
        </div>
      </section>
    </main>
  );
}
