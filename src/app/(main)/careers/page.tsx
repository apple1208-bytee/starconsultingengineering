import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Flexotech Consulting Engineers - discover open vacancies and career opportunities.",
};

export default function CareersPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity grayscale"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091877018-dac6a371d50f?auto=format,compress&w=1200&q=75')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent blur-[80px]" />
        <div className="relative mx-auto max-w-[1280px]">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">Careers</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-extrabold leading-tight tracking-tighter">
            Build the future of heavy industry
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-steel-400">
            We are always looking for specialist engineers who value rigour, precision, and solving complex problems.
          </p>
        </div>
      </section>

      <Section className="bg-steel-50 border-y border-steel-200 min-h-[50vh] flex flex-col justify-center">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading eyebrow="Join the team" title="Job Openings" center />
          <div className="mt-8 rounded-xl border border-steel-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-navy-900">Current Vacancies</h3>
            <p className="mt-4 text-steel-600 text-lg">
              There are currently <span className="font-bold text-amber-600">no vacancies available</span> at Star Consulting Engineering.
            </p>
            <p className="mt-6 text-sm text-steel-500">
              However, we are always open to connecting with talented piping, stress, and vibration engineers. You are welcome to send your CV to <a href={`mailto:${site.email}`} className="text-navy-900 hover:text-amber-600 font-medium transition-colors">{site.email}</a> for future consideration.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
