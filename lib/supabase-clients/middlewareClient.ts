import { createServerClient} from '@supabase/ssr';
import {type SupabaseClient} from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';

import {CookieEntry} from "@/components/public-pages/auth-page/authSchema";

/**
 * Read all cookies from a Next.js request.
 */
function readCookies(req: NextRequest): CookieEntry[] {
  // @ts-ignore
  return req.cookies.getAll().map(({ name, value, options }) => ({ name, value, options }))
}

/**
 * Inject cookies into the Next.js Request object for downstream handlers.
 */
function writeCookiesToReq(req: NextRequest, cookies: CookieEntry[]): void {
  for (const { name, value } of cookies) {
    req.cookies.set(name, value)
  }
}

/**
 * Inject cookies into the Next.js Response so the browser receives them.
 */
function writeCookiesToRes(res: NextResponse, cookies: CookieEntry[]): void {
  for (const { name, value, options } of cookies) {
    res.cookies.set(name, value, options)
  }
}

/**
 * Initialize a Supabase client inside Next.js middleware,
 * wiring cookie I/O to the `request` and returned `response`.
 *
 * @param request - incoming Next.js Request
 * @returns
 *   supabase: the server-side Supabase client
 *   response: a mutable wrapper around NextResponse.next()
 */
export async function sbMiddlewareClient(request: NextRequest) {
  // wrap so we can replace .value later
  const responseWrapper = { value: NextResponse.next({ request }) }

  const sb_url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const sb_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase: SupabaseClient = createServerClient(
      sb_url,
      sb_key,
      {
        cookies: {
          getAll: () => readCookies(request),
          setAll: (cookies) => {
            writeCookiesToReq(request, cookies)
            // re-create the response with mutated request
            responseWrapper.value = NextResponse.next({ request })
            writeCookiesToRes(responseWrapper.value, cookies)
          },
        },
      }
  )

  return { supabase, response: responseWrapper }
}