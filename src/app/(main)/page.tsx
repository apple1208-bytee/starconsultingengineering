import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Gauge,
  Clock,
  Layers,
  Lock,
  Award,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { site } from "@/data/site";
import { getAllBlogs } from "@/lib/blogs";
import { BlogCard } from "@/components/blogs/BlogCard";

export const revalidate = 60;

export default async function Home() {
  const latestBlogs = await getAllBlogs();
  const topThree = latestBlogs.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500/20 via-[#0A0A0A]/80 to-[#0A0A0A] blur-[80px] pointer-events-none" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-[1280px] flex-col items-center justify-center gap-12 px-6 py-24 lg:flex-row lg:justify-between">
          {/* Left Content */}
          <div className="flex w-full flex-col justify-center lg:w-1/2">
            <p
              className="reveal mb-5 text-sm font-semibold uppercase tracking-widest text-amber-500"
              style={{ ["--delay" as string]: "0ms" }}
            >
              Piping · Stress · Vibration Consultancy
            </p>

            <h1
              className="reveal max-w-2xl text-[length:var(--text-6xl)] font-extrabold leading-[1.05] tracking-tighter"
              style={{ ["--delay" as string]: "80ms" }}
            >
              Engineering Precision.
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                Industrial Excellence.
              </span>
            </h1>

            <p
              className="reveal mt-6 max-w-xl text-lg text-steel-400"
              style={{ ["--delay" as string]: "160ms" }}
            >
              Flexotech Consulting Engineers delivers specialist piping stress
              analysis, vibration studies, CAESAR II solutions, and engineering
              consultancy services for oil & gas, LNG, petrochemical, power,
              and process industries.
            </p>

            <div
              className="reveal mt-9 flex flex-wrap gap-4"
              style={{ ["--delay" as string]: "240ms" }}
            >
              <ButtonLink href="/contact" size="lg">
                Discuss Your Project <ArrowRight size={18} />
              </ButtonLink>

              <ButtonLink
                href="/services"
                size="lg"
                variant="outline"
                className="border-white/20 text-white backdrop-blur-sm hover:bg-white/5"
              >
                Explore Our Services
              </ButtonLink>
            </div>
          </div>

          {/* Hero Images */}
          <div
            className="reveal relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:w-1/2"
            style={{ ["--delay" as string]: "320ms" }}
          >
            <img
              src="/images/hero-marquee-1.png"
              alt="Industrial Plant 1"
              className="absolute inset-0 h-full w-full object-cover animate-fade-1"
            />

            <img
              src="/images/hero-marquee-2.png"
              alt="Industrial Plant 2"
              className="absolute inset-0 h-full w-full object-cover animate-fade-2"
            />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-b border-steel-800 bg-[#0A0A0A]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-mono text-3xl font-bold text-amber-500">
                {s.value}
              </p>
              <p className="mt-1 text-sm font-medium text-steel-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Company Overview */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="Specialist Engineers for the Systems That Matter Most"
              subtitle="Flexotech Consulting Engineers is a specialist engineering consultancy delivering piping stress analysis, vibration engineering, and industrial engineering solutions for EPC contractors and plant operators."
            />

            <p className="mt-6 text-steel-600">
              Our work keeps critical piping systems within international
              standards, controls vibration in rotating equipment, and solves
              complex engineering challenges through reliable, practical
              solutions.
            </p>

            <div className="mt-8">
              <ButtonLink href="/about" variant="secondary">
                More About Us <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src="/images/oil-refinery.jpg"
              alt="Industrial Refinery"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105 grayscale hover:grayscale-0"
            />
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section className="bg-white">
        <SectionHeading
          eyebrow="What We Do"
          title="Engineering Services"
          subtitle="Professional engineering solutions covering the complete piping engineering lifecycle."
          center
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group"
            >
              <Card className="h-full">
                <Icon name={s.icon} className="text-amber-500" size={28} />
                <h3 className="mt-4 text-lg font-semibold text-navy-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-steel-600">{s.subtitle}</p>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 group-hover:text-amber-500">
                  Learn More <ArrowRight size={14} />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section>
        <SectionHeading
          eyebrow="Where We Work"
          title="Industries Served"
          center
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="flex flex-col items-center gap-3 rounded-lg border border-steel-200 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-amber-400 hover:shadow-[var(--shadow-card-hover)]"
            >
              <Icon name={i.icon} className="text-navy-700" size={26} />
              <span className="text-sm font-semibold text-navy-900">
                {i.name}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Blogs */}
      <Section className="bg-steel-50">
        <SectionHeading
          eyebrow="Engineering Notes"
          title="Latest Insights"
          subtitle="Technical articles and engineering knowledge from the Flexotech Consulting Engineers team."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topThree.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/blogs" variant="secondary">
            View All Articles <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section dark className="relative overflow-hidden bg-[#0A0A0A]">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-500/10 blur-[120px]" />

        <div className="relative">
          <SectionHeading
            eyebrow="Why Flexotech Consulting Engineers"
            title="Built on Engineering Excellence"
            subtitle="Delivering reliable engineering solutions with technical expertise, precision, and industry experience."
            light
            center
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Layers,
                title: "Technical Expertise",
                body: "Experienced specialists delivering reliable piping stress and vibration engineering solutions.",
              },
              {
                icon: ShieldCheck,
                title: "International Standards",
                body: "Compliant with ASME, API, and internationally recognized engineering codes.",
              },
              {
                icon: Clock,
                title: "Fast Project Delivery",
                body: "Efficient engineering support with timely project execution.",
              },
              {
                icon: Lock,
                title: "Complete Confidentiality",
                body: "Professional handling of every engineering project with strict confidentiality.",
              },
              {
                icon: Gauge,
                title: "Advanced Engineering Software",
                body: "Expertise in CAESAR II, AutoPIPE, ANSYS, and other engineering platforms.",
              },
              {
                icon: Award,
                title: "Trusted Engineering Partner",
                body: "Supporting industrial clients with dependable engineering consultancy services.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10"
              >
                <p.icon className="text-amber-400" size={26} />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-steel-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-400">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-6 py-16 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">
              Have a Technical Challenge?
            </h2>

            <p className="mt-2 text-navy-800">
              Contact Flexotech Consulting Engineers today and let our experts
              help you design, analyse, and solve your engineering challenges.
            </p>
          </div>

          <ButtonLink href="/contact" variant="secondary" size="lg">
            Get in Touch <ArrowRight size={18} />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
