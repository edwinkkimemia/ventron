import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  // Basic rate-limit hint headers for form routes
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/inquiries", "/api/quotes"] };
