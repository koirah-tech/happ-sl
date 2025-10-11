import {createBrowserClient} from '@supabase/ssr';
import {SupabaseClient} from "@supabase/supabase-js";



/**
 * Initializes and returns a Supabase client instance for use
 * in the browser.Reads the URL and anon key from environment
 * variables and assert they exist.
 *
 * @returns {import('@supabase/ssr').SupabaseClient}
 *   A Supabase client configured for browser-side usage.
 *
 * @throws {Error} if NEXT_PUBLIC_SUPABASE_URL or
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined.
 */
export function sbBrowserClient(): SupabaseClient {

    // Read the Supabase URL from environment variables,
    // Read the Supabase URL from environment variables,
    // throw an error if  any missing.
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Create and return the client with the URL and anon key.
    return createBrowserClient(url, key);
}