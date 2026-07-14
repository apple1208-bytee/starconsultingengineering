import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Flexotech Consulting Engineers provides piping stress analysis, pipeline engineering, vibration analysis, and engineering consultancy services across oil & gas, LNG, petrochemical, power, manufacturing, and process industries.",
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: "url('/images/industrial-port.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />

        <div className="relative mx-auto max-w-[1280px]">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
            Industries
          </p>

          <h1 className="mt-3 text-5xl font-extrabold tracking-tighter">
            Industries We Serve
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-steel-400">
            Flexotech Consulting Engineers delivers specialist piping stress
            analysis, pipeline engineering, vibration analysis, and engineering
            consultancy services for the world's leading industrial sectors.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:-translate-y-1">
                <Icon
                  name={industry.icon}
                  className="text-amber-500"
                  size={28}
                />

                <h2 className="mt-4 text-xl font-semibold text-navy-900">
                  {industry.name}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm text-steel-600">
                  {industry.overview}
                </p>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 transition-colors group-hover:text-amber-500">
                  Explore Industry
                  <ArrowRight size={14} />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
