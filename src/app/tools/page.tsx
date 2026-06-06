import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ruler, Thermometer, Gauge, Repeat, Sigma } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Engineering Tools",
  description: "Free engineering reference calculators for process piping professionals.",
};

const tools = [
  { href: "/tools/pipe-thickness", icon: Ruler, title: "Pipe Wall Thickness", desc: "Minimum thickness to ASME B31.3." },
  { href: "/tools/thermal-expansion", icon: Thermometer, title: "Thermal Expansion", desc: "Pipe growth from temperature change." },
  { href: "/tools/pressure-drop", icon: Gauge, title: "Pressure Drop", desc: "Darcy-Weisbach with Churchill friction factor." },
  { href: "/tools/unit-converter", icon: Repeat, title: "Unit Converter", desc: "Pressure, temperature, length and more." },
  { href: "/tools/stress-allowable", icon: Sigma, title: "Stress Allowable", desc: "Allowable stress at design temperature." },
];

export default function ToolsPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen" 
          style={{ backgroundImage: "url('/images/neon-grid.jpg')" }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-500/20 via-[#0A0A0A]/80 to-[#0A0A0A] blur-[80px]" />
        <div className="relative mx-auto max-w-[1280px]">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">Tools</p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tighter">Engineering calculators</h1>
          <p className="mt-4 max-w-2xl text-lg text-steel-400">
            Free reference tools for process piping professionals. For preliminary use only -
            always verify against the current edition of the governing code.
          </p>
        </div>
      </section>
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.href} href={t.href} className="group">
              <Card className="h-full">
                <t.icon className="text-amber-500" size={28} />
                <h2 className="mt-4 text-xl font-semibold text-navy-900">{t.title}</h2>
                <p className="mt-2 text-sm text-steel-600">{t.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 group-hover:text-amber-500">
                  Open tool <ArrowRight size={14} />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}
