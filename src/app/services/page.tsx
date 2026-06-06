import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Piping, stress, vibration and safety engineering services.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity" 
          style={{ backgroundImage: "url('/images/welding-sparks.jpg')" }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-[#0A0A0A]/80 to-[#0A0A0A] blur-[80px]" />
        <div className="relative mx-auto max-w-[1280px]">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">Services</p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tighter">Engineering services</h1>
          <p className="mt-4 max-w-2xl text-lg text-steel-400">
            Ten focused service lines covering the full piping engineering lifecycle.
          </p>
        </div>
      </section>
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group">
              <Card className="h-full">
                <Icon name={s.icon} className="text-amber-500" size={28} />
                <h2 className="mt-4 text-xl font-semibold text-navy-900">{s.title}</h2>
                <p className="mt-2 text-sm text-steel-600">{s.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 group-hover:text-amber-500">
                  View service <ArrowRight size={14} />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
