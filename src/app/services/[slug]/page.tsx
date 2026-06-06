import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { services, getService } from "@/data/services";
import { getIndustry } from "@/data/industries";

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
  return { title: s.title, description: s.subtitle };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <main>
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity" 
          style={{ backgroundImage: "url('/images/welding-sparks.jpg')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent blur-[80px]" />
        <div className="relative mx-auto max-w-[1280px]">
          <nav className="mb-6 text-sm text-steel-400">
            <Link href="/services" className="hover:text-amber-500">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-steel-300">{s.title}</span>
          </nav>
          <Icon name={s.icon} className="text-amber-500" size={36} />
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-tight tracking-tighter">{s.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-steel-400">{s.subtitle}</p>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">Overview</p>
          <p className="mt-4 text-lg text-steel-700">{s.overview}</p>
        </div>
      </Section>

      <Section className="bg-white">
        <h2 className="text-3xl font-bold text-navy-900">The challenge</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {s.challenges.map((c) => (
            <Card key={c.title} hover={false} className="border-l-4 border-l-amber-400">
              <h3 className="font-semibold text-navy-900">{c.title}</h3>
              <p className="mt-2 text-sm text-steel-600">{c.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="overflow-hidden">
        <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight mb-12">Our methodology</h2>
        <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4">
          {/* Horizontal connection line (hidden on mobile, visible on md+) */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-steel-200" />
          
          {s.methodology.map((m, idx) => (
            <div key={m.title} className="relative flex-1 group">
              {/* Animated Progress Line */}
              <div className="hidden md:block absolute top-6 left-0 h-[2px] bg-amber-500 w-0 group-hover:w-full transition-all duration-700 ease-out z-0" />
              
              <div className="flex md:flex-col items-start gap-4">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-navy-900 text-lg font-bold text-amber-500 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-navy-900">
                  {idx + 1}
                </div>
                <div className="pt-1 md:pt-4 pr-4">
                  <h3 className="text-lg font-semibold text-navy-900 leading-snug group-hover:text-amber-600 transition-colors">{m.title}</h3>
                  <p className="mt-2 text-sm text-steel-500 leading-relaxed">{m.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Deliverables</h2>
            <ul className="mt-6 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 text-steel-700">
                  <Check size={18} className="text-amber-500" /> {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-500">Software and tools</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.software.map((t) => <Badge key={t}>{t}</Badge>)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-500">Applicable standards</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.standards.map((t) => <Badge key={t} className="bg-steel-100 text-steel-700">{t}</Badge>)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-500">Industries served</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.industries.map((islug) => {
                  const ind = getIndustry(islug);
                  if (!ind) return null;
                  return (
                    <Link key={islug} href={`/industries/${islug}`}>
                      <Badge className="hover:bg-amber-100">{ind.name}</Badge>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold text-navy-900">Frequently asked</h2>
        <div className="mt-8 max-w-3xl divide-y divide-steel-200 rounded-lg border border-steel-200 bg-white">
          {s.faqs.map((f) => (
            <details key={f.question} className="group p-6">
              <summary className="cursor-pointer list-none font-semibold text-navy-900">
                {f.question}
              </summary>
              <p className="mt-3 text-sm text-steel-600">{f.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="bg-[#0A0A0A] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Discuss your project</h2>
          <p className="mt-3 text-steel-400">Tell us about your system and requirements.</p>
          <div className="mt-7"><ButtonLink href="/contact">Get in Touch <ArrowRight size={18} /></ButtonLink></div>
        </div>
      </section>
    </main>
  );
}
