import { inquirySchema } from "@/lib/validations/inquiry";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";

export const runtime = "nodejs";

function ok(data: unknown, status = 200) {
  return Response.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

function fail(message: string, status = 400, details?: unknown) {
  return Response.json(
    {
      success: false,
      error: {
        message,
        details,
      },
    },
    { status }
  );
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
    return fail(
      "Validation failed",
      422,
      parsed.error.flatten()
    );
  }

  const input = parsed.data;

  // Prevent email header injection
  const oneLine = (value: string) =>
    value.replace(/[\r\n]+/g, " ").trim();

  input.name = oneLine(input.name);

  if (input.company) {
    input.company = oneLine(input.company);
  }

  if (input.designation) {
    input.designation = oneLine(input.designation);
  }

  // Inquiry Reference
  const reference =
    "FCE-" + Date.now().toString(36).toUpperCase();

  /**
   * Save Inquiry to Supabase
   */

  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("inquiries")
      .insert({
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
      console.error("Supabase Insert Error:", error);

      return fail(
        "Unable to save your inquiry. Please try again later.",
        500
      );
    }
  } catch (error) {
    console.error("Supabase Configuration Error:", error);

    return fail(
      "Server configuration error. Please contact the administrator.",
      500
    );
  }

  /**
   * Send Emails (Optional)
   */

  const resend = getResend();

  if (resend) {
    try {
      // Admin Email

      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Inquiry Received - ${reference}`,
        text: `
A new inquiry has been submitted through the Flexotech Consulting Engineers website.

Reference Number:
${reference}

-------------------------------------

Name:
${input.name}

Email:
${input.email}

Phone:
${input.phone || "-"}

Company:
${input.company || "-"}

Designation:
${input.designation || "-"}

Requested Service:
${input.service}

Industry:
${input.industry}

Project Timeline:
${input.timeline}

-------------------------------------

Project Details:

${input.message}
        `,
      });

      // Customer Email

      await resend.emails.send({
        from: FROM_EMAIL,
        to: input.email,
        subject: `Thank you for contacting Flexotech Consulting Engineers (${reference})`,
        text: `
Dear ${input.name},

Thank you for contacting Flexotech Consulting Engineers.

We have successfully received your inquiry.

Reference Number:
${reference}

Our engineering team will carefully review your requirements and get back to you as soon as possible.

We appreciate the opportunity to work with you.

Kind Regards,

Flexotech Consulting Engineers
https://flexotechconsultingengineers.com
        `,
      });
    } catch (error) {
      console.error("Resend Email Error:", error);
      // Non-fatal error
    }
  }

  return ok(
    {
      reference,
    },
    201
  );
}
