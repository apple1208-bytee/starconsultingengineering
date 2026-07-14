import { Resend } from "resend";

/**
 * Returns a Resend client if RESEND_API_KEY is available.
 * If no API key is configured, email sending is skipped.
 */
export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

/**
 * Sender email address.
 *
 * For production, replace onboarding@resend.dev with your verified
 * domain email (example: noreply@flexotechconsultingengineers.com)
 */

export const FROM_EMAIL =
  process.env.EMAIL_FROM ||
  "Flexotech Consulting Engineers <onboarding@resend.dev>";

/**
 * Company email that receives all contact form submissions.
 *
 * Replace the fallback email below with your official company email.
 */

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ||
  "info@flexotechconsultingengineers.com";
