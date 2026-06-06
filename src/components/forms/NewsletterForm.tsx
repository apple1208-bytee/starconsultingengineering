"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data?.error?.message || "Subscription failed");
      setStatus("done");
      setMsg("Thanks - you are subscribed.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return <p className="text-sm text-amber-300">{msg}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full rounded-md border border-navy-700 bg-navy-800 px-3 py-2 text-sm text-white placeholder:text-steel-500 focus:border-amber-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-amber-500 disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {status === "error" && <span className="text-xs text-red-400 sm:hidden">{msg}</span>}
    </form>
  );
}
