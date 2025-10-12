import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const protectedPaths = [
    "/dashboard",
    "/choristers",
    "/choirmasters",
    "/volunteers",
    "/schedule",
    "/settings",
  ];

  if (protectedPaths.some(p => req.nextUrl.pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (req.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/choristers/:path*", "/choirmasters/:path*", "/volunteers/:path*", "/schedule/:path*", "/settings/:path*", "/login"],
};
