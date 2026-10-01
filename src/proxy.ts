import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isComingSoon } from "@/lib/launch";
import { isStagingEnv, STAGING_PASSWORD_SHA256 } from "@/lib/environment";

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

// HTTP Basic: any username, the staging password as the password.
async function hasStagingAccess(request: NextRequest): Promise<boolean> {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;
  try {
    const decoded = atob(header.slice("Basic ".length));
    const password = decoded.slice(decoded.indexOf(":") + 1);
    return (await sha256Hex(password)) === STAGING_PASSWORD_SHA256;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  // Staging and PR previews: nothing is reachable without the password,
  // pages and API alike.
  if (isStagingEnv() && !(await hasStagingAccess(request))) {
    return new NextResponse("Staging — authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Wedite staging", charset="UTF-8"' },
    });
  }

  // Production only, and only until LAUNCHED is flipped: every page shows the
  // coming-soon screen and the API (which costs money) is closed.
  if (!isComingSoon()) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === "/coming-soon") return NextResponse.next();
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "not_available" }, { status: 404 });
  }
  return NextResponse.rewrite(new URL("/coming-soon", request.url));
}

// Static assets stay open: next/image's optimizer fetches /public images from
// the server itself (it can't send the staging password), so gating them
// would break every optimized image on staging. They hold nothing private.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|opengraph-image.png|.*\\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?)$).*)",
  ],
};
