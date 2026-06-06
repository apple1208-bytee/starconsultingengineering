import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service role key.
 * Used only in API route handlers to write form submissions.
 * Never import this into client components.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Supabase env vars missing (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
