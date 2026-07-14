import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Flexotech Consulting Engineers  about your project.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-500/20 via-[#0A0A0A]/80 to-[#0A0A0A] blur-[80px]" />
        <div className="relative mx-auto max-w-[1280px]">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">Contact</p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tighter">Discuss your project</h1>
          <p className="mt-4 max-w-2xl text-lg text-steel-400">
            Tell us about your system and requirements - we will respond promptly.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-20 lg:grid-cols-[1fr_1.6fr]">
        <aside className="space-y-6">
          <h2 className="text-2xl font-bold text-navy-900">Get in touch</h2>
          <ul className="space-y-4 text-steel-700">
            <li className="flex items-start gap-3">
              <Mail size={20} className="mt-0.5 text-amber-500" />
              <div><p className="font-medium text-navy-900">Email</p><p className="text-sm">{site.email}</p></div>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={20} className="mt-0.5 text-amber-500" />
              <div><p className="font-medium text-navy-900">Phone</p><p className="text-sm">{site.phone}</p></div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 text-amber-500" />
              <div><p className="font-medium text-navy-900">Office</p><p className="text-sm">{site.address}</p></div>
            </li>
          </ul>

          {site.principal && (
            <div className="mt-8 rounded-lg border border-steel-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-navy-900">{site.principal.name}</h3>
              <p className="mt-1 text-xs font-semibold text-amber-600">{site.principal.title}</p>
              <p className="mt-2 text-xs text-steel-500">{site.principal.credentials}</p>
            </div>
          )}

          <p className="rounded-lg bg-navy-50 p-4 text-sm text-steel-600 mt-6">
            This is a demonstration project. Submitted inquiries are stored for the demo and
            are not handled as live commercial enquiries.
          </p>
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            <img 
              src="/images/engineers-tablet.jpg" 
              alt="Engineers reviewing tablet" 
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </aside>

        <div className="rounded-xl border border-steel-200 bg-white p-6 shadow-sm md:p-8">
          <InquiryForm />
        </div>
      </div>
    </main>
  );
}
