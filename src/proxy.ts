import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = Boolean(session);
  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard) {
    if (isLoggedIn) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else if (isLoggedIn) {
    return Response.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
