"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "industries" | null>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || mobileOpen ? "bg-navy-900 shadow-lg" : "bg-navy-900/95 backdrop-blur"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-white">
          <img src="/Logo/iconic_logo.png" alt="Star Consulting Icon" className="h-12 w-auto object-contain" />
          <span className="text-lg font-extrabold tracking-tight">
            STAR <span className="text-amber-400">CONSULTING</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav ref={menuRef} className="hidden items-center gap-1 lg:flex">
          <NavLink href="/" onClick={() => setOpenMenu(null)}>Home</NavLink>
          <NavLink href="/about" onClick={() => setOpenMenu(null)}>About</NavLink>
          <Dropdown
            label="Services"
            open={openMenu === "services"}
            onToggle={() => setOpenMenu(openMenu === "services" ? null : "services")}
          >
            <div className="grid grid-cols-2 gap-1 p-2">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-md px-3 py-2 text-sm text-steel-700 hover:bg-navy-50 hover:text-navy-900"  
                  onClick={() => setOpenMenu(null)}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </Dropdown>
          <Dropdown
            label="Industries"
            open={openMenu === "industries"}
            onToggle={() => setOpenMenu(openMenu === "industries" ? null : "industries")}
          >
            <div className="grid grid-cols-2 gap-1 p-2">
              {industries.map((i) => (
                <Link
                  key={i.slug}
                  href={`/industries/${i.slug}`}
                  className="rounded-md px-3 py-2 text-sm text-steel-700 hover:bg-navy-50 hover:text-navy-900"  
                  onClick={() => setOpenMenu(null)}
                >
                  {i.name}
                </Link>
              ))}
            </div>
          </Dropdown>
          <NavLink href="/tools" onClick={() => setOpenMenu(null)}>Tools</NavLink>
          <NavLink href="/blogs" onClick={() => setOpenMenu(null)}>Blogs</NavLink>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="rounded-md bg-amber-400 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-amber-500"
          >
            Contact Us →
          </Link>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-navy-700 bg-navy-900 lg:hidden">
          <div className="space-y-1 px-6 py-4">
            <MobileLink href="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
            <MobileLink href="/about" onClick={() => setMobileOpen(false)}>About</MobileLink>
            <MobileGroup label="Services" items={services.map((s) => ({ href: `/services/${s.slug}`, label: s.title }))} onNavigate={() => setMobileOpen(false)} />
            <MobileGroup label="Industries" items={industries.map((i) => ({ href: `/industries/${i.slug}`, label: i.name }))} onNavigate={() => setMobileOpen(false)} />
            <MobileLink href="/tools" onClick={() => setMobileOpen(false)}>Tools</MobileLink>
            <MobileLink href="/blogs" onClick={() => setMobileOpen(false)}>Blogs</MobileLink>
            <MobileLink href="/contact" onClick={() => setMobileOpen(false)}>Contact</MobileLink>
            <p className="pt-3 text-xs text-steel-500">{site.email}</p>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md px-3 py-2 text-sm font-medium text-steel-200 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-steel-200 transition-colors hover:text-white"
      >
        {label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 w-[28rem] rounded-lg border border-steel-200 bg-white shadow-xl">
          {children}
        </div>
      )}
    </div>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block rounded-md px-2 py-2 text-base font-medium text-white hover:bg-navy-800">
      {children}
    </Link>
  );
}

function MobileGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: { href: string; label: string }[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between rounded-md px-2 py-2 text-base font-medium text-white hover:bg-navy-800">
        {label}
        <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="space-y-1 pb-2 pl-4">
          {items.map((it) => (
            <Link key={it.href} href={it.href} onClick={onNavigate} className="block rounded-md px-2 py-1.5 text-sm text-steel-300 hover:text-white">
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
