import { inquirySchema } from "@/lib/validations/inquiry";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";

export const runtime = "nodejs";

function ok(data: unknown, status = 200) {
  return Response.json({ success: true, data }, { status });
}
function fail(message: string, status = 400, details?: unknown) {
  return Response.json({ success: false, error: { message, details } }, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request body", 400);
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return fail("Validation failed", 422, parsed.error.flatten());
  }
  const input = parsed.data;
  // Strip CR/LF from single-line fields to prevent email header injection.
  const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();
  input.name = oneLine(input.name);
  if (input.company) input.company = oneLine(input.company);
  if (input.designation) input.designation = oneLine(input.designation);
  const reference = "SCE-" + Date.now().toString(36).toUpperCase();

  // Persist to Supabase
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("inquiries").insert({
      reference,
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      company: input.company || null,
      designation: input.designation || null,
      service: input.service,
      industry: input.industry,
      message: input.message,
      timeline: input.timeline,
    });
    if (error) {
      console.error("Supabase insert error:", error.message);
      return fail("Could not save your inquiry. Please try again.", 500);
    }
  } catch (e) {
    console.error("Supabase config error:", e);
    return fail("Server is not configured for submissions yet.", 500);
  }

  // Send emails (best-effort; skipped if RESEND_API_KEY absent)
  const resend = getResend();
  if (resend) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New inquiry ${reference}`,
        text:
          `New inquiry received.\n\n` +
          `Reference: ${reference}\nName: ${input.name}\nEmail: ${input.email}\n` +
          `Phone: ${input.phone || "-"}\nCompany: ${input.company || "-"}\n` +
          `Service: ${input.service}\nIndustry: ${input.industry}\n` +
          `Timeline: ${input.timeline}\n\nMessage:\n${input.message}`,
      });
      await resend.emails.send({
        from: FROM_EMAIL,
        to: input.email,
        subject: `We received your inquiry (${reference})`,
        text:
          `Hi ${input.name},\n\nThank you for contacting Star Consulting Engineering. ` +
          `Your reference is ${reference}. Our team will be in touch shortly.\n\n- Star Consulting Engineering`,
      });
    } catch (e) {
      console.error("Resend error (non-fatal):", e);
    }
  }

  return ok({ reference }, 201);
}
