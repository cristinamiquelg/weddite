import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isComingSoon } from "@/lib/launch";

// Production only, and only until LAUNCHED is flipped: every page shows the
// coming-soon screen and the API (which costs money) is closed.
export function proxy(request: NextRequest) {
  if (!isComingSoon()) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === "/coming-soon") return NextResponse.next();
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "not_available" }, { status: 404 });
  }
  return NextResponse.rewrite(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt).*)"],
};
