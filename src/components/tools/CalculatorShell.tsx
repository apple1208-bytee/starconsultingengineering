"use client";

import Link from "next/link";

export function CalculatorShell({
  title,
  intro,
  inputs,
  results,
  clause,
}: {
  title: string;
  intro: string;
  inputs: React.ReactNode;
  results: React.ReactNode;
  clause?: string;
}) {
  return (
    <>
      <section className="bg-navy-900 px-6 py-16 text-white">
        <div className="mx-auto max-w-[1280px]">
          <nav className="mb-5 text-sm text-steel-400">
            <Link href="/tools" className="hover:text-amber-400">Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-steel-300">{title}</span>
          </nav>
          <h1 className="text-4xl font-extrabold">{title}</h1>
          <p className="mt-3 max-w-2xl text-steel-300">{intro}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1280px] gap-8 px-6 py-12 lg:grid-cols-2">
        <div className="rounded-xl border border-steel-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-500">Inputs</h2>
          <div className="space-y-4">{inputs}</div>
        </div>
        <div className="rounded-xl border border-steel-200 bg-navy-50 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-500">Results</h2>
          {results}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pb-16">
        <p className="rounded-lg bg-steel-100 p-4 text-xs text-steel-600">
          Disclaimer: Results are approximate and for preliminary reference only.
          {clause ? ` ${clause}` : ""} Always verify against the current edition of the
          applicable code for formal design.
        </p>
      </div>
    </>
  );
}

export const fieldCls =
  "w-full rounded-md border border-steel-300 bg-white px-3 py-2 text-sm text-navy-900 focus:border-amber-400 focus:outline-none";
export const fieldLabel = "mb-1.5 block text-sm font-medium text-navy-900";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

export function ResultRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-steel-200 py-2.5 last:border-0">
      <span className="text-sm text-steel-600">{label}</span>
      <span className={`font-mono text-sm font-semibold ${accent ? "text-amber-600" : "text-navy-900"}`}>{value}</span>
    </div>
  );
}
