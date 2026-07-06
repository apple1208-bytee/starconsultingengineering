import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Target, Eye, ShieldCheck, BookOpen, Crosshair, HardHat } from "lucide-react";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Star Consulting Engineering - a specialist piping, stress and vibration consultancy.",
};

const values = [
  { icon: Crosshair, title: "Technical Excellence", body: "We hold our analysis to the highest engineering standard." },
  { icon: ShieldCheck, title: "Client Confidentiality", body: "Your project data is handled with strict confidentiality." },
  { icon: BookOpen, title: "Engineering Ethics", body: "Honest, independent advice - even when it is not what is expected." },
  { icon: Target, title: "Precision", body: "Right first time, traceable and defensible." },
  { icon: HardHat, title: "Safety First", body: "Safe, code-compliant outcomes are non-negotiable." },
  { icon: Eye, title: "Continuous Learning", body: "We keep current with evolving codes and methods." },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity grayscale" 
          style={{ backgroundImage: "url('/images/industrial-piping.jpg')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent blur-[80px]" />
        <div className="relative mx-auto max-w-[1280px]">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">About us</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-extrabold leading-tight tracking-tighter">
            Specialist engineering, delivered with rigour
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-steel-400">{site.description}</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="Focused on what we do best" />
            <p className="mt-6 text-steel-600">
              Star Consulting Engineering was founded by practising engineers to deliver
              specialist piping, stress and vibration analysis without the overhead of a
              large generalist firm. We work alongside operators and EPC contractors as an
              extension of their team.
            </p>
            <p className="mt-4 text-steel-600">
              Our engagements range from full project stress engineering to rapid in-service
              troubleshooting. In every case the goal is the same: safe, reliable, code-compliant
              piping systems backed by clear, defensible engineering.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Card hover={false}>
                <Target className="text-amber-500" size={26} />
                <h3 className="mt-3 text-lg font-semibold text-navy-900">Mission</h3>
                <p className="mt-2 text-sm text-steel-600">
                  To make critical piping systems safer and more reliable through specialist
                  engineering and honest advice.
                </p>
              </Card>
              <Card hover={false}>
                <Eye className="text-amber-500" size={26} />
                <h3 className="mt-3 text-lg font-semibold text-navy-900">Vision</h3>
                <p className="mt-2 text-sm text-steel-600">
                  To be the trusted specialist partner for piping integrity across heavy industry.
                </p>
              </Card>
            </div>
          </div>
          <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
            <img 
              src="/images/control-room.jpg" 
              alt="Engineering Control Room" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading eyebrow="What guides us" title="Core values" center />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title}>
              <v.icon className="text-amber-500" size={24} />
              <h3 className="mt-3 text-lg font-semibold text-navy-900">{v.title}</h3>
              <p className="mt-2 text-sm text-steel-600">{v.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <section className="bg-[#0A0A0A] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">Work with a specialist team</h2>
          <p className="mt-3 text-steel-400">Tell us about your system and we will tell you how we can help.</p>
          <div className="mt-7"><ButtonLink href="/contact">Get in Touch</ButtonLink></div>
        </div>
      </section>
    </main>
  );
}
