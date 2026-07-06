import { Resend } from "resend";

/**
 * Returns a Resend client if RESEND_API_KEY is set, otherwise null.
 * Callers must handle the null case (email simply skipped in dev).
 */
export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export const FROM_EMAIL =
  process.env.EMAIL_FROM || "Star Consulting <onboarding@resend.dev>";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
