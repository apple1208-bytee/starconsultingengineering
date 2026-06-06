"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

const timelines = [
  { value: "urgent", label: "Urgent (< 2 weeks)" },
  { value: "one_month", label: "Within 1 month" },
  { value: "three_months", label: "Within 3 months" },
  { value: "six_months", label: "6+ months" },
  { value: "exploring", label: "Just exploring" },
];

const inputCls =
  "w-full rounded-md border border-steel-300 bg-white px-3 py-2.5 text-sm text-navy-900 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400";
const labelCls = "mb-1.5 block text-sm font-medium text-navy-900";

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [ref, setRef] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.error?.message || "Submission failed");
      }
      setStatus("done");
      setRef(data.data?.reference || "");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-lg border border-success/30 bg-green-50 p-8 text-center">
        <h3 className="text-xl font-bold text-navy-900">Thank you</h3>
        <p className="mt-2 text-steel-600">
          Your inquiry has been received. We will be in touch shortly.
        </p>
        {ref && <p className="mt-3 font-mono text-sm text-steel-500">Reference: {ref}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-widest text-amber-500">
          Contact details
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="name">Full name *</label>
            <input id="name" name="name" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="phone">Phone</label>
            <input id="phone" name="phone" className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="company">Company</label>
            <input id="company" name="company" className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="designation">Designation / role</label>
            <input id="designation" name="designation" className={inputCls} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-widest text-amber-500">
          Project details
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="service">Service of interest *</label>
            <select id="service" name="service" required defaultValue="" className={inputCls}>
              <option value="" disabled>Select a service</option>
              {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="industry">Industry *</label>
            <select id="industry" name="industry" required defaultValue="" className={inputCls}>
              <option value="" disabled>Select an industry</option>
              {industries.map((i) => <option key={i.slug} value={i.slug}>{i.name}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="message">Project description *</label>
          <textarea id="message" name="message" required rows={5} className={inputCls} placeholder="Briefly describe your system, the problem, and what you need from us." />
        </div>
        <div>
          <label className={labelCls} htmlFor="timeline">Timeline *</label>
          <select id="timeline" name="timeline" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select a timeline</option>
            {timelines.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </fieldset>

      {status === "error" && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-error">{msg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-md bg-amber-400 px-6 py-3.5 font-semibold text-navy-900 transition-colors hover:bg-amber-500 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
