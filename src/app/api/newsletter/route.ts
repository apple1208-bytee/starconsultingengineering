import { newsletterSchema } from "@/lib/validations/newsletter";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

function ok(data: unknown, status = 200) {
  return Response.json({ success: true, data }, { status });
}
function fail(message: string, status = 400) {
  return Response.json({ success: false, error: { message } }, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request body", 400);
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return fail("Enter a valid email address", 422);
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert({ email: parsed.data.email }, { onConflict: "email" });
    if (error) {
      console.error("Supabase newsletter error:", error.message);
      return fail("Could not subscribe. Please try again.", 500);
    }
  } catch (e) {
    console.error("Supabase config error:", e);
    return fail("Server is not configured for submissions yet.", 500);
  }

  return ok({ subscribed: true }, 201);
}
