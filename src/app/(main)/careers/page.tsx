import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Flexotech Consulting Engineers - explore engineering career opportunities in piping stress analysis, pipeline engineering, and industrial consultancy.",
};

export default function CareersPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity grayscale"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581091877018-dac6a371d50f?auto=format,compress&w=1200&q=75')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent blur-[80px]" />

        <div className="relative mx-auto max-w-[1280px]">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
            Careers
          </p>

          <h1 className="mt-3 max-w-3xl text-5xl font-extrabold leading-tight tracking-tighter">
            Build Your Career with Flexotech Consulting Engineers
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-steel-400">
            Join a team of passionate engineering professionals delivering
            innovative piping stress analysis, CAESAR II solutions, pipeline
            engineering, vibration analysis, and industrial consultancy services
            across multiple industries.
          </p>
        </div>
      </section>

      {/* Career Opportunities */}
      <Section className="min-h-[50vh] border-y border-steel-200 bg-steel-50 flex flex-col justify-center">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Join Our Team"
            title="Career Opportunities"
            subtitle="We are always interested in connecting with talented engineers who are passionate about innovation and technical excellence."
            center
          />

          <div className="mt-8 rounded-xl border border-steel-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-navy-900">
              Current Openings
            </h3>

            <p className="mt-4 text-lg text-steel-600">
              There are currently{" "}
              <span className="font-bold text-amber-600">
                no open positions
              </span>{" "}
              at <strong>Flexotech Consulting Engineers</strong>.
            </p>

            <p className="mt-6 text-steel-500">
              We are continuously looking for talented professionals in piping
              engineering, piping stress analysis, CAESAR II, mechanical
              engineering, pipeline engineering, and industrial consultancy.
            </p>

            <p className="mt-4 text-steel-500">
              If you would like to be considered for future opportunities,
              please send your updated resume to:
            </p>

            <div className="mt-6">
              <a
                href={`mailto:${site.email}`}
                className="inline-block rounded-lg bg-amber-500 px-6 py-3 font-semibold text-navy-900 transition hover:bg-amber-400"
              >
                {site.email}
              </a>
            </div>

            <p className="mt-6 text-sm text-steel-500">
              Our recruitment team will review your profile and contact you if a
              suitable opportunity becomes available.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
