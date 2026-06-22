import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/proxy";

const protectedRoutes = ["/dashboard", "/applications", "/kanban"];
const authRoutes = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);
  const { pathname } = request.nextUrl;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (authRoutes.some((r) => pathname.startsWith(r)) && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
