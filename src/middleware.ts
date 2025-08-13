import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("accessToken", accessToken);
  const { pathname } = request.nextUrl;

  // Handle clear=true parameter
  if (request.url.includes("clear=true")) {
    const response = NextResponse.redirect(new URL('/login?clear=true', request.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('clientId');
    return response;
  }

  // Redirect root path to login if not authenticated
  if (pathname === "/") {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Handle login page
  if (pathname.startsWith("/login")) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // For all other routes, redirect to login if not authenticated
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
