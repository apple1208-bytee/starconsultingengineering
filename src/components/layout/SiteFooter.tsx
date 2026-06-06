import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-steel-300">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold text-white">
            STAR <span className="text-amber-400">CONSULTING</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-steel-400">{site.description}</p>
          <div className="mt-4 flex gap-4 text-sm font-medium">
            <a href={site.social.linkedin} className="text-steel-400 hover:text-amber-400">LinkedIn</a>
            <a href={site.social.youtube} className="text-steel-400 hover:text-amber-400">YouTube</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-amber-400">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-amber-400">About</Link></li>
            <li><Link href="/industries" className="hover:text-amber-400">Industries</Link></li>
            <li><Link href="/tools" className="hover:text-amber-400">Engineering Tools</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400">Contact</Link></li>
          </ul>
          <ul className="mt-4 space-y-2 text-sm text-steel-400">
            <li className="flex items-center gap-2"><Mail size={14} /> {site.email}</li>
            <li className="flex items-center gap-2"><Phone size={14} /> {site.phone}</li>
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5" /> {site.address}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Newsletter</h3>
          <p className="mt-4 text-sm text-steel-400">Engineering insights, occasionally. No spam.</p>
          <div className="mt-3"><NewsletterForm /></div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-steel-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>A demonstration project - not a live commercial service.</p>
        </div>
      </div>
    </footer>
  );
}
