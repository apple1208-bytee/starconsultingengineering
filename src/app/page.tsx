import Link from "next/link";
import { ArrowRight, ShieldCheck, Gauge, Clock, Layers, Lock, Award } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity" 
          style={{ backgroundImage: "url('/images/data-grid.jpg')" }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-[#0A0A0A]/80 to-[#0A0A0A] blur-[80px]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-[1280px] flex-col justify-center px-6 py-24">
          <p className="reveal mb-5 text-sm font-semibold uppercase tracking-widest text-amber-500" style={{ ["--delay" as string]: "0ms" }}>
            Piping · Stress · Vibration Consultancy
          </p>
          <h1 className="reveal max-w-4xl text-[length:var(--text-6xl)] font-extrabold leading-[1.05] tracking-tighter" style={{ ["--delay" as string]: "80ms" }}>
            Engineering Precision.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Industrial Excellence.</span>
          </h1>
          <p className="reveal mt-6 max-w-2xl text-lg text-steel-400" style={{ ["--delay" as string]: "160ms" }}>
            Specialist piping, stress and vibration engineering for oil &amp; gas, LNG,
            petrochemical and power industries - analysis you can build on.
          </p>
          <div className="reveal mt-9 flex flex-wrap gap-4" style={{ ["--delay" as string]: "240ms" }}>
            <ButtonLink href="/contact" size="lg">Discuss Your Project <ArrowRight size={18} /></ButtonLink>
            <ButtonLink href="/services" size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 backdrop-blur-sm">
              Explore Our Services
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="border-b border-steel-800 bg-[#0A0A0A]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-mono text-3xl font-bold text-amber-500">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-steel-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Company overview */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Specialist engineers for the systems that matter most"
              subtitle="We are a focused consultancy delivering piping stress, vibration and safety engineering to operators and EPC contractors across heavy industry."
            />
            <p className="mt-6 text-steel-600">
              Our work keeps critical piping within code, controls vibration on rotating
              equipment, and resolves in-service problems fast. Every deliverable is grounded
              in ASME and API practice and written to be acted on.
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="secondary">More about us <ArrowRight size={16} /></ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <img 
              src="/images/oil-refinery.jpg" 
              alt="Oil refinery at night" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105 grayscale hover:grayscale-0"
            />
          </div>
        </div>
      </Section>

      {/* Services snapshot */}
      <Section className="bg-white">
        <SectionHeading eyebrow="What we do" title="Engineering services" subtitle="Ten focused service lines covering the full piping engineering lifecycle." center />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group">
              <Card className="h-full">
                <Icon name={s.icon} className="text-amber-500" size={28} />
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm text-steel-600">{s.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 group-hover:text-amber-500">
                  Learn more <ArrowRight size={14} />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section>
        <SectionHeading eyebrow="Where we work" title="Industries served" center />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="flex flex-col items-center gap-3 rounded-lg border border-steel-200 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-amber-400 hover:shadow-[var(--shadow-card-hover)]"
            >
              <Icon name={i.icon} className="text-navy-700" size={26} />
              <span className="text-sm font-semibold text-navy-900">{i.name}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section dark className="bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-navy-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative">
          <SectionHeading eyebrow="Why Star Consulting" title="Built on engineering depth" light center />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Layers, title: "Technical depth", body: "Practising specialists, not generalists - deep expertise in stress and vibration." },
              { icon: ShieldCheck, title: "Standards expertise", body: "Fluent in ASME B31, API 6xx and the codes your projects depend on." },
              { icon: Clock, title: "Rapid turnaround", body: "Mobilised in 48 hours for urgent in-service troubleshooting." },
              { icon: Lock, title: "Confidentiality", body: "Client work treated with strict engineering confidentiality." },
              { icon: Gauge, title: "Multi-software", body: "CAESAR II, AutoPIPE, ANSYS and more - the right tool for the job." },
              { icon: Award, title: "Proven track record", body: "Hundreds of projects across heavy industry worldwide." },
            ].map((p) => (
              <div key={p.title} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all hover:bg-white/10">
                <p.icon className="text-amber-400" size={26} />
                <h3 className="mt-4 text-lg font-semibold text-white tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-steel-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA banner */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-400">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-6 py-16 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Have a technical challenge?</h2>
            <p className="mt-2 text-navy-800">Our engineers are ready to help you design, analyse and solve.</p>
          </div>
          <ButtonLink href="/contact" variant="secondary" size="lg">Get in Touch <ArrowRight size={18} /></ButtonLink>
        </div>
      </section>
    </>
  );
}
